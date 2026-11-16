"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  advanceFromFeedback,
  applyDecisionToState,
  createInitialGameState,
  evaluatePerformance,
  getScenariosForMode,
} from "@/domain/engine";
import {
  POST_TEST_QUESTIONS,
  PRE_TEST_QUESTIONS,
  evaluateQuiz,
} from "@/domain/quiz";
import { MODE_CONFIGS } from "@/domain/scenarios";
import {
  DecisionOption,
  FinalEvaluation,
  GameState,
  LeaderboardEntry,
  ModeConfig,
  ProjectMode,
  Scenario,
} from "@/domain/types";
import {
  clearLeaderboard,
  loadLeaderboard,
  loadParticipantName,
  saveParticipantName,
  upsertLeaderboardEntry,
} from "@/infrastructure/storage";

export interface UseGameSimulationResult {
  state: GameState;
  modeConfig: ModeConfig | null;
  currentScenario: Scenario | null;
  evaluation: FinalEvaluation | null;
  leaderboard: LeaderboardEntry[];
  setParticipantName: (name: string) => void;
  startPreTest: (mode: ProjectMode) => void;
  completePreTest: (selectedIndices: number[]) => void;
  beginSimulationFromPreTest: () => void;
  startGameDirect: (mode: ProjectMode) => void;
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

  useEffect(() => {
    const savedName = loadParticipantName();
    if (savedName) {
      setState((prev) => ({ ...prev, participantName: savedName }));
    }
    setLeaderboard(loadLeaderboard());
  }, []);

  const setParticipantName = useCallback((name: string) => {
    saveParticipantName(name);
    setState((prev) => ({ ...prev, participantName: name }));
  }, []);

  const startPreTest = useCallback((mode: ProjectMode) => {
    setCurrentRunId(`run-${Date.now()}`);
    setState((prev) => ({
      ...createInitialGameState(null, prev.participantName),
      mode,
      status: "pretest",
      indicators: { ...MODE_CONFIGS[mode].initialIndicators },
    }));
  }, []);

  const completePreTest = useCallback((selectedIndices: number[]) => {
    const result = evaluateQuiz("pre", PRE_TEST_QUESTIONS, selectedIndices);
    setState((prev) => ({
      ...prev,
      preTestResult: result,
    }));
  }, []);

  const beginSimulationFromPreTest = useCallback(() => {
    setState((prev) => {
      if (!prev.mode) return prev;
      return {
        ...prev,
        status: "playing",
        currentRoundIndex: 0,
        indicators: { ...MODE_CONFIGS[prev.mode].initialIndicators },
        lastDeltas: null,
        lastOutcome: null,
        failedIndicator: null,
        history: [],
      };
    });
  }, []);

  const startGameDirect = useCallback((mode: ProjectMode) => {
    setCurrentRunId(`run-${Date.now()}`);
    setState((prev) => ({
      ...createInitialGameState(mode, prev.participantName),
      preTestResult: null,
      postTestResult: null,
    }));
  }, []);

  const modeConfig = useMemo<ModeConfig | null>(() => {
    if (!state.mode) return null;
    return MODE_CONFIGS[state.mode];
  }, [state.mode]);

  const currentScenario = useMemo<Scenario | null>(() => {
    if (!state.mode) return null;
    const scenarios = getScenariosForMode(state.mode);
    return scenarios[state.currentRoundIndex] ?? null;
  }, [state.mode, state.currentRoundIndex]);

  const persistRunToLeaderboard = useCallback(
    (nextState: GameState) => {
      if (!nextState.mode) return;
      if (nextState.status !== "victory" && nextState.status !== "gameover") {
        return;
      }

      const runId = currentRunId ?? `run-${Date.now()}`;
      if (!currentRunId) setCurrentRunId(runId);

      const isVictory = nextState.status === "victory";
      const evalResult = isVictory ? evaluatePerformance(nextState) : null;
      const decisionPts = nextState.history.reduce(
        (sum, h) => sum + h.chosenOption.pmiBestPracticeScore,
        0
      );

      let gapsClosed: number | null = null;
      let totalGaps: number | null = null;
      if (nextState.preTestResult && nextState.postTestResult) {
        const preGaps = nextState.preTestResult.gaps;
        totalGaps = preGaps.length;
        gapsClosed = preGaps.filter((domain) => {
          const postAns = nextState.postTestResult?.answers.find(
            (a) => a.domain === domain
          );
          return Boolean(postAns?.correct);
        }).length;
      }

      const entry: LeaderboardEntry = {
        id: runId,
        participantName: nextState.participantName.trim() || "Comandante Anónimo",
        mode: nextState.mode,
        status: nextState.status,
        simulationScore: evalResult ? evalResult.totalScore : decisionPts,
        grade: evalResult ? evalResult.grade : "F",
        preTestScore: nextState.preTestResult?.score ?? null,
        preTestLevel: nextState.preTestResult?.level ?? null,
        postTestScore: nextState.postTestResult?.score ?? null,
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
    }));
  }, []);

  const completePostTest = useCallback(
    (selectedIndices: number[]) => {
      const result = evaluateQuiz("post", POST_TEST_QUESTIONS, selectedIndices);
      setState((prev) => {
        const updated: GameState = {
          ...prev,
          postTestResult: result,
        };
        const statusForSave: GameStatusForSave = prev.failedIndicator
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
    setState((prev) => createInitialGameState(null, prev.participantName));
  }, []);

  const clearScores = useCallback(() => {
    setLeaderboard(clearLeaderboard());
  }, []);

  const evaluation = useMemo<FinalEvaluation | null>(() => {
    if (state.status !== "victory" && !(state.status === "posttest" && !state.failedIndicator)) {
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
    setParticipantName,
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

type GameStatusForSave = "victory" | "gameover";
