import { Scenario } from "./types";

export const PRIVATE_LEVEL2_SCENARIOS: Scenario[] = [
  {
    id: "priv-l2-1",
    round: 1,
    episodeCode: "N2·01",
    pmbokDomain: "Gobernanza y Cambios",
    title: "Contrato Precio Fijo vs. Alcance Ambiguo",
    sfxText: "¡DISPUTA!",
    narratorBox: "Nivel 2 // Tensión Contractual: El proveedor clave exige sobrecargo por ambigüedad en SOW.",
    speaker: "Director Legal",
    speakerRole: "Proveedor Cloud",
    dialogue:
      "«El enunciado de trabajo no detallaba alta disponibilidad multi-región. O pagan +$85,000 USD o detenemos la entrega.»",
    imagePath: "/images/scope-creep.jpg",
    options: [
      {
        id: "priv-l2-1-a",
        code: "A",
        label: "Pagar el reclamo sin auditar",
        description: "Cedes de inmediato para no frenar el sprint actual.",
        hint: "⏱️ Sin pausa | 💸 -$85k directo",
        sfxWord: "¡SANGRÍA!",
        deltas: { budget: -20, schedule: +2, morale: -4, stakeholders: -8 },
        outcomeNarrative:
          "Evitas el paro, pero pierdes 20% de reserva presupuestaria sin validar el alcance real.",
        pmiBestPracticeScore: 25,
        pmiArea: "Contratos y Adquisiciones (Cap. 5.7 / 13.13)",
        pmiFeedback:
          "En contratos de Precio Fijo, todo reclamo debe auditarse contra la EDT/SOW y el control de cambios.",
      },
      {
        id: "priv-l2-1-b",
        code: "B",
        label: "Auditoría SOW + Adenda negociada",
        description:
          "Revisas cláusulas de alcance, separas lo contractual de mejoras y negocias adenda acotada con hitos.",
        hint: "⚖️ Control contractual | 🛡️ Protege caja",
        sfxWord: "¡ADENDA!",
        deltas: { budget: -8, schedule: -2, morale: +2, stakeholders: +6 },
        outcomeNarrative:
          "Demuestras que la HA básica sí estaba cubierta y acotas la adenda multi-región a solo $35,000 USD.",
        pmiBestPracticeScore: 75,
        pmiArea: "Controlar Adquisiciones (Cap. 5.7 / 13.13)",
        pmiFeedback:
          "Gestión contractual firme: auditoría objetiva del SOW y negociación basada en evidencia.",
      },
      {
        id: "priv-l2-1-c",
        code: "C",
        label: "Romper contrato y licitar de nuevo",
        description: "Terminas la relación y buscas otro proveedor desde cero.",
        hint: "⚖️ Firme | 🐢 -6 semanas",
        sfxWord: "¡RUPTURA!",
        deltas: { budget: -12, schedule: -22, morale: -10, stakeholders: -10 },
        outcomeNarrative:
          "La transición toma 6 semanas y paraliza la ruta crítica comercial.",
        pmiBestPracticeScore: 20,
        pmiArea: "Estrategia de Abastecimiento (Cap. 5.6)",
        pmiFeedback:
          "Terminar un contrato sin plan de transición ni análisis de costo de demora destruye el cronograma.",
      },
    ],
  },
  {
    id: "priv-l2-2",
    round: 2,
    episodeCode: "N2·02",
    pmbokDomain: "Finanzas y Valor Ganado",
    title: "Pronóstico EAC con TCPI > 1.25",
    sfxText: "¡ALARMA EVM!",
    narratorBox: "Nivel 2 // Control Financiero: El TCPI para cumplir el BAC subió a 1.28.",
    speaker: "Elena M.",
    speakerRole: "PMO Controller",
    dialogue:
      "«Matemáticamente necesitamos rendir 28% más por dólar restante para no exceder el presupuesto aprobado. ¡Es casi imposible sin cambios!»",
    imagePath: "/images/private-closing-value.jpg",
    options: [
      {
        id: "priv-l2-2-a",
        code: "A",
        label: "Re-baselining con Scope De-scoping",
        description:
          "Presentas EAC realista al directorio, recortas 20% de features de bajo ROI y re-apruebas línea base.",
        hint: "📊 Realismo EVM | 💎 Protege ROI",
        sfxWord: "¡RE-BASELINE!",
        deltas: { budget: +8, schedule: +4, morale: +4, stakeholders: +2 },
        outcomeNarrative:
          "El directorio valora la honestidad financiera y aprueba enfocar el capital en el core rentable.",
        pmiBestPracticeScore: 75,
        pmiArea: "Valor Ganado y EAC (Cap. 13.7)",
        pmiFeedback:
          "Cuando el TCPI supera la capacidad realista, la respuesta PMBOK es recalcular EAC y ajustar alcance/reserva.",
      },
      {
        id: "priv-l2-2-b",
        code: "B",
        label: "Presionar al equipo para TCPI 1.28",
        description: "Exiges al equipo acelerar 28% sin reducir alcance ni sumar recursos.",
        hint: "💸 Cero ajuste | 🔥 Burnout seguro",
        sfxWord: "¡COLAPSO!",
        deltas: { budget: -10, schedule: -12, morale: -20, stakeholders: -8 },
        outcomeNarrative:
          "La presión irreal dispara defectos y retrabajo; el CPI empeora aún más.",
        pmiBestPracticeScore: 15,
        pmiArea: "Liderazgo y Calidad (Cap. 12.7)",
        pmiFeedback:
          "Ignorar las alertas matemáticas del TCPI lleva a sobrecostos mayores y quiebre del equipo.",
      },
      {
        id: "priv-l2-2-c",
        code: "C",
        label: "Usar Reserva de Gestión sin permiso",
        description: "Cubres el déficit tomando reserva de gestión sin escalar al patrocinador.",
        hint: "💸 Tapa hueco | 🚨 Falla gobernanza",
        sfxWord: "¡EXCESO!",
        deltas: { budget: -14, schedule: 0, morale: 0, stakeholders: -18 },
        outcomeNarrative:
          "Auditoría interna detecta uso no autorizado de reserva de gestión.",
        pmiBestPracticeScore: 20,
        pmiArea: "Presupuesto y Gobernanza (Cap. 8.5)",
        pmiFeedback:
          "La reserva de gestión requiere autorización formal del patrocinador o comité de gobernanza.",
      },
    ],
  },
  {
    id: "priv-l2-3",
    round: 3,
    episodeCode: "N2·03",
    pmbokDomain: "Cronograma y Línea Base",
    title: "Compresión Crítica: Crashing vs. Fast-Tracking",
    sfxText: "¡RUTA CRÍTICA!",
    narratorBox: "Nivel 2 // Holgura Cero: Una regulación bancaria adelanta la fecha límite 3 semanas.",
    speaker: "Rei K.",
    speakerRole: "Arquitecta Cloud",
    dialogue:
      "«Tenemos 3 semanas menos en la ruta crítica. Si paralelizamos sin criterio, romperemos la arquitectura de seguridad.»",
    imagePath: "/images/private-crisis.jpg",
    options: [
      {
        id: "priv-l2-3-a",
        code: "A",
        label: "Fast-Tracking total en paralelo",
        description: "Ejecutas desarrollo, seguridad y certificación bancaria simultáneamente.",
        hint: "⚡ Rápido en papel | 💥 Retrabajo alto",
        sfxWord: "¡RETRABAJO!",
        deltas: { budget: -14, schedule: -10, morale: -12, stakeholders: -6 },
        outcomeNarrative:
          "Los cambios de esquema rompen pruebas en curso; terminan rehaciendo dos semanas de trabajo.",
        pmiBestPracticeScore: 25,
        pmiArea: "Compresión de Cronograma (Cap. 7.5)",
        pmiFeedback:
          "El fast-tracking en tareas altamente acopladas eleva drásticamente el riesgo de retrabajo.",
      },
      {
        id: "priv-l2-3-b",
        code: "B",
        label: "Crashing selectivo por menor costo/día",
        description:
          "Analizas la pendiente costo-tiempo y aplicas crashing solo en 2 actividades críticas independientes.",
        hint: "📐 Técnica CPM | 💰 Costo óptimo",
        sfxWord: "¡CRASHING!",
        deltas: { budget: -8, schedule: +8, morale: +2, stakeholders: +8 },
        outcomeNarrative:
          "Recuperas las 3 semanas exactamente donde la relación costo/día es menor, sin comprometer calidad.",
        pmiBestPracticeScore: 75,
        pmiArea: "Método de la Ruta Crítica (Cap. 7.6)",
        pmiFeedback:
          "Aplicación precisa de Crashing selectivo sobre la ruta crítica minimizando el costo marginal.",
      },
      {
        id: "priv-l2-3-c",
        code: "C",
        label: "Asumir multa regulatoria",
        description: "Mantienes el cronograma original y aceptas pagar la penalización.",
        hint: "😌 Sin esfuerzo | 💸 Multa + imagen",
        sfxWord: "¡SANCIÓN!",
        deltas: { budget: -18, schedule: -6, morale: 0, stakeholders: -14 },
        outcomeNarrative:
          "La multa golpea el flujo de caja y daña la reputación ante el regulador.",
        pmiBestPracticeScore: 30,
        pmiArea: "Respuesta a Riesgos (Cap. 11.6)",
        pmiFeedback:
          "Aceptar pasivamente un impacto evitable sin evaluar compresión cuesta mucho más.",
      },
    ],
  },
  {
    id: "priv-l2-4",
    round: 4,
    episodeCode: "N2·04",
    pmbokDomain: "Riesgos y Respuestas",
    title: "Análisis Cuantitativo Monte Carlo (EMV)",
    sfxText: "¡INCERTIDUMBRE!",
    narratorBox: "Nivel 2 // Decisión de Riesgo: Simulación P80 muestra 65% de probabilidad de sobrecosto.",
    speaker: "Misato R.",
    speakerRole: "Risk Lead",
    dialogue:
      "«El análisis cuantitativo indica un Valor Monetario Esperado (EMV) negativo de -$120,000 si falla la pasarela legacy.»",
    imagePath: "/images/risk-incident.jpg",
    options: [
      {
        id: "priv-l2-4-a",
        code: "A",
        label: "Ignorar el P80 y usar promedio",
        description: "Presupuestas con el escenario más probable (P50) para que el caso de negocio se vea atractivo.",
        hint: "📊 Optimista | 💣 Subfinanciado",
        sfxWord: "¡SESGO!",
        deltas: { budget: -18, schedule: -8, morale: -6, stakeholders: -10 },
        outcomeNarrative:
          "El riesgo se materializa y no hay reserva suficiente para absorberlo.",
        pmiBestPracticeScore: 20,
        pmiArea: "Análisis Cuantitativo (Cap. 11.5)",
        pmiFeedback:
          "Ignorar la distribución P80/EMV deja el proyecto expuesto a contingencias no financiadas.",
      },
      {
        id: "priv-l2-4-b",
        code: "B",
        label: "Mitigar + Transferir con SLA + P80",
        description:
          "Creas adaptador desacoplado (mitigar), contratas seguro/SLA con proveedor (transferir) y reservas EMV.",
        hint: "🛡️ Estrategia mixta | 📊 Rigor cuantitativo",
        sfxWord: "¡P80 BLINDADO!",
        deltas: { budget: -6, schedule: +2, morale: +4, stakeholders: +10 },
        outcomeNarrative:
          "Cuando la pasarela legacy falla 12 horas, el adaptador y el SLA absorben el golpe sin impacto comercial.",
        pmiBestPracticeScore: 75,
        pmiArea: "Cuantificación y Respuestas (Cap. 11.5–11.6)",
        pmiFeedback:
          "Combinación ejemplar de análisis cuantitativo (P80/EMV) y estrategias de mitigación + transferencia.",
      },
      {
        id: "priv-l2-4-c",
        code: "C",
        label: "Reemplazar toda la pasarela ya",
        description: "Reescribes el core legacy completo a mitad del proyecto.",
        hint: "🔧 Limpio | 💸 +$200k y +2 meses",
        sfxWord: "¡DESBORDADO!",
        deltas: { budget: -22, schedule: -18, morale: -8, stakeholders: -6 },
        outcomeNarrative:
          "El reemplazo total dispara costos y retrasa el lanzamiento comercial.",
        pmiBestPracticeScore: 30,
        pmiArea: "Evaluación de Alternativas (Cap. 11.6)",
        pmiFeedback:
          "La respuesta al riesgo debe ser proporcional al costo-beneficio respecto al EMV.",
      },
    ],
  },
  {
    id: "priv-l2-5",
    round: 5,
    episodeCode: "N2·05",
    pmbokDomain: "Enfoque Adaptativo",
    title: "Dependencia Bloqueante entre 4 Squads",
    sfxText: "¡BLOQUEO!",
    narratorBox: "Nivel 2 // Escalamiento Ágil: 4 equipos se bloquean mutuamente en integración.",
    speaker: "Lucas D.",
    speakerRole: "Product Owner",
    dialogue:
      "«Cada squad optimiza su propio sprint, pero al integrar nadie pasa las pruebas end-to-end.»",
    imagePath: "/images/team-crunch.jpg",
    options: [
      {
        id: "priv-l2-5-a",
        code: "A",
        label: "Scrum of Scrums + Contratos API",
        description:
          "Instauras sincronización diaria entre squads, contratos de API versionados e integración continua.",
        hint: "🔗 Alineación ágil | ⚡ Flujo continuo",
        sfxWord: "¡SINCRONÍA!",
        deltas: { budget: -2, schedule: +8, morale: +8, stakeholders: +6 },
        outcomeNarrative:
          "Los bloqueos entre equipos caen 70% y la integración vuelve a ser predecible.",
        pmiBestPracticeScore: 75,
        pmiArea: "Disciplined Agile y Flujo (Cap. 15.6 / 18.2)",
        pmiFeedback:
          "Resolver dependencias entre equipos con acuerdos de interfaz y cadencia sincronizada.",
      },
      {
        id: "priv-l2-5-b",
        code: "B",
        label: "Congelar código 3 semanas (Hardening)",
        description: "Detienes nuevas features y dedicas 3 semanas a parchear integración manual.",
        hint: "🛑 Pausa valor | 🐢 Acumula deuda",
        sfxWord: "¡FRENO!",
        deltas: { budget: -10, schedule: -12, morale: -6, stakeholders: -6 },
        outcomeNarrative:
          "Pierdes 3 semanas de entrega de valor y el problema reaparece en el siguiente release.",
        pmiBestPracticeScore: 35,
        pmiArea: "Entregas Rápidas y Flexibles (Cap. 18.1)",
        pmiFeedback:
          "Los sprints de hardening frecuentes indican falta de integración continua y DoD compartida.",
      },
      {
        id: "priv-l2-5-c",
        code: "C",
        label: "Competencia de velocidad por squad",
        description: "Premias al squad que cierre más puntos individuales aunque rompa integración.",
        hint: "🏆 Métrica tóxica | 💥 Silos",
        sfxWord: "¡SILOS!",
        deltas: { budget: -6, schedule: -10, morale: -14, stakeholders: -10 },
        outcomeNarrative:
          "Los equipos optimizan métricas locales destruyendo el producto integrado.",
        pmiBestPracticeScore: 15,
        pmiArea: "Medición y Análisis Ágil (Cap. 18.4)",
        pmiFeedback:
          "Medir puntos de historia individuales por equipo genera silos y suboptimización.",
      },
    ],
  },
  {
    id: "priv-l2-6",
    round: 6,
    episodeCode: "N2·06",
    pmbokDomain: "Interesados y Comunicaciones",
    title: "Conflicto Ejecutivo: Ventas vs. Compliance",
    sfxText: "¡CHOQUE!",
    narratorBox: "Nivel 2 // Gobernanza de Interesados: Dos VP exigen prioridades opuestas.",
    speaker: "VP Comercial",
    speakerRole: "Patrocinador Adjunto",
    dialogue:
      "«Compliance quiere frenar el onboarding digital por controles KYC. ¡Si frenamos, perdemos el Q4 frente a la competencia!»",
    imagePath: "/images/scope-creep.jpg",
    options: [
      {
        id: "priv-l2-6-a",
        code: "A",
        label: "Alinearse con Ventas y omitir KYC",
        description: "Lanzas el onboarding rápido dejando la verificación KYC para después.",
        hint: "🚀 Venta rápida | 🚨 Riesgo legal",
        sfxWord: "¡MULTA!",
        deltas: { budget: -16, schedule: +4, morale: -8, stakeholders: -18 },
        outcomeNarrative:
          "El regulador abre expediente sancionador y bloquea nuevas altas.",
        pmiBestPracticeScore: 15,
        pmiArea: "Conducta Profesional y Cumplimiento (Cap. 5.4)",
        pmiFeedback:
          "Nunca se debe sacrificar el cumplimiento legal/regulatorio por presión comercial.",
      },
      {
        id: "priv-l2-6-b",
        code: "B",
        label: "Taller de riesgo graduado por monto",
        description:
          "Facilitan mesa conjunta Ventas-Compliance: flujo ágil para cuentas bajo umbral y KYC estricto para montos altos.",
        hint: "🤝 Ganar-Ganar | ⚖️ Riesgo proporcional",
        sfxWord: "¡CONSENSO!",
        deltas: { budget: -2, schedule: +4, morale: +6, stakeholders: +12 },
        outcomeNarrative:
          "Ambos VP aprueban el diseño escalonado: se cumple la norma y se captura 85% del mercado Q4.",
        pmiBestPracticeScore: 75,
        pmiArea: "Compromiso de Interesados (Cap. 12.4 / 16.5)",
        pmiFeedback:
          "Uso magistral de negociación basada en intereses y gestión proporcional del riesgo.",
      },
      {
        id: "priv-l2-6-c",
        code: "C",
        label: "Escalar y esperar que decidan solos",
        description: "Envías un correo poniendo en copia a ambos VP sin proponer opciones.",
        hint: "📧 Neutro | ⏳ Parálisis 3 semanas",
        sfxWord: "¡INDECISIÓN!",
        deltas: { budget: -6, schedule: -14, morale: -6, stakeholders: -8 },
        outcomeNarrative:
          "La disputa escala sin solución y el equipo queda bloqueado esperando definición.",
        pmiBestPracticeScore: 30,
        pmiArea: "Liderazgo e Integración (Cap. 5.3)",
        pmiFeedback:
          "El Director de Proyecto debe facilitar opciones evaluadas, no solo escalar problemas.",
      },
    ],
  },
  {
    id: "priv-l2-7",
    round: 7,
    episodeCode: "N2·07",
    pmbokDomain: "Recursos y Liderazgo",
    title: "Pérdida Súbita de Arquitecto Único",
    sfxText: "¡BUS FACTOR!",
    narratorBox: "Nivel 2 // Gestión del Conocimiento: Tu único especialista en motor antifraude renuncia.",
    speaker: "RR.HH.",
    speakerRole: "Talento Humano",
    dialogue:
      "«El arquitecto principal aceptó otra oferta y sale en 10 días. Nadie más conoce las reglas del motor antifraude.»",
    imagePath: "/images/team-crunch.jpg",
    options: [
      {
        id: "priv-l2-7-a",
        code: "A",
        label: "Transferencia estructurada + Pair-work",
        description:
          "Dedicas los 10 días a sesiones grabadas, documentación de arquitectura y rotación guiada con 2 seniors.",
        hint: "📚 Gestiona saber | 🛡️ Baja bus-factor",
        sfxWord: "¡LEGADO!",
        deltas: { budget: -4, schedule: -2, morale: +6, stakeholders: +6 },
        outcomeNarrative:
          "El conocimiento crítico queda institucionalizado y dos ingenieros asumen el módulo sin interrupciones.",
        pmiBestPracticeScore: 75,
        pmiArea: "Gestionar el Conocimiento (Cap. 12.3)",
        pmiFeedback:
          "La gestión del conocimiento tácito y explícito protege la continuidad operativa.",
      },
      {
        id: "priv-l2-7-b",
        code: "B",
        label: "Exprimirlo en código hasta el día 10",
        description: "Le pides programar nuevas features hasta su último minuto sin documentar.",
        hint: "💻 Código hoy | 🕳️ Caja negra mañana",
        sfxWord: "¡APAGÓN!",
        deltas: { budget: -12, schedule: -14, morale: -10, stakeholders: -8 },
        outcomeNarrative:
          "Tras su salida, el equipo tarda 4 semanas haciendo ingeniería inversa para corregir un bug.",
        pmiBestPracticeScore: 20,
        pmiArea: "Gestión del Conocimiento (Cap. 12.3)",
        pmiFeedback:
          "Priorizar código sin transferencia de conocimiento crea riesgo operativo severo.",
      },
      {
        id: "priv-l2-7-c",
        code: "C",
        label: "Contraoferta salarial de emergencia",
        description: "Subes su sueldo 45% rompiendo la equidad interna del equipo.",
        hint: "💸 Rompe presupuesto | 😠 Celos equipo",
        sfxWord: "¡DESBALANCE!",
        deltas: { budget: -14, schedule: 0, morale: -14, stakeholders: -2 },
        outcomeNarrative:
          "Se queda 3 meses más, pero el resto del equipo exige aumentos similares.",
        pmiBestPracticeScore: 35,
        pmiArea: "Liderar al Equipo (Cap. 12.7)",
        pmiFeedback:
          "Resolver el 'bus factor' con parches salariales no elimina la dependencia de persona única.",
      },
    ],
  },
  {
    id: "priv-l2-8",
    round: 8,
    episodeCode: "N2·08",
    pmbokDomain: "Beneficios y Cierre",
    title: "Evaluación Financiera Post-Entrega (VAN / Payback)",
    sfxText: "¡AUDITORÍA ROI!",
    narratorBox: "Nivel 2 // Cierre Estratégico: El comité mide si la inversión superó la tasa de corte.",
    speaker: "CFO",
    speakerRole: "Comité de Inversiones",
    dialogue:
      "«El proyecto costó $480k. Necesitamos demostrar el flujo de beneficios neto y el Payback real antes de liberar el bono de cierre.»",
    imagePath: "/images/private-closing-value.jpg",
    options: [
      {
        id: "priv-l2-8-a",
        code: "A",
        label: "Entregar solo métricas de esfuerzo",
        description: "Presentas horas trabajadas y cantidad de tickets cerrados en Jira.",
        hint: "📋 Outputs | 📉 No prueba valor",
        sfxWord: "¡IRRELEVANTE!",
        deltas: { budget: -4, schedule: 0, morale: -4, stakeholders: -14 },
        outcomeNarrative:
          "El CFO rechaza el informe por no demostrar retorno financiero ni impacto en ingresos.",
        pmiBestPracticeScore: 20,
        pmiArea: "Indicadores Financieros (Cap. 8.2 / 4.6)",
        pmiFeedback:
          "El éxito del proyecto se mide por valor y beneficios (VAN/TIR/Payback), no por volumen de actividad.",
      },
      {
        id: "priv-l2-8-b",
        code: "B",
        label: "Informe VAN/Payback + Plan de Beneficios",
        description:
          "Mides reducción de fraude, conversión comercial, entregas el tablero de beneficios al dueño y cierras formalmente.",
        hint: "💎 Valor probado | 🏆 Cierre ejecutivo",
        sfxWord: "¡ROI OK!",
        deltas: { budget: +4, schedule: +4, morale: +8, stakeholders: +12 },
        outcomeNarrative:
          "Demuestras un Payback de 9 meses y VAN positivo; el directorio aprueba la siguiente fase estratégica.",
        pmiBestPracticeScore: 75,
        pmiArea: "Finanzas, Beneficios y Cierre (Cap. 4.6 / 8.2 / 14.1)",
        pmiFeedback:
          "Cierre de alto nivel conectando desempeño financiero real con el Caso de Negocios.",
      },
      {
        id: "priv-l2-8-c",
        code: "C",
        label: "Proyectar beneficios sin medir línea base",
        description: "Estimas ahorros teóricos sin contrastarlos con métricas previas al proyecto.",
        hint: "🔮 Teórico | ⚠️ Poca credibilidad",
        sfxWord: "¡DÉBIL!",
        deltas: { budget: -2, schedule: 0, morale: 0, stakeholders: -6 },
        outcomeNarrative:
          "El comité cuestiona la validez de los datos y exige una auditoría adicional.",
        pmiBestPracticeScore: 40,
        pmiArea: "Caso de Negocios (Cap. 4.5)",
        pmiFeedback:
          "Sin línea base de beneficios previa, es imposible validar objetivamente el impacto.",
      },
    ],
  },
];

