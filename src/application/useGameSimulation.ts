"use client";

import { useCallback, useMemo, useState } from "react";
import {
  advanceFromFeedback,
  applyDecisionToState,
  createInitialGameState,
  evaluatePerformance,
  getScenariosForMode,
} from "@/domain/engine";
import { MODE_CONFIGS } from "@/domain/scenarios";
import {
  DecisionOption,
  FinalEvaluation,
  GameState,
  ModeConfig,
  ProjectMode,
  Scenario,
} from "@/domain/types";

export interface UseGameSimulationResult {
  state: GameState;
  modeConfig: ModeConfig | null;
  currentScenario: Scenario | null;
  evaluation: FinalEvaluation | null;
  startGame: (mode: ProjectMode) => void;
  chooseOption: (option: DecisionOption) => void;
  nextRound: () => void;
  resetGame: () => void;
}

export function useGameSimulation(): UseGameSimulationResult {
  const [state, setState] = useState<GameState>(() => createInitialGameState());

  const startGame = useCallback((mode: ProjectMode) => {
    setState(createInitialGameState(mode));
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

  const chooseOption = useCallback(
    (option: DecisionOption) => {
      if (!currentScenario) return;
      setState((prev) =>
        applyDecisionToState(prev, option, currentScenario.title)
      );
    },
    [currentScenario]
  );

  const nextRound = useCallback(() => {
    setState((prev) => advanceFromFeedback(prev));
  }, []);

  const resetGame = useCallback(() => {
    setState(createInitialGameState(null));
  }, []);

  const evaluation = useMemo<FinalEvaluation | null>(() => {
    if (state.status !== "victory") return null;
    return evaluatePerformance(state);
  }, [state]);

  return {
    state,
    modeConfig,
    currentScenario,
    evaluation,
    startGame,
    chooseOption,
    nextRound,
    resetGame,
  };
}
