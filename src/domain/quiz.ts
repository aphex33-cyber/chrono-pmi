import {
  KnowledgeLevel,
  PmbokDomain,
  QuizAnswerRecord,
  QuizQuestion,
  QuizResult,
} from "./types";

export const PRE_TEST_QUESTIONS: QuizQuestion[] = [
  {
    id: "pre-1",
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
      "El Principio de Valor y Visión (Cap. 3) establece que los proyectos existen para generar valor e impacto real en la organización o ciudadanía, no solo outputs aislados.",
    bookRef: "Cap. 3.2–3.3 Visión y Valor (Lledó v8.0 / PMBOK® 8)",
  },
  {
    id: "pre-2",
    domain: "Gobernanza y Cambios",
    question:
      "Un actor político o ejecutivo de alto nivel solicita verbalmente agregar un módulo nuevo sin variar plazo ni costo. ¿Qué exige la gobernanza del proyecto?",
    options: [
      "Implementarlo de inmediato para mantener una relación cordial con el patrocinador.",
      "Rechazarlo de forma unilateral sin documentar la solicitud.",
      "Registrar una solicitud de cambio formal, evaluar su impacto integral y elevarla al marco de gobernanza (CCB).",
      "Pedir al equipo horas extra no remuneradas para absorberlo en silencio.",
    ],
    correctIndex: 2,
    explanation:
      "Todo cambio al alcance aprobado debe canalizarse por Control Integrado de Cambios (Cap. 13.2) y Gobernanza (Cap. 5.2), evaluando impacto en tiempo, costo, calidad y riesgo.",
    bookRef: "Cap. 5.2 Gobernanza y Cap. 13.2 Evaluar Cambios",
  },
  {
    id: "pre-3",
    domain: "Alcance y EDT",
    question:
      "¿Cuál es la regla fundamental al construir la Estructura de Desglose del Trabajo (EDT / WBS)?",
    options: [
      "Debe incluir únicamente las actividades del cronograma y sus responsables.",
      "Debe representar el 100% del trabajo definido en el alcance del proyecto y enfocarse en entregables.",
      "Solo se elabora en proyectos de construcción y nunca en tecnología o sector público.",
      "Puede omitir entregables menores para no sobrecargar el documento.",
    ],
    correctIndex: 1,
    explanation:
      "La regla del 100% de la EDT/WBS (Cap. 6.4) garantiza que todo el trabajo requerido para completar los entregables esté incluido, evitando trabajo fuera de alcance.",
    bookRef: "Cap. 6.4 Desarrollar la EDT/WBS",
  },
  {
    id: "pre-4",
    domain: "Cronograma y Línea Base",
    question:
      "¿Qué consecuencia crítica ocurre cuando un proyecto inicia ejecución sin haber aprobado formalmente la Línea Base del Cronograma?",
    options: [
      "El equipo trabaja más rápido al no tener restricciones de fechas.",
      "No existe referencia objetiva para medir desviaciones (SV/SPI), ruta crítica ni controlar cambios de plazo.",
      "Se eliminan automáticamente los riesgos de retraso en adquisiciones.",
      "El presupuesto se ajusta de manera automática al avance real.",
    ],
    correctIndex: 1,
    explanation:
      "Sin Línea Base del Cronograma (Cap. 7.5 y 13.5), es imposible aplicar seguimiento objetivo, identificar holguras de ruta crítica o calcular el desempeño del tiempo.",
    bookRef: "Cap. 7.5–7.6 Línea Base y Ruta Crítica",
  },
  {
    id: "pre-5",
    domain: "Finanzas y Valor Ganado",
    question:
      "En Análisis del Valor Ganado (EVM), un proyecto reporta CPI = 0.78 y SPI = 0.85. ¿Qué diagnóstico es técnicamente correcto?",
    options: [
      "El proyecto va adelantado en tiempo y por debajo del presupuesto.",
      "El proyecto tiene sobrecosto (gasta más de lo que produce) y retraso frente al cronograma planificado.",
      "El proyecto ahorra dinero aunque presenta un leve retraso.",
      "Los datos son insuficientes porque el CPI siempre debe ser menor a 1.",
    ],
    correctIndex: 1,
    explanation:
      "Un CPI < 1.0 indica sobrecosto por cada dólar invertido, y un SPI < 1.0 indica atraso respecto al Valor Planificado (Cap. 13.7).",
    bookRef: "Cap. 13.7 Análisis del Valor Ganado (EVM)",
  },
  {
    id: "pre-6",
    domain: "Interesados y Comunicaciones",
    question:
      "¿Cómo debe gestionarse un interesado con alto poder e influencia que manifiesta resistencia al proyecto?",
    options: [
      "Mantenerlo desinformado hasta la entrega final para evitar conflictos.",
      "Monitorearlo pasivamente con reportes trimestrales genéricos.",
      "Gestionarlo de cerca mediante comunicación proactiva, escucha de expectativas y alineación temprana.",
      "Delegar toda interacción al equipo técnico junior.",
    ],
    correctIndex: 2,
    explanation:
      "Según la matriz Poder/Interés (Cap. 4.8 y 9.1), los interesados de alto poder requieren gestión cercana y compromiso continuo (Cap. 12.4).",
    bookRef: "Cap. 4.8 y Cap. 12.4 Gestión de Interesados",
  },
  {
    id: "pre-7",
    domain: "Recursos y Liderazgo",
    question:
      "Ante un atraso moderado, ¿cuál es el riesgo principal de imponer 'crunch' (horas extra sostenidas) como solución recurrente?",
    options: [
      "Aumenta la velocidad indefinidamente sin afectar la calidad.",
      "Genera burnout, rotación de personal, caída de moral y mayor tasa de defectos (retrabajo).",
      "Reduce los costos fijos del proyecto de forma permanente.",
      "Elimina la necesidad de gestionar dependencias en el cronograma.",
    ],
    correctIndex: 1,
    explanation:
      "El liderazgo servicial y el ritmo sostenible (Cap. 12.7 y 16.1) protegen la capacidad productiva del equipo y evitan deuda técnica y rotación.",
    bookRef: "Cap. 12.7 Liderar al Equipo y Cap. 16.1 Liderazgo Servicial",
  },
  {
    id: "pre-8",
    domain: "Riesgos y Respuestas",
    question:
      "¿Cuál es la diferencia clave entre la Reserva de Contingencia y la Reserva de Gestión en el presupuesto?",
    options: [
      "No existe diferencia; ambas las gasta el Director de Proyecto sin autorización.",
      "La de contingencia cubre riesgos identificados ('conocidos-desconocidos') y forma parte de la línea base; la de gestión cubre imprevistos no identificados.",
      "La de gestión se usa para compras rutinarias y la de contingencia para salarios.",
      "Ambas están prohibidas en proyectos del sector público y privado.",
    ],
    correctIndex: 1,
    explanation:
      "La Línea Base de Costos incluye las reservas de contingencia para riesgos identificados; la reserva de gestión requiere aprobación de gobernanza/patrocinador (Cap. 8.5 y 11.6).",
    bookRef: "Cap. 8.5 Presupuesto y Cap. 11.6 Respuestas a Riesgos",
  },
  {
    id: "pre-9",
    domain: "Enfoque Adaptativo",
    question:
      "En un entorno de alta incertidumbre y backlog saturado, ¿qué práctica ágil maximiza la entrega temprana de valor?",
    options: [
      "Trabajar en todas las historias en paralelo sin límites de trabajo en curso (WIP).",
      "Priorizar el Product Backlog por valor/riesgo (ej. MoSCoW o Cost of Delay) y limitar el WIP para acelerar el flujo.",
      "Congelar todos los requisitos por 12 meses antes de mostrar un prototipo.",
      "Eliminar las retrospectivas para ganar horas de programación.",
    ],
    correctIndex: 1,
    explanation:
      "Limitar el WIP (Kanban, Cap. 15.4 y 18.2) y priorizar el backlog por valor (Cap. 17.5) reduce cuellos de botella y entrega valor más rápido.",
    bookRef: "Cap. 15.4 Kanban, Cap. 17.5 Priorización y Cap. 18.2 Flujo",
  },
  {
    id: "pre-10",
    domain: "Beneficios y Cierre",
    question:
      "Un proyecto público construyó e instaló el 100% del software y equipamiento, pero la atención ciudadana no mejoró. ¿Qué falló?",
    options: [
      "Faltó comprar servidores más costosos durante la ejecución.",
      "Se desconectaron los productos (outputs) del Plan de Gestión de Beneficios e impactos esperados (outcomes).",
      "El cronograma fue demasiado corto para redactar el acta de cierre.",
      "No se aplicó fast-tracking en las últimas dos semanas.",
    ],
    correctIndex: 1,
    explanation:
      "El Plan de Gestión de Beneficios (Cap. 4.6) asegura que los entregables técnicos se traduzcan en adopción operativa e impacto real medible.",
    bookRef: "Cap. 4.6 Plan de Gestión de Beneficios y Cap. 14 Cierre",
  },
];