export const PUBLIC_LEVEL2_SCENARIOS: Scenario[] = [
  {
    id: "pub-l2-1",
    round: 1,
    episodeCode: "N2·01",
    pmbokDomain: "Gobernanza y Cambios",
    title: "Licitación Impugnada en Compras Públicas",
    sfxText: "¡IMPUGNACIÓN!",
    narratorBox: "Nivel 2 // Contratación Pública: Un oferente impugna las bases técnicas ante el tribunal de compras.",
    speaker: "Asesor Legal",
    speakerRole: "Unidad de Compras",
    dialogue:
      "«Suspenden la adjudicación por presunta especificación dirigida a una sola marca. ¡Esto nos puede parar 4 meses!»",
    imagePath: "/images/public-audit.jpg",
    options: [
      {
        id: "pub-l2-1-a",
        code: "A",
        label: "Litigar sin revisar especificaciones",
        description: "Defiendes el pliego tal como está aunque tarde meses en resolverse.",
        hint: "⚔️ Rígido | 🐢 -4 meses",
        sfxWord: "¡TRABA!",
        deltas: { budget: -10, schedule: -20, morale: -8, stakeholders: -10 },
        outcomeNarrative:
          "El tribunal anula el proceso al mes 3 y debes reiniciar toda la licitación.",
        pmiBestPracticeScore: 20,
        pmiArea: "Abastecimiento y Gobernanza (Cap. 5.6)",
        pmiFeedback:
          "Mantener especificaciones restrictivas sin revisión técnica prolonga litigios y paraliza la obra.",
      },
      {
        id: "pub-l2-1-b",
        code: "B",
        label: "Enmienda por desempeño funcional",
        description:
          "Rediseñas las bases por estándares abiertos de desempeño (no marca) y relanzas con cronograma comprimido.",
        hint: "⚖️ Transparencia | 🛡️ Libre competencia",
        sfxWord: "¡TRANSPARENTE!",
        deltas: { budget: +4, schedule: -4, morale: +4, stakeholders: +10 },
        outcomeNarrative:
          "Participan 5 oferentes, se reduce el precio adjudicado 12% y el proceso queda blindado ante auditoría.",
        pmiBestPracticeScore: 75,
        pmiArea: "Estrategia de Abastecimiento (Cap. 5.6 / 5.4)",
        pmiFeedback:
          "Especificar por desempeño y estándares abiertos garantiza competencia, legalidad y mejor precio.",
      },
      {
        id: "pub-l2-1-c",
        code: "C",
        label: "Forzar compra directa de excepción",
        description: "Buscas declarar emergencia administrativa para evadir la licitación.",
        hint: "⚡ Rápido | 🚨 Riesgo Contraloría",
        sfxWord: "¡HALLAZGO!",
        deltas: { budget: -16, schedule: +2, morale: -6, stakeholders: -20 },
        outcomeNarrative:
          "La Contraloría abre reparo por uso indebido de excepción de urgencia.",
        pmiBestPracticeScore: 15,
        pmiArea: "Conducta Profesional y Legalidad (Cap. 5.4)",
        pmiFeedback:
          "Eludir procesos competitivos sin causal real genera responsabilidad administrativa y penal.",
      },
    ],
  },
  {
    id: "pub-l2-2",
    round: 2,
    episodeCode: "N2·02",
    pmbokDomain: "Finanzas y Valor Ganado",
    title: "Recorte Presupuestario Fiscal de Mitad de Año",
    sfxText: "¡RECORTE!",
    narratorBox: "Nivel 2 // Finanzas Públicas: Hacienda aplica un congelamiento del 18% del techo presupuestario.",
    speaker: "Lic. Paredes",
    speakerRole: "Directora Financiera UEP",
    dialogue:
      "«Nos recortaron 18% de la cuota SIAFI para el semestre. No alcanza para todos los componentes aprobados.»",
    imagePath: "/images/public-siafi-budget.jpg",
    options: [
      {
        id: "pub-l2-2-a",
        code: "A",
        label: "Recortar 18% lineal a todo",
        description: "Bajas 18% a cada componente por igual dejando obras y sistemas a medias.",
        hint: "⚖️ Simétrico | 💥 Elefantes blancos",
        sfxWord: "¡INCONCLUSO!",
        deltas: { budget: -8, schedule: -10, morale: -10, stakeholders: -18 },
        outcomeNarrative:
          "Ningún componente queda funcional; todos los entregables quedan incompletos.",
        pmiBestPracticeScore: 15,
        pmiArea: "Principio de Valor y Finanzas (Cap. 3.3 / 8.5)",
        pmiFeedback:
          "Los recortes lineales destruyen la funcionalidad mínima viable; se debe priorizar por valor público.",
      },
      {
        id: "pub-l2-2-b",
        code: "B",
        label: "Priorizar entregables funcionales + CCB",
        description:
          "Re-priorizas por impacto ciudadano (completar fase operativa al 100%) y reprogramas componentes secundarios al próximo ejercicio.",
        hint: "🎯 Protege impacto | 📊 Gobernanza SIAFI",
        sfxWord: "¡PRIORIZADO!",
        deltas: { budget: +8, schedule: -2, morale: +4, stakeholders: +8 },
        outcomeNarrative:
          "La primera fase entra en operación completa generando impacto inmediato y el saldo queda reprogramado.",
        pmiBestPracticeScore: 75,
        pmiArea: "Gestión de Beneficios y Presupuesto (Cap. 4.6 / 8.5)",
        pmiFeedback:
          "Decisión estratégica: asegurar entregables completos y funcionales dentro del techo fiscal.",
      },
      {
        id: "pub-l2-2-c",
        code: "C",
        label: "Seguir ejecutando esperando ampliación",
        description: "Mantienes el ritmo de gasto esperando que el Congreso apruebe crédito extra.",
        hint: "🎲 Apuesta política | 💸 Riesgo impago",
        sfxWord: "¡DÉFICIT!",
        deltas: { budget: -20, schedule: -6, morale: -6, stakeholders: -10 },
        outcomeNarrative:
          "La ampliación no se aprueba a tiempo y se acumulan facturas vencidas con proveedores.",
        pmiBestPracticeScore: 20,
        pmiArea: "Control Financiero (Cap. 13.6)",
        pmiFeedback:
          "Ejecutar por encima del crédito vigente en SIAFI compromete la solvencia y legalidad del proyecto.",
      },
    ],
  },
  {
    id: "pub-l2-3",
    round: 3,
    episodeCode: "N2·03",
    pmbokDomain: "Cronograma y Línea Base",
    title: "Cronograma Ganado (ES) ante Desfase Estacional",
    sfxText: "¡CRONOGRAMA!",
    narratorBox: "Nivel 2 // Control de Tiempo: El SPI tradicional subestima el atraso en la recta final.",
    speaker: "Ing. Solís",
    speakerRole: "Control de Proyectos",
    dialogue:
      "«El SPI marca 0.92, pero el Cronograma Ganado (Earned Schedule) revela que llevamos 5 semanas reales de retraso antes de la veda electoral/climática.»",
    imagePath: "/images/public-no-baseline.jpg",
    options: [
      {
        id: "pub-l2-3-a",
        code: "A",
        label: "Confiar solo en el SPI optimista",
        description: "Reportas que el atraso es menor al 8% y no activas medidas correctivas.",
        hint: "📊 Cifra cómoda | 💣 Choque con veda",
        sfxWord: "¡CEGUERA!",
        deltas: { budget: -10, schedule: -18, morale: -6, stakeholders: -12 },
        outcomeNarrative:
          "Llega la veda/temporada de lluvias y la obra queda paralizada sin haber cerrado hitos clave.",
        pmiBestPracticeScore: 20,
        pmiArea: "Cronograma Ganado (Cap. 13.8)",
        pmiFeedback:
          "El SPI en unidades monetarias falla cerca del cierre; el Cronograma Ganado (ES) mide el tiempo real.",
      },
      {
        id: "pub-l2-3-b",
        code: "B",
        label: "Plan de recuperación basado en ES + CPM",
        description:
          "Usas el Cronograma Ganado (ES) para aislar las 3 actividades críticas previas a la veda y reasignas cuadrillas.",
        hint: "📐 Precisión ES | ⏱️ Salva ventana",
        sfxWord: "¡RECUPERADO!",
        deltas: { budget: -4, schedule: +10, morale: +4, stakeholders: +8 },
        outcomeNarrative:
          "Cierras los hitos vulnerables justo antes de la ventana restrictiva.",
        pmiBestPracticeScore: 75,
        pmiArea: "Cronograma Ganado (Cap. 13.8)",
        pmiFeedback:
          "Excelente aplicación de Cronograma Ganado (ES) para detectar desviaciones temporales reales a tiempo.",
      },
      {
        id: "pub-l2-3-c",
        code: "C",
        label: "Pedir prórroga de 6 meses sin plan",
        description: "Solicitas extensión general al ente financiador sin análisis de causa.",
        hint: "⏳ Cómodo | 😠 Rechazo organismo",
        sfxWord: "¡RECHAZO!",
        deltas: { budget: -6, schedule: -10, morale: -4, stakeholders: -10 },
        outcomeNarrative:
          "El organismo multilateral rechaza la prórroga por falta de plan de mitigación.",
        pmiBestPracticeScore: 30,
        pmiArea: "Control de Cambios (Cap. 13.2)",
        pmiFeedback:
          "Toda solicitud de prórroga debe acompañarse de análisis de ruta crítica y acciones correctivas.",
      },
    ],
  },
  {
    id: "pub-l2-4",
    round: 4,
    episodeCode: "N2·04",
    pmbokDomain: "Interesados y Comunicaciones",
    title: "Consulta Previa y Oposición Comunitaria",
    sfxText: "¡PROTESTA!",
    narratorBox: "Nivel 2 // Entorno Social: Líderes locales bloquean el acceso alegando falta de información.",
    speaker: "Alcaldesa Local",
    speakerRole: "Autoridad Territorial",
    dialogue:
      "«La comunidad cree que el proyecto privatizará el servicio. Nadie les explicó los beneficios ni hubo mesa de diálogo.»",
    imagePath: "/images/public-political-scope.jpg",
    options: [
      {
        id: "pub-l2-4-a",
        code: "A",
        label: "Solicitar desalojo policial",
        description: "Pides fuerza pública para entrar al predio sin dialogar.",
        hint: "🚨 Fuerza | 🔥 Crisis social",
        sfxWord: "¡CONFLICTO!",
        deltas: { budget: -12, schedule: -16, morale: -14, stakeholders: -24 },
        outcomeNarrative:
          "El conflicto escala a medios nacionales y el organismo financiador suspende desembolsos.",
        pmiBestPracticeScore: 10,
        pmiArea: "Sostenibilidad e Interesados (Cap. 3.6 / 12.4)",
        pmiFeedback:
          "Ignorar la licencia social y los derechos de interesados genera bloqueos irreversibles.",
      },
      {
        id: "pub-l2-4-b",
        code: "B",
        label: "Mesa participativa + Veeduría ciudadana",
        description:
          "Abres mesa técnica transparente con líderes comunitarios, explicas beneficios públicos y creas veeduría local.",
        hint: "🤝 Licencia social | 🌟 Legitimidad",
        sfxWord: "¡ACUERDO!",
        deltas: { budget: -4, schedule: +2, morale: +8, stakeholders: +14 },
        outcomeNarrative:
          "La comunidad levanta el bloqueo y se convierte en aliada para vigilar la calidad de la ejecución.",
        pmiBestPracticeScore: 75,
        pmiArea: "Compromiso de Interesados (Cap. 9.1 / 12.4)",
        pmiFeedback:
          "La participación temprana y transparente construye legitimidad y sostenibilidad social.",
      },
      {
        id: "pub-l2-4-c",
        code: "C",
        label: "Enviar folletos sin diálogo",
        description: "Distribuyes trípticos institucionales sin asistir presencialmente.",
        hint: "📄 Comunicación 1-vía | 😐 Insuficiente",
        sfxWord: "¡DISTANCIA!",
        deltas: { budget: -4, schedule: -10, morale: -2, stakeholders: -8 },
        outcomeNarrative:
          "La desconfianza persiste y el acceso sigue intermitente.",
        pmiBestPracticeScore: 35,
        pmiArea: "Gestionar Comunicaciones (Cap. 12.5)",
        pmiFeedback:
          "En conflictos de alto poder/interés, la comunicación unidireccional es ineficaz.",
      },
    ],
  },
  {
    id: "pub-l2-5",
    round: 5,
    episodeCode: "N2·05",
    pmbokDomain: "Alcance y EDT",
    title: "Cambio Normativo de Protección de Datos",
    sfxText: "¡NUEVA LEY!",
    narratorBox: "Nivel 2 // Cumplimiento: Entra en vigencia una ley que exige cifrado e interoperabilidad nacional.",
    speaker: "Procuraduría",
    speakerRole: "Ente Regulador",
    dialogue:
      "«La nueva norma exige firma digital certificada y auditoría de accesos en todos los sistemas públicos nuevos.»",
    imagePath: "/images/public-audit.jpg",
    options: [
      {
        id: "pub-l2-5-a",
        code: "A",
        label: "Evaluar impacto en EDT y aprobar CCB",
        description:
          "Actualizas la matriz de trazabilidad de requisitos, evalúas costo/plazo y formalizas cambio regulatorio en CCB.",
        hint: "📋 Trazabilidad | 🛡️ Cumplimiento",
        sfxWord: "¡ADECUADO!",
        deltas: { budget: -6, schedule: -4, morale: +2, stakeholders: +10 },
        outcomeNarrative:
          "El cambio legal queda integrado en la EDT con financiamiento de contingencia aprobado.",
        pmiBestPracticeScore: 75,
        pmiArea: "Requisitos y Cambios (Cap. 6.2 / 13.2)",
        pmiFeedback:
          "Los cambios regulatorios obligatorios deben trazarse en la matriz de requisitos y formalizarse vía CCB.",
      },
      {
        id: "pub-l2-5-b",
        code: "B",
        label: "Pedir exención informal verbal",
        description: "Asumes que por haber iniciado antes no te aplica la ley.",
        hint: "🙈 Omisión | 🚨 Sistema ilegal",
        sfxWord: "¡ILEGAL!",
        deltas: { budget: -14, schedule: -8, morale: -6, stakeholders: -18 },
        outcomeNarrative:
          "Al intentar salir a producción, el ente rector prohíbe el uso del sistema.",
        pmiBestPracticeScore: 15,
        pmiArea: "Marco de Gobernanza (Cap. 5.2)",
        pmiFeedback:
          "Ignorar requisitos legales vigentes invalida la aceptación final del entregable.",
      },
      {
        id: "pub-l2-5-c",
        code: "C",
        label: "Agregar requisitos sin ajustar plazo",
        description: "Metes firma digital en el código sin actualizar cronograma ni presupuesto.",
        hint: "🤫 Silencio | 🔥 Sobrecarga",
        sfxWord: "¡DESFASE!",
        deltas: { budget: -10, schedule: -10, morale: -12, stakeholders: 0 },
        outcomeNarrative:
          "El equipo se desborda y aparecen fallas en la integración criptográfica.",
        pmiBestPracticeScore: 30,
        pmiArea: "Integrar Planes (Cap. 5.5)",
        pmiFeedback:
          "Todo cambio de alcance debe reflejarse en las líneas base de costo y cronograma.",
      },
    ],
  },
  {
    id: "pub-l2-6",
    round: 6,
    episodeCode: "N2·06",
    pmbokDomain: "Riesgos y Respuestas",
    title: "Dependencia Crítica de Otra Entidad Estatal",
    sfxText: "¡CUELLO!",
    narratorBox: "Nivel 2 // Riesgo Interinstitucional: El Registro Civil no entrega el servicio web prometido.",
    speaker: "Rei K.",
    speakerRole: "Arquitecta de Datos",
    dialogue:
      "«Sin el API de identidad del Registro Civil, no podemos validar beneficiarios en línea.»",
    imagePath: "/images/risk-incident.jpg",
    options: [
      {
        id: "pub-l2-6-a",
        code: "A",
        label: "Plan de contingencia: caché + lote",
        description:
          "Implementas validación híbrida por lotes certificados (workaround) mientras escalas convenio interinstitucional.",
        hint: "🔄 Resiliencia | ⏱️ No detiene valor",
        sfxWord: "¡RESILIENTE!",
        deltas: { budget: -4, schedule: +4, morale: +4, stakeholders: +8 },
        outcomeNarrative:
          "El proyecto continúa operando con validación por lotes y al mes siguiente conecta el API en tiempo real.",
        pmiBestPracticeScore: 75,
        pmiArea: "Implementar Respuestas a Riesgos (Cap. 12.8)",
        pmiFeedback:
          "Excelente plan de contingencia técnica combinado con gestión interinstitucional.",
      },
      {
        id: "pub-l2-6-b",
        code: "B",
        label: "Culpar al Registro y esperar",
        description: "Envías oficios semanales descargando responsabilidad y detienes pruebas.",
        hint: "📝 Oficios | 🐢 Parálisis",
        sfxWord: "¡EXCUSA!",
        deltas: { budget: -8, schedule: -16, morale: -8, stakeholders: -10 },
        outcomeNarrative:
          "Pasan 6 semanas sin avance mientras ambas instituciones intercambian culpas.",
        pmiBestPracticeScore: 20,
        pmiArea: "Responsabilidad y Proactividad (Cap. 3.5)",
        pmiFeedback:
          "Un Director de Proyecto asume la resolución de impedimentos, no se limita a enviar oficios.",
      },
      {
        id: "pub-l2-6-c",
        code: "C",
        label: "Eliminar validación de identidad",
        description: "Permites registro libre sin validar documento nacional.",
        hint: "⚡ Rápido | 🚨 Fraude masivo",
        sfxWord: "¡FRAUDE!",
        deltas: { budget: -14, schedule: +2, morale: -6, stakeholders: -20 },
        outcomeNarrative:
          "Se detectan registros duplicados y fantasma en las primeras 48 horas.",
        pmiBestPracticeScore: 15,
        pmiArea: "Control de Calidad y Riesgos (Cap. 13.4)",
        pmiFeedback:
          "Eliminar controles críticos de integridad compromete la validez del servicio público.",
      },
    ],
  },
  {
    id: "pub-l2-7",
    round: 7,
    episodeCode: "N2·07",
    pmbokDomain: "Recursos y Liderazgo",
    title: "Cambio de Autoridades en Transición de Gobierno",
    sfxText: "¡TRANSICIÓN!",
    narratorBox: "Nivel 2 // Continuidad: Nuevas autoridades asumen el ministerio y cuestionan el proyecto.",
    speaker: "Nuevo Viceministro",
    speakerRole: "Autoridad Entrante",
    dialogue:
      "«No conocemos este proyecto heredado. Estamos considerando cancelarlo para reasignar los fondos.»",
    imagePath: "/images/public-impact-gap.jpg",
    options: [
      {
        id: "pub-l2-7-a",
        code: "A",
        label: "Briefing de Valor Público y Avance EVM",
        description:
          "Presentas Caso de Negocios, impacto ciudadano medido, avance EVM y costo hundido vs. beneficio de completar.",
        hint: "📊 Evidencia | 🌟 Alinea visión",
        sfxWord: "¡RESPALDO!",
        deltas: { budget: 0, schedule: +4, morale: +8, stakeholders: +14 },
        outcomeNarrative:
          "Las nuevas autoridades confirman la continuidad estratégica del proyecto al ver el impacto social proyectado.",
        pmiBestPracticeScore: 75,
        pmiArea: "Visión, Valor e Interesados (Cap. 3.2 / 4.5)",
        pmiFeedback:
          "Comunicar valor público con datos objetivos protege la continuidad institucional en transiciones.",
      },
      {
        id: "pub-l2-7-b",
        code: "B",
        label: "Ocultar estado esperando que no miren",
        description: "Evitas pedir reunión y bajas el perfil del proyecto.",
        hint: "🙈 Perfil bajo | 💣 Corte súbito",
        sfxWord: "¡RECORTE!",
        deltas: { budget: -12, schedule: -12, morale: -10, stakeholders: -14 },
        outcomeNarrative:
          "Al no ver resultados ni interlocución, congelan el presupuesto en la revisión trimestral.",
        pmiBestPracticeScore: 20,
        pmiArea: "Monitorear Interesados (Cap. 13.9)",
        pmiFeedback:
          "Un cambio de patrocinador exige re-alineamiento inmediato de expectativas y valor.",
      },
      {
        id: "pub-l2-7-c",
        code: "C",
        label: "Filtrar quejas a la prensa",
        description: "Alertas a periodistas de que el nuevo gobierno quiere cerrar el programa.",
        hint: "📰 Presión | 💥 Rompe confianza",
        sfxWord: "¡CRISIS!",
        deltas: { budget: -6, schedule: -8, morale: -12, stakeholders: -20 },
        outcomeNarrative:
          "Se quiebra la relación técnica con el despacho ministerial y remueven a la UEP.",
        pmiBestPracticeScore: 10,
        pmiArea: "Conducta Profesional (Cap. 5.4)",
        pmiFeedback:
          "Politizar el proyecto destruye la confianza institucional del equipo técnico.",
      },
    ],
  },
  {
    id: "pub-l2-8",
    round: 8,
    episodeCode: "N2·08",
    pmbokDomain: "Beneficios y Cierre",
    title: "Cierre Administrativo, Liquidación y Sostenibilidad",
    sfxText: "¡LIQUIDACIÓN!",
    narratorBox: "Nivel 2 // Cierre Público: Faltan 15 días para cierre del ejercicio fiscal y liquidación de contratos.",
    speaker: "Contraloría",
    speakerRole: "Revisión de Cierre",
    dialogue:
      "«Si no cierran actas de recepción, liquidan garantías y transfieren presupuesto de mantenimiento, habrá saldos observados.»",
    imagePath: "/images/victory.jpg",
    options: [
      {
        id: "pub-l2-8-a",
        code: "A",
        label: "Checklist integral de cierre + O&M",
        description:
          "Ejecutas pruebas de aceptación, actas de recepción, liberación de garantías, presupuesto O&M y lecciones aprendidas.",
        hint: "📑 Cierre limpio | ♻️ Sostenible",
        sfxWord: "¡IMPECABLE!",
        deltas: { budget: +4, schedule: +4, morale: +6, stakeholders: +12 },
        outcomeNarrative:
          "Cierre sin observaciones de Contraloría y con presupuesto de operación asegurado para 3 años.",
        pmiBestPracticeScore: 75,
        pmiArea: "Cierre y Sostenibilidad (Cap. 3.6 / 14.1)",
        pmiFeedback:
          "Cierre público de excelencia: combina cumplimiento administrativo, financiero y sostenibilidad operativa.",
      },
      {
        id: "pub-l2-8-b",
        code: "B",
        label: "Firmar actas sin verificar inventario",
        description: "Cierras en papel rápido dejando pendientes observaciones técnicas menores.",
        hint: "✍️ Firma apurada | ⚠️ Reparo futuro",
        sfxWord: "¡OBSERVADO!",
        deltas: { budget: -10, schedule: +2, morale: -6, stakeholders: -14 },
        outcomeNarrative:
          "A los 6 meses la auditoría detecta activos no entregados en sitio.",
        pmiBestPracticeScore: 20,
        pmiArea: "Validar Alcance y Cierre (Cap. 13.3 / 14.1)",
        pmiFeedback:
          "Nunca se debe firmar recepción definitiva sin verificación física y funcional de entregables.",
      },
      {
        id: "pub-l2-8-c",
        code: "C",
        label: "Dejar contratos abiertos para soporte",
        description: "Prorrogas el proyecto un año más por no haber previsto presupuesto O&M.",
        hint: "⏳ Prórroga | 💸 Costo extra",
        sfxWord: "¡ARRASTRE!",
        deltas: { budget: -14, schedule: -10, morale: -4, stakeholders: -4 },
        outcomeNarrative:
          "El proyecto consume fondos de inversión en gasto operativo recurrente.",
        pmiBestPracticeScore: 35,
        pmiArea: "Transición Operativa (Cap. 14.1)",
        pmiFeedback:
          "La sostenibilidad operativa debe planificarse desde el Caso de Negocios antes del cierre.",
      },
    ],
  },
];
