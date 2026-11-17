import { DifficultyLevel, GameIndicators, ModeConfig, ProjectMode, Scenario } from "./types";

export interface LevelConfig {
  level: DifficultyLevel;
  badge: string;
  title: string;
  shortDesc: string;
  initialIndicators: GameIndicators;
}

export const LEVEL_CONFIGS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    badge: "NIVEL 1",
    title: "Fundamentos PMBOK",
    shortDesc: "8 crisis tácticas esenciales (Ideal para iniciar).",
    initialIndicators: { budget: 80, schedule: 80, morale: 80, stakeholders: 80 },
  },
  2: {
    level: 2,
    badge: "NIVEL 2",
    title: "Táctico Avanzado",
    shortDesc: "8 casos difíciles: EVM, contratos, ruta crítica y conflictos.",
    initialIndicators: { budget: 72, schedule: 72, morale: 72, stakeholders: 72 },
  },
  3: {
    level: 3,
    badge: "NIVEL 3",
    title: "Proyecto Integral",
    shortDesc: "Caso maestro de inicio a cierre (Puente / App de Quejas).",
    initialIndicators: { budget: 75, schedule: 75, morale: 75, stakeholders: 75 },
  },
};

export const MODE_CONFIGS: Record<ProjectMode, ModeConfig> = {
  private: {
    id: "private",
    code: "MODO [A]",
    title: "Sector Privado",
    subtitle: "NEXUS-01 // Fintech AI",
    focus:
      "Enfoque en ROI, entrega incremental de valor, flujo ágil/híbrido y gobernanza comercial.",
    initialBudgetUsd: 500000,
    initialIndicators: {
      budget: 80,
      schedule: 80,
      morale: 80,
      stakeholders: 80,
    },
    accentColor: "amber",
  },
  public: {
    id: "public",
    code: "MODO [B]",
    title: "Sector Público / Desarrollo",
    subtitle: "ATENA-CIVIC // Salud y Gobernanza Digital",
    focus:
      "Enfoque en SIAFI, línea base, control de cambios político, auditoría e impacto ciudadano.",
    initialBudgetUsd: 1200000,
    initialIndicators: {
      budget: 80,
      schedule: 80,
      morale: 80,
      stakeholders: 80,
    },
    accentColor: "cyan",
  },
};

