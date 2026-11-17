import { MISSION_EVENTS, MISSION_STAGES } from "./missionData";
import {
  MissionDecisionOption,
  MissionEventOption,
  MissionEvmSummary,
  MissionFinalScore,
  MissionMetrics,
  MissionStageNumber,
  MissionState,
} from "./missionTypes";

function clamp(v: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, Math.round(v)));
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let s = seed >>> 0;
  const nextRand = () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(nextRand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function createInitialMissionState(
  seed = 2045,
  directorName = "Director SELENE"
): MissionState {
  const defaultDocs: Record<string, string> = {};
  const defaultChecks: Record<string, boolean> = {};
  for (const stage of MISSION_STAGES) {
    for (const f of stage.docFields) {
      defaultDocs[f.key] = f.defaultValue;
    }
    for (const item of stage.deliverablesChecklist) {
      defaultChecks[`${stage.stage}:${item}`] = false;
    }
  }

  const shuffledEvents = seededShuffle(MISSION_EVENTS, seed);

  return {
    seed,
    directorName,
    currentStage: 1,
    stageStep: "briefing",
    status: "in_progress",
    abortReason: null,
    metrics: {
      bacMillion: 500,
      pvMillion: 0,
      evMillion: 0,
      acMillion: 0,
      contingencyReserveMillion: 40,
      managementReserveMillion: 20,
      horizonMonths: 36,
      elapsedMonths: 0,
      forecastMonths: 36,
      safety: 85,
      quality: 85,
      value: 80,
      sustainability: 80,
      stakeholderTrust: 80,
      teamMorale: 85,
      criticalSafetyViolation: false,
      criticalSafetyReason: null,
    },
    docs: defaultDocs,
    checkedDeliverables: defaultChecks,
    activeEvent: null,
    lastFeedback: null,
    persistentModifiers: [],
    decisionScoreSum: 0,
    logs: [],
    eventDeckIds: shuffledEvents.map((e) => e.id),
  };
}

export function computeMissionEvm(m: MissionMetrics): MissionEvmSummary {
  const ac = Math.max(1, m.acMillion);
  const pv = Math.max(1, m.pvMillion);
  const cpi = m.acMillion === 0 ? 1 : Number((m.evMillion / ac).toFixed(2));
  const spi = m.pvMillion === 0 ? 1 : Number((m.evMillion / pv).toFixed(2));
  const safeCpi = Math.max(0.4, cpi);
  const eacMillion =
    m.acMillion === 0 ? m.bacMillion : Math.round(m.bacMillion / safeCpi);
  const vacMillion = m.bacMillion - eacMillion;
  const cvMillion = m.evMillion - m.acMillion;
  const svMillion = m.evMillion - m.pvMillion;
  return { cpi, spi, eacMillion, vacMillion, cvMillion, svMillion };
}

export function canAuthorizeGoLaunch(metrics: MissionMetrics): {
  allowed: boolean;
  blockers: string[];
} {
  const blockers: string[] = [];
  if (metrics.criticalSafetyViolation) {
    blockers.push(
      metrics.criticalSafetyReason ||
        "Infracción crítica de seguridad abierta (CIS)."
    );
  }
  if (metrics.safety < 65) {
    blockers.push(
      `Índice de Seguridad insuficiente (${metrics.safety}/100, mínimo requerido: 65).`
    );
  }
  if (metrics.quality < 65) {
    blockers.push(
      `Índice de Calidad insuficiente (${metrics.quality}/100, mínimo requerido: 65).`
    );
  }
  return { allowed: blockers.length === 0, blockers };
}

const STAGE_PV_INCREMENT: Record<MissionStageNumber, number> = {
  1: 50,
  2: 70,
  3: 125,
  4: 140,
  5: 75,
  6: 40,
};

export function applyMissionDecision(
  state: MissionState,
  option: MissionDecisionOption
): MissionState {
  if (state.status !== "in_progress" || state.stageStep !== "briefing") {
    return state;
  }

  // Hard Gate in Stage 5: cannot authorize GO if critical safety violation or low safety/quality
  if (state.currentStage === 5 && option.id === "m-s5-a") {
    const gate = canAuthorizeGoLaunch(state.metrics);
    if (!gate.allowed) {
      return {
        ...state,
        lastFeedback: `LANZAMIENTO BLOQUEADO POR CIS/ARLI: ${gate.blockers.join(" ")} Ningún ahorro financiero compensa una infracción crítica de seguridad.`,
      };
    }
  }

  const m = state.metrics;
  const pvInc = STAGE_PV_INCREMENT[state.currentStage];
  const nextAc = m.acMillion + option.costDeltaMillion;
  const nextEv = m.evMillion + option.evDeltaMillion;
  const nextElapsed = m.elapsedMonths + option.monthsDelta;
  const reserveDrop = option.reserveUseMillion ?? 0;

  let nextSafetyViolation = m.criticalSafetyViolation;
  let nextSafetyReason = m.criticalSafetyReason;
  if (option.resolvesSafetyViolation) {
    nextSafetyViolation = false;
    nextSafetyReason = null;
  }
  if (option.createsSafetyViolation) {
    nextSafetyViolation = true;
    nextSafetyReason = option.createsSafetyViolation;
  }

  const nextMetrics: MissionMetrics = {
    ...m,
    pvMillion: Math.min(m.bacMillion, m.pvMillion + pvInc),
    evMillion: Math.min(m.bacMillion, nextEv),
    acMillion: nextAc,
    contingencyReserveMillion: Math.max(
      0,
      m.contingencyReserveMillion - reserveDrop
    ),
    elapsedMonths: nextElapsed,
    forecastMonths: Math.max(m.horizonMonths, nextElapsed + (6 - state.currentStage) * 5),
    safety: clamp(m.safety + option.safetyDelta),
    quality: clamp(m.quality + option.qualityDelta),
    value: clamp(m.value + option.valueDelta),
    sustainability: clamp(m.sustainability + option.sustainabilityDelta),
    stakeholderTrust: clamp(m.stakeholderTrust + option.trustDelta),
    teamMorale: clamp(m.teamMorale + option.moraleDelta),
    criticalSafetyViolation: nextSafetyViolation,
    criticalSafetyReason: nextSafetyReason,
  };

  // Check justified abort in Stage 5
  if (state.currentStage === 5 && option.id === "m-s5-c") {
    return {
      ...state,
      metrics: nextMetrics,
      status: "justified_abort",
      abortReason:
        "Decisión NO-GO responsable: el Director de Proyecto detuvo el lanzamiento antes de comprometer seguridad o viabilidad financiera.",
      lastFeedback: option.feedback,
      decisionScoreSum: state.decisionScoreSum + option.scorePoints,
      logs: [
        ...state.logs,
        {
          stage: 5,
          kind: "gate",
          title: "Compuerta Go / No-Go",
          choiceLabel: option.label,
          impactSummary: `AC $${nextAc}M | Seguridad ${nextMetrics.safety}%`,
          feedback: option.feedback,
        },
      ],
    };
  }

  // Check catastrophic collapse
  if (nextMetrics.safety <= 15 || nextMetrics.stakeholderTrust <= 10 || nextAc > 650) {
    return {
      ...state,
      metrics: nextMetrics,
      status: "failure",
      abortReason:
        nextAc > 650
          ? "Colapso financiero: el costo acumulado superó el límite de rescate del Consorcio ($650M)."
          : "Colapso de gobernanza o seguridad: el Consejo CIS/ARLI revocó la autorización de la misión.",
      lastFeedback: option.feedback,
      decisionScoreSum: state.decisionScoreSum + option.scorePoints,
      logs: [
        ...state.logs,
        {
          stage: state.currentStage,
          kind: "decision",
          title: `Etapa ${state.currentStage}`,
          choiceLabel: option.label,
          impactSummary: `AC $${nextAc}M | Seg ${nextMetrics.safety}%`,
          feedback: option.feedback,
        },
      ],
    };
  }

  // Stage 6 completes the mission!
  if (state.currentStage === 6) {
    return {
      ...state,
      metrics: nextMetrics,
      status: "success",
      lastFeedback: option.feedback,
      decisionScoreSum: state.decisionScoreSum + option.scorePoints,
      logs: [
        ...state.logs,
        {
          stage: 6,
          kind: "decision",
          title: "Cierre de Misión",
          choiceLabel: option.label,
          impactSummary: `AC $${nextAc}M | Valor ${nextMetrics.value}%`,
          feedback: option.feedback,
        },
      ],
    };
  }

  // Pick next event from seeded deck for stages 1..5
  const eventId = state.eventDeckIds[state.currentStage - 1];
  const nextEvent =
    MISSION_EVENTS.find((e) => e.id === eventId) ?? MISSION_EVENTS[0];

  return {
    ...state,
    metrics: nextMetrics,
    stageStep: "event",
    activeEvent: nextEvent,
    lastFeedback: option.feedback,
    decisionScoreSum: state.decisionScoreSum + option.scorePoints,
    logs: [
      ...state.logs,
      {
        stage: state.currentStage,
        kind: "decision",
        title: `Etapa ${state.currentStage} (${option.pmbokArea})`,
        choiceLabel: option.label,
        impactSummary: `AC +$${option.costDeltaMillion}M | EV +$${option.evDeltaMillion}M | +${option.monthsDelta}m`,
        feedback: option.feedback,
      },
    ],
  };
}

export function applyMissionEventChoice(
  state: MissionState,
  eventOption: MissionEventOption
): MissionState {
  if (!state.activeEvent || state.stageStep !== "event") return state;

  const m = state.metrics;
  const nextAc = m.acMillion + eventOption.costDeltaMillion;
  const nextElapsed = m.elapsedMonths + eventOption.monthsDelta;

  let nextSafetyViolation = m.criticalSafetyViolation;
  let nextSafetyReason = m.criticalSafetyReason;
  if (eventOption.resolvesSafetyViolation) {
    nextSafetyViolation = false;
    nextSafetyReason = null;
  }
  if (eventOption.createsSafetyViolation) {
    nextSafetyViolation = true;
    nextSafetyReason = eventOption.createsSafetyViolation;
  }

  const nextMetrics: MissionMetrics = {
    ...m,
    acMillion: nextAc,
    elapsedMonths: nextElapsed,
    forecastMonths: Math.max(
      m.horizonMonths,
      nextElapsed + (6 - state.currentStage) * 5
    ),
    safety: clamp(m.safety + eventOption.safetyDelta),
    quality: clamp(m.quality + eventOption.qualityDelta),
    value: clamp(m.value + eventOption.valueDelta),
    sustainability: clamp(m.sustainability + eventOption.sustainabilityDelta),
    stakeholderTrust: clamp(m.stakeholderTrust + eventOption.trustDelta),
    teamMorale: clamp(m.teamMorale + eventOption.moraleDelta),
    criticalSafetyViolation: nextSafetyViolation,
    criticalSafetyReason: nextSafetyReason,
  };

  const nextModifiers = eventOption.persistsModifier
    ? [...state.persistentModifiers, eventOption.persistsModifier]
    : state.persistentModifiers;

  return {
    ...state,
    metrics: nextMetrics,
    stageStep: "stage_done",
    activeEvent: null,
    lastFeedback: eventOption.feedback,
    persistentModifiers: nextModifiers,
    logs: [
      ...state.logs,
      {
        stage: state.currentStage,
        kind: "event",
        title: state.activeEvent.title,
        choiceLabel: eventOption.label,
        impactSummary: `AC +$${eventOption.costDeltaMillion}M | +${eventOption.monthsDelta}m`,
        feedback: eventOption.feedback,
      },
    ],
  };
}

export function advanceMissionStage(state: MissionState): MissionState {
  if (state.stageStep !== "stage_done" || state.currentStage >= 6) {
    return state;
  }
  return {
    ...state,
    currentStage: (state.currentStage + 1) as MissionStageNumber,
    stageStep: "briefing",
    lastFeedback: null,
  };
}

export function evaluateMissionFinalScore(state: MissionState): MissionFinalScore {
  const m = state.metrics;
  const evm = computeMissionEvm(m);

  // Cost score (0..100): 100 if <= 500M, penalized proportionally above 500M
  const costOverrunRatio = Math.max(0, (m.acMillion - m.bacMillion) / m.bacMillion);
  const costScore = clamp(100 - costOverrunRatio * 200);

  // Time score (0..100): 100 if <= 36m, penalized per month over 36
  const monthsOver = Math.max(0, m.elapsedMonths - m.horizonMonths);
  const timeScore = clamp(100 - monthsOver * 12);

  // Documentation / Governance readiness bonus
  const totalChecks = Object.keys(state.checkedDeliverables).length || 1;
  const checkedCount = Object.values(state.checkedDeliverables).filter(Boolean).length;
  const docReadiness = Math.round((checkedCount / totalChecks) * 100);

  const dimensions = [
    {
      label: "Valor Científico y Comercial",
      score: m.value,
      detail: `Retorno y alineación al Caso de Negocios (${m.value}/100).`,
    },
    {
      label: "Seguridad Operacional (CIS)",
      score: m.safety,
      detail: m.criticalSafetyViolation
        ? "Infracción crítica sin resolver."
        : `Estándares CIS cumplidos (${m.safety}/100).`,
    },
    {
      label: "Calidad Técnica",
      score: m.quality,
      detail: `Verificación V&V y entregables (${m.quality}/100).`,
    },
    {
      label: "Desempeño de Costo (BAC $500M)",
      score: costScore,
      detail: `AC $${m.acMillion}M | CPI ${evm.cpi} | EAC $${evm.eacMillion}M.`,
    },
    {
      label: "Desempeño de Tiempo (36m)",
      score: timeScore,
      detail: `Duración ${m.elapsedMonths}m / ${m.horizonMonths}m | SPI ${evm.spi}.`,
    },
    {
      label: "Sostenibilidad y Gobernanza",
      score: Math.round((m.sustainability + docReadiness) / 2),
      detail: `Sostenibilidad ${m.sustainability}/100 | Checklist documental ${docReadiness}%.`,
    },
  ];

  const overallScore = Math.round(
    dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  );

  let grade: MissionFinalScore["grade"] = "C";
  let verdictTitle = "Misión Completada con Observaciones";
  let verdictSummary =
    "La misión alcanzó el cierre, aunque desviaciones de costo, plazo o gobernanza redujeron el valor neto.";

  if (state.status === "justified_abort") {
    grade = overallScore >= 70 ? "B" : "C";
    verdictTitle = "Detención Ética Justificada (NO-GO Responsable)";
    verdictSummary =
      "Evitaste un lanzamiento inseguro o financieramente inviable. En dirección de proyectos profesional, cancelar a tiempo protege vidas, reputación y capital.";
  } else if (state.status === "failure") {
    grade = "F";
    verdictTitle = "Misión Colapsada";
    verdictSummary =
      state.abortReason || "La misión perdió viabilidad técnica, financiera o de seguridad.";
  } else if (overallScore >= 88) {
    grade = "S";
    verdictTitle = "Comandante Lunar Legendario // SELENE-2045";
    verdictSummary =
      "Aterrizaje exitoso con excelencia en las 6 dimensiones: Valor, Seguridad, Calidad, Costo, Tiempo y Sostenibilidad.";
  } else if (overallScore >= 76) {
    grade = "A";
    verdictTitle = "Director de Programa Aeroespacial Senior";
    verdictSummary =
      "Sólida conducción del ciclo completo (Iniciación a Cierre) controlando EVM, riesgos y compuerta Go/No-Go.";
  } else if (overallScore >= 64) {
    grade = "B";
    verdictTitle = "Gestor de Misión Resiliente";
    verdictSummary =
      "Superaste eventos complejos y completaste la misión, con oportunidades de mejora en reservas o cronograma.";
  }

  return { overallScore, grade, verdictTitle, verdictSummary, dimensions };
}
