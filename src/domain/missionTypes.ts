export type MissionStageNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type MissionEventType =
  | "proveedor_atrasado"
  | "defecto"
  | "cambio_alcance"
  | "rotacion"
  | "inflacion"
  | "conflicto"
  | "recurso_escaso"
  | "solicitud_sponsor"
  | "amenaza_regulatoria"
  | "oportunidad_tecnologica"
  | "clima"
  | "hallazgo_seguridad";

export interface MissionMetrics {
  bacMillion: number; // 500
  pvMillion: number;
  evMillion: number;
  acMillion: number;
  contingencyReserveMillion: number;
  managementReserveMillion: number;
  horizonMonths: number; // 36
  elapsedMonths: number;
  forecastMonths: number;
  safety: number; // 0..100
  quality: number; // 0..100
  value: number; // 0..100
  sustainability: number; // 0..100
  stakeholderTrust: number; // 0..100
  teamMorale: number; // 0..100
  criticalSafetyViolation: boolean;
  criticalSafetyReason: string | null;
}

export interface MissionEvmSummary {
  cpi: number;
  spi: number;
  eacMillion: number;
  vacMillion: number;
  cvMillion: number;
  svMillion: number;
}

export interface MissionDecisionOption {
  id: string;
  code: "A" | "B" | "C";
  label: string;
  description: string;
  pmbokArea: string;
  feedback: string;
  costDeltaMillion: number;
  evDeltaMillion: number;
  monthsDelta: number;
  reserveUseMillion?: number;
  safetyDelta: number;
  qualityDelta: number;
  valueDelta: number;
  sustainabilityDelta: number;
  trustDelta: number;
  moraleDelta: number;
  resolvesSafetyViolation?: boolean;
  createsSafetyViolation?: string;
  scorePoints: number; // 0..100
}

export interface MissionEventOption {
  id: string;
  label: string;
  description: string;
  feedback: string;
  costDeltaMillion: number;
  monthsDelta: number;
  safetyDelta: number;
  qualityDelta: number;
  valueDelta: number;
  sustainabilityDelta: number;
  trustDelta: number;
  moraleDelta: number;
  persistsModifier?: string;
  resolvesSafetyViolation?: boolean;
  createsSafetyViolation?: string;
}

export interface MissionEvent {
  id: string;
  type: MissionEventType;
  title: string;
  actor: string;
  description: string;
  persistentEffectNote: string;
  options: [MissionEventOption, MissionEventOption];
}

export interface MissionDocField {
  key: string;
  label: string;
  placeholder: string;
  defaultValue: string;
}

export interface MissionStageConfig {
  stage: MissionStageNumber;
  code: string;
  title: string;
  pmbokFocus: string;
  objectives: string[];
  deliverablesChecklist: string[];
  docFields: MissionDocField[];
  calculationLabel: string;
  decisions: [MissionDecisionOption, MissionDecisionOption, MissionDecisionOption];
}

export interface MissionLogEntry {
  stage: MissionStageNumber;
  kind: "decision" | "event" | "gate";
  title: string;
  choiceLabel: string;
  impactSummary: string;
  feedback: string;
}

export type MissionOutcomeStatus =
  | "in_progress"
  | "success"
  | "justified_abort"
  | "failure";

export interface MissionFinalScore {
  overallScore: number; // 0..100
  grade: "S" | "A" | "B" | "C" | "F";
  verdictTitle: string;
  verdictSummary: string;
  dimensions: {
    label: string;
    score: number;
    detail: string;
  }[];
}

export interface MissionState {
  seed: number;
  directorName: string;
  currentStage: MissionStageNumber;
  stageStep: "briefing" | "event" | "stage_done";
  status: MissionOutcomeStatus;
  abortReason: string | null;
  metrics: MissionMetrics;
  docs: Record<string, string>;
  checkedDeliverables: Record<string, boolean>;
  activeEvent: MissionEvent | null;
  lastFeedback: string | null;
  persistentModifiers: string[];
  decisionScoreSum: number;
  logs: MissionLogEntry[];
  eventDeckIds: string[];
}