export const PRIVATE_SCENARIOS: Scenario[] = [
  {
    id: "priv-1",
    round: 1,
    episodeCode: "CAP.01",
    pmbokDomain: "Riesgos y Respuestas",
    title: "Crisis de Suministro Cloud",
    sfxText: "¡ALERTA!",
    narratorBox: "Sala de Mando NEXUS-01. El lanzamiento comercial corre peligro.",
    speaker: "Rei K.",
    speakerRole: "Arquitecta Cloud",
    dialogue:
      "«¡El proveedor GPU retrasó los servidores 3 semanas! Sin ellos, el lanzamiento Q3 colapsa.»",
    imagePath: "/images/private-crisis.jpg",
    options: [
      {
        id: "priv-1-a",
        code: "A",
        label: "Proveedor spot de emergencia",
        description: "Contratas capacidad GPU de respaldo usando reserva de contingencia.",
        hint: "⏱️ Protege ruta crítica | 💰 Consume reserva",
        sfxWord: "¡RESCATE!",
        deltas: { budget: -16, schedule: +6, morale: 0, stakeholders: +6 },
        outcomeNarrative:
          "Los servidores entran en línea en 48h. La fecha Q3 se salva, pero consumes parte de tu reserva.",
        pmiBestPracticeScore: 55,
        pmiArea: "Riesgos y Abastecimiento (Cap. 5.6 / 11.6)",
        pmiFeedback:
          "Uso válido de reserva de contingencia para proteger la ruta crítica, aunque a costo elevado.",
      },
      {
        id: "priv-1-b",
        code: "B",
        label: "Fast-Tracking con crunch nocturno",
        description: "Impones horas extra para simular entornos sin hardware real.",
        hint: "💰 Ahorra caja | 🔥 Desgasta equipo",
        sfxWord: "¡CRUNCH!",
        deltas: { budget: -4, schedule: -6, morale: -18, stakeholders: -2 },
        outcomeNarrative:
          "El equipo trabaja de madrugada bajo presión extrema. Aparecen defectos de integración y fatiga.",
        pmiBestPracticeScore: 25,
        pmiArea: "Cronograma y Liderazgo (Cap. 7.5 / 12.7)",
        pmiFeedback:
          "El crunch sostenido destruye el ritmo sostenible y genera retrabajo técnico.",
      },
      {
        id: "priv-1-c",
        code: "C",
        label: "Entrega incremental de MVP",
        description: "Lanzas el core transaccional a tiempo y difieres analítica pesada al sprint siguiente.",
        hint: "💎 Prioriza valor | 📊 Transparencia",
        sfxWord: "¡PIVOT!",
        deltas: { budget: +4, schedule: +2, morale: +4, stakeholders: -4 },
        outcomeNarrative:
          "Presentas el caso de valor al directorio: el core sale en fecha y el módulo analítico entra en ola 2.",
        pmiBestPracticeScore: 75,
        pmiArea: "Principio de Valor y Entrega (Cap. 3.3 / 18.1)",
        pmiFeedback:
          "Excelente aplicación de entrega incremental centrada en valor y gestión transparente con datos.",
      },
    ],
  },
  {
    id: "priv-2",
    round: 2,
    episodeCode: "CAP.02",
    pmbokDomain: "Gobernanza y Cambios",
    title: "Asedio de Scope Creep",
    sfxText: "¡PRESIÓN!",
    narratorBox: "El cliente ancla exige cripto-pagos no incluidos en la EDT aprobada.",
    speaker: "Sr. Vance",
    speakerRole: "Cliente VIP",
    dialogue:
      "«Si no agregan pasarela cripto esta semana sin costo extra, cancelamos el contrato.»",
    imagePath: "/images/scope-creep.jpg",
    options: [
      {
        id: "priv-2-a",
        code: "A",
        label: "Aceptar cambios sin adenda",
        description: "Accedes verbalmente para no incomodar al cliente VIP.",
        hint: "😊 Calma temporal | 💸 Quiebra alcance",
        sfxWord: "¡DESBORDE!",
        deltas: { budget: -18, schedule: -14, morale: -12, stakeholders: +6 },
        outcomeNarrative:
          "El equipo improvisa requisitos sin diseño. El presupuesto sangra y el cronograma se descarrila.",
        pmiBestPracticeScore: 20,
        pmiArea: "Control de Alcance (Cap. 6.3 / 13.3)",
        pmiFeedback:
          "Aceptar cambios informales (gold plating / scope creep) destruye la línea base.",
      },
      {
        id: "priv-2-b",
        code: "B",
        label: "Control Integrado de Cambios (CCB)",
        description: "Documentas solicitud, cuantificas costo/plazo y propones Fase 2 formal.",
        hint: "🛡️ Protege línea base | ⚖️ Negociación",
        sfxWord: "¡CCB!",
        deltas: { budget: +4, schedule: +2, morale: +4, stakeholders: +4 },
        outcomeNarrative:
          "Con cifras de impacto en mano, el cliente firma una orden de cambio para Fase 2 financiada.",
        pmiBestPracticeScore: 75,
        pmiArea: "Gobernanza y Cambios (Cap. 5.2 / 13.2)",
        pmiFeedback:
          "Aplicación ejemplar del Control Integrado de Cambios protegiendo alcance, costo y relación.",
      },
      {
        id: "priv-2-c",
        code: "C",
        label: "Rechazo rígido por correo",
        description: "Cierras la puerta citando el contrato sin ofrecer alternativa.",
        hint: "📋 Cumple contrato | ❄️ Enfría relación",
        sfxWord: "¡BLOQUEO!",
        deltas: { budget: +2, schedule: 0, morale: 0, stakeholders: -14 },
        outcomeNarrative:
          "El alcance queda intacto, pero el cliente escala una queja formal por falta de flexibilidad.",
        pmiBestPracticeScore: 45,
        pmiArea: "Interesados y Comunicaciones (Cap. 9.2 / 12.4)",
        pmiFeedback:
          "Protegiste el alcance, pero faltó negociación colaborativa orientada a valor.",
      },
    ],
  },
  {
    id: "priv-3",
    round: 3,
    episodeCode: "CAP.03",
    pmbokDomain: "Recursos y Liderazgo",
    title: "Colapso por Burnout",
    sfxText: "¡FATIGA!",
    narratorBox: "02:15 AM. Dos ingenieros senior amenazan con renunciar.",
    speaker: "Kenji T.",
    speakerRole: "Tech Lead",
    dialogue:
      "«Llevamos tres sprints de 70 horas. El equipo está quebrado y la tasa de bugs se triplicó.»",
    imagePath: "/images/team-crunch.jpg",
    options: [
      {
        id: "priv-3-a",
        code: "A",
        label: "Bono económico sin bajar carga",
        description: "Ofreces incentivo monetario pero mantienes las metas irreales.",
        hint: "💸 Más gasto | 🩹 Alivio pasajero",
        sfxWord: "¡PARCHE!",
        deltas: { budget: -12, schedule: -4, morale: -8, stakeholders: 0 },
        outcomeNarrative:
          "El bono no cura el agotamiento: la velocidad cae igual y un desarrollador pide licencia.",
        pmiBestPracticeScore: 30,
        pmiArea: "Gestión de Recursos (Cap. 10.1 / 12.7)",
        pmiFeedback:
          "Los incentivos económicos no sustituyen el ritmo sostenible ni eliminan impedimentos.",
      },
      {
        id: "priv-3-b",
        code: "B",
        label: "Liderazgo servicial y límites WIP",
        description: "Estabilizas el ritmo sostenible, limitas trabajo en curso y automatizas QA.",
        hint: "💚 Recupera moral | 🧠 Calidad real",
        sfxWord: "¡EQUILIBRIO!",
        deltas: { budget: -4, schedule: +2, morale: +14, stakeholders: +2 },
        outcomeNarrative:
          "Al reducir el WIP y quitar bloqueos, el flujo mejora y los bugs bajan en 5 días.",
        pmiBestPracticeScore: 75,
        pmiArea: "Liderazgo Servicial y Flujo (Cap. 16.1 / 18.2)",
        pmiFeedback:
          "Excelente liderazgo servicial: proteger al equipo eleva la calidad y la velocidad real.",
      },
      {
        id: "priv-3-c",
        code: "C",
        label: "Contratar freelancers de choque",
        description: "Sumas 4 externos sin onboarding esperando acelerar.",
        hint: "💸 Sobrecosto | 🐢 Ley de Brooks",
        sfxWord: "¡SATURACIÓN!",
        deltas: { budget: -16, schedule: -8, morale: -4, stakeholders: -2 },
        outcomeNarrative:
          "El equipo senior pierde tiempo explicando el código. El proyecto se atrasa más.",
        pmiBestPracticeScore: 25,
        pmiArea: "Adquisición de Recursos (Cap. 10.2 / 12.6)",
        pmiFeedback:
          "Agregar personas tarde a un proyecto retrasado incrementa la sobrecarga de comunicación.",
      },
    ],
  },
  {
    id: "priv-4",
    round: 4,
    episodeCode: "CAP.04",
    pmbokDomain: "Riesgos y Respuestas",
    title: "Brecha Zero-Day en Pagos",
    sfxText: "¡PELIGRO!",
    narratorBox: "48 horas antes del demo para inversionistas, salta una alerta crítica.",
    speaker: "Misato R.",
    speakerRole: "CISO",
    dialogue:
      "«Detectamos una vulnerabilidad crítica en el módulo KYC. Si lanzamos así, habrá fuga de datos.»",
    imagePath: "/images/risk-incident.jpg",
    options: [
      {
        id: "priv-4-a",
        code: "A",
        label: "Lanzar y parchar después",
        description: "Ocultas el hallazgo para no arruinar la demo de mañana.",
        hint: "🎭 Apariencia | 💣 Riesgo catastrófico",
        sfxWord: "¡NEGLIGENCIA!",
        deltas: { budget: -10, schedule: +4, morale: -14, stakeholders: -24 },
        outcomeNarrative:
          "Un auditor externo detecta la brecha en vivo. La confianza del directorio se desploma.",
        pmiBestPracticeScore: 15,
        pmiArea: "Ética y Respuesta a Riesgos (Cap. 5.4 / 11.6)",
        pmiFeedback:
          "Viola el Código de Ética del PMI (transparencia y responsabilidad) y multiplica el daño.",
      },
      {
        id: "priv-4-b",
        code: "B",
        label: "Mitigar con sandbox seguro",
        description: "Aíslas el módulo KYC, ejecutas la demo en entorno blindado y aplicas el parche.",
        hint: "🛡️ Mitigación ética | 🤝 Confianza",
        sfxWord: "¡BLINDAJE!",
        deltas: { budget: -6, schedule: -4, morale: +4, stakeholders: +10 },
        outcomeNarrative:
          "Informas con transparencia al directorio, proteges datos y demuestras madurez operativa.",
        pmiBestPracticeScore: 75,
        pmiArea: "Calidad y Riesgos (Cap. 12.2 / 12.8)",
        pmiFeedback:
          "Respuesta ética y técnica sobresaliente: mitigación activa con comunicación transparente.",
      },
      {
        id: "priv-4-c",
        code: "C",
        label: "Suspender todo 2 semanas",
        description: "Cancelas la demo sin plan de contingencia ni fecha clara.",
        hint: "🔒 Seguro | 📉 Pánico inversor",
        sfxWord: "¡PARÁLISIS!",
        deltas: { budget: -6, schedule: -14, morale: -2, stakeholders: -10 },
        outcomeNarrative:
          "El sistema es seguro, pero la falta de plan de recuperación inquieta a los inversionistas.",
        pmiBestPracticeScore: 45,
        pmiArea: "Comunicaciones de Crisis (Cap. 12.5)",
        pmiFeedback:
          "Evitar el riesgo protegió los datos, pero faltó un plan de mitigación comunicacional.",
      },
    ],
  },
  {
    id: "priv-5",
    round: 5,
    episodeCode: "CAP.05",
    pmbokDomain: "Finanzas y Valor Ganado",
    title: "Desviación EVM Crítica",
    sfxText: "¡DÉFICIT!",
    narratorBox: "Revisión mensual de Valor Ganado: CPI = 0.78 y SPI = 0.85.",
    speaker: "Elena M.",
    speakerRole: "PMO Controller",
    dialogue:
      "«Gastamos más de lo que producimos y vamos atrasados. El CFO exige un plan correctivo hoy.»",
    imagePath: "/images/private-closing-value.jpg",
    options: [
      {
        id: "priv-5-a",
        code: "A",
        label: "Re-estimar EAC y recortar desperdicio",
        description: "Calculas el EAC realista, eliminas alcance de bajo valor y optimizas ruta crítica.",
        hint: "📊 Control EVM | 💰 Recupera CPI",
        sfxWord: "¡AJUSTE EVM!",
        deltas: { budget: +10, schedule: +6, morale: +2, stakeholders: +6 },
        outcomeNarrative:
          "El CFO aprueba el plan basado en datos EVM. El CPI sube a 0.94 en dos semanas.",
        pmiBestPracticeScore: 75,
        pmiArea: "Análisis del Valor Ganado (Cap. 13.7)",
        pmiFeedback:
          "Excelente uso de CPI/SPI y pronóstico EAC para tomar acciones correctivas tempranas.",
      },
      {
        id: "priv-5-b",
        code: "B",
        label: "Maquillar reportes de avance",
        description: "Reportas 90% de avance subjetivo para ganar tiempo ante el CFO.",
        hint: "🎭 Falsa calma | ⚠️ Bomba de tiempo",
        sfxWord: "¡OPACIDAD!",
        deltas: { budget: -14, schedule: -10, morale: -8, stakeholders: -18 },
        outcomeNarrative:
          "La auditoría financiera descubre la brecha real de costos. Pierdes credibilidad ejecutiva.",
        pmiBestPracticeScore: 15,
        pmiArea: "Conducta Profesional (Cap. 5.4)",
        pmiFeedback:
          "Ocultar desviaciones impide corregir a tiempo y vulnera la ética profesional.",
      },
      {
        id: "priv-5-c",
        code: "C",
        label: "Pedir ampliación sin recortes",
        description: "Solicitas 20% más presupuesto manteniendo todo el backlog original.",
        hint: "💸 Pide caja | 😠 Fricción CFO",
        sfxWord: "¡RESCATE?",
        deltas: { budget: -6, schedule: -2, morale: 0, stakeholders: -8 },
        outcomeNarrative:
          "El directorio aprueba solo la mitad y exige mayor disciplina de priorización.",
        pmiBestPracticeScore: 45,
        pmiArea: "Control Financiero (Cap. 13.6)",
        pmiFeedback:
          "Transparente, pero antes de pedir fondos conviene depurar el alcance de bajo valor.",
      },
    ],
  },
  {
    id: "priv-6",
    round: 6,
    episodeCode: "CAP.06",
    pmbokDomain: "Enfoque Adaptativo",
    title: "Backlog Saturado en Scrum",
    sfxText: "¡CUELLO!",
    narratorBox: "El Product Backlog creció a 140 ítems y la velocidad del equipo cayó 40%.",
    speaker: "Lucas D.",
    speakerRole: "Product Owner",
    dialogue:
      "«Todas las áreas dicen que su historia es urgente. El equipo tiene 18 tareas abiertas a la vez.»",
    imagePath: "/images/team-crunch.jpg",
    options: [
      {
        id: "priv-6-a",
        code: "A",
        label: "Priorizar por Cost of Delay + WIP",
        description: "Aplicas MoSCoW/Cost of Delay con el PO e impones límites WIP en Kanban.",
        hint: "⚡ Acelera flujo | 🎯 Foco en valor",
        sfxWord: "¡FLUJO!",
        deltas: { budget: +4, schedule: +10, morale: +10, stakeholders: +4 },
        outcomeNarrative:
          "El Lead Time cae a la mitad. Las historias de mayor ROI salen a producción cada semana.",
        pmiBestPracticeScore: 75,
        pmiArea: "Enfoque Adaptativo y Flujo (Cap. 15.4 / 17.5)",
        pmiFeedback:
          "Aplicación magistral de priorización por valor y límites WIP para destrabar el flujo.",
      },
      {
        id: "priv-6-b",
        code: "B",
        label: "Trabajar por orden de llegada",
        description: "Mantienes FIFO sin priorizar para no discutir con las gerencias.",
        hint: "⚖️ Neutro político | 🐢 Cero foco",
        sfxWord: "¡ESTANCO!",
        deltas: { budget: -4, schedule: -10, morale: -6, stakeholders: -4 },
        outcomeNarrative:
          "Se entregan tareas cosméticas mientras las funcionalidades críticas siguen bloqueadas.",
        pmiBestPracticeScore: 30,
        pmiArea: "Planificación del Producto (Cap. 17.3)",
        pmiFeedback:
          "No priorizar el backlog diluye el valor y perpetúa cuellos de botella.",
      },
      {
        id: "priv-6-c",
        code: "C",
        label: "Eliminar ceremonias ágiles",
        description: "Suprimes Daily y Retrospectiva para ganar 4 horas de código por sprint.",
        hint: "⏱️ Horas brutas | 🔇 Ceguera equipo",
        sfxWord: "¡CAOS!",
        deltas: { budget: 0, schedule: -4, morale: -10, stakeholders: -2 },
        outcomeNarrative:
          "Sin inspección ni adaptación, los bloqueos tardan días en detectarse.",
        pmiBestPracticeScore: 35,
        pmiArea: "Mejora Continua (Cap. 18.8)",
        pmiFeedback:
          "Eliminar eventos de retroalimentación destruye la agilidad y la mejora del equipo.",
      },
    ],
  },
  {
    id: "priv-7",
    round: 7,
    episodeCode: "CAP.07",
    pmbokDomain: "Alcance y EDT",
    title: "Deuda Técnica vs. Release",
    sfxText: "¡CALIDAD!",
    narratorBox: "Previo a la ronda Serie B, QA reporta fallas intermitentes en conciliación.",
    speaker: "Rei K.",
    speakerRole: "Arquitecta Cloud",
    dialogue:
      "«La Definición de Terminado (DoD) no se está cumpliendo en pruebas de regresión automática.»",
    imagePath: "/images/private-crisis.jpg",
    options: [
      {
        id: "priv-7-a",
        code: "A",
        label: "Reforzar DoD y Costo de Calidad",
        description: "Dedicas 20% del sprint a pruebas automatizadas y criterios de aceptación claros.",
        hint: "💎 Cero defectos | 🛡️ Protege marca",
        sfxWord: "¡CALIDAD!",
        deltas: { budget: -4, schedule: +2, morale: +6, stakeholders: +8 },
        outcomeNarrative:
          "La tasa de defectos en producción cae 85% y la auditoría técnica de Serie B aprueba sin observaciones.",
        pmiBestPracticeScore: 75,
        pmiArea: "Calidad y Validar Alcance (Cap. 6.5 / 13.4)",
        pmiFeedback:
          "Invertir en prevención (Costo de la Calidad) evita fallas costosas post-lanzamiento.",
      },
      {
        id: "priv-7-b",
        code: "B",
        label: "Relajar criterios de aceptación",
        description: "Apruebas entregas con bugs menores para mostrar velocidad en el tablero.",
        hint: "📈 Métrica falsa | 💥 Deuda futura",
        sfxWord: "¡DEUDA!",
        deltas: { budget: -10, schedule: -6, morale: -8, stakeholders: -12 },
        outcomeNarrative:
          "Los clientes reportan errores de saldo en conciliación; soporte colapsa.",
        pmiBestPracticeScore: 25,
        pmiArea: "Control de Calidad (Cap. 13.4)",
        pmiFeedback:
          "Sacrificar la calidad por velocidad aparente genera costos de falla externa muy superiores.",
      },
      {
        id: "priv-7-c",
        code: "C",
        label: "Pruebas manuales masivas",
        description: "Pones a todo el equipo a probar manualmente todo el fin de semana.",
        hint: "🔍 Detecta algo | 😓 Ineficiente",
        sfxWord: "¡MANUAL!",
        deltas: { budget: -8, schedule: -2, morale: -10, stakeholders: +2 },
        outcomeNarrative:
          "Salvan el release, pero el esfuerzo manual es insostenible para el siguiente ciclo.",
        pmiBestPracticeScore: 45,
        pmiArea: "Aseguramiento de Calidad (Cap. 12.2)",
        pmiFeedback:
          "Inspección tardía es más cara que prevenir defectos con automatización y DoD.",
      },
    ],
  },
  {
    id: "priv-8",
    round: 8,
    episodeCode: "CAP.08",
    pmbokDomain: "Beneficios y Cierre",
    title: "Cierre y Transferencia ROI",
    sfxText: "¡CIERRE!",
    narratorBox: "Recta final de NEXUS-01. Toca validar beneficios y cerrar el proyecto.",
    speaker: "Directorio",
    speakerRole: "Comité Ejecutivo",
    dialogue:
      "«El software funciona, pero necesitamos asegurar que Operaciones lo adopte y medir el ROI real.»",
    imagePath: "/images/private-closing-value.jpg",
    options: [
      {
        id: "priv-8-a",
        code: "A",
        label: "Desmovilizar sin transferencia",
        description: "Cierras el repositorio y reasignas al equipo sin documentar lecciones.",
        hint: "⏱️ Cierre rápido | 📉 Se pierde valor",
        sfxWord: "¡ABANDONO!",
        deltas: { budget: +2, schedule: +2, morale: -8, stakeholders: -16 },
        outcomeNarrative:
          "Operaciones no sabe operar los incidentes. El ROI proyectado se queda en el papel.",
        pmiBestPracticeScore: 20,
        pmiArea: "Cierre del Proyecto (Cap. 14.1)",
        pmiFeedback:
          "Un cierre sin transferencia operativa ni lecciones aprendidas destruye la realización de beneficios.",
      },
      {
        id: "priv-8-b",
        code: "B",
        label: "Acta de cierre + Plan de Beneficios",
        description: "Formalizas aceptación, capacitas a Operaciones, entregas KPIs de ROI y lecciones.",
        hint: "🏆 Valor sostenible | 📚 Conocimiento",
        sfxWord: "¡VICTORIA!",
        deltas: { budget: 0, schedule: +4, morale: +8, stakeholders: +12 },
        outcomeNarrative:
          "Transición impecable: Operaciones adopta la plataforma y el directorio confirma el ROI Q4.",
        pmiBestPracticeScore: 75,
        pmiArea: "Beneficios y Cierre (Cap. 4.6 / 14.1)",
        pmiFeedback:
          "Cierre ejemplar alineado al PMBOK® 8: transferencia de valor, métricas y aprendizaje organizacional.",
      },
      {
        id: "priv-8-c",
        code: "C",
        label: "Mantener el proyecto abierto",
        description: "Evitas el cierre formal para seguir atendiendo pequeños ajustes operativos.",
        hint: "🤝 Cómodo | 💸 Costo infinito",
        sfxWord: "¡ETERNO!",
        deltas: { budget: -12, schedule: -8, morale: -4, stakeholders: +2 },
        outcomeNarrative:
          "El proyecto consume presupuesto operativo sin fin y nunca libera al equipo.",
        pmiBestPracticeScore: 40,
        pmiArea: "Gobernanza de Cierre (Cap. 14.1)",
        pmiFeedback:
          "Los proyectos deben ser temporales; el soporte continuo pertenece a Operaciones.",
      },
    ],
  },
];

