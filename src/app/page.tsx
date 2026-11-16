"use client";

import { useEffect, useState } from "react";
import { useGameSimulation } from "@/application/useGameSimulation";
import { ComicPage } from "@/components/ComicPage";
import { DecisionOptions } from "@/components/DecisionOptions";
import { HudPanel } from "@/components/HudPanel";
import { ResultScreen } from "@/components/ResultScreen";
import { StartScreen } from "@/components/StartScreen";
import { DecisionOption, ProjectMode } from "@/domain/types";
import { soundEngine } from "@/infrastructure/soundEngine";

export default function HomePage() {
  const {
    state,
    modeConfig,
    currentScenario,
    evaluation,
    startGame,
    chooseOption,
    nextRound,
    resetGame,
  } = useGameSimulation();

  const [muted, setMuted] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(0);

  const handleToggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  const handleStartMode = (mode: ProjectMode) => {
    soundEngine.playPanelSlam();
    startGame(mode);
  };

  const handleChooseOption = (option: DecisionOption) => {
    const netDelta =
      option.deltas.budget +
      option.deltas.schedule +
      option.deltas.morale +
      option.deltas.stakeholders;
    const hasHeavyDrop =
      option.deltas.budget <= -15 ||
      option.deltas.schedule <= -15 ||
      option.deltas.morale <= -15 ||
      option.deltas.stakeholders <= -15;

    soundEngine.playChoiceSelect(netDelta >= 0 && !hasHeavyDrop);
    if (hasHeavyDrop) {
      setShakeTrigger((prev) => prev + 1);
    }
    chooseOption(option);
  };

  const handleNextRound = () => {
    soundEngine.playPageTurn();
    nextRound();
  };

  useEffect(() => {
    if (state.status === "playing" && currentScenario) {
      soundEngine.playAlertBlip();
    } else if (state.status === "victory") {
      soundEngine.playVictory();
    } else if (state.status === "gameover") {
      soundEngine.playGameOver();
    }
  }, [state.status, currentScenario]);

  if (state.status === "start" || !state.mode || !modeConfig) {
    return <StartScreen onSelectMode={handleStartMode} />;
  }

  if (state.status === "victory" || state.status === "gameover") {
    return (
      <ResultScreen
        state={state}
        mode={state.mode}
        evaluation={evaluation}
        onRetrySameMode={() => handleStartMode(state.mode!)}
        onBackToStart={resetGame}
      />
    );
  }

  if (!currentScenario) {
    return null;
  }

  const isFeedback = state.status === "feedback";

  return (
    <div className="min-h-screen comic-page-bg flex flex-col">
      <HudPanel
        mode={state.mode}
        modeTitle={modeConfig.subtitle}
        round={currentScenario.round}
        indicators={state.indicators}
        lastDeltas={state.lastDeltas}
        muted={muted}
        onToggleMute={handleToggleMute}
        onReset={resetGame}
      />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-4 px-4 py-4 sm:px-6">
        <ComicPage
          mode={state.mode}
          scenario={currentScenario}
          isFeedback={isFeedback}
          lastOutcome={state.lastOutcome}
          shakeTrigger={shakeTrigger}
        />

        <DecisionOptions
          mode={state.mode}
          round={currentScenario.round}
          options={currentScenario.options}
          selectedOptionId={isFeedback ? (state.lastOutcome?.id ?? null) : null}
          onSelect={handleChooseOption}
          onNextRound={handleNextRound}
        />
      </main>
    </div>
  );
}
