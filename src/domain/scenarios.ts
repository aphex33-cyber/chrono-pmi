import { ModeConfig, ProjectMode, Scenario } from "./types";

export const MODE_CONFIGS: Record<ProjectMode, ModeConfig> = {
  private: {
    id: "private",
    code: "MODO [A]",
    title: "Sector Privado",
    subtitle: "NEXUS-01 // Fintech AI",
    focus: "Enfoque en ROI, flujos de caja, time-to-market y entrega comercial.",
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
    subtitle: "ATENA-CIVIC // Salud Digital",
    focus:
      "Enfoque en marcos normativos, cumplimiento, transparencia e impacto social.",
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
    title: "Crisis de Suministro Cloud",
    sfxText: "¡ALERTA!",
    narratorBox: "Sala de Mando NEXUS-01. El lanzamiento comercial corre peligro.",
    speaker: "Rei K.",
    speakerRole: "Arquitecta",
    dialogue:
      "«¡El proveedor GPU retrasó los servidores 3 semanas! Sin ellos, el lanzamiento Q3 colapsa.»",
    imagePath: "/images/private-crisis.jpg",
    options: [
      {
        id: "priv-1-a",
        code: "A",
        label: "Proveedor de emergencia",
        description: "Pagas tarifa spot urgente para no mover la fecha.",
        hint: "⏱️ Protege tiempo | 💰 Golpea caja",
        sfxWord: "¡RESCATE!",
        deltas: { budget: -22, schedule: +5, morale: -5, stakeholders: +10 },
        outcomeNarrative:
          "¡Los servidores entran en línea en 48h! La fecha se salva, pero el presupuesto sufre un duro golpe.",
        pmiBestPracticeScore: 16,
        pmiArea: "Adquisiciones y Riesgos",
        pmiFeedback:
          "Usaste reservas de contingencia para proteger la ruta crítica a un costo alto.",
      },
      {
        id: "priv-1-b",
        code: "B",
        label: "Fast-Tracking nocturno",
        description: "Pides horas extra al equipo para simular entornos.",
        hint: "💰 Ahorra caja | 🔥 Desgasta equipo",
        sfxWord: "¡CRUNCH!",
        deltas: { budget: -5, schedule: -5, morale: -22, stakeholders: +2 },
        outcomeNarrative:
          "El equipo trabaja de madrugada bajo presión extrema. Contienes el gasto, pero la fatiga escala.",
        pmiBestPracticeScore: 14,
        pmiArea: "Gestión del Cronograma",
        pmiFeedback:
          "El fast-tracking redujo el impacto financiero, pero generó fatiga y deuda técnica.",
      },
      {
        id: "priv-1-c",
        code: "C",
        label: "Negociar lanzamiento MVP",
        description: "Lanzas el core comercial a tiempo y difieres analítica.",
        hint: "⚖️ Equilibrio | 😠 Tensión Sponsor",
        sfxWord: "¡PIVOT!",
        deltas: { budget: +5, schedule: 0, morale: +5, stakeholders: -10 },
        outcomeNarrative:
          "Junta tensa, pero tus cifras de Valor Ganado convencen al directorio. ¡El ROI inicial está a salvo!",
        pmiBestPracticeScore: 20,
        pmiArea: "Integración y Valor Ganado",
        pmiFeedback:
          "Excelente entrega incremental y gestión transparente con datos.",
      },
    ],
  },
  {
    id: "priv-2",
    round: 2,
    episodeCode: "CAP.02",
    title: "Cambio de Alcance de Última Hora",
    sfxText: "¡PRESIÓN!",
    narratorBox: "El patrocinador irrumpe en la sala exigiendo cambios fuera de plan.",
    speaker: "Director Vance",
    speakerRole: "Sponsor",
    dialogue:
      "«¡Cerré alianza con un banco! Integra su biometría antes del lanzamiento. ¡Haz que suceda!»",
    imagePath: "/images/scope-creep.jpg",
    options: [
      {
        id: "priv-2-a",
        code: "A",
        label: "Aceptar sin renegociar",
        description: "Dices sí al sponsor y ordenas absorber el trabajo.",
        hint: "😊 Sponsor feliz | 💥 Caos total",
        sfxWord: "¡DESBORDE!",
        deltas: { budget: -18, schedule: -20, morale: -20, stakeholders: +12 },
        outcomeNarrative:
          "El sponsor sonríe, pero esa tarde estalla el caos en ingeniería por falta de especificaciones.",
        pmiBestPracticeScore: 4,
        pmiArea: "Control de Cambios",
        pmiFeedback:
          "Ceder al 'scope creep' sin evaluar impacto rompe la línea base.",
      },
      {
        id: "priv-2-b",
        code: "B",
        label: "Control Integrado de Cambios",
        description: "Cuantificas impacto en CCB y lo pasas a Fase 1.1.",
        hint: "🛡️ Protege plan | ⚡ Fricción inicial",
        sfxWord: "¡BLOQUEO!",
        deltas: { budget: +5, schedule: +5, morale: +10, stakeholders: -8 },
        outcomeNarrative:
          "¡Freno en seco al scope creep! El comité aprueba la Fase 1.1 sin sabotear el lanzamiento.",
        pmiBestPracticeScore: 20,
        pmiArea: "Control Integrado de Cambios",
        pmiFeedback:
          "Disciplina ejemplar del PMBOK: todo cambio debe evaluarse en alcance, tiempo y costo.",
      },
      {
        id: "priv-2-c",
        code: "C",
        label: "Pedir fondos y +2 semanas",
        description: "Aceptas el reto a cambio de capital y nuevo plazo.",
        hint: "💰 Más caja | ⏱️ Mueve fecha",
        sfxWord: "¡ACUERDO!",
        deltas: { budget: +10, schedule: -12, morale: -5, stakeholders: -5 },
        outcomeNarrative:
          "El sponsor libera fondos extra a regañadientes. El equipo respira, aunque el plazo se extiende.",
        pmiBestPracticeScore: 16,
        pmiArea: "Alcance y Costos",
        pmiFeedback:
          "Buena negociación de la triple restricción: si cambia el alcance, ajustas costo y tiempo.",
      },
    ],
  },
  {
    id: "priv-3",
    round: 3,
    episodeCode: "CAP.03",
    title: "Crisis de Burnout y Renuncias",
    sfxText: "¡COLAPSO!",
    narratorBox: "02:30 AM. La oficina huele a café frío y tensión acumulada.",
    speaker: "Shinji M.",
    speakerRole: "Tech Lead",
    dialogue:
      "«Tres fines de semana sin descanso... ¡Dos desarrolladores senior van a renunciar este viernes!»",
    imagePath: "/images/team-crunch.jpg",
    options: [
      {
        id: "priv-3-a",
        code: "A",
        label: "Liderazgo servicial y descanso",
        description: "Prohíbes horas extra y reajustas hitos intermedios.",
        hint: "💚 Recupera moral | ⏱️ Cede tiempo",
        sfxWord: "¡RESPIRO!",
        deltas: { budget: -5, schedule: -10, morale: +25, stakeholders: -5 },
        outcomeNarrative:
          "¡Los seniors deciden quedarse! La moral se dispara y la calidad del código se estabiliza.",
        pmiBestPracticeScore: 20,
        pmiArea: "Liderazgo y Equipo",
        pmiFeedback:
          "El liderazgo servicial y el ritmo sostenible evitan perder talento crítico.",
      },
      {
        id: "priv-3-b",
        code: "B",
        label: "Bonos de retención",
        description: "Ofreces incentivo económico ligado a la entrega final.",
        hint: "⏱️ Sostiene fecha | 💰 Cuesta dinero",
        sfxWord: "¡BONO!",
        deltas: { budget: -18, schedule: +5, morale: +8, stakeholders: +5 },
        outcomeNarrative:
          "Los bonos frenan las renuncias inmediatas, pero el agotamiento físico sigue latente.",
        pmiBestPracticeScore: 14,
        pmiArea: "Costos y Recursos",
        pmiFeedback:
          "Los incentivos ayudan a corto plazo, pero no resuelven la causa raíz del agotamiento.",
      },
      {
        id: "priv-3-c",
        code: "C",
        label: "Contratar freelancers rápidos",
        description: "Exiges último esfuerzo e incorporas externos hoy.",
        hint: "⚠️ Ley de Brooks | 🔥 Más estrés",
        sfxWord: "¡FRICCIÓN!",
        deltas: { budget: -15, schedule: -8, morale: -20, stakeholders: -5 },
        outcomeNarrative:
          "¡Error clásico! Capacitar gente nueva a última hora frena aún más al equipo agotado.",
        pmiBestPracticeScore: 6,
        pmiArea: "Gestión de Recursos",
        pmiFeedback:
          "La Ley de Brooks advierte que añadir personal a un proyecto atrasado lo atrasa más.",
      },
    ],
  },
  {
    id: "priv-4",
    round: 4,
    episodeCode: "CAP.04",
    title: "Vulnerabilidad Crítica en Pagos",
    sfxText: "¡BRECHA!",
    narratorBox: "Sirenas en QA. Faltan días para salir a producción.",
    speaker: "Asuka S.",
    speakerRole: "Directora QA",
    dialogue:
      "«¡Detengan todo! Hay una brecha crítica en pagos. ¡Si salimos hoy, nos hackean en 10 minutos!»",
    imagePath: "/images/risk-incident.jpg",
    options: [
      {
        id: "priv-4-a",
        code: "A",
        label: "War-Room y retraso de 1 semana",
        description: "Detienes la salida, parchas y auditas seguridad.",
        hint: "🛡️ Cero riesgo | ⏱️ Mueve lanzamiento",
        sfxWord: "¡BLINDAJE!",
        deltas: { budget: -10, schedule: -15, morale: +5, stakeholders: -10 },
        outcomeNarrative:
          "El parche queda blindado. El marketing se pospone 7 días, pero evitas un desastre millonario.",
        pmiBestPracticeScore: 20,
        pmiArea: "Calidad y Riesgos",
        pmiFeedback:
          "La calidad y seguridad nunca se negocian; prevenir fallas evita costos exponenciales.",
      },
      {
        id: "priv-4-b",
        code: "B",
        label: "Firewall temporal (WAF)",
        description: "Sales con mitigación perimetral y parchas en caliente.",
        hint: "⏱️ Cumple fecha | ⚡ Riesgo residual",
        sfxWord: "¡PARCHE!",
        deltas: { budget: -8, schedule: +8, morale: -12, stakeholders: +8 },
        outcomeNarrative:
          "Salen a tiempo bajo vigilancia 24/7. La tensión es máxima hasta cerrar el código definitivo.",
        pmiBestPracticeScore: 13,
        pmiArea: "Respuesta a Riesgos",
        pmiFeedback:
          "Mitigación táctica válida bajo monitoreo estricto, aunque deja riesgo residual.",
      },
      {
        id: "priv-4-c",
        code: "C",
        label: "Ocultar fallo y lanzar",
        description: "Minimizas el hallazgo para no alarmar al directorio.",
        hint: "☠️ Riesgo ético y financiero extremo",
        sfxWord: "¡DESASTRE!",
        deltas: { budget: -25, schedule: +5, morale: -25, stakeholders: -28 },
        outcomeNarrative:
          "¡Incidente masivo a las 48 horas! Reversión de emergencia y multas millonarias.",
        pmiBestPracticeScore: 0,
        pmiArea: "Ética y Riesgos",
        pmiFeedback:
          "Ocultar riesgos críticos viola el Código de Ética del PMI y destruye la confianza.",
      },
    ],
  },
  {
    id: "priv-5",
    round: 5,
    episodeCode: "CAP.05",
    title: "Cierre y Transferencia Final",
    sfxText: "¡FINAL!",
    narratorBox: "Última decisión. El directorio exige pasar ya al siguiente proyecto.",
    speaker: "Director Vance",
    speakerRole: "Sponsor",
    dialogue:
      "«Ya está estable. ¡Sáltate la documentación y mueve al equipo al nuevo proyecto mañana!»",
    imagePath: "/images/scope-creep.jpg",
    options: [
      {
        id: "priv-5-a",
        code: "A",
        label: "Cierre formal y handover",
        description: "Firmas actas, transfieres a soporte y haces retrospectiva.",
        hint: "🏆 Cierre limpio | 💚 Sube moral y valor",
        sfxWord: "¡MISIÓN!",
        deltas: { budget: -4, schedule: -5, morale: +15, stakeholders: +15 },
        outcomeNarrative:
          "¡Operaciones toma el control sin fricciones! El acta de cierre se firma con aplausos.",
        pmiBestPracticeScore: 20,
        pmiArea: "Cierre del Proyecto",
        pmiFeedback:
          "El cierre administrativo, transferencia de valor y lecciones aprendidas completan el ciclo PMI.",
      },
      {
        id: "priv-5-b",
        code: "B",
        label: "Saltar el cierre",
        description: "Mueves al equipo al instante sin documentación.",
        hint: "⏱️ Rápido hoy | 💥 Caos en soporte",
        sfxWord: "¡CAOS!",
        deltas: { budget: +5, schedule: +5, morale: -18, stakeholders: -12 },
        outcomeNarrative:
          "Sin manuales ni soporte claro, las incidencias persiguen al equipo durante meses.",
        pmiBestPracticeScore: 6,
        pmiArea: "Gestión del Conocimiento",
        pmiFeedback:
          "Omitir el cierre formal deja cabos sueltos legales, técnicos y de aprendizaje.",
      },
      {
        id: "priv-5-c",
        code: "C",
        label: "Delegar cierre a un junior",
        description: "Dejas a una persona cerrando actas básicas.",
        hint: "⚖️ Solución media | ⚠️ Calidad limitada",
        sfxWord: "¡TRÁMITE!",
        deltas: { budget: 0, schedule: +2, morale: -5, stakeholders: +2 },
        outcomeNarrative:
          "El cierre se firma con lo mínimo, dejando algunas observaciones menores en soporte.",
        pmiBestPracticeScore: 12,
        pmiArea: "Cierre del Proyecto",
        pmiFeedback:
          "Delegar el cierre sin stakeholders clave reduce el valor de las lecciones aprendidas.",
      },
    ],
  },
];