export const PUBLIC_SCENARIOS: Scenario[] = [
  {
    id: "pub-1",
    round: 1,
    episodeCode: "CAP.01",
    pmbokDomain: "Gobernanza y Cambios",
    title: "Injerencia Política en el Alcance",
    sfxText: "¡INJERENCIA!",
    narratorBox:
      "Caso Crítico Sector Público: Un actor político exige ampliar el alcance antes de elecciones.",
    speaker: "Viceministro",
    speakerRole: "Autoridad Política",
    dialogue:
      "«Necesito inaugurar 12 centros regionales extra dentro de este mismo proyecto antes de fin de año. ¡No hay más dinero ni plazo, solo háganlo!»",
    imagePath: "/images/public-political-scope.jpg",
    options: [
      {
        id: "pub-1-a",
        code: "A",
        label: "Acatar verbalmente sin adenda",
        description: "Aceptas la orden política y recortas calidad técnica para estirar el dinero.",
        hint: "🏛️ Agrado político | 💥 Colapso técnico",
        sfxWord: "¡DESVÍO!",
        deltas: { budget: -20, schedule: -16, morale: -14, stakeholders: +6 },
        outcomeNarrative:
          "Las obras quedan inconclusas y la Contraloría abre hallazgo por desviación del alcance aprobado.",
        pmiBestPracticeScore: 20,
        pmiArea: "Gobernanza y Alcance (Cap. 5.2 / 6.3)",
        pmiFeedback:
          "Ceder a cambios políticos informales sin respaldo financiero ni CCB compromete la legalidad y el proyecto.",
      },
      {
        id: "pub-1-b",
        code: "B",
        label: "Canalizar vía CCB y Gobernanza",
        description:
          "Presentas informe de impacto en triple restricción al Comité de Control de Cambios y propones Fase 2 con financiamiento formal.",
        hint: "⚖️ Gobernanza PMBOK | 🛡️ Protege acta",
        sfxWord: "¡GOBERNANZA!",
        deltas: { budget: +2, schedule: +2, morale: +6, stakeholders: -4 },
        outcomeNarrative:
          "La autoridad comprende las implicaciones legales y financieras. El alcance base se protege y se formula un proyecto Fase 2.",
        pmiBestPracticeScore: 75,
        pmiArea: "Control Integrado de Cambios (Cap. 5.2 / 13.2)",
        pmiFeedback:
          "Respuesta modelo PMBOK® 8: todo cambio exige evaluación de impacto, respaldo presupuestario y aprobación del marco de gobernanza.",
      },
      {
        id: "pub-1-c",
        code: "C",
        label: "Confrontación pública directa",
        description: "Rechazas la petición en prensa sin proponer ruta técnica alternativa.",
        hint: "📋 Puro marco | 🔥 Crisis política",
        sfxWord: "¡CHOQUE!",
        deltas: { budget: 0, schedule: -6, morale: -4, stakeholders: -18 },
        outcomeNarrative:
          "El alcance no cambia, pero pierdes el respaldo político necesario para destrabar permisos.",
        pmiBestPracticeScore: 40,
        pmiArea: "Interesados y Comunicaciones (Cap. 9.1 / 12.4)",
        pmiFeedback:
          "Aunque protegiste el alcance, faltó tacto político y gestión constructiva de interesados de alto poder.",
      },
    ],
  },
  {
    id: "pub-2",
    round: 2,
    episodeCode: "CAP.02",
    pmbokDomain: "Finanzas y Valor Ganado",
    title: "Sin Partida Presupuestaria en SIAFI",
    sfxText: "¡BLOQUEO!",
    narratorBox:
      "Caso Crítico Sector Público: La actividad de interoperabilidad clínica no tiene crédito en SIAFI.",
    speaker: "Lic. Paredes",
    speakerRole: "Directora Financiera UEP",
    dialogue:
      "«¡La partida presupuestaria para esta actividad no quedó cargada en el SIAFI este ejercicio! Legalmente no podemos devengar ni emitir orden de compra.»",
    imagePath: "/images/public-siafi-budget.jpg",
    options: [
      {
        id: "pub-2-a",
        code: "A",
        label: "Ordenar ejecución 'de palabra'",
        description: "Pides al proveedor iniciar trabajos prometiendo regularizar el pago después.",
        hint: "⏱️ Avanza hoy | 🚨 Ilegalidad fiscal",
        sfxWord: "¡REPARO!",
        deltas: { budget: -18, schedule: +2, morale: -10, stakeholders: -20 },
        outcomeNarrative:
          "Auditoría detecta compromiso sin disponibilidad presupuestaria (deuda flotante irregular) y paraliza pagos.",
        pmiBestPracticeScore: 15,
        pmiArea: "Conducta Profesional y Finanzas (Cap. 5.4 / 8.5)",
        pmiFeedback:
          "Comprometer gasto sin partida en SIAFI viola normas de administración financiera pública y ética PMI.",
      },
      {
        id: "pub-2-b",
        code: "B",
        label: "Reprogramación SIAFI + Re-secuenciar",
        description:
          "Tramitas modificación presupuestaria formal ante Hacienda/UEP y re-secuencias tareas sin compromiso financiero inmediato.",
        hint: "📑 Legalidad fiscal | 🔄 Protege flujo",
        sfxWord: "¡SIAFI OK!",
        deltas: { budget: +6, schedule: -4, morale: +4, stakeholders: +8 },
        outcomeNarrative:
          "Mientras Hacienda aprueba el traspaso de partida en 12 días, el equipo avanza diseño y normativa sin detener el proyecto.",
        pmiBestPracticeScore: 75,
        pmiArea: "Gestión Financiera y Cronograma (Cap. 7.3 / 8.5)",
        pmiFeedback:
          "Excelente manejo: respeta el marco presupuestario público mientras mitiga el impacto en ruta crítica re-secuenciando.",
      },
      {
        id: "pub-2-c",
        code: "C",
        label: "Paralizar todo el proyecto",
        description: "Detienes a todo el equipo técnico hasta que aparezca la partida en el siguiente año.",
        hint: "🛑 Cero riesgo legal | ❄️ Parálisis total",
        sfxWord: "¡CONGELADO!",
        deltas: { budget: -4, schedule: -18, morale: -12, stakeholders: -8 },
        outcomeNarrative:
          "El proyecto pierde 3 meses de inercia y la ciudadanía no ve avances.",
        pmiBestPracticeScore: 40,
        pmiArea: "Integración y Recursos (Cap. 12.1)",
        pmiFeedback:
          "Evitaste faltas legales, pero faltó gestión proactiva de dependencias para mantener avance no financiero.",
      },
    ],
  },
  {
    id: "pub-3",
    round: 3,
    episodeCode: "CAP.03",
    pmbokDomain: "Cronograma y Línea Base",
    title: "Proyecto Sin Línea Base de Tiempo",
    sfxText: "¡DERIVA!",
    narratorBox:
      "Caso Crítico Sector Público: Llevan 2 meses ejecutando sin Línea Base de Cronograma aprobada.",
    speaker: "Ing. Solís",
    speakerRole: "Control de Proyectos",
    dialogue:
      "«Cada dirección reporta fechas distintas en Excel. No hay línea base oficial, ni ruta crítica, ni forma objetiva de medir si vamos atrasados.»",
    imagePath: "/images/public-no-baseline.jpg",
    options: [
      {
        id: "pub-3-a",
        code: "A",
        label: "Seguir midiendo por percepción",
        description: "Pides porcentajes semanales informales a cada jefe de área sin consolidar.",
        hint: "😌 Sin fricción hoy | 🌫️ Ceguera total",
        sfxWord: "¡CAOS!",
        deltas: { budget: -12, schedule: -18, morale: -8, stakeholders: -12 },
        outcomeNarrative:
          "Al llegar el mes 5 descubren un retraso oculto de 10 semanas en adquisiciones críticas.",
        pmiBestPracticeScore: 20,
        pmiArea: "Control del Cronograma (Cap. 13.5)",
        pmiFeedback:
          "Sin línea base es imposible calcular variaciones (SV/SPI) o gestionar la ruta crítica.",
      },
      {
        id: "pub-3-b",
        code: "B",
        label: "Establecer y aprobar Línea Base CPM",
        description:
          "Reúnes a los líderes, defines EDT-actividades, dependencias y ruta crítica (CPM) y apruebas formalmente la Línea Base.",
        hint: "📐 Control objetivo | 🧭 Ruta clara",
        sfxWord: "¡LÍNEA BASE!",
        deltas: { budget: +2, schedule: +10, morale: +6, stakeholders: +8 },
        outcomeNarrative:
          "Con la Línea Base aprobada en gobernanza, todo el equipo alinea hitos y se activa el seguimiento de Cronograma Ganado.",
        pmiBestPracticeScore: 75,
        pmiArea: "Cronograma y Ruta Crítica (Cap. 7.5–7.6)",
        pmiFeedback:
          "Impecable: formalizar la línea base con CPM restaura la visibilidad y el control objetivo del desempeño.",
      },
      {
        id: "pub-3-c",
        code: "C",
        label: "Imponer fecha política unilateral",
        description: "Fijas un Gantt optimista desde tu oficina sin consultar capacidades ni dependencias.",
        hint: "⚡ Rápido en papel | 💣 Irreal",
        sfxWord: "¡FICCIÓN!",
        deltas: { budget: -6, schedule: -10, morale: -12, stakeholders: +2 },
        outcomeNarrative:
          "Nadie cree en el cronograma impuesto y los hitos empiezan a vencerse desde la primera semana.",
        pmiBestPracticeScore: 30,
        pmiArea: "Estimar y Desarrollar Cronograma (Cap. 7.4)",
        pmiFeedback:
          "Una línea base sin participación del equipo ni análisis de dependencias carece de validez técnica.",
      },
    ],
  },
  {
    id: "pub-4",
    round: 4,
    episodeCode: "CAP.04",
    pmbokDomain: "Principios y Valor",
    title: "Productos Desconectados de Impactos",
    sfxText: "¡BRECHA!",
    narratorBox:
      "Caso Crítico Sector Público: Se entregan sistemas y equipos (outputs), pero sin impacto social (outcomes).",
    speaker: "Dra. Vega",
    speakerRole: "Evaluadora de Impacto",
    dialogue:
      "«Ya entregamos 40 módulos de software y computadoras, pero el tiempo de espera del paciente sigue igual. ¡Nadie conectó los productos con el impacto!»",
    imagePath: "/images/public-impact-gap.jpg",
    options: [
      {
        id: "pub-4-a",
        code: "A",
        label: "Declarar éxito por entregables",
        description: "Argumentas que el contrato solo exigía entregar software y hardware.",
        hint: "📄 Cumple papel | 😞 Cero valor público",
        sfxWord: "¡BUROCRACIA!",
        deltas: { budget: 0, schedule: +2, morale: -8, stakeholders: -20 },
        outcomeNarrative:
          "Los equipos quedan subutilizados en bodegas. La opinión pública y el BID critican el gasto ineficiente.",
        pmiBestPracticeScore: 20,
        pmiArea: "Principio de Valor (Cap. 3.3)",
        pmiFeedback:
          "Confundir productos (outputs) con resultados/impactos (outcomes) es el error clásico en proyectos públicos.",
      },
      {
        id: "pub-4-b",
        code: "B",
        label: "Re-alinear al Plan de Beneficios",
        description:
          "Activas el Plan de Gestión de Beneficios (Cap. 4.6), mapeas cadena Productos->Resultados->Impactos y ajustas adopción en clínicas.",
        hint: "🎯 Impacto real | 🌟 Valor ciudadano",
        sfxWord: "¡IMPACTO!",
        deltas: { budget: -4, schedule: +2, morale: +8, stakeholders: +14 },
        outcomeNarrative:
          "Al rediseñar el flujo de atención y capacitar al personal médico, la espera baja 38% en 6 semanas.",
        pmiBestPracticeScore: 75,
        pmiArea: "Caso de Negocios y Beneficios (Cap. 4.5–4.6)",
        pmiFeedback:
          "Excelente aplicación del PMBOK® 8: gobernar para generar valor e impacto medible, no solo entregables.",
      },
      {
        id: "pub-4-c",
        code: "C",
        label: "Comprar más tecnología",
        description: "Propones adquirir pantallas y kioscos adicionales sin cambiar procesos.",
        hint: "💸 Más gasto | 🔁 Mismo problema",
        sfxWord: "¡EXCESO!",
        deltas: { budget: -16, schedule: -6, morale: -2, stakeholders: -6 },
        outcomeNarrative:
          "Más hardware no resuelve la desconexión operativa y reduce las reservas financieras.",
        pmiBestPracticeScore: 30,
        pmiArea: "Análisis de Requisitos (Cap. 6.2)",
        pmiFeedback:
          "Agregar productos sin atacar la causa raíz operativa desperdicia recursos públicos.",
      },
    ],
  },
  {
    id: "pub-5",
    round: 5,
    episodeCode: "CAP.05",
    pmbokDomain: "Riesgos y Respuestas",
    title: "Auditoría de Contraloría",
    sfxText: "¡AUDITORÍA!",
    narratorBox: "Inspección sorpresa del órgano de control sobre trazabilidad y datos.",
    speaker: "Auditor Jefe",
    speakerRole: "Contraloría General",
    dialogue:
      "«Detectamos brechas de trazabilidad en acceso a historiales clínicos. Tienen 72 horas para responder.»",
    imagePath: "/images/public-audit.jpg",
    options: [
      {
        id: "pub-5-a",
        code: "A",
        label: "Transparencia + Plan de Mitigación",
        description: "Entregas bitácoras completas y activas plan correctivo de seguridad con plazos.",
        hint: "🛡️ Cumplimiento | 🤝 Credibilidad",
        sfxWord: "¡TRANSPARENCIA!",
        deltas: { budget: -6, schedule: -2, morale: +4, stakeholders: +10 },
        outcomeNarrative:
          "La Contraloría valora la transparencia y cierra la observación preventiva sin sanciones.",
        pmiBestPracticeScore: 75,
        pmiArea: "Gobernanza y Riesgos (Cap. 5.4 / 12.8)",
        pmiFeedback:
          "La transparencia proactiva y respuesta documentada fortalecen la gobernanza pública.",
      },
      {
        id: "pub-5-b",
        code: "B",
        label: "Dilatar entrega de evidencias",
        description: "Envías documentos parciales esperando que pase el ciclo de revisión.",
        hint: "⏳ Gana días | 🚨 Agrava sanción",
        sfxWord: "¡SOSPECHA!",
        deltas: { budget: -10, schedule: -10, morale: -8, stakeholders: -18 },
        outcomeNarrative:
          "El órgano de control escala el hallazgo a investigación formal y congela desembolsos.",
        pmiBestPracticeScore: 15,
        pmiArea: "Conducta Profesional (Cap. 5.4)",
        pmiFeedback:
          "Ocultar o dilatar información ante auditorías destruye la confianza institucional.",
      },
      {
        id: "pub-5-c",
        code: "C",
        label: "Apagar módulos temporalmente",
        description: "Desconectas el sistema en clínicas mientras revisas permisos.",
        hint: "🔒 Cero riesgo | 😠 Queja ciudadana",
        sfxWord: "¡APAGÓN!",
        deltas: { budget: -2, schedule: -8, morale: -4, stakeholders: -10 },
        outcomeNarrative:
          "Evitas sanciones, pero la interrupción del servicio genera reclamos en hospitales.",
        pmiBestPracticeScore: 45,
        pmiArea: "Gestión de Problemas (Cap. 18.6)",
        pmiFeedback:
          "Medida segura pero desproporcionada al afectar la continuidad del servicio público.",
      },
    ],
  },
  {
    id: "pub-6",
    round: 6,
    episodeCode: "CAP.06",
    pmbokDomain: "Recursos y Liderazgo",
    title: "Fuga de Talento Técnico",
    sfxText: "¡ROTACIÓN!",
    narratorBox: "El equipo técnico sufre sobrecarga administrativa y ofertas del sector privado.",
    speaker: "Sofía R.",
    speakerRole: "Líder de Integración",
    dialogue:
      "«Pasamos 60% del tiempo llenando formularios duplicados en vez de resolver bloqueos técnicos.»",
    imagePath: "/images/team-crunch.jpg",
    options: [
      {
        id: "pub-6-a",
        code: "A",
        label: "Simplificación Lean y Empoderamiento",
        description: "Eliminas reportes duplicados (desperdicio Lean), empoderas al equipo y haces pair-work.",
        hint: "💚 Moral arriba | ⚡ Más eficiencia",
        sfxWord: "¡LEAN!",
        deltas: { budget: 0, schedule: +6, morale: +14, stakeholders: +4 },
        outcomeNarrative:
          "El equipo recupera foco técnico, documenta conocimiento clave y frena la rotación.",
        pmiBestPracticeScore: 75,
        pmiArea: "Lean y Empoderamiento (Cap. 3.7 / 15.3)",
        pmiFeedback:
          "Excelente aplicación de principios Lean y liderazgo servicial para proteger al equipo.",
      },
      {
        id: "pub-6-b",
        code: "B",
        label: "Más control burocrático",
        description: "Exiges reportes diarios de horas para vigilar la productividad.",
        hint: "📋 Más control | 🔥 Desmoraliza",
        sfxWord: "¡MICROGESTIÓN!",
        deltas: { budget: -4, schedule: -8, morale: -16, stakeholders: -2 },
        outcomeNarrative:
          "Dos especialistas renuncian esa semana por desmotivación.",
        pmiBestPracticeScore: 20,
        pmiArea: "Liderar al Equipo (Cap. 12.7)",
        pmiFeedback:
          "La microgestión destruye la autonomía y acelera la fuga de talento.",
      },
      {
        id: "pub-6-c",
        code: "C",
        label: "Tercerizar todo el desarrollo",
        description: "Transfieres el conocimiento a una consultora externa de urgencia.",
        hint: "💸 Caro | ⚠️ Pérdida know-how",
        sfxWord: "¡OUTSOURCE!",
        deltas: { budget: -14, schedule: -4, morale: -6, stakeholders: +2 },
        outcomeNarrative:
          "Se sostiene el avance, pero el Estado pierde capacidad interna instalada.",
        pmiBestPracticeScore: 45,
        pmiArea: "Estrategia de Abastecimiento (Cap. 5.6)",
        pmiFeedback:
          "Solución costosa que no resuelve la raíz de la ineficiencia operativa interna.",
      },
    ],
  },
  {
    id: "pub-7",
    round: 7,
    episodeCode: "CAP.07",
    pmbokDomain: "Enfoque Adaptativo",
    title: "Despliegue Territorial Incremental",
    sfxText: "¡DESPLIEGUE!",
    narratorBox: "Debes desplegar en 30 hospitales rurales con conectividad intermitente.",
    speaker: "Ing. Castro",
    speakerRole: "Operaciones Territoriales",
    dialogue:
      "«Intentar activar los 30 hospitales el mismo día ('Big Bang') nos va a colapsar el soporte.»",
    imagePath: "/images/private-crisis.jpg",
    options: [
      {
        id: "pub-7-a",
        code: "A",
        label: "Olas incrementales con piloto",
        description: "Despliegas en 3 hospitales piloto, ajustas soporte offline y escalas por olas.",
        hint: "🔄 Menor riesgo | 📈 Aprendizaje",
        sfxWord: "¡OLAS!",
        deltas: { budget: +2, schedule: +4, morale: +6, stakeholders: +10 },
        outcomeNarrative:
          "El piloto detecta fallas de red rural a tiempo; las siguientes olas se despliegan sin incidentes.",
        pmiBestPracticeScore: 75,
        pmiArea: "Entregas Flexibles y Riesgos (Cap. 18.1)",
        pmiFeedback:
          "Enfoque híbrido/incremental ideal para reducir riesgo operativo en despliegues masivos.",
      },
      {
        id: "pub-7-b",
        code: "B",
        label: "Lanzamiento Big Bang simultáneo",
        description: "Activas los 30 hospitales a la vez para cumplir la foto inaugural.",
        hint: "📸 Foto rápida | 💥 Colapso soporte",
        sfxWord: "¡COLAPSO!",
        deltas: { budget: -12, schedule: -10, morale: -14, stakeholders: -12 },
        outcomeNarrative:
          "La mesa de ayuda colapsa con 400 tickets simultáneos y varios centros vuelven al papel.",
        pmiBestPracticeScore: 20,
        pmiArea: "Gestión de Riesgos (Cap. 11.6)",
        pmiFeedback:
          "El lanzamiento Big Bang sin piloto multiplica la exposición al riesgo operacional.",
      },
      {
        id: "pub-7-c",
        code: "C",
        label: "Posponer despliegue 4 meses",
        description: "Esperas a que mejore la fibra óptica nacional antes de instalar.",
        hint: "⏳ Cero riesgo técnico | 😠 Demora",
        sfxWord: "¡ESPERA!",
        deltas: { budget: -6, schedule: -14, morale: -2, stakeholders: -8 },
        outcomeNarrative:
          "La infraestructura externa tarda más de lo previsto y las clínicas siguen sin sistema.",
        pmiBestPracticeScore: 40,
        pmiArea: "Cronograma y Respuestas (Cap. 11.6)",
        pmiFeedback:
          "Depender pasivamente de terceros retrasa innecesariamente la entrega de valor.",
      },
    ],
  },
  {
    id: "pub-8",
    round: 8,
    episodeCode: "CAP.08",
    pmbokDomain: "Beneficios y Cierre",
    title: "Resistencia Gremial y Cierre Público",
    sfxText: "¡TRANSICIÓN!",
    narratorBox: "Última fase: el gremio médico duda del nuevo sistema antes de la firma de cierre.",
    speaker: "Dra. Morales",
    speakerRole: "Representante Gremial",
    dialogue:
      "«Tememos que el nuevo registro digital aumente la carga burocrática en consulta externa.»",
    imagePath: "/images/public-impact-gap.jpg",
    options: [
      {
        id: "pub-8-a",
        code: "A",
        label: "Imposición por circular ministerial",
        description: "Cierras el proyecto y emites uso obligatorio sin escuchar al gremio.",
        hint: "📄 Firma rápida | ✊ Boicot uso",
        sfxWord: "¡RECHAZO!",
        deltas: { budget: 0, schedule: +2, morale: -6, stakeholders: -20 },
        outcomeNarrative:
          "El sistema queda cerrado en papel, pero los médicos lo boicotean y no se logran los beneficios.",
        pmiBestPracticeScore: 20,
        pmiArea: "Compromiso de Interesados (Cap. 12.4)",
        pmiFeedback:
          "Ignorar la gestión del cambio de usuarios clave frustra la adopción y el impacto.",
      },
      {
        id: "pub-8-b",
        code: "B",
        label: "Co-diseño, transferencia y cierre",
        description:
          "Realizas taller de validación con el gremio, transfieres operación al Ministerio y documentas beneficios e impacto.",
        hint: "🤝 Adopción real | 🏆 Cierre PMBOK",
        sfxWord: "¡ADOPCIÓN!",
        deltas: { budget: 0, schedule: +4, morale: +8, stakeholders: +14 },
        outcomeNarrative:
          "El gremio valida la usabilidad, firma el acta de aceptación y el proyecto cierra con impacto ciudadano verificado.",
        pmiBestPracticeScore: 75,
        pmiArea: "Interesados y Cierre (Cap. 12.4 / 14.1)",
        pmiFeedback:
          "Cierre público ejemplar: valida adopción real, sostenibilidad e institucionalización de beneficios.",
      },
      {
        id: "pub-8-c",
        code: "C",
        label: "Dejar uso opcional indefinido",
        description: "Permites que cada médico decida si usa el sistema o sigue en papel.",
        hint: "🕊️ Sin conflicto | 📉 Datos partidos",
        sfxWord: "¡DUALIDAD!",
        deltas: { budget: -8, schedule: -4, morale: 0, stakeholders: -4 },
        outcomeNarrative:
          "La doble captura genera inconsistencias estadísticas en el Ministerio de Salud.",
        pmiBestPracticeScore: 45,
        pmiArea: "Sostenibilidad y Beneficios (Cap. 3.6 / 4.6)",
        pmiFeedback:
          "Mantener procesos paralelos duplica costos y diluye el beneficio esperado.",
      },
    ],
  },
];
