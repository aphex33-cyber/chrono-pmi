export type ProjectMode = "private" | "public";

export type DifficultyLevel = 1 | 2 | 3;

export type IndicatorKey = "budget" | "schedule" | "morale" | "stakeholders";

export type PmbokDomain =
  | "Principios y Valor"
  | "Gobernanza y Cambios"
  | "Alcance y EDT"
  | "Cronograma y Línea Base"
  | "Finanzas y Valor Ganado"
  | "Interesados y Comunicaciones"
  | "Recursos y Liderazgo"
  | "Riesgos y Respuestas"
  | "Enfoque Adaptativo"
  | "Beneficios y Cierre";

export type KnowledgeLevel = "Inicial" | "Intermedio" | "Avanzado";

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
  /** Exact points out of 75 per round (8 rounds * 75 = 600 max) */
  pmiBestPracticeScore: number;
  pmiArea: string;
  pmiFeedback: string;
}

export interface Scenario {
  id: string;
  round: number;
  episodeCode: string;
  pmbokDomain: PmbokDomain;
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
  pmbokDomain: PmbokDomain;
  chosenOption: DecisionOption;
  indicatorsAfter: GameIndicators;
}

export type GameStatus =
  | "start"
  | "pretest"
  | "playing"
  | "feedback"
  | "victory"
  | "gameover"
  | "posttest";

export interface QuizQuestion {
  id: string;
  domain: PmbokDomain;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  bookRef: string;
}

export interface QuizAnswerRecord {
  questionId: string;
  domain: PmbokDomain;
  selectedIndex: number;
  correct: boolean;
}

export interface QuizResult {
  phase: "pre" | "post";
  score: number;
  total: number;
  level: KnowledgeLevel;
  gaps: PmbokDomain[];
  answers: QuizAnswerRecord[];
  completedAt: string;
}

export interface GameState {
  participantName: string;
  workshopCode: string;
  workshopMode: boolean;
  roundTimerSeconds: number | null;
  mode: ProjectMode | null;
  level: DifficultyLevel;
  status: GameStatus;
  currentRoundIndex: number;
  indicators: GameIndicators;
  lastDeltas: GameIndicators | null;
  lastOutcome: DecisionOption | null;
  failedIndicator: IndicatorKey | null;
  history: DecisionRecord[];
  activeScenarios: Scenario[];
  preTestQuestions: QuizQuestion[];
  postTestQuestions: QuizQuestion[];
  preTestResult: QuizResult | null;
  postTestResult: QuizResult | null;
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

export interface VariableImpactReport {
  key: IndicatorKey;
  label: string;
  initialValue: number;
  finalValue: number;
  netDelta: number;
  assessment: string;
  keyDrivers: { round: number; label: string; delta: number }[];
}

export interface FinalEvaluation {
  decisionPointsTotal: number;
  decisionPointsMax: number;
  indicatorHealthTotal: number;
  indicatorHealthMax: number;
  totalScore: number;
  grade: "S" | "A" | "B" | "C";
  title: string;
  summary: string;
  strengths: string[];
  improvements: string[];
  variableImpacts: VariableImpactReport[];
  decisionBreakdown: {
    round: number;
    scenarioTitle: string;
    domain: PmbokDomain;
    area: string;
    feedback: string;
    score: number;
    maxScore: number;
  }[];
}

export interface LeaderboardEntry {
  id: string;
  participantName: string;
  workshopCode: string;
  mode: ProjectMode;
  level: DifficultyLevel;
  status: "victory" | "gameover";
  simulationScore: number;
  grade: "S" | "A" | "B" | "C" | "F";
  preTestScore: number | null;
  preTestLevel: KnowledgeLevel | null;
  postTestScore: number | null;
  gapsDetected: PmbokDomain[];
  gapsClosed: number | null;
  totalGaps: number | null;
  indicators: GameIndicators;
  playedAt: string;
}

export interface WorkshopAnalytics {
  totalRuns: number;
  avgSimulationScore: number;
  avgPreTest: number | null;
  avgPostTest: number | null;
  topGaps: { domain: PmbokDomain; count: number; pct: number }[];
}
