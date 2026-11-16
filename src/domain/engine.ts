import { MODE_CONFIGS, PRIVATE_SCENARIOS, PUBLIC_SCENARIOS } from "./scenarios";
import {
  DecisionOption,
  FinalEvaluation,
  GameIndicators,
  GameState,
  IndicatorKey,
  ProjectMode,
  Scenario,
} from "./types";

export const TOTAL_ROUNDS = 5;

const INDICATOR_ORDER: IndicatorKey[] = [
  "budget",
  "schedule",
  "morale",
  "stakeholders",
];

export const INDICATOR_LABELS: Record<IndicatorKey, string> = {
  budget: "Presupuesto ($)",
  schedule: "Cronograma / Tiempo (%)",
  morale: "Moral del Equipo (%)",
  stakeholders: "Satisfacción Stakeholders (%)",
};

export function clampIndicator(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function getScenariosForMode(mode: ProjectMode): Scenario[] {
  return mode === "private" ? PRIVATE_SCENARIOS : PUBLIC_SCENARIOS;
}

export function createInitialGameState(mode: ProjectMode | null = null): GameState {
  const initialIndicators: GameIndicators = mode
    ? { ...MODE_CONFIGS[mode].initialIndicators }
    : { budget: 80, schedule: 80, morale: 80, stakeholders: 80 };

  return {
    mode,
    status: mode ? "playing" : "start",
    currentRoundIndex: 0,
    indicators: initialIndicators,
    lastDeltas: null,
    lastOutcome: null,
    failedIndicator: null,
    history: [],
  };
}

export function findFailedIndicator(
  indicators: GameIndicators
): IndicatorKey | null {
  for (const key of INDICATOR_ORDER) {
    if (indicators[key] <= 0) {
      return key;
    }
  }
  return null;
}

export function applyDecisionToState(
  state: GameState,
  option: DecisionOption,
  scenarioTitle: string
): GameState {
  if (!state.mode || state.status !== "playing") {
    return state;
  }

  const nextIndicators: GameIndicators = {
    budget: clampIndicator(state.indicators.budget + option.deltas.budget),
    schedule: clampIndicator(state.indicators.schedule + option.deltas.schedule),
    morale: clampIndicator(state.indicators.morale + option.deltas.morale),
    stakeholders: clampIndicator(
      state.indicators.stakeholders + option.deltas.stakeholders
    ),
  };

  const failed = findFailedIndicator(nextIndicators);
  const record = {
    round: state.currentRoundIndex + 1,
    scenarioTitle,
    chosenOption: option,
    indicatorsAfter: nextIndicators,
  };

  return {
    ...state,
    indicators: nextIndicators,
    lastDeltas: option.deltas,
    lastOutcome: option,
    failedIndicator: failed,
    status: failed ? "gameover" : "feedback",
    history: [...state.history, record],
  };
}

export function advanceFromFeedback(state: GameState): GameState {
  if (state.status !== "feedback") {
    return state;
  }

  const nextRoundIndex = state.currentRoundIndex + 1;
  if (nextRoundIndex >= TOTAL_ROUNDS) {
    return {
      ...state,
      status: "victory",
    };
  }

  return {
    ...state,
    currentRoundIndex: nextRoundIndex,
    status: "playing",
    lastOutcome: null,
    lastDeltas: null,
  };
}

export function formatBudgetUsd(
  budgetPercent: number,
  mode: ProjectMode
): string {
  const maxUsd = MODE_CONFIGS[mode].initialBudgetUsd;
  const currentUsd = Math.round((budgetPercent / 100) * maxUsd);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(currentUsd);
}

export function evaluatePerformance(state: GameState): FinalEvaluation {
  const pmiRaw = state.history.reduce(
    (sum, item) => sum + item.chosenOption.pmiBestPracticeScore,
    0
  ); // Max 100 across 5 rounds

  const avgIndicators =
    (state.indicators.budget +
      state.indicators.schedule +
      state.indicators.morale +
      state.indicators.stakeholders) /
    4;

  // Weighted score on 1000-point scale: 60% PMI best practices, 40% final HUD health
  const totalScore = Math.round(pmiRaw * 6 + avgIndicators * 4);

  let grade: "S" | "A" | "B" | "C" = "C";
  let title = "Superviviente Táctico";
  let summary =
    "Lograste entregar el proyecto dentro de los límites mínimos, aunque varias decisiones reactivas dejaron margen de mejora en gobernanza y equilibrio.";

  if (totalScore >= 860) {
    grade = "S";
    title = "Comandante PMO Legendario";
    summary =
      "Dominio sobresaliente de la triple restricción, liderazgo servicial y gestión proactiva de riesgos e interesados bajo presión extrema.";
  } else if (totalScore >= 740) {
    grade = "A";
    title = "Director de Proyecto Senior";
    summary =
      "Sólida aplicación de estándares PMI/PMBOK: protegiste el valor del negocio manteniendo cohesión del equipo y transparencia con patrocinadores.";
  } else if (totalScore >= 600) {
    grade = "B";
    title = "Gestor Operativo Resiliente";
    summary =
      "Completaste las 5 fases sorteando crisis críticas, pero algunas concesiones tácticas presionaron indicadores clave en la recta final.";
  }

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (state.indicators.budget >= 60) {
    strengths.push("Control financiero disciplinado y uso efectivo de reservas.");
  } else {
    improvements.push(
      "Reforzar la gestión de costos y reservas de contingencia ante imprevistos."
    );
  }

  if (state.indicators.schedule >= 60) {
    strengths.push("Protección consistente de hitos críticos y ruta de entrega.");
  } else {
    improvements.push(
      "Aplicar técnicas de compresión o entrega incremental para proteger plazos."
    );
  }

  if (state.indicators.morale >= 60) {
    strengths.push("Liderazgo sostenible que preservó la moral del equipo.");
  } else {
    improvements.push(
      "Priorizar el ritmo sostenible y liderazgo servicial para evitar burnout."
    );
  }

  if (state.indicators.stakeholders >= 60) {
    strengths.push(
      "Comunicación transparente y alineación con patrocinadores/comunidad."
    );
  } else {
    improvements.push(
      "Involucrar tempranamente a interesados clave y formalizar el control de cambios."
    );
  }

  const decisionBreakdown = state.history.map((item) => ({
    round: item.round,
    area: item.chosenOption.pmiArea,
    feedback: item.chosenOption.pmiFeedback,
    score: item.chosenOption.pmiBestPracticeScore,
  }));

  return {
    totalScore,
    grade,
    title,
    summary,
    strengths,
    improvements,
    decisionBreakdown,
  };
}
