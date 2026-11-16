import { MODE_CONFIGS, PRIVATE_SCENARIOS, PUBLIC_SCENARIOS } from "./scenarios";
import {
  DecisionOption,
  FinalEvaluation,
  GameIndicators,
  GameState,
  IndicatorKey,
  ProjectMode,
  Scenario,
  VariableImpactReport,
} from "./types";

export const TOTAL_ROUNDS = 8;
export const MAX_ROUND_DECISION_SCORE = 75; // 8 rounds * 75 = 600 pts max
export const MAX_INDICATOR_HEALTH_SCORE = 400; // 4 indicators * 100 = 400 pts max

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

export function createInitialGameState(
  mode: ProjectMode | null = null,
  participantName = ""
): GameState {
  const initialIndicators: GameIndicators = mode
    ? { ...MODE_CONFIGS[mode].initialIndicators }
    : { budget: 80, schedule: 80, morale: 80, stakeholders: 80 };

  return {
    participantName,
    mode,
    status: mode ? "playing" : "start",
    currentRoundIndex: 0,
    indicators: initialIndicators,
    lastDeltas: null,
    lastOutcome: null,
    failedIndicator: null,
    history: [],
    preTestResult: null,
    postTestResult: null,
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
  scenario: Scenario
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
    scenarioTitle: scenario.title,
    pmbokDomain: scenario.pmbokDomain,
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

function buildVariableImpactReport(
  key: IndicatorKey,
  initialValue: number,
  finalValue: number,
  history: GameState["history"]
): VariableImpactReport {
  const netDelta = finalValue - initialValue;
  const drivers = history
    .map((h) => ({
      round: h.round,
      label: h.chosenOption.label,
      delta: h.chosenOption.deltas[key],
    }))
    .filter((d) => d.delta !== 0)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
    .slice(0, 3);

  let assessment = "";
  if (key === "budget") {
    if (finalValue >= 75) {
      assessment =
        "Disciplina financiera sobresaliente: el uso controlado de reservas y control de cambios mantuvo la línea base de costos saludable.";
    } else if (finalValue >= 50) {
      assessment =
        "Estabilidad presupuestaria moderada: hubo concesiones tácticas de gasto para proteger plazos o mitigar riesgos críticos.";
    } else {
      assessment =
        "Presión severa de caja: decisiones reactivas o rescates de emergencia erosionaron significativamente las reservas financieras.";
    }
  } else if (key === "schedule") {
    if (finalValue >= 75) {
      assessment =
        "Ruta crítica protegida: la línea base y la priorización incremental evitaron desviaciones acumulativas de plazo.";
    } else if (finalValue >= 50) {
      assessment =
        "Cronograma ajustado: algunas paradas de gobernanza o mitigaciones consumieron holgura, pero se cumplió la entrega.";
    } else {
      assessment =
        "Alto riesgo de retraso: la falta de línea base oportuna o retrabajos redujeron drásticamente el margen de tiempo.";
    }
  } else if (key === "morale") {
    if (finalValue >= 75) {
      assessment =
        "Liderazgo servicial efectivo: se preservó el ritmo sostenible, la seguridad psicológica y el compromiso técnico.";
    } else if (finalValue >= 50) {
      assessment =
        "Desgaste controlado: episodios de presión táctica afectaron al equipo, aunque se contuvo el burnout.";
    } else {
      assessment =
        "Fatiga crítica del equipo: exceso de crunch o falta de respaldo de gobernanza deterioraron la capacidad productiva.";
    }
  } else {
    if (finalValue >= 75) {
      assessment =
        "Alineación estratégica sólida: la comunicación transparente y la gestión formal de expectativas consolidaron la confianza.";
    } else if (finalValue >= 50) {
      assessment =
        "Relación funcional con fricciones: poner límites formales ante presiones externas generó tensión temporal pero protegió el proyecto.";
    } else {
      assessment =
        "Brecha de confianza con interesados: faltó involucramiento temprano o conexión clara entre entregables e impacto.";
    }
  }

  return {
    key,
    label: INDICATOR_LABELS[key],
    initialValue,
    finalValue,
    netDelta,
    assessment,
    keyDrivers: drivers,
  };
}

export function evaluatePerformance(state: GameState): FinalEvaluation {
  const decisionBreakdown = state.history.map((item) => ({
    round: item.round,
    scenarioTitle: item.scenarioTitle,
    domain: item.pmbokDomain,
    area: item.chosenOption.pmiArea,
    feedback: item.chosenOption.pmiFeedback,
    score: item.chosenOption.pmiBestPracticeScore,
    maxScore: MAX_ROUND_DECISION_SCORE,
  }));

  // Exact integer sum of the rounds shown in the breakdown (max 600)
  const decisionPointsTotal = decisionBreakdown.reduce(
    (sum, item) => sum + item.score,
    0
  );
  const decisionPointsMax = TOTAL_ROUNDS * MAX_ROUND_DECISION_SCORE;

  // Exact integer sum of the 4 final HUD indicators (max 400)
  const indicatorHealthTotal =
    state.indicators.budget +
    state.indicators.schedule +
    state.indicators.morale +
    state.indicators.stakeholders;
  const indicatorHealthMax = MAX_INDICATOR_HEALTH_SCORE;

  // Exact total out of 1000: decisionPointsTotal (<=600) + indicatorHealthTotal (<=400)
  const totalScore = decisionPointsTotal + indicatorHealthTotal;

  let grade: "S" | "A" | "B" | "C" = "C";
  let title = "Superviviente Táctico";
  let summary =
    "Completaste las 8 rondas dentro de los límites mínimos, aunque varias decisiones reactivas dejaron margen de mejora en gobernanza, valor y equilibrio.";

  if (totalScore >= 860) {
    grade = "S";
    title = "Comandante PMO Legendario";
    summary =
      "Dominio sobresaliente del PMBOK® v8: integraste gobernanza, valor e impactos, liderazgo servicial y control de la triple restricción bajo presión extrema.";
  } else if (totalScore >= 740) {
    grade = "A";
    title = "Director de Proyecto Senior";
    summary =
      "Sólida aplicación de estándares PMBOK® v8: protegiste el valor y los beneficios manteniendo cohesión del equipo y transparencia con interesados.";
  } else if (totalScore >= 600) {
    grade = "B";
    title = "Gestor Operativo Resiliente";
    summary =
      "Sortearon crisis críticas durante las 8 fases, pero algunas concesiones tácticas presionaron indicadores clave en la recta final.";
  }

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (state.indicators.budget >= 65) {
    strengths.push("Control financiero disciplinado y uso efectivo de reservas.");
  } else {
    improvements.push(
      "Reforzar la gestión financiera, partidas presupuestarias y reservas de contingencia."
    );
  }

  if (state.indicators.schedule >= 65) {
    strengths.push("Protección consistente de la línea base y ruta crítica.");
  } else {
    improvements.push(
      "Establecer línea base temprana y aplicar entrega incremental para proteger plazos."
    );
  }

  if (state.indicators.morale >= 65) {
    strengths.push("Liderazgo servicial que preservó el ritmo sostenible del equipo.");
  } else {
    improvements.push(
      "Priorizar el ritmo sostenible, límites WIP y liderazgo servicial para evitar burnout."
    );
  }

  if (state.indicators.stakeholders >= 65) {
    strengths.push(
      "Gobernanza transparente y alineación de beneficios con interesados clave."
    );
  } else {
    improvements.push(
      "Involucrar tempranamente a interesados y canalizar cambios vía CCB."
    );
  }

  const initialIndicators: GameIndicators = state.mode
    ? MODE_CONFIGS[state.mode].initialIndicators
    : { budget: 80, schedule: 80, morale: 80, stakeholders: 80 };

  const variableImpacts: VariableImpactReport[] = INDICATOR_ORDER.map((key) =>
    buildVariableImpactReport(
      key,
      initialIndicators[key],
      state.indicators[key],
      state.history
    )
  );

  return {
    decisionPointsTotal,
    decisionPointsMax,
    indicatorHealthTotal,
    indicatorHealthMax,
    totalScore,
    grade,
    title,
    summary,
    strengths,
    improvements,
    variableImpacts,
    decisionBreakdown,
  };
}
