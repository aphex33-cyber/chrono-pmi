import {
  KnowledgeLevel,
  PmbokDomain,
  QuizAnswerRecord,
  QuizQuestion,
  QuizResult,
} from "./types";

export const QUIZ_LENGTH = 20;

export const ALL_PMBOK_DOMAINS: PmbokDomain[] = [
  "Principios y Valor",
  "Gobernanza y Cambios",
  "Alcance y EDT",
  "Cronograma y Línea Base",
  "Finanzas y Valor Ganado",
  "Interesados y Comunicaciones",
  "Recursos y Liderazgo",
  "Riesgos y Respuestas",
  "Enfoque Adaptativo",
  "Beneficios y Cierre",
];

function seededShuffle<T>(items: T[], seed: number): T[] {
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

export const PRE_TEST_POOL: QuizQuestion[] = [
  // 1. Principios y Valor (4)
  {
    id: "pre-pv-1",
    domain: "Principios y Valor",
    question:
      "Según el enfoque de principios del PMBOK® 8va Edición, ¿qué define primordialmente el éxito de un proyecto moderno?",
    options: [
      "Cumplir únicamente con el cronograma original sin importar el uso del producto.",
      "La generación de valor e impactos sostenibles alineados con la visión y estrategia.",
      "Documentar todos los procesos aunque los entregables no resuelvan el problema.",
      "Ejecutar el 100% del presupuesto asignado antes del cierre fiscal.",
    ],
    correctIndex: 1,
    explanation:
      "El Principio de Valor y Visión (Cap. 3) establece que los proyectos existen para generar valor e impacto real en la organización o ciudadanía.",
    bookRef: "Cap. 3.2–3.3 Visión y Valor (Lledó v8.0)",
  },
  {
    id: "pre-pv-2",
    domain: "Principios y Valor",
    question:
      "¿Cuál es la diferencia esencial entre 'producto (output)' e 'impacto (outcome)' en la dirección de proyectos?",
    options: [
      "Son sinónimos exactos en el PMBOK® v8.",
      "El producto es el entregable tangible; el impacto es el cambio o beneficio real que ese producto habilita.",
      "El producto lo define el patrocinador y el impacto solo el proveedor.",
      "El impacto se mide únicamente por el costo de compra.",
    ],
    correctIndex: 1,
    explanation:
      "Entregar software u obras (outputs) sin adopción ni mejora medible (outcomes) no genera valor (Cap. 3.3 y 4.6).",
    bookRef: "Cap. 3.3 Valor y Cap. 4.6 Beneficios",
  },
  {
    id: "pre-pv-3",
    domain: "Principios y Valor",
    question:
      "Según el principio de Sostenibilidad (Cap. 3.6), ¿qué debe considerar el Director de Proyecto al diseñar entregables?",
    options: [
      "Solo el costo de construcción inicial, ignorando operación futura.",
      "El impacto ambiental, social y la capacidad operativa de mantener los beneficios a largo plazo.",
      "Evitar cualquier tecnología nueva para no capacitar usuarios.",
      "Transferir todos los costos de mantenimiento al proveedor indefinidamente.",
    ],
    correctIndex: 1,
    explanation:
      "La sostenibilidad integra viabilidad financiera, social, ambiental y continuidad operativa post-cierre.",
    bookRef: "Cap. 3.6 Principio de Sostenibilidad",
  },
  {
    id: "pre-pv-4",
    domain: "Principios y Valor",
    question:
      "¿Qué implica el principio de Responsabilidad y Conducta Profesional (Cap. 3.5 y 5.4)?",
    options: [
      "Ocultar desviaciones negativas hasta que el patrocinador las descubra.",
      "Actuar con integridad, transparencia en reportes, legalidad y respeto a la seguridad.",
      "Aprobar cualquier cambio verbal del cliente para evitar conflictos.",
      "Delegar la responsabilidad ética exclusivamente al área legal.",
    ],
    correctIndex: 1,
    explanation:
      "El Código de Ética PMI exige veracidad en la información, cumplimiento normativo y protección del interés público.",
    bookRef: "Cap. 3.5 Responsabilidad y Cap. 5.4 Conducta",
  },

  // 2. Gobernanza y Cambios (4)
  {
    id: "pre-gc-1",
    domain: "Gobernanza y Cambios",
    question:
      "Un actor político o ejecutivo exige verbalmente agregar un módulo nuevo sin variar plazo ni costo. ¿Qué exige la gobernanza?",
    options: [
      "Implementarlo de inmediato para mantener una relación cordial.",
      "Rechazarlo de forma unilateral sin documentar la solicitud.",
      "Registrar solicitud de cambio formal, evaluar impacto integral y elevarla al Comité de Control de Cambios (CCB).",
      "Pedir horas extra no remuneradas al equipo para absorberlo en silencio.",
    ],
    correctIndex: 2,
    explanation:
      "Todo cambio al alcance aprobado debe canalizarse por Control Integrado de Cambios (Cap. 13.2) y Gobernanza (Cap. 5.2).",
    bookRef: "Cap. 5.2 Gobernanza y Cap. 13.2 Evaluar Cambios",
  },
  {
    id: "pre-gc-2",
    domain: "Gobernanza y Cambios",
    question:
      "Según el Cap. 4.2, ¿cuál es el rol principal del Patrocinador frente al alcance y recursos?",
    options: [
      "Programar las tareas diarias de los desarrolladores.",
      "Evitar cambios innecesarios y proteger los recursos y alineamiento estratégico del proyecto.",
      "Redactar cada caso de prueba de calidad.",
      "Sustituir al Director de Proyecto en las reuniones diarias.",
    ],
    correctIndex: 1,
    explanation:
      "El Patrocinador protege el proyecto de cambios políticos/innecesarios y resguarda los recursos estratégicos.",
    bookRef: "Cap. 4.2 Dominios y Roles",
  },
  {
    id: "pre-gc-3",
    domain: "Gobernanza y Cambios",
    question:
      "¿Qué documento autoriza formalmente la existencia del proyecto y otorga autoridad al Director de Proyecto?",
    options: [
      "El registro de lecciones aprendidas.",
      "El Acta de Constitución del Proyecto (Project Charter).",
      "La lista de compras de oficina.",
      "El diagrama de Gantt detallado.",
    ],
    correctIndex: 1,
    explanation:
      "El Acta de Constitución (Cap. 4.7) vincula el proyecto con la estrategia y confiere autoridad formal al DP.",
    bookRef: "Cap. 4.7 Acta de Constitución",
  },
  {
    id: "pre-gc-4",
    domain: "Gobernanza y Cambios",
    question:
      "En estrategia de abastecimiento (Cap. 5.7), ¿qué tipo de contrato transfiere mayor riesgo de costo al proveedor cuando el alcance está bien definido?",
    options: [
      "Contrato por Tiempo y Materiales (T&M).",
      "Contrato de Precio Fijo Cerrado (FFP).",
      "Contrato de Costo Más Honorarios (CPFF).",
      "Acuerdo verbal sin penalidades.",
    ],
    correctIndex: 1,
    explanation:
      "En Precio Fijo (FFP) el vendedor asume el riesgo de sobrecosto si el alcance está claramente especificado.",
    bookRef: "Cap. 5.7 Tipos de Contratos",
  },

  // 3. Alcance y EDT (4)
  {
    id: "pre-ae-1",
    domain: "Alcance y EDT",
    question:
      "¿Cuál es la regla fundamental al construir la Estructura de Desglose del Trabajo (EDT / WBS)?",
    options: [
      "Debe incluir únicamente las actividades del cronograma.",
      "Debe representar el 100% del trabajo definido en el alcance y orientarse a entregables.",
      "Solo se usa en construcción y nunca en software.",
      "Puede omitir entregables secundarios para simplificar.",
    ],
    correctIndex: 1,
    explanation:
      "La regla del 100% de la EDT/WBS (Cap. 6.4) garantiza que todo el trabajo requerido para los entregables esté incluido.",
    bookRef: "Cap. 6.4 Desarrollar la EDT/WBS",
  },
  {
    id: "pre-ae-2",
    domain: "Alcance y EDT",
    question:
      "¿Qué es el 'Gold Plating' (baño de oro) en la gestión del alcance?",
    options: [
      "Una técnica de estimación financiera de reservas.",
      "Agregar funcionalidades no solicitadas por el cliente que consumen costo/tiempo sin autorización.",
      "La certificación final de calidad de un entregable.",
      "Un método de priorización del Product Backlog.",
    ],
    correctIndex: 1,
    explanation:
      "El Gold Plating introduce trabajo no aprobado en el alcance, generando riesgos y costos ocultos (Cap. 6.3).",
    bookRef: "Cap. 6.3 Definir el Alcance",
  },
  {
    id: "pre-ae-3",
    domain: "Alcance y EDT",
    question:
      "¿Para qué sirve la Matriz de Trazabilidad de Requisitos (Cap. 6.2)?",
    options: [
      "Para calcular la tasa interna de retorno (TIR).",
      "Para vincular cada requisito desde su origen/objetivo de negocio hasta su entregable y prueba de validación.",
      "Para registrar las asistencias diarias del equipo.",
      "Para reemplazar el contrato con proveedores.",
    ],
    correctIndex: 1,
    explanation:
      "Asegura que cada requisito aporte valor de negocio y sea verificado antes de la aceptación.",
    bookRef: "Cap. 6.2 Analizar los Requisitos",
  },
  {
    id: "pre-ae-4",
    domain: "Alcance y EDT",
    question:
      "¿Qué diferencia hay entre Controlar la Calidad y Validar el Alcance (Cap. 13.3–13.4)?",
    options: [
      "No hay diferencia; los ejecuta la misma persona al mismo tiempo.",
      "Controlar la Calidad verifica exactitud técnica interna; Validar el Alcance obtiene aceptación formal del cliente.",
      "Validar el Alcance se hace antes de planificar.",
      "Controlar la Calidad solo aplica al cierre financiero.",
    ],
    correctIndex: 1,
    explanation:
      "Primero se verifica calidad internamente y luego el cliente/patrocinador valida y acepta formalmente el entregable.",
    bookRef: "Cap. 13.3–13.4 Validar Alcance y Calidad",
  },

  // 4. Cronograma y Línea Base (4)
  {
    id: "pre-cl-1",
    domain: "Cronograma y Línea Base",
    question:
      "¿Qué consecuencia ocurre cuando un proyecto inicia ejecución sin aprobar formalmente la Línea Base del Cronograma?",
    options: [
      "El equipo avanza más rápido por tener flexibilidad total.",
      "No existe referencia objetiva para medir variaciones (SV/SPI), ruta crítica ni controlar cambios de plazo.",
      "Se eliminan los riesgos de retraso en compras.",
      "El presupuesto se ajusta automáticamente.",
    ],
    correctIndex: 1,
    explanation:
      "Sin Línea Base del Cronograma (Cap. 7.5 y 13.5) es imposible medir desempeño objetivo ni holguras.",
    bookRef: "Cap. 7.5–7.6 Línea Base y Ruta Crítica",
  },
  {
    id: "pre-cl-2",
    domain: "Cronograma y Línea Base",
    question:
      "En el Método de la Ruta Crítica (CPM), ¿qué característica tienen las actividades críticas?",
    options: [
      "Son las más caras del proyecto.",
      "Tienen holgura total igual a cero (o mínima); cualquier atraso retrasa la fecha fin.",
      "Pueden retrasarse 30 días sin afectar hitos.",
      "Siempre se ejecutan al final del cierre.",
    ],
    correctIndex: 1,
    explanation:
      "La ruta crítica determina la duración mínima del proyecto; su holgura es cero (Cap. 7.6).",
    bookRef: "Cap. 7.6 Método de la Ruta Crítica",
  },
  {
    id: "pre-cl-3",
    domain: "Cronograma y Línea Base",
    question:
      "¿Qué diferencia práctica existe entre 'Crashing' y 'Fast-Tracking' al comprimir un cronograma?",
    options: [
      "Crashing agrega recursos/costo a tareas críticas; Fast-Tracking ejecuta en paralelo actividades secuenciales aumentando riesgo.",
      "Ambos reducen el costo total del proyecto.",
      "Fast-Tracking consiste en despedir personal.",
      "Crashing elimina actividades del alcance aprobado.",
    ],
    correctIndex: 0,
    explanation:
      "Crashing suele incrementar costo; Fast-Tracking suele incrementar riesgo de retrabajo (Cap. 7.5).",
    bookRef: "Cap. 7.5 Desarrollar el Cronograma",
  },
  {
    id: "pre-cl-4",
    domain: "Cronograma y Línea Base",
    question:
      "¿Por qué el indicador Cronograma Ganado (Earned Schedule, Cap. 13.8) supera al SPI tradicional en la recta final?",
    options: [
      "Porque ignora el avance real.",
      "Porque mide el desempeño en unidades de tiempo reales y no colapsa hacia 1.0 cuando el proyecto se acerca al cierre.",
      "Porque solo usa datos contables.",
      "Porque sustituye el Acta de Constitución.",
    ],
    correctIndex: 1,
    explanation:
      "El SPI monetario tiende artificialmente a 1.0 al final aunque haya retraso; el Earned Schedule (SPI(t)) mantiene precisión temporal.",
    bookRef: "Cap. 13.8 Cronograma Ganado",
  },

  // 5. Finanzas y Valor Ganado (4)
  {
    id: "pre-fv-1",
    domain: "Finanzas y Valor Ganado",
    question:
      "En Valor Ganado (EVM), un proyecto reporta CPI = 0.78 y SPI = 0.85. ¿Qué diagnóstico es correcto?",
    options: [
      "Va adelantado y ahorrando dinero.",
      "Tiene sobrecosto (gasta más de lo producido) y retraso frente al cronograma planificado.",
      "Ahorra dinero con leve retraso.",
      "El proyecto está exactamente en línea base.",
    ],
    correctIndex: 1,
    explanation:
      "CPI < 1.0 indica sobrecosto; SPI < 1.0 indica atraso respecto al Valor Planificado (Cap. 13.7).",
    bookRef: "Cap. 13.7 Análisis del Valor Ganado",
  },
  {
    id: "pre-fv-2",
    domain: "Finanzas y Valor Ganado",
    question:
      "En un proyecto público, una actividad crítica no tiene partida habilitada en SIAFI. ¿Qué exige la gestión financiera?",
    options: [
      "Ordenar al proveedor iniciar sin respaldo presupuestario.",
      "Tramitar modificación/reprogramación presupuestaria formal y re-secuenciar tareas sin compromiso financiero inmediato.",
      "Ocultar el faltante hasta el cierre.",
      "Pagar con caja chica personal.",
    ],
    correctIndex: 1,
    explanation:
      "Nunca se debe comprometer gasto público sin crédito presupuestario disponible en SIAFI (Cap. 5.4 y 8.5).",
    bookRef: "Cap. 5.4 Conducta y Cap. 8.5 Presupuesto",
  },
  {
    id: "pre-fv-3",
    domain: "Finanzas y Valor Ganado",
    question:
      "¿Qué representa el indicador TCPI (Índice de Desempeño del Trabajo por Completar)?",
    options: [
      "El porcentaje de moral del equipo.",
      "La eficiencia de costo requerida en el trabajo restante para cumplir el presupuesto objetivo (BAC o EAC).",
      "El total de facturas pagadas al inicio.",
      "La cantidad de riesgos cerrados.",
    ],
    correctIndex: 1,
    explanation:
      "Un TCPI > 1.15 suele alertar que alcanzar el BAC original ya no es realista sin re-baselining o recortes (Cap. 13.7).",
    bookRef: "Cap. 13.7 Valor Ganado (TCPI)",
  },
  {
    id: "pre-fv-4",
    domain: "Finanzas y Valor Ganado",
    question:
      "Al evaluar inversiones (Cap. 8.2), ¿qué indica un VAN (Valor Actual Neto) positivo?",
    options: [
      "Que el proyecto destruye valor financiero.",
      "Que los flujos de beneficios descontados superan la inversión inicial por encima de la tasa de corte.",
      "Que el proyecto no tiene riesgos.",
      "Que la duración es menor a 1 mes.",
    ],
    correctIndex: 1,
    explanation:
      "Un VAN > 0 demuestra creación neta de valor económico considerando el valor del dinero en el tiempo.",
    bookRef: "Cap. 8.2 Indicadores Financieros",
  },

  // 6. Interesados y Comunicaciones (4)
  {
    id: "pre-ic-1",
    domain: "Interesados y Comunicaciones",
    question:
      "¿Cómo debe gestionarse un interesado con alto poder e influencia que muestra resistencia al proyecto?",
    options: [
      "Mantenerlo desinformado hasta la entrega final.",
      "Enviarle reportes anuales genéricos.",
      "Gestionarlo de cerca mediante comunicación proactiva, escucha de expectativas y alineación temprana.",
      "Delegar toda relación al equipo junior.",
    ],
    correctIndex: 2,
    explanation:
      "La matriz Poder/Interés (Cap. 4.8 y 9.1) indica 'Gestionar de cerca' a interesados de alto poder.",
    bookRef: "Cap. 4.8 y Cap. 12.4 Interesados",
  },
  {
    id: "pre-ic-2",
    domain: "Interesados y Comunicaciones",
    question:
      "¿Por qué aumenta exponencialmente la complejidad de comunicación al sumar personas al equipo (Cap. 9.2)?",
    options: [
      "Porque los canales crecen linealmente.",
      "Porque los canales potenciales de comunicación crecen según n(n-1)/2.",
      "Porque se prohíben las reuniones.",
      "Porque disminuye la necesidad de documentar.",
    ],
    correctIndex: 1,
    explanation:
      "La fórmula n(n-1)/2 explica por qué agregar personal tarde empeora atrasos (Ley de Brooks).",
    bookRef: "Cap. 9.2 Planificar Comunicaciones",
  },
  {
    id: "pre-ic-3",
    domain: "Interesados y Comunicaciones",
    question:
      "Ante oposición comunitaria a una obra pública por desinformación, ¿qué estrategia recomienda el PMBOK® v8?",
    options: [
      "Imponer la obra sin dialogar.",
      "Abrir mesa participativa transparente, escuchar preocupaciones y crear mecanismos de veeduría.",
      "Suspender definitivamente el proyecto sin evaluar alternativas.",
      "Responder solo con boletines jurídicos.",
    ],
    correctIndex: 1,
    explanation:
      "El compromiso bidireccional temprano construye licencia social y reduce bloqueos operativos (Cap. 12.4).",
    bookRef: "Cap. 12.4 Gestionar Compromiso",
  },
  {
    id: "pre-ic-4",
    domain: "Interesados y Comunicaciones",
    question:
      "¿Qué debe contener un Plan de Gestión de Comunicaciones efectivo (Cap. 9.2)?",
    options: [
      "Solo correos electrónicos de emergencia.",
      "Qué información se comunica, a quién, con qué frecuencia, formato, responsable y canal.",
      "Únicamente el organigrama de TI.",
      "Los salarios de todo el equipo.",
    ],
    correctIndex: 1,
    explanation:
      "Asegura que la información correcta llegue al interesado correcto en el momento oportuno.",
    bookRef: "Cap. 9.2 Planificar Comunicaciones",
  },

  // 7. Recursos y Liderazgo (4)
  {
    id: "pre-rl-1",
    domain: "Recursos y Liderazgo",
    question:
      "Ante un atraso moderado, ¿cuál es el riesgo principal de imponer 'crunch' (horas extra sostenidas)?",
    options: [
      "Aumenta la velocidad indefinidamente.",
      "Genera burnout, rotación de talento, caída de moral y mayor tasa de defectos.",
      "Reduce los costos fijos permanentemente.",
      "Elimina dependencias del cronograma.",
    ],
    correctIndex: 1,
    explanation:
      "El liderazgo servicial y el ritmo sostenible (Cap. 12.7 y 16.1) protegen la capacidad productiva y la calidad.",
    bookRef: "Cap. 12.7 y Cap. 16.1 Liderazgo Servicial",
  },
  {
    id: "pre-rl-2",
    domain: "Recursos y Liderazgo",
    question:
      "¿Qué práctica mitiga el riesgo de 'Bus Factor = 1' cuando un especialista único anuncia su salida?",
    options: [
      "Pedirle programar más features hasta el último día sin documentar.",
      "Planificar transferencia estructurada de conocimiento, documentación y pair-work con el equipo.",
      "Ocultar su renuncia al patrocinador.",
      "Eliminar el módulo que diseñó.",
    ],
    correctIndex: 1,
    explanation:
      "Gestionar el conocimiento del proyecto (Cap. 12.3) protege la continuidad operativa ante rotación.",
    bookRef: "Cap. 12.3 Gestionar el Conocimiento",
  },
  {
    id: "pre-rl-3",
    domain: "Recursos y Liderazgo",
    question:
      "En la escalera de desarrollo de equipos de Tuckman (Cap. 10.1 / 16.3), ¿qué caracteriza la etapa de 'Tormenta' (Storming)?",
    options: [
      "Armonía total sin desacuerdos.",
      "Fricciones por roles, estilos y liderazgo que requieren facilitación del DP para avanzar a Normalización.",
      "Disolución final del equipo.",
      "Ausencia total de trabajo.",
    ],
    correctIndex: 1,
    explanation:
      "El DP facilita la resolución constructiva de conflictos en Storming para consolidar normas de trabajo.",
    bookRef: "Cap. 10.1 y Cap. 16.3 Equipo",
  },
  {
    id: "pre-rl-4",
    domain: "Recursos y Liderazgo",
    question:
      "¿Qué busca el principio de Empoderamiento (Cap. 3.7)?",
    options: [
      "Microgestionar cada hora del equipo.",
      "Dar autonomía responsable al equipo más cercano al trabajo para decidir y resolver bloqueos rápido.",
      "Eliminar toda rendición de cuentas.",
      "Centralizar todas las decisiones en el comité directivo.",
    ],
    correctIndex: 1,
    explanation:
      "El empoderamiento acelera respuestas y eleva el compromiso sin perder alineamiento con la visión.",
    bookRef: "Cap. 3.7 Principio de Empoderamiento",
  },

  // 8. Riesgos y Respuestas (4)
  {
    id: "pre-rr-1",
    domain: "Riesgos y Respuestas",
    question:
      "¿Cuál es la diferencia clave entre Reserva de Contingencia y Reserva de Gestión?",
    options: [
      "Ambas las gasta el DP sin control.",
      "La de contingencia cubre riesgos identificados ('conocidos-desconocidos') dentro de la línea base; la de gestión cubre imprevistos no identificados.",
      "La de gestión es para salarios rutinarios.",
      "No existen en proyectos públicos.",
    ],
    correctIndex: 1,
    explanation:
      "La Línea Base de Costos incluye contingencias; la reserva de gestión requiere aprobación de gobernanza (Cap. 8.5 y 11.6).",
    bookRef: "Cap. 8.5 y Cap. 11.6 Reservas",
  },
  {
    id: "pre-rr-2",
    domain: "Riesgos y Respuestas",
    question:
      "¿Cómo se calcula el Valor Monetario Esperado (EMV) en el análisis cuantitativo de riesgos (Cap. 11.5)?",
    options: [
      "Costo total dividido entre duración.",
      "Probabilidad del riesgo multiplicada por su impacto monetario.",
      "Suma de todas las facturas pendientes.",
      "Porcentaje de moral por número de interesados.",
    ],
    correctIndex: 1,
    explanation:
      "EMV = Probabilidad × Impacto; permite dimensionar reservas de contingencia de forma objetiva.",
    bookRef: "Cap. 11.5 Análisis Cuantitativo (EMV)",
  },
  {
    id: "pre-rr-3",
    domain: "Riesgos y Respuestas",
    question:
      "¿Qué estrategia aplica cuando decides usar una tecnología probada en lugar de una experimental para anular un riesgo?",
    options: [
      "Aceptar.",
      "Evitar.",
      "Escalar sin plan.",
      "Ignorar.",
    ],
    correctIndex: 1,
    explanation:
      "Evitar elimina la amenaza cambiando el plan para proteger los objetivos del proyecto (Cap. 11.6).",
    bookRef: "Cap. 11.6 Respuestas a Riesgos",
  },
  {
    id: "pre-rr-4",
    domain: "Riesgos y Respuestas",
    question:
      "¿Cómo se denomina una oportunidad (riesgo positivo) en la planificación de respuestas (Cap. 11.6)?",
    options: [
      "Siempre se evita.",
      "Se puede Explotar, Mejorar, Compartir o Aceptar para capturar valor adicional.",
      "Se castiga con multa.",
      "Solo se registra después del cierre.",
    ],
    correctIndex: 1,
    explanation:
      "Los riesgos positivos (oportunidades) se gestionan activamente para maximizar beneficios.",
    bookRef: "Cap. 11.6 Oportunidades",
  },

  // 9. Enfoque Adaptativo (4)
  {
    id: "pre-ea-1",
    domain: "Enfoque Adaptativo",
    question:
      "En un entorno de alta incertidumbre y backlog saturado, ¿qué práctica maximiza la entrega temprana de valor?",
    options: [
      "Trabajar todas las historias en paralelo sin límite WIP.",
      "Priorizar el Product Backlog por valor/riesgo (MoSCoW / Cost of Delay) y limitar el WIP en Kanban.",
      "Congelar requisitos por 12 meses.",
      "Eliminar retrospectivas.",
    ],
    correctIndex: 1,
    explanation:
      "Limitar el WIP (Cap. 15.4 y 18.2) y priorizar por valor (Cap. 17.5) acelera el flujo y reduce cuellos de botella.",
    bookRef: "Cap. 15.4, 17.5 y 18.2 Flujo Ágil",
  },
  {
    id: "pre-ea-2",
    domain: "Enfoque Adaptativo",
    question:
      "¿Qué significa 'Lean' aplicado a la gestión de proyectos (Cap. 15.3)?",
    options: [
      "Trabajar más horas por menos salario.",
      "Maximizar el valor entregado eliminando sistemáticamente desperdicios (retrabajo, esperas, burocracia duplicada).",
      "No documentar nada.",
      "Usar únicamente hojas de cálculo.",
    ],
    correctIndex: 1,
    explanation:
      "Lean optimiza el flujo de valor eliminando actividades que no aportan valor al cliente o ciudadano.",
    bookRef: "Cap. 15.3 Lean",
  },
  {
    id: "pre-ea-3",
    domain: "Enfoque Adaptativo",
    question:
      "¿Cuál es el propósito principal de la Retrospectiva de Sprint (Cap. 18.8)?",
    options: [
      "Buscar culpables de los errores.",
      "Inspeccionar cómo trabajó el equipo y definir mejoras concretas de proceso y colaboración para el siguiente ciclo.",
      "Presentar el producto al cliente final.",
      "Aprobar el presupuesto anual.",
    ],
    correctIndex: 1,
    explanation:
      "La retrospectiva institucionaliza la mejora continua del equipo y su forma de trabajo.",
    bookRef: "Cap. 18.8 Mejorar el Equipo",
  },
  {
    id: "pre-ea-4",
    domain: "Enfoque Adaptativo",
    question:
      "¿Qué mide el 'Lead Time' en un tablero Kanban (Cap. 18.2–18.4)?",
    options: [
      "El tiempo total desde que se solicita un ítem hasta que se entrega al usuario.",
      "Solo las horas de reunión.",
      "El salario del Product Owner.",
      "La cantidad de servidores en la nube.",
    ],
    correctIndex: 0,
    explanation:
      "Reducir el Lead Time mediante límites WIP mejora la predictibilidad y velocidad de entrega de valor.",
    bookRef: "Cap. 18.2–18.4 Medición de Flujo",
  },

  // 10. Beneficios y Cierre (4)
  {
    id: "pre-bc-1",
    domain: "Beneficios y Cierre",
    question:
      "Un proyecto público entregó 100% del software y equipos, pero la atención ciudadana no mejoró. ¿Qué falló?",
    options: [
      "Faltó comprar servidores más caros.",
      "Se desconectaron los productos (outputs) del Plan de Gestión de Beneficios e impactos (outcomes).",
      "El cronograma fue demasiado corto para cerrar.",
      "No se aplicó fast-tracking al final.",
    ],
    correctIndex: 1,
    explanation:
      "El Plan de Gestión de Beneficios (Cap. 4.6) asegura que los entregables se traduzcan en adopción e impacto medible.",
    bookRef: "Cap. 4.6 Plan de Gestión de Beneficios",
  },
  {
    id: "pre-bc-2",
    domain: "Beneficios y Cierre",
    question:
      "¿Qué actividad es obligatoria en el Cierre del Proyecto aunque el proyecto haya sido cancelado anticipadamente (Cap. 14.1)?",
    options: [
      "Borrar todos los documentos del servidor.",
      "Formalizar motivos de cierre, liquidar contratos, liberar recursos y documentar lecciones aprendidas.",
      "Seguir facturando al cliente 6 meses más.",
      "Omitir la comunicación a interesados.",
    ],
    correctIndex: 1,
    explanation:
      "Incluso en terminación anticipada, el cierre ordenado protege activos, contratos y aprendizaje organizacional.",
    bookRef: "Cap. 14.1 Cierre del Proyecto",
  },
  {
    id: "pre-bc-3",
    domain: "Beneficios y Cierre",
    question:
      "¿Quién es responsable de sostener y medir los beneficios después de que el proyecto cierra formalmente?",
    options: [
      "El equipo temporal ya desmovilizado.",
      "El Dueño de los Beneficios / Área Operativa mediante la transferencia formal en el cierre.",
      "Un proveedor externo sin contrato.",
      "Nadie; los beneficios se asumen automáticamente.",
    ],
    correctIndex: 1,
    explanation:
      "La transferencia operativa al Dueño de Beneficios garantiza que el valor continúe tras el cierre (Cap. 4.6 y 14.1).",
    bookRef: "Cap. 4.6 y Cap. 14.1 Transición",
  },
  {
    id: "pre-bc-4",
    domain: "Beneficios y Cierre",
    question:
      "¿Por qué no se deben firmar actas de recepción definitiva sin verificar entregables físicos y funcionales?",
    options: [
      "Para retrasar el pago al proveedor sin razón.",
      "Porque exime al proveedor de garantías y genera hallazgos de auditoría por activos inexistentes o defectuosos.",
      "Porque el Acta de Constitución lo prohíbe siempre.",
      "Para ahorrar papel.",
    ],
    correctIndex: 1,
    explanation:
      "La validación previa protege la calidad, el patrimonio público/privado y la responsabilidad legal del DP.",
    bookRef: "Cap. 13.3 y Cap. 14.1 Recepción",
  },
];

export const POST_TEST_POOL: QuizQuestion[] = [
  // 1. Principios y Valor (4)
  {
    id: "post-pv-1",
    domain: "Principios y Valor",
    question:
      "Al evaluar alternativas bajo el Principio de Valor del PMBOK® 8, ¿qué criterio debe guiar al Director de Proyecto?",
    options: [
      "Maximizar la cantidad de documentos generados por fase.",
      "Priorizar las acciones que protegen o incrementan el beneficio neto e impacto esperado.",
      "Evitar cualquier ajuste aunque cambie el contexto estratégico.",
      "Reducir costos a cero sacrificando funcionalidad esencial.",
    ],
    correctIndex: 1,
    explanation:
      "Las decisiones deben evaluarse por su contribución al valor sostenible y resultados estratégicos (Cap. 3.3).",
    bookRef: "Cap. 3.3 Principio de Valor",
  },
  {
    id: "post-pv-2",
    domain: "Principios y Valor",
    question:
      "Un proyecto de infraestructura entrega un edificio terminado, pero sin equipamiento médico ni personal asignado. ¿Qué principio se vulneró?",
    options: [
      "Enfoque de Valor e Integración hacia resultados operativos.",
      "Fast-tracking.",
      "Análisis Monte Carlo.",
      "Cálculo de holgura libre.",
    ],
    correctIndex: 0,
    explanation:
      "Entregar un cascarón físico sin habilitar el servicio rompe el vínculo entre producto e impacto (Cap. 3.3 y 4.6).",
    bookRef: "Cap. 3.3 Valor y Cap. 4.6 Beneficios",
  },
  {
    id: "post-pv-3",
    domain: "Principios y Valor",
    question:
      "¿Qué decisión refleja mejor el principio de Calidad (Cap. 3.4)?",
    options: [
      "Aprobar entregas con defectos conocidos para mostrar velocidad.",
      "Prevenir defectos desde el diseño y cumplir estándares acordados antes de liberar a producción.",
      "Eliminar las pruebas de aceptación.",
      "Transferir los errores al equipo de soporte.",
    ],
    correctIndex: 1,
    explanation:
      "La calidad preventiva cuesta mucho menos que corregir fallas externas en operación.",
    bookRef: "Cap. 3.4 Principio de Calidad",
  },
  {
    id: "post-pv-4",
    domain: "Principios y Valor",
    question:
      "Si una decisión ahorra 15% del presupuesto pero viola un estándar crítico de seguridad operacional, ¿qué exige la ética PMI?",
    options: [
      "Aceptar el ahorro y firmar la salida.",
      "No compensar nunca una infracción crítica de seguridad con ahorro de costo o tiempo.",
      "Ocultar el informe técnico de seguridad.",
      "Delegar la firma a un practicante.",
    ],
    correctIndex: 1,
    explanation:
      "La seguridad y la integridad ética no son negociables ni compensables por ahorros financieros (Cap. 5.4).",
    bookRef: "Cap. 5.4 Conducta Profesional",
  },

  // 2. Gobernanza y Cambios (4)
  {
    id: "post-gc-1",
    domain: "Gobernanza y Cambios",
    question:
      "Una autoridad externa exige ampliar cobertura territorial sin partida presupuestaria. ¿Cuál es la ruta correcta?",
    options: [
      "Cargar el gasto a partidas de otro programa.",
      "Documentar solicitud, cuantificar impacto en alcance/costo/plazo y someterla al CCB y unidad financiera antes de comprometer recursos.",
      "Aceptar verbalmente esperando fondos a fin de año.",
      "Suspender todo sin avisar al patrocinador.",
    ],
    correctIndex: 1,
    explanation:
      "La gobernanza transparente exige análisis de impacto y aprobación formal antes de ejecutar cambios (Cap. 5.2 y 13.2).",
    bookRef: "Cap. 5.2 Gobernanza y Cap. 13.2",
  },
  {
    id: "post-gc-2",
    domain: "Gobernanza y Cambios",
    question:
      "En un proyecto con múltiples gerencias, ¿qué órgano resuelve formalmente las solicitudes de cambio a las líneas base?",
    options: [
      "El chat informal del equipo técnico.",
      "El Comité de Control de Cambios (CCB) definido en el marco de gobernanza.",
      "El proveedor de servicios en la nube.",
      "La mesa de ayuda de soporte.",
    ],
    correctIndex: 1,
    explanation:
      "El CCB evalúa e integra impactos en alcance, tiempo, costo, calidad y riesgo (Cap. 13.2).",
    bookRef: "Cap. 13.2 Evaluar Cambios",
  },
  {
    id: "post-gc-3",
    domain: "Gobernanza y Cambios",
    question:
      "Un proveedor reclama pago adicional por un entregable que sí figuraba en la EDT contractual. ¿Cómo debe actuar el DP?",
    options: [
      "Pagar de inmediato para evitar fricciones.",
      "Auditar el reclamo contra el contrato/SOW y rechazarlo con evidencia documental formal.",
      "Descontarle sin notificar.",
      "Cancelar el proyecto completo.",
    ],
    correctIndex: 1,
    explanation:
      "Controlar las adquisiciones (Cap. 13.13) exige verificar reclamos con evidencia objetiva del contrato.",
    bookRef: "Cap. 13.13 Controlar Adquisiciones",
  },
  {
    id: "post-gc-4",
    domain: "Gobernanza y Cambios",
    question:
      "¿Qué ocurre cuando se aprueba un cambio de alcance en el CCB?",
    options: [
      "Solo se avisa verbalmente al desarrollador.",
      "Se actualizan las líneas base de alcance, cronograma y presupuesto, y se comunica a interesados.",
      "Se mantiene la línea base vieja sin cambios.",
      "Se cierra el proyecto.",
    ],
    correctIndex: 1,
    explanation:
      "Integrar planes (Cap. 5.5) exige mantener coherencia entre todas las líneas base tras aprobar un cambio.",
    bookRef: "Cap. 5.5 Integrar Planes",
  },

  // 3. Alcance y EDT (4)
  {
    id: "post-ae-1",
    domain: "Alcance y EDT",
    question:
      "¿Para qué sirve validar formalmente los entregables contra el Enunciado del Alcance y la EDT antes del cierre?",
    options: [
      "Para obtener la aceptación formal del cliente/patrocinador y evitar disputas por alcance no acordado.",
      "Para reemplazar la contabilidad financiera.",
      "Para asignar culpas por retrasos.",
      "Para omitir pruebas de calidad.",
    ],
    correctIndex: 0,
    explanation:
      "Validar el alcance (Cap. 13.3) formaliza la aceptación de los entregables completados.",
    bookRef: "Cap. 6.3–6.4 y Cap. 13.3",
  },
  {
    id: "post-ae-2",
    domain: "Alcance y EDT",
    question:
      "Si 8 sucursales piden 95 requisitos distintos que exceden presupuesto y tiempo, ¿qué enfoque protege la EDT?",
    options: [
      "Prometer los 95 requisitos sin recortar nada.",
      "Priorizar requisitos core estandarizados/parametrizables y diferir extras a Fase 2.",
      "Eliminar todos los requisitos de las sucursales.",
      "Ocultar la lista de requisitos.",
    ],
    correctIndex: 1,
    explanation:
      "Priorizar requisitos esenciales y controlar el alcance en la EDT protege la viabilidad del proyecto (Cap. 6.2–6.4).",
    bookRef: "Cap. 6.2–6.4 Requisitos y EDT",
  },
  {
    id: "post-ae-3",
    domain: "Alcance y EDT",
    question:
      "¿Qué herramienta acompaña a la EDT definiendo criterios de aceptación, responsable y descripción detallada de cada paquete de trabajo?",
    options: [
      "El Diccionario de la EDT.",
      "La matriz RACI financiera.",
      "El diagrama de Pareto.",
      "El acta de constitución.",
    ],
    correctIndex: 0,
    explanation:
      "El Diccionario de la EDT evita ambigüedades sobre qué incluye y qué excluye cada entregable (Cap. 6.4).",
    bookRef: "Cap. 6.4 Diccionario EDT",
  },
  {
    id: "post-ae-4",
    domain: "Alcance y EDT",
    question:
      "¿Por qué omitir obras complementarias indispensables (como accesos de un puente) en la EDT es un error grave?",
    options: [
      "Porque hace imposible que el entregable genere el impacto operativo esperado.",
      "Porque aumenta el VAN.",
      "Porque reduce el número de interesados.",
      "Porque acelera la licitación sin riesgos.",
    ],
    correctIndex: 0,
    explanation:
      "La EDT debe cubrir el 100% del alcance necesario para que el producto sea funcional.",
    bookRef: "Cap. 6.4 Regla del 100%",
  },

  // 4. Cronograma y Línea Base (4)
  {
    id: "post-cl-1",
    domain: "Cronograma y Línea Base",
    question:
      "Si una actividad en la Ruta Crítica se retrasa 5 días sin acciones correctivas, ¿qué ocurre?",
    options: [
      "No afecta la fecha final.",
      "La fecha de finalización del proyecto se retrasa al menos 5 días (holgura total = 0).",
      "El presupuesto baja automáticamente.",
      "Desaparece la ruta crítica.",
    ],
    correctIndex: 1,
    explanation:
      "Las actividades críticas tienen holgura cero y determinan la fecha de término (Cap. 7.6).",
    bookRef: "Cap. 7.6 Método de la Ruta Crítica",
  },
  {
    id: "post-cl-2",
    domain: "Cronograma y Línea Base",
    question:
      "Ante una ventana climática restrictiva (ej. lluvias en obra), ¿qué debe hacerse al desarrollar el cronograma?",
    options: [
      "Ignorar el calendario estacional.",
      "Programar hitos críticos expuestos (cimentación/pilotes) dentro de la ventana seca y prefabricar en paralelo.",
      "Trabajar sin medidas de seguridad durante tormentas.",
      "No aprobar línea base.",
    ],
    correctIndex: 1,
    explanation:
      "Secuenciar y comprimir estratégicamente protege la ruta crítica frente a restricciones externas (Cap. 7.5).",
    bookRef: "Cap. 7.5 Desarrollar el Cronograma",
  },
  {
    id: "post-cl-3",
    domain: "Cronograma y Línea Base",
    question:
      "Al aplicar Crashing para recuperar 3 semanas de atraso, ¿qué actividades deben elegirse primero?",
    options: [
      "Actividades con holgura alta fuera de ruta crítica.",
      "Actividades en la Ruta Crítica con la menor pendiente de costo por día recuperado.",
      "Cualquier tarea administrativa al azar.",
      "Las tareas ya terminadas.",
    ],
    correctIndex: 1,
    explanation:
      "El Crashing óptimo solo acelera la ruta crítica donde el costo marginal por unidad de tiempo es menor (Cap. 7.6).",
    bookRef: "Cap. 7.6 Crashing",
  },
  {
    id: "post-cl-4",
    domain: "Cronograma y Línea Base",
    question:
      "¿Qué permite la estimación por tres valores (PERT: Optimista, Más Probable, Pesimista)?",
    options: [
      "Fijar siempre la duración más corta.",
      "Incorporar incertidumbre en la duración esperada y calcular varianza para análisis de riesgo.",
      "Eliminar la necesidad de dependencias.",
      "Calcular el ROI.",
    ],
    correctIndex: 1,
    explanation:
      "PERT pondera escenarios optimista, más probable y pesimista para estimaciones realistas (Cap. 7.4).",
    bookRef: "Cap. 7.4 Estimar Duraciones",
  },

  // 5. Finanzas y Valor Ganado (4)
  {
    id: "post-fv-1",
    domain: "Finanzas y Valor Ganado",
    question:
      "En el sector público, una actividad clave carece de asignación presupuestaria en SIAFI. ¿Qué acción cumple con la gestión financiera?",
    options: [
      "Ordenar al proveedor iniciar sin respaldo presupuestario.",
      "Gestionar reprogramación presupuestaria formal en SIAFI y re-secuenciar tareas sin compromiso financiero inmediato.",
      "Ocultar el faltante hasta auditoría.",
      "Usar fondos personales.",
    ],
    correctIndex: 1,
    explanation:
      "Está prohibido comprometer gasto sin crédito presupuestario; se debe habilitar formalmente y replanificar secuencia.",
    bookRef: "Cap. 5.4 y Cap. 8.5 Presupuesto",
  },
  {
    id: "post-fv-2",
    domain: "Finanzas y Valor Ganado",
    question:
      "Si BAC = $500M, EV = $200M y AC = $250M, ¿cuál es el CPI y qué significa?",
    options: [
      "CPI = 1.25 (ahorro).",
      "CPI = 0.80 (sobrecosto: se obtienen $0.80 de valor por cada $1 gastado).",
      "CPI = 0.50 (adelanto).",
      "CPI = 1.00 (en presupuesto).",
    ],
    correctIndex: 1,
    explanation:
      "CPI = EV / AC = 200 / 250 = 0.80 (< 1.0 indica sobrecosto, Cap. 13.7).",
    bookRef: "Cap. 13.7 Valor Ganado (CPI)",
  },
  {
    id: "post-fv-3",
    domain: "Finanzas y Valor Ganado",
    question:
      "Con CPI = 0.80 y BAC = $500M, si la tendencia continúa igual, ¿cuál es el Pronóstico al Concluir (EAC = BAC / CPI)?",
    options: [
      "$400M.",
      "$625M (sobrecosto proyectado de $125M).",
      "$500M exactos.",
      "$250M.",
    ],
    correctIndex: 1,
    explanation:
      "EAC = $500M / 0.80 = $625M, alertando tempranamente al patrocinador de una desviación de $125M.",
    bookRef: "Cap. 13.7 Pronóstico EAC",
  },
  {
    id: "post-fv-4",
    domain: "Finanzas y Valor Ganado",
    question:
      "¿Qué diferencia hay entre Costos Hundidos (Sunk Costs) y Costos Futuros al decidir si continuar o detener un proyecto?",
    options: [
      "Los costos hundidos deben obligar a continuar aunque ya no sea viable.",
      "Los costos hundidos ya se gastaron y no deben sesgar la decisión; se evalúa el beneficio futuro vs. el costo restante.",
      "No hay diferencia.",
      "Solo importan los costos del primer mes.",
    ],
    correctIndex: 1,
    explanation:
      "Las decisiones racionales evalúan valor futuro y costo por completar, evitando la falacia del costo hundido (Cap. 8.1).",
    bookRef: "Cap. 8.1 Tipos de Costos",
  },

  // 6. Interesados y Comunicaciones (4)
  {
    id: "post-ic-1",
    domain: "Interesados y Comunicaciones",
    question:
      "Cuando un grupo de usuarios o gremio rechaza adoptar un nuevo sistema por temor operativo, ¿qué es más efectivo?",
    options: [
      "Emitir un memorándum sancionatorio.",
      "Realizar talleres de validación/co-diseño, comunicación bidireccional y gestión del cambio con líderes clave.",
      "Ignorar sus objeciones.",
      "Cancelar capacitaciones.",
    ],
    correctIndex: 1,
    explanation:
      "Gestionar el compromiso de interesados (Cap. 12.4) reduce resistencia y habilita la adopción real.",
    bookRef: "Cap. 9.2 y Cap. 12.4 Compromiso",
  },
  {
    id: "post-ic-2",
    domain: "Interesados y Comunicaciones",
    question:
      "Cuando cambian las autoridades ministeriales o ejecutivas a mitad de proyecto, ¿qué debe hacer el DP?",
    options: [
      "Esconder los reportes hasta que termine el año.",
      "Presentar rápidamente un briefing ejecutivo con Caso de Negocios, impacto ciudadano/ROI y estado EVM.",
      "Filtrar conflictos a medios.",
      "Detener el proyecto unilateralmente.",
    ],
    correctIndex: 1,
    explanation:
      "Re-alinear patrocinadores nuevos con evidencia objetiva de valor protege la continuidad (Cap. 13.9).",
    bookRef: "Cap. 13.9 Monitorear Interesados",
  },
  {
    id: "post-ic-3",
    domain: "Interesados y Comunicaciones",
    question:
      "Dos gerencias clave tienen prioridades opuestas (velocidad comercial vs. control regulatorio). ¿Cómo facilita el DP?",
    options: [
      "Ignora el conflicto esperando que se resuelva solo.",
      "Facilita mesa conjunta diseñando una solución graduada por riesgo que cumpla la norma sin frenar el negocio.",
      "Obedece al que grite más fuerte.",
      "Omite el control regulatorio.",
    ],
    correctIndex: 1,
    explanation:
      "La resolución colaborativa basada en intereses y riesgo proporcional alinea a las partes (Cap. 16.5).",
    bookRef: "Cap. 16.5 Habilidades Poderosas",
  },
  {
    id: "post-ic-4",
    domain: "Interesados y Comunicaciones",
    question:
      "En proyectos con predios o expropiaciones, ¿qué reduce significativamente los litigios y bloqueos?",
    options: [
      "Judicializar desde el día 1 sin negociar.",
      "Avalúo transparente independiente, compensación justa y trato directo concertado.",
      "Ocupar predios sin aviso.",
      "Dejar accesos sin construir.",
    ],
    correctIndex: 1,
    explanation:
      "La gestión proactiva y justa de interesados afectados evita medidas cautelares de meses.",
    bookRef: "Cap. 9.1 y Cap. 12.4 Interesados",
  },

  // 7. Recursos y Liderazgo (4)
  {
    id: "post-rl-1",
    domain: "Recursos y Liderazgo",
    question:
      "¿Qué caracteriza al Liderazgo Servicial según la Sección III de Pablo Lledó v8.0?",
    options: [
      "Controlar cada tarea minuto a minuto.",
      "Remover impedimentos, proteger al equipo de interrupciones y fomentar empoderamiento y seguridad psicológica.",
      "Asignar toda la carga al miembro más rápido.",
      "Eliminar reuniones de retroalimentación.",
    ],
    correctIndex: 1,
    explanation:
      "El líder servicial habilita el alto desempeño eliminando bloqueos y cuidando el ritmo sostenible (Cap. 16.1).",
    bookRef: "Cap. 16.1 Liderazgo Servicial",
  },
  {
    id: "post-rl-2",
    domain: "Recursos y Liderazgo",
    question:
      "Según la Ley de Brooks, ¿qué suele ocurrir al agregar muchos desarrolladores nuevos a un proyecto ya retrasado?",
    options: [
      "Se duplica la velocidad al día siguiente.",
      "Se retrasa más inicialmente por la sobrecarga de onboarding y canales de comunicación.",
      "Se reducen los costos a cero.",
      "Desaparecen los bugs.",
    ],
    correctIndex: 1,
    explanation:
      "Integrar talento nuevo consume tiempo del equipo senior en transferencia de conocimiento (Cap. 10.2 / 12.6).",
    bookRef: "Cap. 10.2 y Cap. 12.6 Recursos",
  },
  {
    id: "post-rl-3",
    domain: "Recursos y Liderazgo",
    question:
      "¿Cómo se logra adopción sostenible al desplegar una nueva plataforma en 8 sucursales?",
    options: [
      "Enviar un manual PDF de 80 páginas por correo el día del corte.",
      "Ejecutar piloto acotado, formar 'campeones locales' y acompañar la transición.",
      "Contratar externos permanentes para operar por ellos.",
      "Obligar uso sin capacitación.",
    ],
    correctIndex: 1,
    explanation:
      "La gestión del cambio con campeones locales desarrolla capacidad instalada y reduce tickets de soporte.",
    bookRef: "Cap. 12.4 y Cap. 18.1 Adopción",
  },
  {
    id: "post-rl-4",
    domain: "Recursos y Liderazgo",
    question:
      "¿Qué acción fortalece la seguridad psicológica en un equipo ante un error técnico?",
    options: [
      "Sancionar públicamente al responsable.",
      "Analizar la causa raíz del proceso sin culpar personas y definir salvaguardas técnicas.",
      "Ocultar el error en los reportes.",
      "Prohibir reportar fallas.",
    ],
    correctIndex: 1,
    explanation:
      "La seguridad psicológica fomenta detección temprana de riesgos y mejora continua (Cap. 16.3).",
    bookRef: "Cap. 16.3 Equipo de Alto Desempeño",
  },

  // 8. Riesgos y Respuestas (4)
  {
    id: "post-rr-1",
    domain: "Riesgos y Respuestas",
    question:
      "Se detecta una vulnerabilidad crítica de ciberseguridad antes de salir a producción. ¿Qué respuesta es responsable?",
    options: [
      "Lanzar a producción esperando que nadie la note.",
      "Mitigar/corregir la vulnerabilidad con controles de calidad antes del despliegue y comunicar con transparencia.",
      "Ocultar el hallazgo en el registro de riesgos.",
      "Culpar al usuario final.",
    ],
    correctIndex: 1,
    explanation:
      "Amenazas críticas exigen mitigación proactiva y comunicación transparente antes del lanzamiento (Cap. 11.6 y 12.8).",
    bookRef: "Cap. 11.6 y Cap. 12.8 Riesgos",
  },
  {
    id: "post-rr-2",
    domain: "Riesgos y Respuestas",
    question:
      "Si una simulación Monte Carlo P80 muestra probabilidad alta de sobrecosto en una interfaz legacy, ¿cómo se responde?",
    options: [
      "Presupuestar solo el P50 optimista.",
      "Combinar mitigación técnica (adaptador desacoplado), transferencia (SLA) y reserva basada en EMV.",
      "Ignorar la simulación.",
      "Cancelar sin analizar.",
    ],
    correctIndex: 1,
    explanation:
      "El análisis cuantitativo P80/EMV fundamenta reservas y respuestas proporcionales al riesgo (Cap. 11.5).",
    bookRef: "Cap. 11.5 Análisis Cuantitativo",
  },
  {
    id: "post-rr-3",
    domain: "Riesgos y Respuestas",
    question:
      "¿Qué debe hacerse ante un 'riesgo secundario' generado tras aplicar una respuesta a un riesgo principal?",
    options: [
      "Ignorarlo porque ya se aplicó una respuesta.",
      "Identificarlo, analizarlo y planificar su propia respuesta en el Registro de Riesgos.",
      "Eliminar el Registro de Riesgos.",
      "Esperar al cierre.",
    ],
    correctIndex: 1,
    explanation:
      "El monitoreo continuo de riesgos (Cap. 13.12) gestiona riesgos residuales y secundarios.",
    bookRef: "Cap. 13.12 Monitorear Riesgos",
  },
  {
    id: "post-rr-4",
    domain: "Riesgos y Respuestas",
    question:
      "En un despliegue masivo en 30 hospitales con red intermitente, ¿qué estrategia reduce el riesgo operativo?",
    options: [
      "Lanzamiento 'Big Bang' simultáneo el mismo día.",
      "Despliegue incremental por olas comenzando con piloto controlado.",
      "Posponer todo indefinidamente.",
      "Desactivar controles de respaldo.",
    ],
    correctIndex: 1,
    explanation:
      "Las entregas incrementales permiten aprender del piloto y contener incidentes de soporte (Cap. 18.1).",
    bookRef: "Cap. 18.1 Entregas Flexibles",
  },

  // 9. Enfoque Adaptativo (4)
  {
    id: "post-ea-1",
    domain: "Enfoque Adaptativo",
    question:
      "¿Qué práctica ágil ayuda a detectar cuellos de botella y estabilizar el flujo de entrega continua?",
    options: [
      "Abrir la mayor cantidad posible de tareas simultáneas.",
      "Limitar el Work In Progress (WIP) en Kanban y monitorear Lead/Cycle Time.",
      "Medir solo horas en oficina.",
      "Postergar todas las pruebas al final del año.",
    ],
    correctIndex: 1,
    explanation:
      "Limitar WIP y medir Lead/Cycle Time optimiza la eficiencia del flujo (Cap. 18.2–18.4).",
    bookRef: "Cap. 18.2–18.4 Flujo y Medición",
  },
  {
    id: "post-ea-2",
    domain: "Enfoque Adaptativo",
    question:
      "Cuando 4 squads ágiles se bloquean al integrar sus módulos, ¿qué práctica resuelve las dependencias?",
    options: [
      "Premiar puntos individuales por squad aunque falle la integración.",
      "Sincronización (Scrum of Scrums), contratos API versionados e integración continua.",
      "Eliminar pruebas automatizadas.",
      "Trabajar sin Product Owner.",
    ],
    correctIndex: 1,
    explanation:
      "La cadencia sincronizada y acuerdos de interfaz evitan silos y sprints de hardening eternos (Cap. 15.6).",
    bookRef: "Cap. 15.6 Disciplined Agile",
  },
  {
    id: "post-ea-3",
    domain: "Enfoque Adaptativo",
    question:
      "¿Qué criterio ágil debe ordenar el Product Backlog (Cap. 17.5)?",
    options: [
      "Orden alfabético.",
      "Valor de negocio, urgencia (Cost of Delay) y mitigación temprana de riesgos.",
      "Orden de llegada FIFO sin filtro.",
      "Preferencia del último correo recibido.",
    ],
    correctIndex: 1,
    explanation:
      "Priorizar por valor y riesgo entrega retorno más rápido y reduce incertidumbre (Cap. 17.5).",
    bookRef: "Cap. 17.5 Priorización",
  },
  {
    id: "post-ea-4",
    domain: "Enfoque Adaptativo",
    question:
      "¿Para qué sirve la Definición de Terminado (DoD) compartida?",
    options: [
      "Para relajar criterios cuando hay prisa.",
      "Para asegurar que cada incremento cumpla estándares uniformes de calidad, pruebas y seguridad antes de darse por hecho.",
      "Para reemplazar el contrato.",
      "Para calcular impuestos.",
    ],
    correctIndex: 1,
    explanation:
      "La DoD previene deuda técnica oculta y garantiza incrementos potencialmente liberables (Cap. 18.7).",
    bookRef: "Cap. 18.7 Mejorar el Producto",
  },

  // 10. Beneficios y Cierre (4)
  {
    id: "post-bc-1",
    domain: "Beneficios y Cierre",
    question:
      "¿Qué debe verificarse en el Cierre para asegurar que los productos entregados generen impacto esperado?",
    options: [
      "Únicamente que se gastó todo el saldo.",
      "Transferencia operativa formal al dueño de beneficios, métricas de impacto y registro de lecciones aprendidas.",
      "Despedir al equipo sin documentar.",
      "Eliminar el Caso de Negocios.",
    ],
    correctIndex: 1,
    explanation:
      "El cierre profesional (Cap. 14.1 y 4.6) asegura transición operativa, medición de beneficios y conocimiento.",
    bookRef: "Cap. 14.1 y Cap. 4.6 Beneficios",
  },
  {
    id: "post-bc-2",
    domain: "Beneficios y Cierre",
    question:
      "En un proyecto público de infraestructura, ¿qué garantiza su sostenibilidad después de la inauguración?",
    options: [
      "Cortar la cinta sin prueba de carga.",
      "Entregar planos As-Built, manuales y presupuesto/responsable asignado de operación y mantenimiento (O&M).",
      "Mantener abierto el contrato de obra indefinidamente.",
      "Omitir actas de recepción.",
    ],
    correctIndex: 1,
    explanation:
      "Sin transferencia de O&M ni documentación As-Built, la infraestructura se deteriora prematuramente (Cap. 3.6 y 14.1).",
    bookRef: "Cap. 3.6 Sostenibilidad y Cap. 14.1",
  },
  {
    id: "post-bc-3",
    domain: "Beneficios y Cierre",
    question:
      "¿Por qué es un error dejar un proyecto abierto indefinidamente para atender soporte operativo rutinario?",
    options: [
      "Porque los proyectos son temporales; el soporte continuo pertenece a Operaciones y distorsiona costos de inversión.",
      "Porque está prohibido hablar con Operaciones.",
      "Porque aumenta la moral demasiado.",
      "Porque el software deja de funcionar.",
    ],
    correctIndex: 0,
    explanation:
      "Cerrar formalmente libera recursos y separa la inversión del gasto operativo recurrente (Cap. 2.1 y 14.1).",
    bookRef: "Cap. 2.1 Proyecto y Cap. 14.1 Cierre",
  },
  {
    id: "post-bc-4",
    domain: "Beneficios y Cierre",
    question:
      "Al presentar resultados al comité de cierre, ¿qué demuestra realmente el éxito de la inversión?",
    options: [
      "Cantidad de reuniones celebradas.",
      "Comparación objetiva de línea base de beneficios vs. impacto medido (ROI/VAN/reducción de tiempos) y cierre limpio.",
      "Número de páginas del manual.",
      "Solo el porcentaje de horas trabajadas.",
    ],
    correctIndex: 1,
    explanation:
      "Contrastar beneficios reales contra el Caso de Negocios cierra el ciclo de valor del PMBOK® v8 (Cap. 4.5–4.6).",
    bookRef: "Cap. 4.5–4.6 Caso de Negocios",
  },
];

// Backward-compatible aliases
export const PRE_TEST_QUESTIONS = PRE_TEST_POOL.slice(0, 20);
export const POST_TEST_QUESTIONS = POST_TEST_POOL.slice(0, 20);

export function selectPreTestQuestions(
  count = QUIZ_LENGTH,
  seed = Date.now()
): QuizQuestion[] {
  const chosen: QuizQuestion[] = [];
  const perDomain = Math.max(1, Math.floor(count / ALL_PMBOK_DOMAINS.length));
  ALL_PMBOK_DOMAINS.forEach((domain, idx) => {
    const domainQs = seededShuffle(
      PRE_TEST_POOL.filter((q) => q.domain === domain),
      seed + idx * 31
    );
    chosen.push(...domainQs.slice(0, perDomain));
  });
  return seededShuffle(chosen, seed + 997).slice(0, count);
}

export function selectPostTestQuestions(
  preGaps: PmbokDomain[] = [],
  count = QUIZ_LENGTH,
  seed = Date.now()
): QuizQuestion[] {
  const chosen: QuizQuestion[] = [];
  const usedIds = new Set<string>();
  const uniqueGaps = Array.from(new Set(preGaps));

  // 1. Prioritize 2 questions per detected gap domain to verify gap closure
  uniqueGaps.forEach((domain, idx) => {
    const domainQs = seededShuffle(
      POST_TEST_POOL.filter((q) => q.domain === domain),
      seed + idx * 47
    );
    for (const q of domainQs.slice(0, 2)) {
      if (chosen.length < count && !usedIds.has(q.id)) {
        chosen.push(q);
        usedIds.add(q.id);
      }
    }
  });

  // 2. Ensure at least 1 question from remaining domains for global evaluation
  ALL_PMBOK_DOMAINS.forEach((domain, idx) => {
    if (chosen.length >= count) return;
    if (uniqueGaps.includes(domain)) return;
    const domainQs = seededShuffle(
      POST_TEST_POOL.filter((q) => q.domain === domain && !usedIds.has(q.id)),
      seed + idx * 59
    );
    if (domainQs[0]) {
      chosen.push(domainQs[0]);
      usedIds.add(domainQs[0].id);
    }
  });

  // 3. Fill remaining slots randomly from unused questions across all domains
  const remaining = seededShuffle(
    POST_TEST_POOL.filter((q) => !usedIds.has(q.id)),
    seed + 773
  );
  for (const q of remaining) {
    if (chosen.length >= count) break;
    chosen.push(q);
    usedIds.add(q.id);
  }

  return seededShuffle(chosen, seed + 1231).slice(0, count);
}

export function classifyKnowledgeLevel(score: number, total = QUIZ_LENGTH): KnowledgeLevel {
  const ratio = total > 0 ? score / total : 0;
  if (ratio >= 0.8) return "Avanzado";
  if (ratio >= 0.5) return "Intermedio";
  return "Inicial";
}

export function evaluateQuiz(
  phase: "pre" | "post",
  questions: QuizQuestion[],
  selectedIndices: number[]
): QuizResult {
  const answers: QuizAnswerRecord[] = questions.map((q, idx) => {
    const selectedIndex = selectedIndices[idx] ?? -1;
    return {
      questionId: q.id,
      domain: q.domain,
      selectedIndex,
      correct: selectedIndex === q.correctIndex,
    };
  });

  const score = answers.filter((a) => a.correct).length;
  const gapsSet = new Set<PmbokDomain>();
  for (const ans of answers) {
    if (!ans.correct) gapsSet.add(ans.domain);
  }

  return {
    phase,
    score,
    total: questions.length,
    level: classifyKnowledgeLevel(score, questions.length),
    gaps: Array.from(gapsSet),
    answers,
    completedAt: new Date().toISOString(),
  };
}
