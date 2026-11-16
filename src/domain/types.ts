export type ProjectMode = "private" | "public";

export type IndicatorKey = "budget" | "schedule" | "morale" | "stakeholders";

export interface GameIndicators {
  budget: number;
  schedule: number;
  morale: number;
  stakeholders: number;
}

export interface DecisionOption {
  id: string;
  code: "A" | "B" | "C";
  label: string;
  description: string;
  hint: string;
  sfxWord: string;
  deltas: GameIndicators;
  outcomeNarrative: string;
  pmiBestPracticeScore: number;
  pmiArea: string;
  pmiFeedback: string;
}

export interface Scenario {
  id: string;
  round: number;
  episodeCode: string;
  title: string;
  sfxText: string;
  narratorBox: string;
  speaker: string;
  speakerRole: string;
  dialogue: string;
  imagePath: string;
  options: [DecisionOption, DecisionOption, DecisionOption];
}

export interface DecisionRecord {
  round: number;
  scenarioTitle: string;
  chosenOption: DecisionOption;
  indicatorsAfter: GameIndicators;
}

export type GameStatus = "start" | "playing" | "feedback" | "victory" | "gameover";

export interface GameState {
  mode: ProjectMode | null;
  status: GameStatus;
  currentRoundIndex: number;
  indicators: GameIndicators;
  lastDeltas: GameIndicators | null;
  lastOutcome: DecisionOption | null;
  failedIndicator: IndicatorKey | null;
  history: DecisionRecord[];
}

export interface ModeConfig {
  id: ProjectMode;
  code: string;
  title: string;
  subtitle: string;
  focus: string;
  initialBudgetUsd: number;
  initialIndicators: GameIndicators;
  accentColor: string;
}

export interface FinalEvaluation {
  totalScore: number;
  grade: "S" | "A" | "B" | "C";
  title: string;
  summary: string;
  strengths: string[];
  improvements: string[];
  decisionBreakdown: {
    round: number;
    area: string;
    feedback: string;
    score: number;
  }[];
}
