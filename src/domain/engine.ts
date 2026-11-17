import { LEVEL_CONFIGS, MODE_CONFIGS, PRIVATE_SCENARIOS, PUBLIC_SCENARIOS } from "./scenarios";
import { PRIVATE_EXTRA_SCENARIOS, PUBLIC_EXTRA_SCENARIOS } from "./scenariosExtra";
import { PRIVATE_LEVEL2_SCENARIOS, PUBLIC_LEVEL2_SCENARIOS } from "./scenariosLevel2";
import { PRIVATE_LEVEL3_SCENARIOS, PUBLIC_LEVEL3_SCENARIOS } from "./scenariosLevel3";
import {
  DecisionOption,
  DifficultyLevel,
  FinalEvaluation,
  GameIndicators,
  GameState,
  IndicatorKey,
  LeaderboardEntry,
  PmbokDomain,
  ProjectMode,
  Scenario,
  VariableImpactReport,
  WorkshopAnalytics,
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

export function getScenariosForMode(
  mode: ProjectMode,
  level: DifficultyLevel = 1
): Scenario[] {
  if (level === 2) {
    return mode === "private" ? PRIVATE_LEVEL2_SCENARIOS : PUBLIC_LEVEL2_SCENARIOS;
  }
  if (level === 3) {
    return mode === "private" ? PRIVATE_LEVEL3_SCENARIOS : PUBLIC_LEVEL3_SCENARIOS;
  }
  return mode === "private" ? PRIVATE_SCENARIOS : PUBLIC_SCENARIOS;
}

function seededShuffleScenarios<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let s = seed >>> 0;
  const nextRand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(nextRand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function selectArenaScenariosForRun(
  mode: ProjectMode,
  level: DifficultyLevel = 1,
  gaps: PmbokDomain[] = [],
  seed = Date.now()
): Scenario[] {
  if (level === 3) {
    // Level 3 is a chronological end-to-end project (Inicio -> Cierre)
    return getScenariosForMode(mode, 3);
  }

  const base = getScenariosForMode(mode, level);
  const extra = mode === "private" ? PRIVATE_EXTRA_SCENARIOS : PUBLIC_EXTRA_SCENARIOS;
  const pool = [...base, ...extra];
  const gapSet = new Set(gaps);

  const gapMatches = seededShuffleScenarios(
    pool.filter((s) => gapSet.has(s.pmbokDomain)),
    seed + 11
  );
  const nonMatches = seededShuffleScenarios(
    pool.filter((s) => !gapSet.has(s.pmbokDomain)),
    seed + 29
  );

  // Prioritize gap-targeted scenarios, then fill remaining rounds randomly
  const combined = [...gapMatches, ...nonMatches].slice(0, TOTAL_ROUNDS);
  const finalOrder =
    gaps.length > 0 ? combined : seededShuffleScenarios(combined, seed + 53);

  return finalOrder.map((sc, idx) => ({
    ...sc,
    round: idx + 1,
  }));
}

export function createInitialGameState(
  mode: ProjectMode | null = null,
  participantName = "",
  workshopCode = "",
  workshopMode = false,
  roundTimerSeconds: number | null = null,
  level: DifficultyLevel = 1
): GameState {
  const initialIndicators: GameIndicators = {
    ...LEVEL_CONFIGS[level].initialIndicators,
  };

  return {
    participantName,
    workshopCode,
    workshopMode,
    roundTimerSeconds,
    mode,
    level,
    status: mode ? "playing" : "start",
    currentRoundIndex: 0,
    indicators: initialIndicators,
    lastDeltas: null,
    lastOutcome: null,
    failedIndicator: null,
    history: [],
    activeScenarios: mode ? selectArenaScenariosForRun(mode, level) : [],
    preTestQuestions: [],
    postTestQuestions: [],
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

  const initialIndicators: GameIndicators = LEVEL_CONFIGS[state.level].initialIndicators;

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

export function computeWorkshopAnalytics(
  entries: LeaderboardEntry[],
  workshopCode?: string
): WorkshopAnalytics {
  const normalizedCode = workshopCode?.trim().toUpperCase() ?? "";
  const filtered = normalizedCode
    ? entries.filter(
        (e) => (e.workshopCode || "").trim().toUpperCase() === normalizedCode
      )
    : entries;

  const totalRuns = filtered.length;
  if (totalRuns === 0) {
    return {
      totalRuns: 0,
      avgSimulationScore: 0,
      avgPreTest: null,
      avgPostTest: null,
      topGaps: [],
    };
  }

  const avgSimulationScore = Math.round(
    filtered.reduce((sum, e) => sum + e.simulationScore, 0) / totalRuns
  );

  const preEntries = filtered.filter((e) => e.preTestScore !== null);
  const avgPreTest =
    preEntries.length > 0
      ? Number(
          (
            preEntries.reduce((sum, e) => sum + (e.preTestScore ?? 0), 0) /
            preEntries.length
          ).toFixed(1)
        )
      : null;

  const postEntries = filtered.filter((e) => e.postTestScore !== null);
  const avgPostTest =
    postEntries.length > 0
      ? Number(
          (
            postEntries.reduce((sum, e) => sum + (e.postTestScore ?? 0), 0) /
            postEntries.length
          ).toFixed(1)
        )
      : null;

  const gapCounts = new Map<PmbokDomain, number>();
  for (const entry of preEntries) {
    for (const domain of entry.gapsDetected ?? []) {
      gapCounts.set(domain, (gapCounts.get(domain) ?? 0) + 1);
    }
  }

  const topGaps = Array.from(gapCounts.entries())
    .map(([domain, count]) => ({
      domain,
      count,
      pct: Math.round((count / preEntries.length) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalRuns,
    avgSimulationScore,
    avgPreTest,
    avgPostTest,
    topGaps,
  };
}