export const PUBLIC_SCENARIOS: Scenario[] = [
  {
    id: "pub-1",
    round: 1,
    episodeCode: "CAP.01",
    title: "Impugnación en Licitación",
    sfxText: "¡AUDITORÍA!",
    narratorBox: "Sala de Control Interno. Un proveedor impugnó la adjudicación.",
    speaker: "Auditora Ritsuko",
    speakerRole: "Contraloría",
    dialogue:
      "«Un oferente alega ambigüedad en las bases. ¡Solicitamos suspender la adjudicación para revisar!»",
    imagePath: "/images/public-audit.jpg",
    options: [
      {
        id: "pub-1-a",
        code: "A",
        label: "Expediente abierto y mesa técnica",
        description: "Publicas actas y respondes cada punto con transparencia.",
        hint: "🛡️ Blindaje legal | ⏱️ Toma tiempo",
        sfxWord: "¡TRANSPARENCIA!",
        deltas: { budget: -5, schedule: -12, morale: +5, stakeholders: +15 },
        outcomeNarrative:
          "¡Contraloría desestima la impugnación! La trazabilidad blinda el proyecto ante la ciudadanía.",
        pmiBestPracticeScore: 20,
        pmiArea: "Gobernanza Pública",
        pmiFeedback:
          "La transparencia documental protege la viabilidad jurídica del proyecto.",
      },
      {
        id: "pub-1-b",
        code: "B",
        label: "Adjudicar por decreto urgente",
        description: "Avanzas sin esperar resolución formal de Contraloría.",
        hint: "⏱️ Salva fecha | ☠️ Riesgo de sanción",
        sfxWord: "¡ESCÁNDALO!",
        deltas: { budget: -10, schedule: +8, morale: -15, stakeholders: -25 },
        outcomeNarrative:
          "¡Investigación mediática y pliego de cargos! La presión política sacude al equipo.",
        pmiBestPracticeScore: 2,
        pmiArea: "Cumplimiento y Ética",
        pmiFeedback:
          "Saltarse controles normativos en el sector público genera riesgos legales críticos.",
      },
      {
        id: "pub-1-c",
        code: "C",
        label: "Declarar desierta y relanzar",
        description: "Anulas el proceso y reescribes bases desde cero.",
        hint: "⚖️ Seguro legalmente | ⏱️ Gran retraso",
        sfxWord: "¡REINICIO!",
        deltas: { budget: -10, schedule: -22, morale: -10, stakeholders: +5 },
        outcomeNarrative:
          "El expediente queda impecable, pero el retraso reduce la ventana anual de ejecución.",
        pmiBestPracticeScore: 12,
        pmiArea: "Adquisiciones",
        pmiFeedback:
          "Medida conservadora que protege el cumplimiento a un costo alto en cronograma.",
      },
    ],
  },
  {
    id: "pub-2",
    round: 2,
    episodeCode: "CAP.02",
    title: "Recorte Fiscal de Mitad de Año",
    sfxText: "¡RECORTE!",
    narratorBox: "Ministerio de Finanzas. El presupuesto nacional acaba de ajustarse.",
    speaker: "Subsec. Gendo I.",
    speakerRole: "Finanzas",
    dialogue:
      "«El Congreso recortó un 20% las partidas sociales. ¡Demuestra cómo sostienes el impacto!»",
    imagePath: "/images/scope-creep.jpg",
    options: [
      {
        id: "pub-2-a",
        code: "A",
        label: "Priorizar clínicas críticas (MoSCoW)",
        description: "Acuerdas con alcaldes asegurar las zonas vulnerables.",
        hint: "💚 Impacto social | 💰 Cuadra caja",
        sfxWord: "¡PRIORIDAD!",
        deltas: { budget: +12, schedule: -5, morale: +5, stakeholders: +8 },
        outcomeNarrative:
          "¡Acuerdo ciudadano aprobado! Las zonas más vulnerables reciben el servicio a tiempo.",
        pmiBestPracticeScore: 20,
        pmiArea: "Valor y Stakeholders",
        pmiFeedback:
          "Priorizar el valor social mediante acuerdos maximiza el impacto bajo restricción.",
      },
      {
        id: "pub-2-b",
        code: "B",
        label: "Recortar calidad y capacitación",
        description: "Mantienes cobertura en papel reduciendo especificaciones.",
        hint: "💰 Cuadra cifras | 💥 Sistema inútil",
        sfxWord: "¡FACHADA!",
        deltas: { budget: +10, schedule: +5, morale: -20, stakeholders: -18 },
        outcomeNarrative:
          "Cumples metas en papel, pero los hospitales reportan que el sistema no se puede usar.",
        pmiBestPracticeScore: 4,
        pmiArea: "Gestión de Calidad",
        pmiFeedback:
          "Sacrificar calidad y gestión del cambio anula los beneficios reales del proyecto.",
      },
      {
        id: "pub-2-c",
        code: "C",
        label: "Cofinanciamiento multilateral",
        description: "Gestionas adenda internacional para cubrir la brecha.",
        hint: "💰 Salva alcance | ⏱️ Trámites largos",
        sfxWord: "¡ALIANZA!",
        deltas: { budget: +18, schedule: -15, morale: -8, stakeholders: +5 },
        outcomeNarrative:
          "Llegan fondos externos tras intensas jornadas de gestión, salvando el alcance completo.",
        pmiBestPracticeScore: 16,
        pmiArea: "Costos e Interesados",
        pmiFeedback:
          "Buena estrategia de financiamiento alternativo considerando el tiempo de trámite.",
      },
    ],
  },
  {
    id: "pub-3",
    round: 3,
    episodeCode: "CAP.03",
    title: "Resistencia Gremial en Territorio",
    sfxText: "¡BLOQUEO!",
    narratorBox: "Centros de salud piloto. Los sindicatos amenazan con parar mañana.",
    speaker: "Misato K.",
    speakerRole: "Territorio",
    dialogue:
      "«¡Las enfermeras rechazan el sistema por sobrecarga! Amenazan con suspender el piloto.»",
    imagePath: "/images/team-crunch.jpg",
    options: [
      {
        id: "pub-3-a",
        code: "A",
        label: "Mesas de co-diseño con gremios",
        description: "Integras sus mejoras y los vuelves embajadores.",
        hint: "💚 Alta adopción | ⏱️ Toma unos días",
        sfxWord: "¡CONSENSO!",
        deltas: { budget: -6, schedule: -10, morale: +15, stakeholders: +18 },
        outcomeNarrative:
          "¡Levantan el bloqueo! Al ver sus ideas reflejadas, los gremios lideran la adopción.",
        pmiBestPracticeScore: 20,
        pmiArea: "Gestión de Interesados",
        pmiFeedback:
          "Involucrar a usuarios resistentes transforma detractores en aliados del cambio.",
      },
      {
        id: "pub-3-b",
        code: "B",
        label: "Circular de uso obligatorio",
        description: "Impones el sistema por resolución ministerial sin cambios.",
        hint: "⏱️ Sin demora hoy | 😡 Rechazo masivo",
        sfxWord: "¡IMPOSICIÓN!",
        deltas: { budget: 0, schedule: +5, morale: -18, stakeholders: -22 },
        outcomeNarrative:
          "¡Protestas en prensa! El personal boicotea la captura de datos en las clínicas.",
        pmiBestPracticeScore: 4,
        pmiArea: "Comunicaciones y Cambio",
        pmiFeedback:
          "La imposición sin gestión del cambio suele fracasar en proyectos públicos.",
      },
      {
        id: "pub-3-c",
        code: "C",
        label: "Mover piloto a otra provincia",
        description: "Evitas el conflicto cambiando de región temporalmente.",
        hint: "⚖️ Salva hito hoy | ⚠️ Riesgo latente",
        sfxWord: "¡DESVÍO!",
        deltas: { budget: -8, schedule: -2, morale: -8, stakeholders: -5 },
        outcomeNarrative:
          "El piloto avanza en otra zona, pero el conflicto nacional queda sin resolver.",
        pmiBestPracticeScore: 10,
        pmiArea: "Riesgos e Interesados",
        pmiFeedback:
          "Evadir a un interesado clave solo pospone el riesgo hacia fases más costosas.",
      },
    ],
  },
  {
    id: "pub-4",
    round: 4,
    episodeCode: "CAP.04",
    title: "Falla de Privacidad de Datos",
    sfxText: "¡PELIGRO!",
    narratorBox: "Integración con Registro Civil. Alerta de cumplimiento legal.",
    speaker: "Rei K.",
    speakerRole: "Seguridad",
    dialogue:
      "«¡Los expedientes clínicos no cumplen el cifrado de la Ley de Protección de Datos!»",
    imagePath: "/images/risk-incident.jpg",
    options: [
      {
        id: "pub-4-a",
        code: "A",
        label: "Aislar y certificar cifrado",
        description: "Frenas conexión y obtienes certificación legal completa.",
        hint: "🛡️ Cumplimiento total | 💰⏱️ Costo y plazo",
        sfxWord: "¡CERTIFICADO!",
        deltas: { budget: -14, schedule: -12, morale: +5, stakeholders: +12 },
        outcomeNarrative:
          "¡Certificación aprobada! La prensa destaca el estándar de privacidad ciudadana.",
        pmiBestPracticeScore: 20,
        pmiArea: "Riesgos y Cumplimiento",
        pmiFeedback:
          "Priorizar privacidad y marco legal protege a ciudadanos y continuidad.",
      },
      {
        id: "pub-4-b",
        code: "B",
        label: "Operar desconectado temporalmente",
        description: "Lanzas sin conexión al registro civil usando carga manual.",
        hint: "⏱️ Mantiene fecha | 🔥 Sobrecarga manual",
        sfxWord: "¡CONTINGENCIA!",
        deltas: { budget: -6, schedule: +4, morale: -15, stakeholders: -6 },
        outcomeNarrative:
          "El sistema opera aislado sin violar la ley, pero genera doble digitación en clínicas.",
        pmiBestPracticeScore: 13,
        pmiArea: "Respuesta a Riesgos",
        pmiFeedback:
          "Contingencia aceptable para cumplir la ley, aunque degrada el servicio.",
      },
      {
        id: "pub-4-c",
        code: "C",
        label: "Conectar y regularizar después",
        description: "Priorizas inauguración política ignorando el cifrado.",
        hint: "☠️ Ilegalidad grave | 💥 Riesgo cierre",
        sfxWord: "¡SANCIÓN!",
        deltas: { budget: -20, schedule: +5, morale: -22, stakeholders: -30 },
        outcomeNarrative:
          "¡La Agencia de Datos suspende el sistema de inmediato y abre expediente sancionador!",
        pmiBestPracticeScore: 0,
        pmiArea: "Gobernanza y Cumplimiento",
        pmiFeedback:
          "Ningún hito político justifica violar leyes obligatorias de protección ciudadana.",
      },
    ],
  },
  {
    id: "pub-5",
    round: 5,
    episodeCode: "CAP.05",
    title: "Audiencia de Cierre Público",
    sfxText: "¡CIERRE!",
    narratorBox: "Audiencia final ante Contraloría y sociedad civil.",
    speaker: "Auditora Ritsuko",
    speakerRole: "Contraloría",
    dialogue:
      "«Último paso para el finiquito: presenta cuentas y asegura que el Ministerio pueda operarlo.»",
    imagePath: "/images/public-audit.jpg",
    options: [
      {
        id: "pub-5-a",
        code: "A",
        label: "Portal abierto y capacitación",
        description: "Publicas ejecución presupuestal y capacitas al Ministerio.",
        hint: "🏆 Máxima legitimidad | 💚 Sostenible",
        sfxWord: "¡LEGADO!",
        deltas: { budget: -5, schedule: -5, morale: +15, stakeholders: +20 },
        outcomeNarrative:
          "¡Aplausos en audiencia! ATENA-CIVIC queda operando con transparencia y equipo propio.",
        pmiBestPracticeScore: 20,
        pmiArea: "Cierre y Sostenibilidad",
        pmiFeedback:
          "La rendición de cuentas abierta y transferencia aseguran beneficios duraderos.",
      },
      {
        id: "pub-5-b",
        code: "B",
        label: "Solo informe mínimo cerrado",
        description: "Cumples papeleo básico sin portal ni acompañamiento.",
        hint: "⏱️ Ahorra esfuerzo | 😕 Dudas operativas",
        sfxWord: "¡MÍNIMO!",
        deltas: { budget: +4, schedule: +4, morale: -8, stakeholders: -10 },
        outcomeNarrative:
          "Aprueban con observaciones, pero el Ministerio tarda meses en entender la operación.",
        pmiBestPracticeScore: 10,
        pmiArea: "Cierre Administrativo",
        pmiFeedback:
          "Cumplir solo lo mínimo burocrático debilita la transferencia de beneficios.",
      },
      {
        id: "pub-5-c",
        code: "C",
        label: "Extender consultores externos",
        description: "Evitas transferir operación y renuevas contratos externos.",
        hint: "💰 Gasto continuo | 😠 Crítica fiscal",
        sfxWord: "¡DEPENDENCIA!",
        deltas: { budget: -18, schedule: 0, morale: -5, stakeholders: -12 },
        outcomeNarrative:
          "Contraloría cuestiona la dependencia eterna de consultores y exige transición.",
        pmiBestPracticeScore: 6,
        pmiArea: "Transición y Operaciones",
        pmiFeedback:
          "Un proyecto es temporal; debe transferir capacidades a la operación permanente.",
      },
    ],
  },
];
