import { Scenario } from "./types";

export const PRIVATE_LEVEL3_SCENARIOS: Scenario[] = [
  {
    id: "priv-l3-1",
    round: 1,
    episodeCode: "PROY·01",
    pmbokDomain: "Principios y Valor",
    title: "Concepción: App Regional de Quejas (Acta)",
    sfxText: "¡INICIO!",
    narratorBox:
      "Proyecto Maestro Privado (CAPEX $500k / 24 sem): Diseñar App Corporativa con Mecanismo de Quejas para 8 Regionales.",
    speaker: "CEO",
    speakerRole: "Patrocinador Ejecutivo",
    dialogue:
      "«Cada regional maneja las quejas en Excel y perdemos clientes. Quiero lanzar esta app ya, ¿cómo arrancamos la fase de Inicio?»",
    imagePath: "/images/cover.jpg",
    options: [
      {
        id: "priv-l3-1-a",
        code: "A",
        label: "Acta de Constitución + Caso de Negocios",
        description:
          "Defines objetivo medible (-40% tiempo de resolución), autoridad del DP, 8 regionales interesadas y presupuesto base ($500k).",
        hint: "📜 Gobernanza clara | 💰 $0 desvío",
        sfxWord: "¡ACTA OK!",
        deltas: { budget: +4, schedule: +4, morale: +4, stakeholders: +10 },
        outcomeNarrative:
          "Acta aprobada en 1 semana. Las 8 regionales tienen criterios claros de éxito y patrocinio formal.",
        pmiBestPracticeScore: 75,
        pmiArea: "Iniciación y Acta (Cap. 4.5 / 4.7)",
        pmiFeedback:
          "Excelente inicio: el Acta de Constitución alinea objetivos de valor, alcance macro y autoridad del DP.",
      },
      {
        id: "priv-l3-1-b",
        code: "B",
        label: "Programar pantallas de inmediato",
        description: "Empiezas desarrollo sin Acta ni objetivos medibles para ganar tiempo.",
        hint: "⚡ Rápido hoy | 💸 -$45k en retrabajo",
        sfxWord: "¡SIN RUMBO!",
        deltas: { budget: -10, schedule: -8, morale: -6, stakeholders: -10 },
        outcomeNarrative:
          "Al mes descubren que cada regional usa flujos legales distintos; pierden $45,000 USD y 3 semanas rehaciendo.",
        pmiBestPracticeScore: 20,
        pmiArea: "Iniciación (Cap. 4.4)",
        pmiFeedback:
          "Ejecutar sin Acta ni análisis de interesados multiplica el retrabajo desde la base.",
      },
      {
        id: "priv-l3-1-c",
        code: "C",
        label: "Estudio de mercado de 6 semanas",
        description: "Contratas consultora externa para analizar apps de la competencia antes del Acta.",
        hint: "🔍 Detallado | 💸 -$30k / -3 sem",
        sfxWord: "¡DEMORA!",
        deltas: { budget: -8, schedule: -10, morale: 0, stakeholders: -4 },
        outcomeNarrative:
          "Consumes $30,000 USD y 3 semanas de cronograma en estudio redundante.",
        pmiBestPracticeScore: 40,
        pmiArea: "Caso de Negocios (Cap. 4.5)",
        pmiFeedback:
          "El análisis previo debe ser ágil y enfocado en el problema interno de las regionales.",
      },
    ],
  },
  {
    id: "priv-l3-2",
    round: 2,
    episodeCode: "PROY·02",
    pmbokDomain: "Alcance y EDT",
    title: "Alcance y EDT: Requisitos de las 8 Regionales",
    sfxText: "¡ALCANCE!",
    narratorBox:
      "Fase de Alcance: Los 8 gerentes regionales envían 95 requisitos contradictorios para el módulo de quejas.",
    speaker: "Product Owner",
    speakerRole: "Enlace Regional",
    dialogue:
      "«La Regional Norte exige anonimato total; la Sur exige geolocalización obligatoria y CRM propio. ¡No caben 95 funciones en 24 semanas!»",
    imagePath: "/images/scope-creep.jpg",
    options: [
      {
        id: "priv-l3-2-a",
        code: "A",
        label: "Incluir los 95 requisitos en el alcance",
        description: "Prometes todo para dejar contentos a los 8 gerentes regionales.",
        hint: "😊 Aplauso hoy | 💸 -$90k / -6 sem",
        sfxWord: "¡INFLADO!",
        deltas: { budget: -18, schedule: -16, morale: -10, stakeholders: +4 },
        outcomeNarrative:
          "El alcance explota (+$90,000 USD y +6 semanas estimadas). El equipo no da abasto.",
        pmiBestPracticeScore: 15,
        pmiArea: "Definir Alcance (Cap. 6.3)",
        pmiFeedback:
          "Aceptar requisitos sin priorización destruye la viabilidad financiera y temporal del proyecto.",
      },
      {
        id: "priv-l3-2-b",
        code: "B",
        label: "EDT al 100% + Flujo Core Estandarizado",
        description:
          "Facilitan taller MoSCoW: definen EDT de entregables core (captura, SLA, escalamiento) y parametrización por regional.",
        hint: "📐 EDT clara | 💰 En presupuesto",
        sfxWord: "¡EDT 100%!",
        deltas: { budget: +2, schedule: +6, morale: +6, stakeholders: +8 },
        outcomeNarrative:
          "Cierran una EDT clara con 32 requisitos core parametrizables; ahorran $25,000 USD en desarrollo duplicado.",
        pmiBestPracticeScore: 75,
        pmiArea: "Requisitos y EDT/WBS (Cap. 6.2 / 6.4)",
        pmiFeedback:
          "Impecable: estandarizar el núcleo en la EDT y parametrizar variantes regionales protege costo y plazo.",
      },
      {
        id: "priv-l3-2-c",
        code: "C",
        label: "Imponer diseño único de Casa Matriz",
        description: "Ignoras las particularidades legales de las regionales para simplificar.",
        hint: "⚡ Simple | 😠 Rechazo regional",
        sfxWord: "¡RIGIDEZ!",
        deltas: { budget: +2, schedule: +2, morale: 0, stakeholders: -14 },
        outcomeNarrative:
          "Tres regionales advierten que no usarán la app porque incumple sus normativas locales.",
        pmiBestPracticeScore: 35,
        pmiArea: "Analizar Requisitos (Cap. 6.2)",
        pmiFeedback:
          "Omitir restricciones legales regionales invalida la adopción del producto.",
      },
    ],
  },
  {
    id: "priv-l3-3",
    round: 3,
    episodeCode: "PROY·03",
    pmbokDomain: "Cronograma y Línea Base",
    title: "Cronograma: Ruta Crítica e Integración ERP",
    sfxText: "¡RUTA CRÍTICA!",
    narratorBox:
      "Fase de Cronograma: La integración con el sistema de tickets central toma 8 semanas en serie.",
    speaker: "Rei K.",
    speakerRole: "Arquitecta",
    dialogue:
      "«El API de tickets central depende de otro equipo y está en nuestra Ruta Crítica. Si se atrasa, toda la app se corre.»",
    imagePath: "/images/public-no-baseline.jpg",
    options: [
      {
        id: "priv-l3-3-a",
        code: "A",
        label: "Línea Base CPM + Desacoplar con Mock API",
        description:
          "Apruebas Línea Base del Cronograma y desacoplas el frontend usando contrato API simulado para avanzar en paralelo.",
        hint: "📐 CPM protegido | ⏱️ -2 sem ciclo",
        sfxWord: "¡PARALELO!",
        deltas: { budget: -2, schedule: +10, morale: +4, stakeholders: +6 },
        outcomeNarrative:
          "Ahorran 2 semanas reales en ruta crítica con un costo mínimo de $8,000 USD en entorno mock.",
        pmiBestPracticeScore: 75,
        pmiArea: "Cronograma y Ruta Crítica (Cap. 7.5–7.6)",
        pmiFeedback:
          "Excelente técnica de gestión de dependencias: proteger la ruta crítica sin generar retrabajo.",
      },
      {
        id: "priv-l3-3-b",
        code: "B",
        label: "Esperar secuencialmente al API",
        description: "No inicias el módulo de seguimiento hasta que el equipo central entregue su API.",
        hint: "🐢 +4 sem atraso | 💸 Costo fijo sube",
        sfxWord: "¡ESPERA!",
        deltas: { budget: -8, schedule: -16, morale: -4, stakeholders: -6 },
        outcomeNarrative:
          "El equipo central se atrasa 4 semanas y arrastras -$40,000 USD de costo fijo de planilla ociosa.",
        pmiBestPracticeScore: 25,
        pmiArea: "Secuenciar Actividades (Cap. 7.3)",
        pmiFeedback:
          "La dependencia pasiva en ruta crítica dispara costos fijos por tiempo improductivo.",
      },
      {
        id: "priv-l3-3-c",
        code: "C",
        label: "Crear base de datos paralela aislada",
        description: "Duplicas la base de clientes fuera del ERP para no depender del API.",
        hint: "💸 -$35k | 🚨 Datos duplicados",
        sfxWord: "¡SILOS!",
        deltas: { budget: -10, schedule: -2, morale: -6, stakeholders: -10 },
        outcomeNarrative:
          "Generas inconsistencias graves entre quejas y facturación de clientes (-$35,000 USD en conciliación).",
        pmiBestPracticeScore: 20,
        pmiArea: "Calidad e Integración (Cap. 5.5)",
        pmiFeedback:
          "Duplicar fuentes de verdad crea deuda técnica y costos operativos permanentes.",
      },
    ],
  },
  {
    id: "priv-l3-4",
    round: 4,
    episodeCode: "PROY·04",
    pmbokDomain: "Finanzas y Valor Ganado",
    title: "Presupuesto: Desvío en Licencias y Cloud",
    sfxText: "¡PRESUPUESTO!",
    narratorBox:
      "Fase Financiera: El proveedor de notificaciones SMS/Push para las 8 regionales sube tarifas un 35%.",
    speaker: "CFO",
    speakerRole: "Finanzas Corporativas",
    dialogue:
      "«Ese incremento de tarifas representa +$42,000 USD no previstos en la línea base de costos.»",
    imagePath: "/images/public-siafi-budget.jpg",
    options: [
      {
        id: "priv-l3-4-a",
        code: "A",
        label: "Optimizar arquitectura + Reserva Contingencia",
        description:
          "Usas notificaciones Push nativas gratis para el 80% de alertas, dejas SMS solo para críticas y cubres $12k con reserva.",
        hint: "💰 Ahorra $30k | 📊 EVM sano",
        sfxWord: "¡OPTIMIZADO!",
        deltas: { budget: +6, schedule: 0, morale: +2, stakeholders: +6 },
        outcomeNarrative:
          "Reduces el impacto de $42,000 USD a solo $12,000 USD cubiertos por reserva de contingencia.",
        pmiBestPracticeScore: 75,
        pmiArea: "Costos y Presupuesto (Cap. 8.4–8.5)",
        pmiFeedback:
          "Ingeniería de valor combinada con uso disciplinado de reservas de contingencia.",
      },
      {
        id: "priv-l3-4-b",
        code: "B",
        label: "Absorber el +$42k sin ajustar nada",
        description: "Apruebas el gasto completo consumiendo reserva y margen.",
        hint: "💸 -$42k directo | 📉 CPI cae",
        sfxWord: "¡SOBRECOSTO!",
        deltas: { budget: -14, schedule: 0, morale: 0, stakeholders: -4 },
        outcomeNarrative:
          "Tu CPI cae a 0.89 por absorber el incremento sin buscar alternativas.",
        pmiBestPracticeScore: 30,
        pmiArea: "Control de Costos (Cap. 13.6)",
        pmiFeedback:
          "No optimizar costos variables erosiona el margen y la reserva para riesgos futuros.",
      },
      {
        id: "priv-l3-4-c",
        code: "C",
        label: "Eliminar todas las notificaciones",
        description: "Quitas alertas al cliente para ahorrar los $42,000 USD.",
        hint: "💰 Ahorra todo | 😠 Queja sin aviso",
        sfxWord: "¡MUDO!",
        deltas: { budget: +4, schedule: 0, morale: -4, stakeholders: -16 },
        outcomeNarrative:
          "Los usuarios no saben si su queja fue recibida y llaman al call center saturándolo.",
        pmiBestPracticeScore: 25,
        pmiArea: "Valor y Requisitos (Cap. 3.3)",
        pmiFeedback:
          "Recortar atributos clave de experiencia destruye el propósito del mecanismo de quejas.",
      },
    ],
  },
  {
    id: "priv-l3-5",
    round: 5,
    episodeCode: "PROY·05",
    pmbokDomain: "Riesgos y Respuestas",
    title: "Riesgos y Calidad: Privacidad en Quejas Sensibles",
    sfxText: "¡RIESGO!",
    narratorBox:
      "Ejecución: Pruebas de seguridad detectan que supervisores regionales podrían ver quejas confidenciales de acoso o fraude.",
    speaker: "Misato R.",
    speakerRole: "Oficial de Seguridad",
    dialogue:
      "«Sin control de acceso basado en roles (RBAC) y cifrado por categoría, habrá filtraciones internas graves.»",
    imagePath: "/images/risk-incident.jpg",
    options: [
      {
        id: "priv-l3-5-a",
        code: "A",
        label: "Implementar RBAC + Auditoría de accesos",
        description:
          "Inviertes 1 semana y $15,000 USD en RBAC estricto y pruebas de penetración antes del piloto.",
        hint: "🛡️ Cero fugas | 💸 -$15k / -1 sem",
        sfxWord: "¡BLINDADO!",
        deltas: { budget: -4, schedule: -2, morale: +6, stakeholders: +10 },
        outcomeNarrative:
          "El módulo pasa auditoría de seguridad con 0 hallazgos críticos y protege a los denunciantes.",
        pmiBestPracticeScore: 75,
        pmiArea: "Riesgos y Calidad (Cap. 11.6 / 12.2)",
        pmiFeedback:
          "Invertir $15k en prevención evita demandas y crisis reputacionales millonarias.",
      },
      {
        id: "priv-l3-5-b",
        code: "B",
        label: "Lanzar solo con acuerdo de confidencialidad",
        description: "Pides a los gerentes firmar PDF prometiendo no abrir quejas sensibles.",
        hint: "📄 Papel débil | 💥 Fuga casi segura",
        sfxWord: "¡VULNERABLE!",
        deltas: { budget: 0, schedule: +2, morale: -10, stakeholders: -20 },
        outcomeNarrative:
          "En la primera semana se filtra una queja interna en una regional y estalla crisis laboral.",
        pmiBestPracticeScore: 15,
        pmiArea: "Respuesta a Riesgos (Cap. 11.6)",
        pmiFeedback:
          "Los controles administrativos no sustituyen controles técnicos ante riesgos de alto impacto.",
      },
      {
        id: "priv-l3-5-c",
        code: "C",
        label: "Centralizar todas las quejas en Matriz",
        description: "Quitas acceso a las regionales y que Matriz atienda todo manualmente.",
        hint: "🔒 Seguro | 🐢 Cuello de botella",
        sfxWord: "¡SATURADO!",
        deltas: { budget: -6, schedule: -8, morale: -6, stakeholders: -8 },
        outcomeNarrative:
          "Matriz colapsa con 600 tickets semanales sin contexto local.",
        pmiBestPracticeScore: 35,
        pmiArea: "Diseño de Solución (Cap. 6.2)",
        pmiFeedback:
          "Anula la autonomía regional que motivó el proyecto.",
      },
    ],
  },
  {
    id: "priv-l3-6",
    round: 6,
    episodeCode: "PROY·06",
    pmbokDomain: "Recursos y Liderazgo",
    title: "Despliegue Piloto y Adopción en Regionales",
    sfxText: "¡PILOTO!",
    narratorBox:
      "Ejecución y Recursos: Llega la hora de desplegar en las 8 regionales y capacitar a 120 gestores.",
    speaker: "Líder de Cambio",
    speakerRole: "Operaciones Regionales",
    dialogue:
      "«Dos regionales tienen alta rotación de personal y resisten la herramienta nueva por miedo a ser evaluados con métricas de SLA.»",
    imagePath: "/images/team-crunch.jpg",
    options: [
      {
        id: "priv-l3-6-a",
        code: "A",
        label: "Piloto en 2 regionales + Campeones locales",
        description:
          "Ejecutas piloto de 2 semanas en 2 regionales, formas 'campeones' locales y ajustas UX antes del roll-out total.",
        hint: "🤝 Adopción real | ⚡ Menor soporte",
        sfxWord: "¡ADOPCIÓN!",
        deltas: { budget: -2, schedule: +4, morale: +10, stakeholders: +10 },
        outcomeNarrative:
          "Los campeones regionales resuelven dudas en sitio; la tasa de adopción llega al 94% en las 8 regionales.",
        pmiBestPracticeScore: 75,
        pmiArea: "Recursos, Comunicaciones y Cambio (Cap. 12.4 / 18.1)",
        pmiFeedback:
          "Despliegue por olas con campeones locales minimiza resistencia y costos de soporte.",
      },
      {
        id: "priv-l3-6-b",
        code: "B",
        label: "Manual PDF por correo y corte obligatorio",
        description: "Apagas el Excel el lunes y envías un manual de 60 páginas por email.",
        hint: "💸 $0 capacitación | 💥 Caos SLA",
        sfxWord: "¡COLAPSO!",
        deltas: { budget: -8, schedule: -10, morale: -12, stakeholders: -14 },
        outcomeNarrative:
          "Los gestores cometen errores masivos y el call center recibe 3x más reclamos (-$30k en soporte).",
        pmiBestPracticeScore: 20,
        pmiArea: "Compromiso de Interesados (Cap. 12.4)",
        pmiFeedback:
          "La falta de gestión del cambio destruye el retorno de una buena solución técnica.",
      },
      {
        id: "priv-l3-6-c",
        code: "C",
        label: "Contratar 6 consultores para operar por ellos",
        description: "Pones externos a cargar las quejas en las regionales rezagadas.",
        hint: "💸 -$40k | 🔁 Dependencia",
        sfxWord: "¡CARO!",
        deltas: { budget: -14, schedule: -2, morale: -4, stakeholders: +2 },
        outcomeNarrative:
          "Cuesta $40,000 USD extra y cuando se van los consultores las regionales siguen sin saber usar la app.",
        pmiBestPracticeScore: 30,
        pmiArea: "Adquirir Recursos (Cap. 12.6)",
        pmiFeedback:
          "Sustituir la capacitación por operación externa no genera capacidad instalada.",
      },
    ],
  },
  {
    id: "priv-l3-7",
    round: 7,
    episodeCode: "PROY·07",
    pmbokDomain: "Gobernanza y Cambios",
    title: "Control de Cambios: App Ciudadana vs. Interna",
    sfxText: "¡CAMBIO!",
    narratorBox:
      "Monitoreo y Control (Semana 19): Gerencia Comercial pide agregar módulo público de reseñas con calificación de estrellas.",
    speaker: "Gerente Comercial",
    speakerRole: "Comité de Producto",
    dialogue:
      "«Ya que la app funciona bien en las regionales, agreguemos reseñas públicas en Google/AppStore dentro de este cierre.»",
    imagePath: "/images/private-closing-value.jpg",
    options: [
      {
        id: "priv-l3-7-a",
        code: "A",
        label: "Evaluar impacto en CCB -> Backlog Fase 2",
        description:
          "Calculas impacto (+$55,000 USD, +5 semanas, riesgo legal de reseñas) y el CCB aprueba pasarlo como Fase 2.",
        hint: "🛡️ Cierra a tiempo | 📊 Datos exactos",
        sfxWord: "¡FASE 2!",
        deltas: { budget: +4, schedule: +6, morale: +6, stakeholders: +6 },
        outcomeNarrative:
          "Proteges el cierre del proyecto actual en presupuesto y plazo, dejando la Fase 2 financiada.",
        pmiBestPracticeScore: 75,
        pmiArea: "Evaluar Cambios y Validar Alcance (Cap. 13.2–13.3)",
        pmiFeedback:
          "Decisión ejemplar de Monitoreo y Control: evitar scope creep en la recta final.",
      },
      {
        id: "priv-l3-7-b",
        code: "B",
        label: "Incluirlo sin mover fecha de cierre",
        description: "Aceptas meter el módulo público en las últimas 5 semanas.",
        hint: "💸 -$55k / -5 sem | 🔥 Burnout",
        sfxWord: "¡DESBORDE!",
        deltas: { budget: -16, schedule: -16, morale: -14, stakeholders: -4 },
        outcomeNarrative:
          "El proyecto se pasa $55,000 USD del presupuesto y no cierra en el trimestre.",
        pmiBestPracticeScore: 15,
        pmiArea: "Control de Alcance (Cap. 13.3)",
        pmiFeedback:
          "Agregar cambios mayores sin ajustar triple restricción garantiza incumplimiento.",
      },
      {
        id: "priv-l3-7-c",
        code: "C",
        label: "Poner un formulario básico sin moderación",
        description: "Publicas un link abierto rápido para cumplir en apariencia.",
        hint: "⚡ Rápido | 🚨 Spam y quejas falsas",
        sfxWord: "¡SPAM!",
        deltas: { budget: -4, schedule: -2, morale: -4, stakeholders: -12 },
        outcomeNarrative:
          "El formulario público se llena de spam y bots en 48 horas.",
        pmiBestPracticeScore: 25,
        pmiArea: "Control de Calidad (Cap. 13.4)",
        pmiFeedback:
          "Entregar soluciones improvisadas daña la calidad y la reputación.",
      },
    ],
  },
  {
    id: "priv-l3-8",
    round: 8,
    episodeCode: "PROY·08",
    pmbokDomain: "Beneficios y Cierre",
    title: "Cierre Integral y Medición de Impacto Regional",
    sfxText: "¡CIERRE!",
    narratorBox:
      "Cierre del Proyecto: Hora de validar entregables en las 8 regionales, medir reducción de tiempos y cerrar contratos.",
    speaker: "Directorio",
    speakerRole: "Comité de Cierre",
    dialogue:
      "«¿Cuál es el balance final de presupuesto, tiempo de resolución de quejas y entrega a Operaciones?»",
    imagePath: "/images/victory.jpg",
    options: [
      {
        id: "priv-l3-8-a",
        code: "A",
        label: "Validación 8 regionales + Acta + KPIs",
        description:
          "Verificas aceptación formal de las 8 regionales, entregas SLA (-46% tiempo de resolución), cierras contratos y lecciones.",
        hint: "🏆 Impacto probado | 📚 Cierre 100%",
        sfxWord: "¡ÉXITO!",
        deltas: { budget: +4, schedule: +4, morale: +8, stakeholders: +12 },
        outcomeNarrative:
          "Proyecto cerrado dentro de tolerancia: tiempo de respuesta bajó 46% y el ROI proyectado se cumple en 8 meses.",
        pmiBestPracticeScore: 75,
        pmiArea: "Cierre y Beneficios (Cap. 4.6 / 14.1)",
        pmiFeedback:
          "Cierre end-to-end perfecto: conecta alcance, presupuesto, cronograma y beneficios medidos.",
      },
      {
        id: "priv-l3-8-b",
        code: "B",
        label: "Cerrar solo con firma de TI",
        description: "Das por cerrado el proyecto sin actas de las 8 gerencias regionales.",
        hint: "📄 Incompleto | 😠 Reclamos luego",
        sfxWord: "¡PARCIAL!",
        deltas: { budget: 0, schedule: +2, morale: -4, stakeholders: -14 },
        outcomeNarrative:
          "Dos regionales desconocen la entrega y siguen reportando incidentes fuera de sistema.",
        pmiBestPracticeScore: 25,
        pmiArea: "Validar Alcance y Cierre (Cap. 13.3 / 14.1)",
        pmiFeedback:
          "El cierre requiere aceptación formal de los usuarios/clientes internos clave.",
      },
      {
        id: "priv-l3-8-c",
        code: "C",
        label: "Dejar equipo en soporte indefinido",
        description: "No transfieres a Mesa de Ayuda y dejas al equipo de proyecto atendiendo tickets.",
        hint: "💸 -$25k/mes | ⏳ Sin cierre",
        sfxWord: "¡SIN FIN!",
        deltas: { budget: -12, schedule: -6, morale: -6, stakeholders: 0 },
        outcomeNarrative:
          "El proyecto consume $25,000 USD extra al mes sin pasar a operación formal.",
        pmiBestPracticeScore: 35,
        pmiArea: "Transición Operativa (Cap. 14.1)",
        pmiFeedback:
          "Todo proyecto debe transferir la operación y liberar formalmente sus recursos.",
      },
    ],
  },
];