export const POST_TEST_QUESTIONS: QuizQuestion[] = [
  {
    id: "post-1",
    domain: "Principios y Valor",
    question:
      "Al evaluar alternativas bajo el Principio de Valor del PMBOK® 8, ¿qué criterio debe guiar la decisión del Director de Proyecto?",
    options: [
      "Maximizar la cantidad de documentos generados por fase.",
      "Priorizar las acciones que protegen o incrementan el beneficio neto e impacto esperado del proyecto.",
      "Evitar cualquier cambio aunque el entorno de negocio haya cambiado radicalmente.",
      "Reducir costos a cero sacrificando la funcionalidad esencial del entregable.",
    ],
    correctIndex: 1,
    explanation:
      "Las decisiones deben evaluarse por su contribución al valor sostenible y a los resultados estratégicos (Cap. 3.3).",
    bookRef: "Cap. 3.3 Principio de Valor",
  },
  {
    id: "post-2",
    domain: "Gobernanza y Cambios",
    question:
      "Durante la ejecución en el sector público, una autoridad externa exige ampliar la cobertura territorial sin partida presupuestaria. ¿Cuál es la ruta correcta?",
    options: [
      "Ejecutar la ampliación cargándola a partidas de mantenimiento de otro programa.",
      "Documentar la solicitud, cuantificar impacto en alcance/costo/plazo y someterla al Comité de Control de Cambios y unidad financiera antes de comprometer recursos.",
      "Aceptar verbalmente y esperar que el presupuesto aparezca al final del año.",
      "Suspender todo el proyecto indefinidamente sin notificar al patrocinador.",
    ],
    correctIndex: 1,
    explanation:
      "La gobernanza transparente exige análisis de impacto y aprobación formal de financiamiento/alcance antes de ejecutar cambios (Cap. 5.2 y 13.2).",
    bookRef: "Cap. 5.2 Marco de Gobernanza y Cap. 13.2",
  },
  {
    id: "post-3",
    domain: "Alcance y EDT",
    question:
      "¿Para qué sirve validar formalmente los entregables contra el Enunciado del Alcance y la EDT antes del cierre?",
    options: [
      "Para obtener la aceptación formal del cliente/patrocinador y evitar disputas por alcance no acordado.",
      "Para reemplazar la contabilidad financiera del proyecto.",
      "Para asignar culpas si hubo retrasos en fases anteriores.",
      "Para evitar realizar pruebas de calidad sobre el producto.",
    ],
    correctIndex: 0,
    explanation:
      "Validar el alcance (Cap. 13.3) formaliza la aceptación de los entregables completados y previene el 'gold plating' o scope creep.",
    bookRef: "Cap. 6.3–6.4 Alcance/EDT y Cap. 13.3 Validar Alcance",
  },
  {
    id: "post-4",
    domain: "Cronograma y Línea Base",
    question:
      "Si una actividad en la Ruta Crítica se retrasa 5 días y no se toman medidas correctivas, ¿qué ocurre con el proyecto?",
    options: [
      "No afecta la fecha final porque todas las actividades tienen holgura positiva.",
      "La fecha de finalización del proyecto se retrasa al menos 5 días (holgura total = 0).",
      "El presupuesto se reduce proporcionalmente a los días perdidos.",
      "La ruta crítica desaparece automáticamente.",
    ],
    correctIndex: 1,
    explanation:
      "Por definición del Método de la Ruta Crítica (Cap. 7.6), las actividades críticas tienen holgura cero y cualquier atraso impacta directamente la fecha fin.",
    bookRef: "Cap. 7.6 Método de la Ruta Crítica (CPM)",
  },
  {
    id: "post-5",
    domain: "Finanzas y Valor Ganado",
    question:
      "En un proyecto público, una actividad clave carece de asignación presupuestaria en el sistema financiero (ej. SIAFI). ¿Qué acción cumple con la gestión financiera?",
    options: [
      "Ordenar al proveedor que inicie trabajos sin respaldo presupuestario ni contrato.",
      "Gestionar la reprogramación/modificación presupuestaria formal y re-secuenciar tareas sin compromiso financiero inmediato.",
      "Ocultar el faltante hasta la auditoría de cierre.",
      "Usar fondos personales del equipo para cubrir la actividad.",
    ],
    correctIndex: 1,
    explanation:
      "La gestión financiera y de cumplimiento (Cap. 5.4 y 8.5) prohíbe comprometer gasto sin crédito presupuestario; se debe gestionar habilitación formal y replanificar secuencia.",
    bookRef: "Cap. 5.4 Conducta Profesional y Cap. 8.5 Presupuesto",
  },
  {
    id: "post-6",
    domain: "Interesados y Comunicaciones",
    question:
      "Cuando un grupo de usuarios finales o gremio rechaza adoptar un nuevo sistema por temor operativo, ¿qué herramienta es más efectiva?",
    options: [
      "Enviar un memorándum sancionatorio por correo masivo.",
      "Planificar sesiones de co-diseño, comunicación bidireccional y gestión temprana del cambio con líderes clave.",
      "Ignorar sus objeciones porque el sistema ya fue aprobado por TI.",
      "Cancelar las capacitaciones para ahorrar presupuesto.",
    ],
    correctIndex: 1,
    explanation:
      "Gestionar el compromiso de los interesados (Cap. 12.4) mediante escucha activa y participación reduce la resistencia y habilita la adopción.",
    bookRef: "Cap. 9.2 Comunicaciones y Cap. 12.4 Compromiso",
  },
  {
    id: "post-7",
    domain: "Recursos y Liderazgo",
    question:
      "¿Qué caracteriza al Liderazgo Servicial en equipos de alto desempeño según la Sección III de Pablo Lledó v8.0?",
    options: [
      "Controlar cada tarea minuto a minuto sin delegar autonomía.",
      "Remover impedimentos, proteger al equipo de interrupciones externas y fomentar el empoderamiento.",
      "Asignar la mayor carga al miembro más rápido hasta agotarlo.",
      "Evitar las reuniones de retroalimentación para no perder tiempo.",
    ],
    correctIndex: 1,
    explanation:
      "El líder servicial (Cap. 16.1) facilita el flujo de trabajo eliminando bloqueos, promoviendo seguridad psicológica y empoderando al equipo.",
    bookRef: "Cap. 16.1 Liderazgo Servicial y Cap. 3.7 Empoderamiento",
  },
  {
    id: "post-8",
    domain: "Riesgos y Respuestas",
    question:
      "Se detecta una vulnerabilidad crítica de ciberseguridad antes de salir a producción. ¿Qué estrategia de respuesta al riesgo es más responsable?",
    options: [
      "Aceptar pasivamente la amenaza y lanzar a producción esperando que no ocurra.",
      "Mitigar/corregir la vulnerabilidad antes del despliegue aplicando controles de calidad y comunicando el ajuste de ventana de salida.",
      "Ocultar el hallazgo en el registro de riesgos.",
      "Transferir la responsabilidad al usuario final mediante una nota al pie.",
    ],
    correctIndex: 1,
    explanation:
      "Para amenazas de alto impacto y probabilidad, se deben implementar respuestas proactivas (mitigar/evitar) y mantener transparencia (Cap. 11.6 y 12.8).",
    bookRef: "Cap. 11.6 Planificar Respuestas y Cap. 12.8 Implementar",
  },
  {
    id: "post-9",
    domain: "Enfoque Adaptativo",
    question:
      "¿Qué métrica o artefacto ágil ayuda a detectar cuellos de botella y estabilizar el flujo de entrega continua?",
    options: [
      "Aumentar el número de tareas abiertas simultáneamente por persona.",
      "Controlar el Work In Progress (WIP) en el tablero Kanban y medir el Lead/Cycle Time.",
      "Medir únicamente las horas trabajadas en oficina.",
      "Postergar todas las pruebas de integración hasta el último día del año.",
    ],
    correctIndex: 1,
    explanation:
      "Limitar el WIP y monitorear Lead Time / Cycle Time (Cap. 18.2–18.4) optimiza la eficiencia del flujo y la predictibilidad de entrega.",
    bookRef: "Cap. 18.2 Flujo de Trabajo y Cap. 18.4 Medición",
  },
  {
    id: "post-10",
    domain: "Beneficios y Cierre",
    question:
      "¿Qué debe verificarse en el Cierre del Proyecto para asegurar que los productos entregados generen el impacto esperado?",
    options: [
      "Únicamente que se haya gastado todo el saldo bancario.",
      "Transferencia operativa formal al dueño de beneficios, métricas de impacto post-entrega y registro de lecciones aprendidas.",
      "Despedir al equipo inmediatamente sin documentar el conocimiento.",
      "Eliminar el Caso de Negocios porque ya cumplió su función al inicio.",
    ],
    correctIndex: 1,
    explanation:
      "El cierre profesional (Cap. 14.1 y 4.6) garantiza la transición a operaciones, medición de beneficios e institucionalización de lecciones aprendidas.",
    bookRef: "Cap. 14.1 Cierre del Proyecto y Cap. 4.6 Beneficios",
  },
];

export function classifyKnowledgeLevel(score: number): KnowledgeLevel {
  if (score >= 8) return "Avanzado";
  if (score >= 5) return "Intermedio";
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
  const gaps: PmbokDomain[] = answers
    .filter((a) => !a.correct)
    .map((a) => a.domain);

  return {
    phase,
    score,
    total: questions.length,
    level: classifyKnowledgeLevel(score),
    gaps,
    answers,
    completedAt: new Date().toISOString(),
  };
}
