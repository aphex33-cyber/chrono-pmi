"use client";

import { useEffect, useState } from "react";
import { useGameSimulation } from "@/application/useGameSimulation";
import { ComicPage } from "@/components/ComicPage";
import { DecisionOptions } from "@/components/DecisionOptions";
import { HudPanel } from "@/components/HudPanel";
import { QuizScreen } from "@/components/QuizScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { StartScreen } from "@/components/StartScreen";
import { DecisionOption, DifficultyLevel, ProjectMode } from "@/domain/types";
import { soundEngine } from "@/infrastructure/soundEngine";

export default function HomePage() {
  const {
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
  } = useGameSimulation();

  const [muted, setMuted] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(0);

  const handleToggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  const handleStartWithPreTest = (mode: ProjectMode, level: DifficultyLevel) => {
    soundEngine.playPanelSlam();
    startPreTest(mode, level);
  };

  const handleStartDirect = (mode: ProjectMode, level: DifficultyLevel) => {
    soundEngine.playPanelSlam();
    startGameDirect(mode, level);
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
    return (
      <StartScreen
        participantName={state.participantName}
        workshopCode={state.workshopCode}
        workshopMode={state.workshopMode}
        roundTimerSeconds={state.roundTimerSeconds}
        leaderboard={leaderboard}
        isRemoteSyncEnabled={isRemoteSyncEnabled}
        onChangeParticipantName={setParticipantName}
        onChangeWorkshopCode={setWorkshopCode}
        onChangeWorkshopMode={setWorkshopMode}
        onChangeRoundTimer={setRoundTimerSeconds}
        onRefreshLeaderboard={refreshLeaderboard}
        onStartWithPreTest={handleStartWithPreTest}
        onStartDirect={handleStartDirect}
        onClearLeaderboard={clearScores}
      />
    );
  }

  if (state.status === "pretest") {
    return (
      <QuizScreen
        phase="pre"
        mode={state.mode}
        participantName={state.participantName}
        preTestResult={state.preTestResult}
        currentResult={state.preTestResult}
        onSubmitQuiz={completePreTest}
        onContinue={() => {
          soundEngine.playPanelSlam();
          beginSimulationFromPreTest();
        }}
      />
    );
  }

  if (state.status === "posttest") {
    return (
      <QuizScreen
        phase="post"
        mode={state.mode}
        participantName={state.participantName}
        preTestResult={state.preTestResult}
        currentResult={state.postTestResult}
        onSubmitQuiz={completePostTest}
        onContinue={returnToResultFromPostTest}
      />
    );
  }

  if (state.status === "victory" || state.status === "gameover") {
    return (
      <ResultScreen
        state={state}
        mode={state.mode}
        evaluation={evaluation}
        onRetrySameMode={() => handleStartDirect(state.mode!, state.level)}
        onNextLevel={
          state.level < 3
            ? () =>
                handleStartDirect(
                  state.mode!,
                  (state.level + 1) as DifficultyLevel
                )
            : undefined
        }
        onStartPostTest={startPostTest}
        onBackToStart={resetGame}
      />
    );
  }

  if (!currentScenario) {
    return null;
  }

  const isFeedback = state.status === "feedback";
  const isGapTargeted = Boolean(
    state.preTestResult?.gaps.includes(currentScenario.pmbokDomain)
  );

  return (
    <div className="min-h-screen comic-page-bg flex flex-col">
      <HudPanel
        mode={state.mode}
        modeTitle={`${modeConfig.subtitle} · NIVEL ${state.level}`}
        round={currentScenario.round}
        indicators={state.indicators}
        lastDeltas={state.lastDeltas}
        muted={muted}
        roundTimerSeconds={state.roundTimerSeconds}
        isPlaying={!isFeedback}
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
          isGapTargeted={isGapTargeted}
        />

        <DecisionOptions
          mode={state.mode}
          round={currentScenario.round}
          options={currentScenario.options}
          selectedOptionId={isFeedback ? (state.lastOutcome?.id ?? null) : null}
          hideHints={state.workshopMode}
          onSelect={handleChooseOption}
          onNextRound={handleNextRound}
        />
      </main>
    </div>
  );
}