export const PUBLIC_LEVEL3_SCENARIOS: Scenario[] = [
  {
    id: "pub-l3-1",
    round: 1,
    episodeCode: "PROY·01",
    pmbokDomain: "Principios y Valor",
    title: "Concepción: Puente Estratégico (Acta y Preinversión)",
    sfxText: "¡INICIO!",
    narratorBox:
      "Proyecto Maestro Público ($1.2M USD / 36 sem): Construcción de Puente Vehicular y Peatonal sobre Río Bravo.",
    speaker: "Ministro de Obras",
    speakerRole: "Patrocinador Público",
    dialogue:
      "«La comunidad lleva años aislada en época de lluvias. Queremos colocar la primera piedra la próxima semana, ¿qué autorizamos primero?»",
    imagePath: "/images/public-political-scope.jpg",
    options: [
      {
        id: "pub-l3-1-a",
        code: "A",
        label: "Acta + Estudios de Preinversión y Valor",
        description:
          "Formalizas Acta de Constitución vinculada al estudio hidrológico/suelos, impacto vial y código SNIP/SIAFI antes de licitar.",
        hint: "📐 Base técnica | 🛡️ Cero elefante blanco",
        sfxWord: "¡VIABLE!",
        deltas: { budget: +4, schedule: +2, morale: +6, stakeholders: +10 },
        outcomeNarrative:
          "El proyecto nace con factibilidad técnica, ambiental y código presupuestario habilitado.",
        pmiBestPracticeScore: 75,
        pmiArea: "Iniciación y Caso de Negocios (Cap. 4.5–4.7)",
        pmiFeedback:
          "En infraestructura pública, iniciar sin estudios de preinversión y Acta formal garantiza sobrecostos.",
      },
      {
        id: "pub-l3-1-b",
        code: "B",
        label: "Licitar obra con diseño preliminar",
        description: "Adjudicas construcción sin estudio de suelos completo para la foto inaugural.",
        hint: "📸 Foto rápida | 💸 -$240k en órdenes cambio",
        sfxWord: "¡RIESGO!",
        deltas: { budget: -18, schedule: -14, morale: -8, stakeholders: +2 },
        outcomeNarrative:
          "Al excavar encuentran suelo inestable; las adendas de cimentación disparan el costo +$240,000 USD.",
        pmiBestPracticeScore: 15,
        pmiArea: "Iniciación y Riesgos (Cap. 4.4)",
        pmiFeedback:
          "Licitar obra civil sin estudios de ingeniería completos es la causa #1 de sobrecostos públicos.",
      },
      {
        id: "pub-l3-1-c",
        code: "C",
        label: "Ampliar estudio a puente doble vía",
        description: "Cambias la concepción sin validar demanda ni techo presupuestario.",
        hint: "💸 Sin techo | ⏳ +8 sem",
        sfxWord: "¡DESCALCE!",
        deltas: { budget: -10, schedule: -12, morale: -2, stakeholders: -6 },
        outcomeNarrative:
          "El nuevo diseño excede el techo fiscal asignado y obliga a rehacer la preinversión.",
        pmiBestPracticeScore: 30,
        pmiArea: "Gobernanza Inicial (Cap. 5.2)",
        pmiFeedback:
          "El alcance debe ajustarse a la demanda validada y al techo financiero autorizado.",
      },
    ],
  },
  {
    id: "pub-l3-2",
    round: 2,
    episodeCode: "PROY·02",
    pmbokDomain: "Alcance y EDT",
    title: "Alcance y EDT: Accesos, Estribos y Mitigación",
    sfxText: "¡EDT OBRA!",
    narratorBox:
      "Fase de Alcance: El diseño del puente omite los caminos de acceso (400m) y el paso peatonal seguro.",
    speaker: "Ing. Civil Jefe",
    speakerRole: "Especialista Estructural",
    dialogue:
      "«El pliego solo cubre la estructura metálica del puente, pero sin estribos ni accesos pavimentados nadie podrá cruzarlo.»",
    imagePath: "/images/public-impact-gap.jpg",
    options: [
      {
        id: "pub-l3-2-a",
        code: "A",
        label: "Integrar Accesos y Paso Peatonal en EDT",
        description:
          "Incluyes el 100% de entregables funcionales en la EDT (cimentación, superestructura, estribos, accesos y señalización).",
        hint: "🌉 Puente funcional | 📊 Regla 100% EDT",
        sfxWord: "¡INTEGRAL!",
        deltas: { budget: -4, schedule: +4, morale: +6, stakeholders: +12 },
        outcomeNarrative:
          "Aseguras conectividad real desde el día 1 y evitas un puente desconectado de la vía.",
        pmiBestPracticeScore: 75,
        pmiArea: "Definir Alcance y EDT (Cap. 6.3–6.4)",
        pmiFeedback:
          "La regla del 100% de la EDT asegura que el entregable sea usable y genere impacto vial real.",
      },
      {
        id: "pub-l3-2-b",
        code: "B",
        label: "Construir solo el puente sin accesos",
        description: "Dejas los accesos para 'otro proyecto futuro' de la municipalidad.",
        hint: "💰 Ahorra hoy | 💥 Puente inutilizable",
        sfxWord: "¡AISLADO!",
        deltas: { budget: +2, schedule: +2, morale: -8, stakeholders: -22 },
        outcomeNarrative:
          "El puente queda en pie sobre el río pero sin conexión vial; escándalo nacional por obra inconclusa.",
        pmiBestPracticeScore: 10,
        pmiArea: "Valor e Impacto (Cap. 3.3 / 4.6)",
        pmiFeedback:
          "Entregar un producto físico sin funcionalidad integral destruye el valor público.",
      },
      {
        id: "pub-l3-2-c",
        code: "C",
        label: "Agregar ciclovía y mirador turístico",
        description: "Sumas extras estéticos no solicitados consumiendo $95,000 USD.",
        hint: "✨ Gold plating | 💸 -$95k",
        sfxWord: "¡EXCESO!",
        deltas: { budget: -14, schedule: -8, morale: 0, stakeholders: -4 },
        outcomeNarrative:
          "El presupuesto de obras básicas queda comprometido por acabados no prioritarios.",
        pmiBestPracticeScore: 25,
        pmiArea: "Control de Alcance (Cap. 6.3)",
        pmiFeedback:
          "El 'gold plating' desvía fondos escasos de los objetivos esenciales del proyecto.",
      },
    ],
  },
  {
    id: "pub-l3-3",
    round: 3,
    episodeCode: "PROY·03",
    pmbokDomain: "Cronograma y Línea Base",
    title: "Cronograma: Ventana Hidrológica y Pilotes",
    sfxText: "¡RUTA CRÍTICA!",
    narratorBox:
      "Fase de Cronograma: La temporada de crecidas del río inicia en 14 semanas. Los pilotes en cauce toman 11 semanas.",
    speaker: "Ing. Solís",
    speakerRole: "Programador de Obra",
    dialogue:
      "«Si no hincamos los pilotes antes de la crecida, perderemos toda la ventana seca y la obra se atrasará 5 meses.»",
    imagePath: "/images/public-no-baseline.jpg",
    options: [
      {
        id: "pub-l3-3-a",
        code: "A",
        label: "Línea Base CPM + Prefabricar vigas en paralelo",
        description:
          "Apruebas Línea Base priorizando pilotes en cauce y prefabricas vigas en patio simultáneamente (-3 semanas en ruta crítica).",
        hint: "📐 Ruta crítica | ⏱️ Salva ventana seca",
        sfxWord: "¡A TIEMPO!",
        deltas: { budget: -4, schedule: +10, morale: +6, stakeholders: +8 },
        outcomeNarrative:
          "Los pilotes quedan fundidos en semana 10, justo antes de la crecida; ganas 3 semanas de holgura.",
        pmiBestPracticeScore: 75,
        pmiArea: "Cronograma y Ruta Crítica (Cap. 7.5–7.6)",
        pmiFeedback:
          "Planificación maestra: alinear la ruta crítica con restricciones climáticas externas.",
      },
      {
        id: "pub-l3-3-b",
        code: "B",
        label: "Obra secuencial tradicional",
        description: "Inicias excavación y compra de acero después de terminar permisos menores.",
        hint: "🐢 +20 sem atraso | 💸 -$160k",
        sfxWord: "¡CRECIDA!",
        deltas: { budget: -16, schedule: -22, morale: -10, stakeholders: -14 },
        outcomeNarrative:
          "La crecida inunda la excavación en semana 12; la obra se paraliza 5 meses (+$160k en gastos generales).",
        pmiBestPracticeScore: 15,
        pmiArea: "Gestión del Cronograma (Cap. 7.5)",
        pmiFeedback:
          "No proteger hitos sensibles al clima genera retrasos y sobrecostos exponenciales.",
      },
      {
        id: "pub-l3-3-c",
        code: "C",
        label: "Trabajar dentro del río en crecida",
        description: "Mantienes maquinaria en el cauce durante lluvias para no parar.",
        hint: "🚨 Peligro fatal | 💥 Pérdida equipo",
        sfxWord: "¡EMERGENCIA!",
        deltas: { budget: -18, schedule: -12, morale: -18, stakeholders: -16 },
        outcomeNarrative:
          "La corriente arrastra ataguías y equipo; incidente grave de seguridad laboral.",
        pmiBestPracticeScore: 10,
        pmiArea: "Seguridad y Riesgos (Cap. 11.6)",
        pmiFeedback:
          "Nunca se debe comprometer la seguridad humana ni ignorar riesgos físicos extremos.",
      },
    ],
  },
  {
    id: "pub-l3-4",
    round: 4,
    episodeCode: "PROY·04",
    pmbokDomain: "Finanzas y Valor Ganado",
    title: "Finanzas SIAFI: Alza del Acero y Cemento",
    sfxText: "¡SIAFI + EVM!",
    narratorBox:
      "Fase Financiera: El índice de precios de acero estructural sube 22% (+$110,000 USD sobre el estimado).",
    speaker: "Lic. Paredes",
    speakerRole: "Finanzas SIAFI",
    dialogue:
      "«El contrato contempla fórmula de reajuste, pero necesitamos asegurar el crédito presupuestario en SIAFI antes de emitir la estimación.»",
    imagePath: "/images/public-siafi-budget.jpg",
    options: [
      {
        id: "pub-l3-4-a",
        code: "A",
        label: "Activar reserva + Compra anticipada acopiada",
        description:
          "Tramitas habilitación en SIAFI con reserva de contingencia y fijas precio mediante compra anticipada certificada de acero.",
        hint: "💰 Congela alza | 📑 Legalidad SIAFI",
        sfxWord: "¡COBERTURA!",
        deltas: { budget: +4, schedule: +2, morale: +2, stakeholders: +8 },
        outcomeNarrative:
          "Fijas el precio del acero restante evitando otra alza de $65,000 USD y mantienes flujo de pagos SIAFI al día.",
        pmiBestPracticeScore: 75,
        pmiArea: "Finanzas y Adquisiciones (Cap. 8.5 / 13.6)",
        pmiFeedback:
          "Excelente gestión financiera: cobertura de precios dentro del marco presupuestario SIAFI.",
      },
      {
        id: "pub-l3-4-b",
        code: "B",
        label: "Retrasar pagos al contratista",
        description: "No tramitas el reajuste en SIAFI y dejas que el contratista financie el alza.",
        hint: "💸 Cero trámite | 🛑 Obra paralizada",
        sfxWord: "¡PARO OBRA!",
        deltas: { budget: -10, schedule: -16, morale: -8, stakeholders: -14 },
        outcomeNarrative:
          "El contratista suspende obra por mora en planillas y cobra intereses legales (+$90,000 USD).",
        pmiBestPracticeScore: 20,
        pmiArea: "Controlar Adquisiciones (Cap. 13.13)",
        pmiFeedback:
          "Incumplir pagos contractuales válidos genera paralizaciones e intereses moratorios.",
      },
      {
        id: "pub-l3-4-c",
        code: "C",
        label: "Reducir espesor de losa sin cálculo",
        description: "Bajas especificaciones de acero para ahorrar sin recalcular.",
        hint: "💰 Ahorra acero | 🚨 Falla estructural",
        sfxWord: "¡COLAPSO!",
        deltas: { budget: 0, schedule: -4, morale: -12, stakeholders: -24 },
        outcomeNarrative:
          "Supervisión rechaza la losa por incumplir norma sísmica; hay que demoler y rehacer.",
        pmiBestPracticeScore: 10,
        pmiArea: "Calidad y Ética (Cap. 5.4 / 13.4)",
        pmiFeedback:
          "Comprometer especificaciones estructurales pone en riesgo vidas humanas.",
      },
    ],
  },
  {
    id: "pub-l3-5",
    round: 5,
    episodeCode: "PROY·05",
    pmbokDomain: "Riesgos y Respuestas",
    title: "Calidad en Obra: Ensayo de Cilindros Falla",
    sfxText: "¡CALIDAD!",
    narratorBox:
      "Ejecución: Los ensayos de laboratorio a los 28 días en el estribo sur arrojan resistencia 18% por debajo de norma.",
    speaker: "Supervisor Técnico",
    speakerRole: "Control de Calidad",
    dialogue:
      "«El concreto del estribo sur no alcanzó los 280 kg/cm² especificados. El contratista pide aceptarlo con descuento.»",
    imagePath: "/images/public-audit.jpg",
    options: [
      {
        id: "pub-l3-5-a",
        code: "A",
        label: "Prueba de núcleos + Reforzamiento certificado",
        description:
          "Ordenas extracción de núcleos (diamantina) y refuerzo estructural a costo del contratista según garantía de calidad.",
        hint: "🛡️ Seguridad vial | 💰 $0 al Estado",
        sfxWord: "¡GARANTÍA!",
        deltas: { budget: +2, schedule: -4, morale: +4, stakeholders: +10 },
        outcomeNarrative:
          "El contratista asume el costo de reforzamiento certificado (-2 semanas, $0 al Estado) y el puente queda 100% seguro.",
        pmiBestPracticeScore: 75,
        pmiArea: "Controlar la Calidad (Cap. 13.4)",
        pmiFeedback:
          "Exigir cumplimiento de normas técnicas haciendo valer garantías contractuales.",
      },
      {
        id: "pub-l3-5-b",
        code: "B",
        label: "Aceptar con multa simbólica",
        description: "Apruebas el estribo defectuoso cobrando 5% de descuento al contratista.",
        hint: "⏱️ Sin demora | 🚨 Riesgo puente",
        sfxWord: "¡NEGLIGENCIA!",
        deltas: { budget: +2, schedule: +2, morale: -10, stakeholders: -22 },
        outcomeNarrative:
          "Aparecen fisuras estructurales antes de la inauguración; Contraloría interviene la obra.",
        pmiBestPracticeScore: 10,
        pmiArea: "Calidad y Responsabilidad (Cap. 3.4 / 3.5)",
        pmiFeedback:
          "La seguridad estructural no es negociable por descuentos económicos.",
      },
      {
        id: "pub-l3-5-c",
        code: "C",
        label: "Demoler todo el puente",
        description: "Ordenas demoler toda la cimentación sin realizar prueba de núcleos.",
        hint: "💣 Extremo | 🐢 -10 sem",
        sfxWord: "¡EXCESO!",
        deltas: { budget: -12, schedule: -18, morale: -8, stakeholders: -8 },
        outcomeNarrative:
          "Demolición innecesaria provoca litigio arbitral de 10 semanas con el contratista.",
        pmiBestPracticeScore: 30,
        pmiArea: "Inspección Basada en Evidencia (Cap. 13.4)",
        pmiFeedback:
          "Las decisiones correctivas deben basarse en ensayos técnicos confirmatorios (núcleos).",
      },
    ],
  },
  {
    id: "pub-l3-6",
    round: 6,
    episodeCode: "PROY·06",
    pmbokDomain: "Interesados y Comunicaciones",
    title: "Expropiación de Franja y Desvío Vial",
    sfxText: "¡PREDIO!",
    narratorBox:
      "Ejecución e Interesados: 3 propietarios bloquean la franja del acceso norte reclamando avalúo injusto.",
    speaker: "Gestor Social",
    speakerRole: "Derecho de Vía",
    dialogue:
      "«Si no liberamos esos 120 metros esta quincena, no podremos pavimentar el acceso norte a tiempo.»",
    imagePath: "/images/public-political-scope.jpg",
    options: [
      {
        id: "pub-l3-6-a",
        code: "A",
        label: "Mesa de avalúo transparente + Trato directo",
        description:
          "Presentas avalúo catastral independiente, compensación justa por mejoras y plan de reasentamiento concertado.",
        hint: "🤝 Acuerdo justo | ⏱️ Libera vía",
        sfxWord: "¡ACUERDO!",
        deltas: { budget: -4, schedule: +4, morale: +4, stakeholders: +12 },
        outcomeNarrative:
          "Los 3 propietarios firman traspaso voluntario en 10 días y el acceso norte avanza sin litigios.",
        pmiBestPracticeScore: 75,
        pmiArea: "Compromiso de Interesados (Cap. 12.4)",
        pmiFeedback:
          "La compensación justa y transparente evita juicios expropiatorios de años.",
      },
      {
        id: "pub-l3-6-b",
        code: "B",
        label: "Juicio de expropiación contencioso",
        description: "Judicializas de entrada sin intentar negociación ni avalúo actualizado.",
        hint: "⚖️ Judicial | 🐢 +6 meses",
        sfxWord: "¡LITIGIO!",
        deltas: { budget: -10, schedule: -18, morale: -6, stakeholders: -14 },
        outcomeNarrative:
          "El juez dicta medida cautelar y el acceso queda bloqueado durante meses.",
        pmiBestPracticeScore: 25,
        pmiArea: "Planificar Interesados (Cap. 9.1)",
        pmiFeedback:
          "La vía judicial debe ser último recurso tras agotar la negociación justa.",
      },
      {
        id: "pub-l3-6-c",
        code: "C",
        label: "Dejar acceso norte en terracería",
        description: "Terminas el pavimento solo hasta donde llega el predio estatal.",
        hint: "💰 Sin pago | 😠 Cuello de botella",
        sfxWord: "¡INCOMPLETO!",
        deltas: { budget: 0, schedule: 0, morale: -4, stakeholders: -14 },
        outcomeNarrative:
          "Los camiones se atascan en barro en la entrada del puente en época de lluvia.",
        pmiBestPracticeScore: 25,
        pmiArea: "Alcance Integral (Cap. 6.3)",
        pmiFeedback:
          "Dejar tramos sin pavimentar compromete la funcionalidad del puente.",
      },
    ],
  },
  {
    id: "pub-l3-7",
    round: 7,
    episodeCode: "PROY·07",
    pmbokDomain: "Gobernanza y Cambios",
    title: "Monitoreo EVM: Desfase en Montaje de Vigas",
    sfxText: "¡EVM OBRA!",
    narratorBox:
      "Monitoreo y Control (Semana 28): La grúa de gran tonelaje falla y el SPI cae a 0.86 (atraso de 3 semanas).",
    speaker: "Residente de Obra",
    speakerRole: "Contratista",
    dialogue:
      "«Con una sola grúa nos atrasaremos 3 semanas más. Podemos traer segunda grúa por +$38,000 USD o esperar reparación.»",
    imagePath: "/images/risk-incident.jpg",
    options: [
      {
        id: "pub-l3-7-a",
        code: "A",
        label: "Crashing con 2da grúa + Turno extendido",
        description:
          "Apruebas CCB usando reserva de contingencia ($38k) para doble grúa y recuperas las 3 semanas antes de lluvias.",
        hint: "⏱️ +3 sem recuperadas | 💰 Reserva usada",
        sfxWord: "¡MONTAJE!",
        deltas: { budget: -8, schedule: +10, morale: +2, stakeholders: +8 },
        outcomeNarrative:
          "Las vigas principales quedan izadas en 9 días y el SPI vuelve a 0.99.",
        pmiBestPracticeScore: 75,
        pmiArea: "Control EVM y Crashing (Cap. 7.6 / 13.7)",
        pmiFeedback:
          "Uso justificado de reserva de contingencia para recuperar ruta crítica mediante crashing.",
      },
      {
        id: "pub-l3-7-b",
        code: "B",
        label: "Esperar reparación sin costo extra",
        description: "Dejas la obra parada 3 semanas esperando repuesto importado.",
        hint: "💰 $0 grúa | 💸 -$65k gastos generales",
        sfxWord: "¡ATRASO!",
        deltas: { budget: -14, schedule: -16, morale: -8, stakeholders: -10 },
        outcomeNarrative:
          "La espera cuesta $65,000 USD en planilla y penalidades de plazo.",
        pmiBestPracticeScore: 25,
        pmiArea: "Análisis Costo-Beneficio (Cap. 13.5)",
        pmiFeedback:
          "Ahorrar $38k en equipo costó $65k en tiempo improductivo.",
      },
      {
        id: "pub-l3-7-c",
        code: "C",
        label: "Sobrecargar grúa auxiliar menor",
        description: "Intentas izar vigas excediendo capacidad nominal de la grúa pequeña.",
        hint: "🚨 Peligro colapso | 💥 Accidente",
        sfxWord: "¡PELIGRO!",
        deltas: { budget: -20, schedule: -20, morale: -20, stakeholders: -20 },
        outcomeNarrative:
          "Falla la pluma de la grúa dañando una viga prefabricada.",
        pmiBestPracticeScore: 5,
        pmiArea: "Seguridad y Conducta (Cap. 5.4)",
        pmiFeedback:
          "Violar límites de seguridad en izaje de cargas es inaceptable.",
      },
    ],
  },
  {
    id: "pub-l3-8",
    round: 8,
    episodeCode: "PROY·08",
    pmbokDomain: "Beneficios y Cierre",
    title: "Prueba de Carga, Recepción y Cierre Vial",
    sfxText: "¡CIERRE!",
    narratorBox:
      "Cierre del Proyecto: El puente está terminado. Toca recepción definitiva, prueba de carga e impacto vial.",
    speaker: "Comisión Receptora",
    speakerRole: "Ministerio y Comunidad",
    dialogue:
      "«Antes de abrir al tránsito y liquidar el contrato, ¿qué protocolo de cierre y sostenibilidad ejecutamos?»",
    imagePath: "/images/victory.jpg",
    options: [
      {
        id: "pub-l3-8-a",
        code: "A",
        label: "Prueba de carga + Actas + Plan Mantenimiento",
        description:
          "Ejecutas prueba de carga certificada, firmas acta de recepción, entregas planos As-Built, plan de mantenimiento y mides ahorro de tiempo vial.",
        hint: "🌉 100% certificado | 📊 Impacto -52% viaje",
        sfxWord: "¡INAUGURADO!",
        deltas: { budget: +4, schedule: +4, morale: +8, stakeholders: +14 },
        outcomeNarrative:
          "Prueba de carga aprobada. El tiempo de cruce baja de 45 min a 6 min (-86%) y el contrato liquida sin observaciones.",
        pmiBestPracticeScore: 75,
        pmiArea: "Cierre y Gestión de Beneficios (Cap. 4.6 / 14.1)",
        pmiFeedback:
          "Cierre integral perfecto de obra pública: seguridad verificada, documentación As-Built, O&M e impacto medido.",
      },
      {
        id: "pub-l3-8-b",
        code: "B",
        label: "Abrir tránsito antes de prueba de carga",
        description: "Inauguras con cinta y caravana sin esperar el informe de deflexiones.",
        hint: "📸 Foto hoy | 🚨 Sin certificación",
        sfxWord: "¡IMPRUDENTE!",
        deltas: { budget: -6, schedule: +2, morale: -8, stakeholders: -18 },
        outcomeNarrative:
          "El colegio de ingenieros emite alerta pública por apertura sin prueba certificada.",
        pmiBestPracticeScore: 15,
        pmiArea: "Validar Alcance y Calidad (Cap. 13.3–13.4)",
        pmiFeedback:
          "La presión ceremonial nunca debe anteponerse a la certificación técnica de seguridad.",
      },
      {
        id: "pub-l3-8-c",
        code: "C",
        label: "Cerrar sin plan de mantenimiento vial",
        description: "Entregas el puente sin asignar responsable ni presupuesto de conservación.",
        hint: "📄 Cierre parcial | 🌧️ Deterioro 2 años",
        sfxWord: "¡DESGASTE!",
        deltas: { budget: -6, schedule: 0, morale: 0, stakeholders: -8 },
        outcomeNarrative:
          "Sin limpieza de drenajes ni juntas, la vida útil del puente se reduce drásticamente.",
        pmiBestPracticeScore: 40,
        pmiArea: "Sostenibilidad (Cap. 3.6 / 14.1)",
        pmiFeedback:
          "La sostenibilidad de la infraestructura requiere transferir el plan de mantenimiento.",
      },
    ],
  },
];
