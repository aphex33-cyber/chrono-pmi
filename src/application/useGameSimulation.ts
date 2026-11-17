"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  advanceFromFeedback,
  applyDecisionToState,
  createInitialGameState,
  evaluatePerformance,
  selectArenaScenariosForRun,
} from "@/domain/engine";
import {
  evaluateQuiz,
  selectPostTestQuestions,
  selectPreTestQuestions,
} from "@/domain/quiz";
import { LEVEL_CONFIGS, MODE_CONFIGS } from "@/domain/scenarios";
import {
  DecisionOption,
  DifficultyLevel,
  FinalEvaluation,
  GameState,
  LeaderboardEntry,
  ModeConfig,
  ProjectMode,
  Scenario,
} from "@/domain/types";
import {
  clearLeaderboard,
  fetchRemoteLeaderboard,
  isSupabaseConfigured,
  loadLeaderboard,
  loadParticipantName,
  loadWorkshopCode,
  saveParticipantName,
  saveWorkshopCode,
  upsertLeaderboardEntry,
} from "@/infrastructure/storage";

export interface UseGameSimulationResult {
  state: GameState;
  modeConfig: ModeConfig | null;
  currentScenario: Scenario | null;
  evaluation: FinalEvaluation | null;
  leaderboard: LeaderboardEntry[];
  isRemoteSyncEnabled: boolean;
  setParticipantName: (name: string) => void;
  setWorkshopCode: (code: string) => void;
  setWorkshopMode: (enabled: boolean) => void;
  setRoundTimerSeconds: (seconds: number | null) => void;
  refreshLeaderboard: () => Promise<void>;
  startPreTest: (mode: ProjectMode, level?: DifficultyLevel) => void;
  completePreTest: (selectedIndices: number[]) => void;
  beginSimulationFromPreTest: () => void;
  startGameDirect: (mode: ProjectMode, level?: DifficultyLevel) => void;
  chooseOption: (option: DecisionOption) => void;
  nextRound: () => void;
  startPostTest: () => void;
  completePostTest: (selectedIndices: number[]) => void;
  returnToResultFromPostTest: () => void;
  resetGame: () => void;
  clearScores: () => void;
}

