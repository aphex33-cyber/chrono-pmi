import { Scenario } from "./types";

export const PRIVATE_EXTRA_SCENARIOS: Scenario[] = [
  {
    id: "priv-ex-1",
    round: 1,
    episodeCode: "EXT·01",
    pmbokDomain: "Interesados y Comunicaciones",
    title: "Saturación de Canales y Ruido Ejecutivo",
    sfxText: "¡RUIDO!",
    narratorBox: "Los gerentes regionales reciben versiones distintas de avance por WhatsApp y correo.",
    speaker: "Directora de Operaciones",
    speakerRole: "Interesado Clave",
    dialogue:
      "«Cada área maneja cifras distintas de avance. El directorio está perdiendo confianza en los reportes.»",
    imagePath: "/images/private-closing-value.jpg",
    options: [
      {
        id: "priv-ex-1-a",
        code: "A",
        label: "Plan de Comunicaciones + Tablero Único",
        description: "Centralizas una única fuente de verdad semanal con frecuencia y formato por audiencia.",
        hint: "📡 Claridad total | 🤝 Confianza",
        sfxWord: "¡ALINEADO!",
        deltas: { budget: 0, schedule: +4, morale: +4, stakeholders: +12 },
        outcomeNarrative:
          "El ruido desaparece y las juntas ejecutivas se reducen a la mitad del tiempo.",
        pmiBestPracticeScore: 75,
        pmiArea: "Planificar Comunicaciones (Cap. 9.2)",
        pmiFeedback:
          "Un Plan de Comunicaciones estructurado elimina rumores y alinea expectativas.",
      },
      {
        id: "priv-ex-1-b",
        code: "B",
        label: "Agregar reuniones diarias con todos",
        description: "Citas a 18 gerentes todos los días a las 8:00 AM.",
        hint: "⏳ Pierde horas | 😫 Fatiga",
        sfxWord: "¡REUNIONITIS!",
        deltas: { budget: -6, schedule: -10, morale: -12, stakeholders: -4 },
        outcomeNarrative:
          "Las reuniones consumen 10 horas semanales del equipo técnico sin mejorar la claridad.",
        pmiBestPracticeScore: 25,
        pmiArea: "Gestionar Comunicaciones (Cap. 12.5)",
        pmiFeedback:
          "Más reuniones no sustituyen una comunicación segmentada y concisa.",
      },
      {
        id: "priv-ex-1-c",
        code: "C",
        label: "Enviar reporte mensual únicamente",
        description: "Reduces reportes a una vez al mes para no distraer al equipo.",
        hint: "🤫 Silencio | ⚠️ Desconexión",
        sfxWord: "¡OPACO!",
        deltas: { budget: 0, schedule: -2, morale: +2, stakeholders: -12 },
        outcomeNarrative:
          "Los interesados se sienten excluidos y escalan dudas al CEO.",
        pmiBestPracticeScore: 35,
        pmiArea: "Monitorear Comunicaciones (Cap. 13.10)",
        pmiFeedback:
          "Bajar la frecuencia sin acuerdo con interesados genera desconfianza.",
      },
    ],
  },
  {
    id: "priv-ex-2",
    round: 2,
    episodeCode: "EXT·02",
    pmbokDomain: "Principios y Valor",
    title: "Funcionalidad Costosa Sin Demanda Real",
    sfxText: "¡DESPERDICIO!",
    narratorBox: "Analítica de uso revela que un módulo que cuesta $90k solo lo usaría 3% de clientes.",
    speaker: "Product Owner",
    speakerRole: "Producto",
    dialogue:
      "«El módulo de realidad aumentada está en el plan original, pero los datos reales muestran que nadie lo usará.»",
    imagePath: "/images/scope-creep.jpg",
    options: [
      {
        id: "priv-ex-2-a",
        code: "A",
        label: "Reasignar fondos vía CCB a alto valor",
        description: "Presentas datos de valor al comité, retiras el módulo de bajo ROI y reasignas a automatización clave.",
        hint: "💎 Principio Valor | 💰 Ahorra $90k",
        sfxWord: "¡VALOR!",
        deltas: { budget: +10, schedule: +6, morale: +4, stakeholders: +8 },
        outcomeNarrative:
          "El directorio aprueba el giro hacia valor real y mejora el VAN proyectado del proyecto.",
        pmiBestPracticeScore: 75,
        pmiArea: "Principio de Valor (Cap. 3.3)",
        pmiFeedback:
          "Seguir el plan ciegamente cuando ya no genera valor es un error; el valor manda.",
      },
      {
        id: "priv-ex-2-b",
        code: "B",
        label: "Construirlo igual por cumplir el plan",
        description: "Ejecutas los $90k porque estaba en el documento inicial.",
        hint: "📄 Cumple papel | 💸 Quema $90k",
        sfxWord: "¡DESPERDICIO!",
        deltas: { budget: -16, schedule: -6, morale: -6, stakeholders: -8 },
        outcomeNarrative:
          "Gastas $90,000 USD en un entregable que nadie abre en producción.",
        pmiBestPracticeScore: 20,
        pmiArea: "Lean y Valor (Cap. 3.3 / 15.3)",
        pmiFeedback:
          "Entregar productos sin valor es el mayor desperdicio en gestión moderna.",
      },
      {
        id: "priv-ex-2-c",
        code: "C",
        label: "Hacer una versión a medias",
        description: "Reduces el presupuesto a $30k pero igual entregas un prototipo incompleto.",
        hint: "💸 -$30k | 🤷 Inútil",
        sfxWord: "¡MEDIAS!",
        deltas: { budget: -8, schedule: -2, morale: -4, stakeholders: -6 },
        outcomeNarrative:
          "Desperdicias $30k en algo que tampoco genera retorno.",
        pmiBestPracticeScore: 30,
        pmiArea: "Priorización (Cap. 17.5)",
        pmiFeedback:
          "Es mejor descartar formalmente un ítem sin valor que hacerlo a medias.",
      },
    ],
  },
  {
    id: "priv-ex-3",
    round: 3,
    episodeCode: "EXT·03",
    pmbokDomain: "Cronograma y Línea Base",
    title: "Estimación Optimista vs. PERT Realista",
    sfxText: "¡SESGO!",
    narratorBox: "El área comercial prometió fecha de lanzamiento basada en estimación optimista sin holguras.",
    speaker: "Tech Lead",
    speakerRole: "Ingeniería",
    dialogue:
      "«Comercial prometió 6 semanas, pero con pruebas e integraciones el PERT realista da 9 semanas.»",
    imagePath: "/images/public-no-baseline.jpg",
    options: [
      {
        id: "priv-ex-3-a",
        code: "A",
        label: "Sustentar PERT + Entrega por hitos",
        description: "Muestras cálculo PERT (O+4M+P)/6, pactas entrega beta en semana 6 y release completo en semana 9.",
        hint: "📐 Rigor PERT | 🤝 Expectativa real",
        sfxWord: "¡PERT!",
        deltas: { budget: 0, schedule: +6, morale: +8, stakeholders: +6 },
        outcomeNarrative:
          "Comercial acepta lanzar campaña beta en semana 6 con alcance acotado y release completo en semana 9.",
        pmiBestPracticeScore: 75,
        pmiArea: "Estimar Duraciones (Cap. 7.4)",
        pmiFeedback:
          "Sustentar plazos con PERT y entrega escalonada protege la credibilidad y calidad.",
      },
      {
        id: "priv-ex-3-a2",
        code: "B",
        label: "Aceptar las 6 semanas en silencio",
        description: "No contradices a Comercial y esperas un milagro.",
        hint: "🤫 Sin debate | 💥 Falla segura",
        sfxWord: "¡ATRASO!",
        deltas: { budget: -10, schedule: -16, morale: -14, stakeholders: -10 },
        outcomeNarrative:
          "En semana 6 el sistema no compila y Comercial cancela eventos pagados.",
        pmiBestPracticeScore: 15,
        pmiArea: "Línea Base Cronograma (Cap. 7.5)",
        pmiFeedback:
          "Aceptar fechas irreales sin sustento técnico destruye la confianza.",
      },
      {
        id: "priv-ex-3-c",
        code: "C",
        label: "Recortar todas las pruebas QA",
        description: "Eliminas la fase de QA para intentar llegar en 6 semanas.",
        hint: "⚡ 6 semanas | 🐛 Bugs en vivo",
        sfxWord: "¡CAOS!",
        deltas: { budget: -12, schedule: -4, morale: -8, stakeholders: -14 },
        outcomeNarrative:
          "El lanzamiento colapsa el primer día por fallas críticas.",
        pmiBestPracticeScore: 20,
        pmiArea: "Calidad (Cap. 6.5)",
        pmiFeedback:
          "Sacrificar QA nunca acelera la entrega de valor real.",
      },
    ],
  },
  {
    id: "priv-ex-4",
    round: 4,
    episodeCode: "EXT·04",
    pmbokDomain: "Alcance y EDT",
    title: "Ambigüedad en Criterios de Aceptación",
    sfxText: "¡RECHAZO!",
    narratorBox: "El cliente rechaza la entrega del Sprint 4 alegando que 'no era lo que imaginaba'.",
    speaker: "Cliente",
    speakerRole: "Sponsor Externo",
    dialogue:
      "«El reporte funciona, pero yo esperaba exportación automática a SAP y alertas en tiempo real.»",
    imagePath: "/images/scope-creep.jpg",
    options: [
      {
        id: "priv-ex-4-a",
        code: "A",
        label: "Diccionario EDT + Criterios de Aceptación",
        description: "Formalizas el Diccionario de EDT y DoD con criterios verificables antes de cada iteración.",
        hint: "📋 Claridad | 🛡️ Cero ambigüedad",
        sfxWord: "¡CRITERIOS!",
        deltas: { budget: -2, schedule: +4, morale: +6, stakeholders: +8 },
        outcomeNarrative:
          "Acuerdan alcance exacto por iteración y las validaciones siguientes pasan al primer intento.",
        pmiBestPracticeScore: 75,
        pmiArea: "EDT y Validar Alcance (Cap. 6.4 / 13.3)",
        pmiFeedback:
          "Definir criterios de aceptación objetivos previene rechazos subjetivos.",
      },
      {
        id: "priv-ex-4-b",
        code: "B",
        label: "Rehacer todo gratis sin documentar",
        description: "Asumes el costo de construir la integración SAP sin adenda ni criterios escritos.",
        hint: "💸 -$40k | 🔁 Se repite",
        sfxWord: "¡RETRABAJO!",
        deltas: { budget: -16, schedule: -12, morale: -10, stakeholders: +2 },
        outcomeNarrative:
          "El equipo pierde 3 semanas y en la siguiente entrega vuelven a surgir supuestos no escritos.",
        pmiBestPracticeScore: 20,
        pmiArea: "Requisitos (Cap. 6.2)",
        pmiFeedback:
          "Ceder sin formalizar requisitos perpetúa la ambigüedad.",
      },
      {
        id: "priv-ex-4-c",
        code: "C",
        label: "Entrar en disputa legal inmediata",
        description: "Envías carta notarial exigiendo pago sin revisar cómo mejorar la validación.",
        hint: "⚖️ Duro | ❄️ Rompe cuenta",
        sfxWord: "¡RUPTURA!",
        deltas: { budget: -6, schedule: -6, morale: -4, stakeholders: -18 },
        outcomeNarrative:
          "El cliente congela futuros contratos con la empresa.",
        pmiBestPracticeScore: 30,
        pmiArea: "Interesados (Cap. 12.4)",
        pmiFeedback:
          "Primero se clarifican criterios y negocia solución colaborativa.",
      },
    ],
  },
];

export const PUBLIC_EXTRA_SCENARIOS: Scenario[] = [
  {
    id: "pub-ex-1",
    round: 1,
    episodeCode: "EXT·01",
    pmbokDomain: "Alcance y EDT",
    title: "Términos de Referencia Sin EDT Clara",
    sfxText: "¡AMBIGÜEDAD!",
    narratorBox: "El pliego de licitación pública describe objetivos genéricos sin desglose de entregables.",
    speaker: "Comité de Licitación",
    speakerRole: "Compras Públicas",
    dialogue:
      "«Si publicamos los Términos de Referencia así, cada oferente cotizará cosas distintas y tendremos adendas millonarias.»",
    imagePath: "/images/public-audit.jpg",
    options: [
      {
        id: "pub-ex-1-a",
        code: "A",
        label: "Construir EDT al 100% y Diccionario",
        description: "Estructuras la EDT completa con paquetes verificables y criterios de aceptación antes de publicar.",
        hint: "📐 Pliego sólido | 🛡️ Evita adendas",
        sfxWord: "¡EDT OK!",
        deltas: { budget: +6, schedule: +2, morale: +4, stakeholders: +10 },
        outcomeNarrative:
          "Las ofertas llegan comparables y dentro del presupuesto oficial.",
        pmiBestPracticeScore: 75,
        pmiArea: "EDT y Abastecimiento (Cap. 5.6 / 6.4)",
        pmiFeedback:
          "Una EDT clara es la mejor defensa contra adendas y reclamos en contratación pública.",
      },
      {
        id: "pub-ex-1-b",
        code: "B",
        label: "Publicar rápido y aclarar luego",
        description: "Lanzas la licitación con texto ambiguo para cumplir meta mensual de publicación.",
        hint: "⚡ Hoy | 💣 +30% adendas",
        sfxWord: "¡ADENDAS!",
        deltas: { budget: -18, schedule: -12, morale: -6, stakeholders: -12 },
        outcomeNarrative:
          "El adjudicatario cobra sobrecostos por cada ítem no especificado.",
        pmiBestPracticeScore: 15,
        pmiArea: "Definir Alcance (Cap. 6.3)",
        pmiFeedback:
          "La prisa al redactar términos de referencia cuesta caro en ejecución.",
      },
      {
        id: "pub-ex-1-c",
        code: "C",
        label: "Copiar pliego de otro país sin adaptar",
        description: "Reutilizas un pliego extranjero sin validar normativa local ni SIAFI.",
        hint: "📋 Copia | ⚠️ Inaplicable",
        sfxWord: "¡DESCALCE!",
        deltas: { budget: -8, schedule: -14, morale: -4, stakeholders: -8 },
        outcomeNarrative:
          "La licitación queda desierta por exigir certificaciones inexistentes localmente.",
        pmiBestPracticeScore: 25,
        pmiArea: "Requisitos (Cap. 6.2)",
        pmiFeedback:
          "Todo pliego debe adaptarse al marco normativo y contexto local.",
      },
    ],
  },
  {
    id: "pub-ex-2",
    round: 2,
    episodeCode: "EXT·02",
    pmbokDomain: "Interesados y Comunicaciones",
    title: "Desinformación en Medios Sobre el Proyecto",
    sfxText: "¡PRENSA!",
    narratorBox: "Circula en redes sociales la falsa noticia de que el proyecto duplicará tarifas ciudadanas.",
    speaker: "Dir. Comunicaciones",
    speakerRole: "Ministerio",
    dialogue:
      "«La desinformación está creciendo y los alcaldes dudan en firmar los convenios de adhesión.»",
    imagePath: "/images/public-political-scope.jpg",
    options: [
      {
        id: "pub-ex-2-a",
        code: "A",
        label: "Transparencia activa + Datos abiertos",
        description: "Publicas infografía clara de beneficios, costos reales y realizas sesión abierta con alcaldes.",
        hint: "📣 Verdad pública | 🤝 Confianza",
        sfxWord: "¡CLARIDAD!",
        deltas: { budget: -2, schedule: +2, morale: +4, stakeholders: +14 },
        outcomeNarrative:
          "Los alcaldes respaldan el proyecto y firman los convenios esa misma semana.",
        pmiBestPracticeScore: 75,
        pmiArea: "Comunicaciones e Interesados (Cap. 12.4–12.5)",
        pmiFeedback:
          "La comunicación proactiva basada en datos neutraliza rumores rápidamente.",
      },
      {
        id: "pub-ex-2-b",
        code: "B",
        label: "Guardar silencio institucional",
        description: "No respondes esperando que la noticia se olvide sola.",
        hint: "🤫 Silencio | 🔥 Crisis crece",
        sfxWord: "¡RUMOR!",
        deltas: { budget: -4, schedule: -12, morale: -6, stakeholders: -18 },
        outcomeNarrative:
          "Tres municipios suspenden su adhesión por temor al costo político.",
        pmiBestPracticeScore: 20,
        pmiArea: "Monitorear Comunicaciones (Cap. 13.10)",
        pmiFeedback:
          "El vacío informativo siempre es llenado por desinformación.",
      },
      {
        id: "pub-ex-2-c",
        code: "C",
        label: "Comunicado técnico de 40 páginas",
        description: "Subes un PDF legal complejo que nadie en redes lee.",
        hint: "📄 Técnico | 😐 Sin alcance",
        sfxWord: "¡DENSO!",
        deltas: { budget: 0, schedule: -4, morale: 0, stakeholders: -6 },
        outcomeNarrative:
          "El mensaje no llega a la ciudadanía y persiste la confusión.",
        pmiBestPracticeScore: 35,
        pmiArea: "Planificar Comunicaciones (Cap. 9.2)",
        pmiFeedback:
          "El formato del mensaje debe adaptarse a cada audiencia.",
      },
    ],
  },
  {
    id: "pub-ex-3",
    round: 3,
    episodeCode: "EXT·03",
    pmbokDomain: "Principios y Valor",
    title: "Sostenibilidad Ambiental y Operativa",
    sfxText: "¡SOSTENIBLE!",
    narratorBox: "El proyecto contempla equipamiento que consume altos insumos no renovables en zonas rurales.",
    speaker: "Evaluadora Ambiental",
    speakerRole: "Organismo Financiador",
    dialogue:
      "«Si no garantizan eficiencia energética y mantenimiento local, los equipos quedarán abandonados en 18 meses.»",
    imagePath: "/images/public-impact-gap.jpg",
    options: [
      {
        id: "pub-ex-3-a",
        code: "A",
        label: "Criterio Sostenible + Capacitación O&M",
        description: "Seleccionas tecnología de bajo consumo y aseguras técnicos locales certificados para mantenimiento.",
        hint: "♻️ Largo plazo | 🌟 Impacto real",
        sfxWord: "¡SOSTENIBLE!",
        deltas: { budget: -4, schedule: 0, morale: +6, stakeholders: +12 },
        outcomeNarrative:
          "El organismo financiador aprueba el diseño y destaca el proyecto como modelo regional.",
        pmiBestPracticeScore: 75,
        pmiArea: "Principio de Sostenibilidad (Cap. 3.6)",
        pmiFeedback:
          "La sostenibilidad garantiza que el valor público perdure tras el cierre.",
      },
      {
        id: "pub-ex-3-b",
        code: "B",
        label: "Elegir el equipo más barato inicial",
        description: "Compras lo más barato hoy sin importar costo de operación ni repuestos.",
        hint: "💰 Barato hoy | 💥 Abandono luego",
        sfxWord: "¡OBSOLETO!",
        deltas: { budget: +4, schedule: +2, morale: -4, stakeholders: -16 },
        outcomeNarrative:
          "A los pocos meses los equipos fallan sin repuestos disponibles en el país.",
        pmiBestPracticeScore: 20,
        pmiArea: "Costo de Ciclo de Vida (Cap. 8.1)",
        pmiFeedback:
          "Optimizar solo el CAPEX inicial dispara el costo total de propiedad.",
      },
      {
        id: "pub-ex-3-c",
        code: "C",
        label: "Contratar mantenimiento centralizado caro",
        description: "Dejas que un proveedor único viaje desde la capital por cada falla menor.",
        hint: "💸 Caro | 🐢 Lento",
        sfxWord: "¡DEPENDENCIA!",
        deltas: { budget: -12, schedule: -6, morale: 0, stakeholders: -2 },
        outcomeNarrative:
          "Los tiempos de reparación superan 3 semanas por traslados.",
        pmiBestPracticeScore: 40,
        pmiArea: "Estrategia de Soporte (Cap. 5.6)",
        pmiFeedback:
          "Desarrollar capacidad local es más eficiente y sostenible.",
      },
    ],
  },
  {
    id: "pub-ex-4",
    round: 4,
    episodeCode: "EXT·04",
    pmbokDomain: "Enfoque Adaptativo",
    title: "Priorización de Trámites Digitales (Backlog)",
    sfxText: "¡FLUJO!",
    narratorBox: "El portal ciudadano tiene 60 trámites en cola para digitalizar antes de fin de año.",
    speaker: "Líder Digital",
    speakerRole: "Gobierno Digital",
    dialogue:
      "«Los 60 trámites representan millones de atenciones, pero el 80% de la demanda se concentra en solo 8 trámites.»",
    imagePath: "/images/team-crunch.jpg",
    options: [
      {
        id: "pub-ex-4-a",
        code: "A",
        label: "Priorizar el 20% de trámites con 80% impacto",
        description: "Usas Pareto + entregas incrementales: digitalizas primero los 8 trámites masivos y limitas WIP.",
        hint: "🎯 Pareto 80/20 | ⚡ Impacto rápido",
        sfxWord: "¡PARETO!",
        deltas: { budget: +4, schedule: +8, morale: +8, stakeholders: +12 },
        outcomeNarrative:
          "En 8 semanas reduces filas ciudadanas en un 75% con el mismo presupuesto.",
        pmiBestPracticeScore: 75,
        pmiArea: "Priorización por Valor (Cap. 17.5 / 18.1)",
        pmiFeedback:
          "Combinar Pareto con entregas ágiles maximiza el impacto ciudadano temprano.",
      },
      {
        id: "pub-ex-4-b",
        code: "B",
        label: "Digitalizar los 60 en paralelo sin orden",
        description: "Abres 60 frentes a la vez para mostrar avance en todos los ministerios.",
        hint: "🌫️ Todo abierto | 🐢 Nada termina",
        sfxWord: "¡ATASCO!",
        deltas: { budget: -10, schedule: -14, morale: -12, stakeholders: -8 },
        outcomeNarrative:
          "Al mes 6 ninguno de los 60 trámites ha salido a producción.",
        pmiBestPracticeScore: 15,
        pmiArea: "Kanban y Límites WIP (Cap. 15.4)",
        pmiFeedback:
          "Abrir demasiadas tareas simultáneas colapsa el flujo de entrega.",
      },
      {
        id: "pub-ex-4-c",
        code: "C",
        label: "Empezar por los trámites más fáciles",
        description: "Eliges trámites internos de bajo uso solo para sumar cantidad.",
        hint: "📈 Cantidad | 😞 Cero impacto",
        sfxWord: "¡VANIDAD!",
        deltas: { budget: -2, schedule: 0, morale: 0, stakeholders: -10 },
        outcomeNarrative:
          "Publicas 15 trámites que casi nadie usa mientras las filas siguen llenas.",
        pmiBestPracticeScore: 30,
        pmiArea: "Principio de Valor (Cap. 3.3)",
        pmiFeedback:
          "Las métricas de vanidad no sustituyen el valor al ciudadano.",
      },
    ],
  },
];