export function useGameSimulation(): UseGameSimulationResult {
  const [state, setState] = useState<GameState>(() => createInitialGameState());
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentRunId, setCurrentRunId] = useState<string | null>(null);
  const isRemoteSyncEnabled = isSupabaseConfigured();

  const refreshLeaderboard = useCallback(async () => {
    const local = loadLeaderboard();
    if (!isSupabaseConfigured()) {
      setLeaderboard(local);
      return;
    }
    const remote = await fetchRemoteLeaderboard(state.workshopCode);
    if (remote) {
      const mergedMap = new Map<string, LeaderboardEntry>();
      for (const item of local) mergedMap.set(item.id, item);
      for (const item of remote) mergedMap.set(item.id, item);
      setLeaderboard(
        Array.from(mergedMap.values()).sort(
          (a, b) => b.simulationScore - a.simulationScore
        )
      );
    } else {
      setLeaderboard(local);
    }
  }, [state.workshopCode]);

  useEffect(() => {
    const savedName = loadParticipantName();
    const savedWorkshop = loadWorkshopCode();
    setState((prev) => ({
      ...prev,
      participantName: savedName || prev.participantName,
      workshopCode: savedWorkshop || prev.workshopCode,
    }));
    setLeaderboard(loadLeaderboard());
  }, []);

  useEffect(() => {
    if (isRemoteSyncEnabled) {
      void refreshLeaderboard();
    }
  }, [isRemoteSyncEnabled, refreshLeaderboard]);

  const setParticipantName = useCallback((name: string) => {
    saveParticipantName(name);
    setState((prev) => ({ ...prev, participantName: name }));
  }, []);

  const setWorkshopCode = useCallback((code: string) => {
    const normalized = code.toUpperCase();
    saveWorkshopCode(normalized);
    setState((prev) => ({ ...prev, workshopCode: normalized }));
  }, []);

  const setWorkshopMode = useCallback((enabled: boolean) => {
    setState((prev) => ({ ...prev, workshopMode: enabled }));
  }, []);

  const setRoundTimerSeconds = useCallback((seconds: number | null) => {
    setState((prev) => ({ ...prev, roundTimerSeconds: seconds }));
  }, []);

  const startPreTest = useCallback(
    (mode: ProjectMode, level: DifficultyLevel = 1) => {
      setCurrentRunId(
        `run-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
      );
      const questions = selectPreTestQuestions(20, Date.now());
      setState((prev) => ({
        ...createInitialGameState(
          null,
          prev.participantName,
          prev.workshopCode,
          prev.workshopMode,
          prev.roundTimerSeconds,
          level
        ),
        mode,
        level,
        status: "pretest",
        preTestQuestions: questions,
        indicators: { ...LEVEL_CONFIGS[level].initialIndicators },
      }));
    },
    []
  );

  const completePreTest = useCallback((selectedIndices: number[]) => {
    setState((prev) => {
      const result = evaluateQuiz("pre", prev.preTestQuestions, selectedIndices);
      return {
        ...prev,
        preTestResult: result,
      };
    });
  }, []);

  const beginSimulationFromPreTest = useCallback(() => {
    setState((prev) => {
      if (!prev.mode) return prev;
      const scenarios = selectArenaScenariosForRun(
        prev.mode,
        prev.level,
        prev.preTestResult?.gaps ?? [],
        Date.now()
      );
      return {
        ...prev,
        status: "playing",
        currentRoundIndex: 0,
        activeScenarios: scenarios,
        indicators: { ...LEVEL_CONFIGS[prev.level].initialIndicators },
        lastDeltas: null,
        lastOutcome: null,
        failedIndicator: null,
        history: [],
      };
    });
  }, []);

  const startGameDirect = useCallback(
    (mode: ProjectMode, level: DifficultyLevel = 1) => {
      setCurrentRunId(
        `run-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
      );
      setState((prev) => ({
        ...createInitialGameState(
          mode,
          prev.participantName,
          prev.workshopCode,
          prev.workshopMode,
          prev.roundTimerSeconds,
          level
        ),
        preTestResult: null,
        postTestResult: null,
      }));
    },
    []
  );

  const modeConfig = useMemo<ModeConfig | null>(() => {
    if (!state.mode) return null;
    return MODE_CONFIGS[state.mode];
  }, [state.mode]);

  const currentScenario = useMemo<Scenario | null>(() => {
    if (!state.mode) return null;
    return state.activeScenarios[state.currentRoundIndex] ?? null;
  }, [state.mode, state.activeScenarios, state.currentRoundIndex]);

  const persistRunToLeaderboard = useCallback(
    (nextState: GameState) => {
      if (!nextState.mode) return;
      if (nextState.status !== "victory" && nextState.status !== "gameover") {
        return;
      }

      const runId =
        currentRunId ?? `run-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      if (!currentRunId) setCurrentRunId(runId);

      const isVictory = nextState.status === "victory";
      const evalResult = isVictory ? evaluatePerformance(nextState) : null;
      const decisionPts = nextState.history.reduce(
        (sum, h) => sum + h.chosenOption.pmiBestPracticeScore,
        0
      );

      let gapsClosed: number | null = null;
      let totalGaps: number | null = null;
      const gapsDetected = nextState.preTestResult?.gaps ?? [];
      if (nextState.preTestResult && nextState.postTestResult) {
        totalGaps = gapsDetected.length;
        gapsClosed = gapsDetected.filter((domain) => {
          const postAns = nextState.postTestResult?.answers.find(
            (a) => a.domain === domain
          );
          return Boolean(postAns?.correct);
        }).length;
      }

      const entry: LeaderboardEntry = {
        id: runId,
        participantName: nextState.participantName.trim() || "Comandante Anónimo",
        workshopCode: nextState.workshopCode.trim().toUpperCase(),
        mode: nextState.mode,
        level: nextState.level,
        status: nextState.status,
        simulationScore: evalResult ? evalResult.totalScore : decisionPts,
        grade: evalResult ? evalResult.grade : "F",
        preTestScore: nextState.preTestResult?.score ?? null,
        preTestLevel: nextState.preTestResult?.level ?? null,
        postTestScore: nextState.postTestResult?.score ?? null,
        gapsDetected,
        gapsClosed,
        totalGaps,
        indicators: nextState.indicators,
        playedAt: new Date().toISOString(),
      };

      setLeaderboard(upsertLeaderboardEntry(entry));
    },
    [currentRunId]
  );

  const chooseOption = useCallback(
    (option: DecisionOption) => {
      if (!currentScenario) return;
      setState((prev) => {
        const next = applyDecisionToState(prev, option, currentScenario);
        if (next.status === "gameover") {
          persistRunToLeaderboard(next);
        }
        return next;
      });
    },
    [currentScenario, persistRunToLeaderboard]
  );

  const nextRound = useCallback(() => {
    setState((prev) => {
      const next = advanceFromFeedback(prev);
      if (next.status === "victory") {
        persistRunToLeaderboard(next);
      }
      return next;
    });
  }, [persistRunToLeaderboard]);

  const startPostTest = useCallback(() => {
    setState((prev) => ({
      ...prev,
      status: "posttest",
      postTestQuestions: selectPostTestQuestions(
        prev.preTestResult?.gaps ?? [],
        20,
        Date.now()
      ),
    }));
  }, []);

  const completePostTest = useCallback(
    (selectedIndices: number[]) => {
      setState((prev) => {
        const result = evaluateQuiz(
          "post",
          prev.postTestQuestions,
          selectedIndices
        );
        const updated: GameState = {
          ...prev,
          postTestResult: result,
        };
        const statusForSave: "victory" | "gameover" = prev.failedIndicator
          ? "gameover"
          : "victory";
        persistRunToLeaderboard({ ...updated, status: statusForSave });
        return updated;
      });
    },
    [persistRunToLeaderboard]
  );

  const returnToResultFromPostTest = useCallback(() => {
    setState((prev) => ({
      ...prev,
      status: prev.failedIndicator ? "gameover" : "victory",
    }));
  }, []);

  const resetGame = useCallback(() => {
    setCurrentRunId(null);
    setState((prev) =>
      createInitialGameState(
        null,
        prev.participantName,
        prev.workshopCode,
        prev.workshopMode,
        prev.roundTimerSeconds
      )
    );
  }, []);

  const clearScores = useCallback(() => {
    setLeaderboard(clearLeaderboard());
  }, []);

  const evaluation = useMemo<FinalEvaluation | null>(() => {
    if (
      state.status !== "victory" &&
      !(state.status === "posttest" && !state.failedIndicator)
    ) {
      return null;
    }
    return evaluatePerformance(state);
  }, [state]);

  return {
    state,
    modeConfig,
    currentScenario,
    evaluation,
    leaderboard,
    isRemoteSyncEnabled,
    setParticipantName,
    setWorkshopCode,
    setWorkshopMode,
    setRoundTimerSeconds,
    refreshLeaderboard,
    startPreTest,
    completePreTest,
    beginSimulationFromPreTest,
    startGameDirect,
    chooseOption,
    nextRound,
    startPostTest,
    completePostTest,
    returnToResultFromPostTest,
    resetGame,
    clearScores,
  };
}
