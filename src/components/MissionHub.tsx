"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileEdit,
  Flame,
  Info,
  RefreshCw,
  Rocket,
  ShieldAlert,
  Shuffle,
  Sparkles,
  Zap,
} from "lucide-react";
import { MISSION_BRIEFING, MISSION_STAGES } from "@/domain/missionData";
import {
  advanceMissionStage,
  applyMissionDecision,
  applyMissionEventChoice,
  canAuthorizeGoLaunch,
  computeMissionEvm,
  createInitialMissionState,
  evaluateMissionFinalScore,
} from "@/domain/missionEngine";
import { MissionState } from "@/domain/missionTypes";

interface MissionHubProps {
  initialDirectorName: string;
  onBackToArena: () => void;
}

const STAGE_SHORT_NAMES = [
  "1. Inicio",
  "2. Plan",
  "3. Ejec.",
  "4. Control",
  "5. Go/No-Go",
  "6. Cierre",
];

export function MissionHub({
  initialDirectorName,
  onBackToArena,
}: MissionHubProps) {
  const [seedInput, setSeedInput] = useState("2045");
  const [state, setState] = useState<MissionState>(() =>
    createInitialMissionState(2045, initialDirectorName || "Director SELENE")
  );
  const [showBriefingDrawer, setShowBriefingDrawer] = useState(false);
  const [showAllTelemetryMobile, setShowAllTelemetryMobile] = useState(false);
  const [mobileTab, setMobileTab] = useState<"action" | "dossier">("action");

  const stageConfig = MISSION_STAGES[state.currentStage - 1];
  const evm = useMemo(() => computeMissionEvm(state.metrics), [state.metrics]);
  const goGate = useMemo(
    () => canAuthorizeGoLaunch(state.metrics),
    [state.metrics]
  );

  const handleRestartWithSeed = (customSeed?: number) => {
    const parsed = customSeed ?? (Number.parseInt(seedInput, 10) || 2045);
    setSeedInput(String(parsed));
    setMobileTab("action");
    setState(
      createInitialMissionState(
        parsed,
        initialDirectorName || state.directorName || "Director SELENE"
      )
    );
  };

  const handleRandomSeed = () => {
    const nextSeed = Math.floor(1000 + Math.random() * 9000);
    handleRestartWithSeed(nextSeed);
  };

  const isFinished = state.status !== "in_progress";
  const finalReport = useMemo(
    () => (isFinished ? evaluateMissionFinalScore(state) : null),
    [isFinished, state]
  );

  return (
    <div className="min-h-screen tactical-grid px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-4 sm:space-y-5">
        {/* SaaS Top Navigation & Seed Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-white/10 bg-zinc-950/85 px-3.5 py-2.5 backdrop-blur-xl sm:px-4 sm:py-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onBackToArena}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-900/80 px-2.5 py-1.5 font-mono text-[11px] font-semibold text-zinc-200 transition-colors hover:border-amber-400/50 hover:text-amber-300 cursor-pointer sm:px-3 sm:text-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Arena
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-400 px-2.5 py-1.5 font-mono text-[11px] font-black uppercase text-zinc-950 shadow-[0_0_20px_-4px_rgba(6,182,212,0.5)] sm:px-3 sm:text-xs">
              <Rocket className="h-3.5 w-3.5" />
              SELENE-2045
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] sm:gap-2 sm:text-xs">
            <span className="hidden sm:inline text-zinc-400">Semilla:</span>
            <input
              type="number"
              aria-label="Semilla de misión"
              value={seedInput}
              onChange={(e) => setSeedInput(e.target.value)}
              className="w-16 rounded-lg border border-white/10 bg-zinc-900 px-2 py-1 text-center font-bold text-cyan-300 focus:border-cyan-400 focus:outline-none sm:w-20"
            />
            <button
              type="button"
              onClick={() => handleRestartWithSeed()}
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-zinc-900 px-2 py-1 text-zinc-200 transition-colors hover:border-cyan-400/50 cursor-pointer sm:px-2.5"
            >
              <RefreshCw className="h-3 w-3" />
              <span className="hidden sm:inline">Repetir</span>
            </button>
            <button
              type="button"
              onClick={handleRandomSeed}
              className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/40 bg-cyan-950/50 px-2 py-1 font-semibold text-cyan-300 transition-colors hover:bg-cyan-400 hover:text-zinc-950 cursor-pointer sm:px-2.5"
            >
              <Shuffle className="h-3 w-3" />
              <span>Nueva</span>
            </button>
          </div>
        </div>

        {/* 6-Stage Campaign Progress Stepper */}
        <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-white/10 bg-zinc-950/80 p-2 backdrop-blur-xl sm:grid-cols-6">
          {STAGE_SHORT_NAMES.map((label, idx) => {
            const st = (idx + 1) as 1 | 2 | 3 | 4 | 5 | 6;
            const isCurrent = !isFinished && state.currentStage === st;
            const isDone = isFinished || state.currentStage > st;
            return (
              <div
                key={label}
                className={`rounded-lg px-2 py-1.5 text-center font-mono text-[10px] font-bold uppercase transition-all sm:text-[11px] ${
                  isCurrent
                    ? "bg-cyan-400 text-zinc-950 shadow-sm"
                    : isDone
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                      : "bg-zinc-900/60 text-zinc-500 border border-white/5"
                }`}
              >
                {label}
              </div>
            );
          })}
        </div>

        {/* Mission Telemetry & EVM HUD */}
        <div className="comic-panel-cyan rounded-2xl p-4 sm:p-5 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400 sm:text-[11px]">
                BAC $500M • 36 MESES • ETAPA {state.currentStage}/6
              </p>
              <h1 className="mt-0.5 text-base font-black tracking-tight text-white sm:text-2xl">
                {MISSION_BRIEFING.title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowBriefingDrawer((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-900/80 px-2.5 py-1.5 font-mono text-[11px] font-semibold text-zinc-200 transition-colors hover:border-cyan-400/50 cursor-pointer sm:px-3.5 sm:py-2 sm:text-xs"
              >
                <Info className="h-3.5 w-3.5 text-cyan-400" />
                <span>Marco y Actores</span>
                {showBriefingDrawer ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>

          {showBriefingDrawer && (
            <div className="grid grid-cols-1 gap-3 border-t border-white/10 pt-3 text-xs md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3.5 space-y-1.5">
                <p className="font-mono font-bold uppercase text-cyan-300">
                  Objetivos y Aceptación
                </p>
                {MISSION_BRIEFING.objectives.map((o) => (
                  <p key={o} className="text-zinc-300">• {o}</p>
                ))}
                <p className="pt-1 font-mono font-bold uppercase text-emerald-300">
                  Criterios de Aceptación
                </p>
                {MISSION_BRIEFING.acceptanceCriteria.map((c) => (
                  <p key={c} className="text-zinc-300">✓ {c}</p>
                ))}
              </div>

              <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3.5 space-y-1.5">
                <p className="font-mono font-bold uppercase text-amber-300">
                  Restricciones, Supuestos e Incertidumbres
                </p>
                {MISSION_BRIEFING.constraints.map((r) => (
                  <p key={r} className="text-zinc-200">▪ {r}</p>
                ))}
                {MISSION_BRIEFING.assumptions.map((a) => (
                  <p key={a} className="text-zinc-400">◦ Supuesto: {a}</p>
                ))}
                {MISSION_BRIEFING.uncertainties.map((u) => (
                  <p key={u} className="text-zinc-400">? Incertidumbre: {u}</p>
                ))}
              </div>

              <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3.5 space-y-1.5">
                <p className="font-mono font-bold uppercase text-violet-300">
                  Mapa de Interesados (6 Actores)
                </p>
                {MISSION_BRIEFING.stakeholders.map((s) => (
                  <div key={s.name} className="flex justify-between gap-2 text-zinc-300">
                    <span>
                      <strong className="text-white">{s.role}:</strong> {s.name}
                    </span>
                    <span className="font-mono text-[10px] text-cyan-300 shrink-0">
                      P:{s.power}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Compact 4-Stat Strip + Expand Toggle */}
          <div className="sm:hidden space-y-2">
            <div className="grid grid-cols-4 gap-1.5 font-mono text-[11px]">
              <div className="rounded-lg border border-white/10 bg-zinc-900/70 p-2 text-center">
                <p className="text-[9px] text-zinc-400">AC</p>
                <p className={`font-black ${state.metrics.acMillion > 500 ? "text-red-400" : "text-white"}`}>
                  ${state.metrics.acMillion}M
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-zinc-900/70 p-2 text-center">
                <p className="text-[9px] text-zinc-400">Mes</p>
                <p className="font-black text-white">
                  {state.metrics.elapsedMonths}/36
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-zinc-900/70 p-2 text-center">
                <p className="text-[9px] text-zinc-400">Segur.</p>
                <p className={`font-black ${state.metrics.safety < 65 ? "text-red-400" : "text-rose-300"}`}>
                  {state.metrics.safety}%
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-zinc-900/70 p-2 text-center">
                <p className="text-[9px] text-zinc-400">Calid.</p>
                <p className="font-black text-cyan-300">
                  {state.metrics.quality}%
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAllTelemetryMobile((v) => !v)}
              className="flex w-full items-center justify-center gap-1 rounded-lg border border-white/10 bg-zinc-900/50 py-1.5 font-mono text-[10px] font-bold uppercase text-zinc-300 cursor-pointer"
            >
              {showAllTelemetryMobile ? "Ocultar EVM detallado" : "Ver EVM completo y 6 indicadores"}
              {showAllTelemetryMobile ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          </div>

          {/* Full EVM & 6 Bars (Always visible on sm+, toggleable on mobile) */}
          <div className={`${showAllTelemetryMobile ? "block" : "hidden"} sm:block space-y-3`}>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-6 font-mono text-xs">
              <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
                <p className="text-[10px] text-zinc-400">Costo Real (AC)</p>
                <p className={`mt-0.5 text-sm font-black ${state.metrics.acMillion > state.metrics.bacMillion ? "text-red-400" : "text-white"}`}>
                  ${state.metrics.acMillion}M / $500M
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
                <p className="text-[10px] text-zinc-400">CPI / SPI</p>
                <p className="mt-0.5 text-sm font-black text-cyan-300">
                  {evm.cpi.toFixed(2)} / {evm.spi.toFixed(2)}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
                <p className="text-[10px] text-zinc-400">Pronóstico (EAC)</p>
                <p className={`mt-0.5 text-sm font-black ${evm.eacMillion > 500 ? "text-amber-400" : "text-emerald-400"}`}>
                  ${evm.eacMillion}M
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
                <p className="text-[10px] text-zinc-400">Meses / Horizonte</p>
                <p className="mt-0.5 text-sm font-black text-white">
                  {state.metrics.elapsedMonths}m / {state.metrics.horizonMonths}m
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
                <p className="text-[10px] text-zinc-400">Reserva Conting.</p>
                <p className="mt-0.5 text-sm font-black text-amber-300">
                  ${state.metrics.contingencyReserveMillion}M
                </p>
              </div>
              <div className="rounded-xl border border-cyan-400/30 bg-cyan-950/30 p-3">
                <p className="text-[10px] text-cyan-300">Etapa Actual</p>
                <p className="mt-0.5 text-sm font-black text-white">
                  {state.currentStage} / 6
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-6 font-mono text-[11px]">
              {[
                { label: "Seguridad", val: state.metrics.safety, color: "bg-rose-400" },
                { label: "Calidad", val: state.metrics.quality, color: "bg-cyan-400" },
                { label: "Valor", val: state.metrics.value, color: "bg-amber-400" },
                { label: "Sostenib.", val: state.metrics.sustainability, color: "bg-emerald-400" },
                { label: "Confianza", val: state.metrics.stakeholderTrust, color: "bg-violet-400" },
                { label: "Moral", val: state.metrics.teamMorale, color: "bg-sky-400" },
              ].map((bar) => (
                <div key={bar.label} className="rounded-xl border border-white/10 bg-zinc-900/60 p-2.5">
                  <div className="flex justify-between font-bold text-zinc-200">
                    <span>{bar.label}</span>
                    <span>{bar.val}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className={`h-full transition-all duration-300 ${bar.val < 50 ? "bg-red-500" : bar.color}`}
                      style={{ width: `${bar.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {state.metrics.criticalSafetyViolation && (
            <div className="flex items-center gap-2.5 rounded-xl border border-red-500/60 bg-red-950/60 px-3.5 py-2.5 font-mono text-xs font-bold text-red-200">
              <ShieldAlert className="h-5 w-5 shrink-0 text-red-400" />
              <span>
                INFRACCIÓN CRÍTICA DE SEGURIDAD ABIERTA: {state.metrics.criticalSafetyReason}{" "}
                (Bloquea el GO en Etapa 5; no compensable con ahorro).
              </span>
            </div>
          )}
        </div>

        {/* Final Report View OR Active Stage View */}
        {isFinished && finalReport ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="comic-panel overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-video w-full overflow-hidden sm:aspect-[16/5]">
              <img
                src={state.status === "failure" ? "/images/gameover.jpg" : "/images/mission-stage6.jpg"}
                alt="Resultado de Operación SELENE-2045"
                className="h-full w-full object-cover object-center"
              />
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-transparent" />
              <div className="hidden sm:flex absolute bottom-0 left-0 right-0 flex-wrap items-end justify-between gap-4 p-6">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-300">
                    INFORME FINAL DE MISIÓN // SEMILLA {state.seed}
                  </p>
                  <h2 className="mt-1 text-3xl font-black text-white">
                    {finalReport.verdictTitle}
                  </h2>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-amber-400/50 bg-zinc-950/90 px-4 py-2 backdrop-blur-md">
                  <div className="text-right font-mono">
                    <p className="text-[10px] uppercase text-zinc-400">Índice Global</p>
                    <p className="text-2xl font-black text-white">
                      {finalReport.overallScore}/100
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-400 font-mono text-2xl font-black text-zinc-950">
                    {finalReport.grade}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Final Header */}
            <div className="border-t border-white/10 p-4 sm:hidden space-y-2">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                INFORME FINAL // SEMILLA {state.seed}
              </p>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-black text-white">
                  {finalReport.verdictTitle}
                </h2>
                <div className="flex shrink-0 items-center gap-2 rounded-lg border border-amber-400/50 bg-zinc-900 px-2.5 py-1.5 font-mono">
                  <span className="text-sm font-black text-white">{finalReport.overallScore}/100</span>
                  <span className="rounded bg-amber-400 px-1.5 py-0.5 text-xs font-black text-zinc-950">
                    {finalReport.grade}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-8 space-y-5">
              <p className="text-sm leading-relaxed text-zinc-200">
                {finalReport.verdictSummary}
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {finalReport.dimensions.map((d) => (
                  <div
                    key={d.label}
                    className="rounded-xl border border-white/10 bg-zinc-900/70 p-4 space-y-1.5"
                  >
                    <div className="flex justify-between font-mono text-xs font-bold">
                      <span className="text-white">{d.label}</span>
                      <span className="text-cyan-300">{d.score}/100</span>
                    </div>
                    <p className="text-xs text-zinc-300">{d.detail}</p>
                  </div>
                ))}
              </div>

              {state.persistentModifiers.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
                  <p className="font-mono text-xs font-bold uppercase text-amber-300">
                    Consecuencias Persistentes Acumuladas
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {state.persistentModifiers.map((mod, i) => (
                      <span
                        key={`${mod}-${i}`}
                        className="rounded-lg border border-amber-500/40 bg-amber-500/15 px-2.5 py-1 font-mono text-xs text-amber-200"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <p className="font-mono text-xs font-bold uppercase text-zinc-400">
                  Bitácora Completa de Decisiones y Eventos
                </p>
                <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                  {state.logs.map((log, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/10 bg-zinc-900/70 p-3 text-xs"
                    >
                      <div className="flex flex-wrap justify-between gap-2 font-mono font-bold">
                        <span className="text-cyan-300">
                          E{log.stage} · {log.title} → {log.choiceLabel}
                        </span>
                        <span className="text-zinc-400">{log.impactSummary}</span>
                      </div>
                      <p className="mt-1 text-zinc-300">{log.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => handleRestartWithSeed(state.seed)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 px-5 py-2.5 font-mono text-xs font-black uppercase text-zinc-950 shadow-lg hover:brightness-105 cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4" />
                  Repetir Misma Semilla ({state.seed})
                </button>
                <button
                  type="button"
                  onClick={handleRandomSeed}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-zinc-900 px-5 py-2.5 font-mono text-xs font-bold uppercase text-white hover:border-amber-400/60 cursor-pointer"
                >
                  <Shuffle className="h-4 w-4" />
                  Jugar Escenario Alternativo
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Active Stage Workspace */
          <motion.div
            key={stageConfig.stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 sm:space-y-5"
          >
            {/* Stage Anime Visual Banner (uncropped 16:9 on mobile with caption below) */}
            <div className="comic-panel overflow-hidden rounded-2xl">
              <div className="relative aspect-video w-full overflow-hidden sm:aspect-[16/5]">
                <img
                  src={stageConfig.imagePath}
                  alt={stageConfig.title}
                  className="h-full w-full object-cover object-center"
                />
                <div className="scanlines-overlay pointer-events-none absolute inset-0" />
                <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
                <div className="hidden sm:block absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block rounded-lg bg-cyan-400 px-2.5 py-0.5 font-mono text-[11px] font-black uppercase text-zinc-950">
                    {stageConfig.code}
                  </span>
                  <h2 className="mt-1.5 text-2xl font-black text-white">
                    {stageConfig.title}
                  </h2>
                  <p className="mt-0.5 font-mono text-xs text-cyan-300">
                    {stageConfig.pmbokFocus}
                  </p>
                </div>
              </div>

              {/* Mobile Stage Title Below Image */}
              <div className="border-t border-white/10 p-3.5 sm:hidden">
                <span className="inline-block rounded-md bg-cyan-400 px-2 py-0.5 font-mono text-[10px] font-black uppercase text-zinc-950">
                  {stageConfig.code}
                </span>
                <h2 className="mt-1 text-lg font-black text-white">
                  {stageConfig.title}
                </h2>
                <p className="mt-0.5 font-mono text-[11px] text-cyan-300">
                  {stageConfig.pmbokFocus}
                </p>
              </div>
            </div>

            {/* Mobile Tab Switcher: Action First vs Dossier */}
            <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-zinc-950/90 p-1.5 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileTab("action")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 font-mono text-xs font-black uppercase transition-colors cursor-pointer ${
                  mobileTab === "action"
                    ? "bg-cyan-400 text-zinc-950"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
                {state.stageStep === "event" ? "Evento Activo" : "Decisión"}
              </button>
              <button
                type="button"
                onClick={() => setMobileTab("dossier")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 font-mono text-xs font-bold uppercase transition-colors cursor-pointer ${
                  mobileTab === "dossier"
                    ? "bg-amber-400 text-zinc-950"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <FileEdit className="h-3.5 w-3.5" />
                Dossier y Docs
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              {/* Left Column on Desktop / "Dossier" Tab on Mobile */}
              <div
                className={`${
                  mobileTab === "dossier" ? "block" : "hidden"
                } lg:block space-y-4 lg:col-span-5`}
              >
                <div className="comic-panel rounded-2xl p-4 sm:p-5 space-y-4">
                  <div>
                    <p className="font-mono text-xs font-bold uppercase text-zinc-400">
                      Objetivos de la Etapa
                    </p>
                    <ul className="mt-1.5 space-y-1.5 text-xs leading-relaxed text-zinc-200">
                      {stageConfig.objectives.map((obj) => (
                        <li key={obj}>• {obj}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverable Checklist */}
                  <div className="border-t border-white/10 pt-3">
                    <p className="font-mono text-xs font-bold uppercase text-emerald-300">
                      Checklist de Entregables
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {stageConfig.deliverablesChecklist.map((item) => {
                        const key = `${stageConfig.stage}:${item}`;
                        const checked = Boolean(state.checkedDeliverables[key]);
                        return (
                          <label
                            key={key}
                            className="flex items-start gap-2 text-xs text-zinc-200 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) =>
                                setState((prev) => ({
                                  ...prev,
                                  checkedDeliverables: {
                                    ...prev.checkedDeliverables,
                                    [key]: e.target.checked,
                                  },
                                }))
                              }
                              className="mt-0.5 h-3.5 w-3.5 accent-emerald-400"
                            />
                            <span>{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Editable Documentation */}
                  <div className="border-t border-white/10 pt-3 space-y-3">
                    <p className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-amber-300">
                      <FileEdit className="h-3.5 w-3.5" />
                      Documentación Editable
                    </p>
                    {stageConfig.docFields.map((field) => (
                      <div key={field.key}>
                        <label className="block font-mono text-[11px] text-zinc-400">
                          {field.label}
                        </label>
                        <textarea
                          rows={2}
                          value={state.docs[field.key] ?? ""}
                          onChange={(e) =>
                            setState((prev) => ({
                              ...prev,
                              docs: { ...prev.docs, [field.key]: e.target.value },
                            }))
                          }
                          placeholder={field.placeholder}
                          className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900/80 p-2.5 font-mono text-xs text-white focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Live Calculations Box */}
                  <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/25 p-3.5 font-mono text-xs space-y-1">
                    <p className="flex items-center gap-1.5 font-bold text-cyan-300">
                      <Calculator className="h-3.5 w-3.5" />
                      {stageConfig.calculationLabel}
                    </p>
                    <p className="text-zinc-200">
                      EV: ${state.metrics.evMillion}M | PV: ${state.metrics.pvMillion}M | AC: ${state.metrics.acMillion}M
                    </p>
                    <p className="text-zinc-300">
                      CV: {evm.cvMillion >= 0 ? `+$${evm.cvMillion}M` : `-$${Math.abs(evm.cvMillion)}M`} | VAC:{" "}
                      {evm.vacMillion >= 0 ? `+$${evm.vacMillion}M` : `-$${Math.abs(evm.vacMillion)}M`} | Forecast:{" "}
                      {state.metrics.forecastMonths}m
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column on Desktop / "Action" Tab on Mobile */}
              <div
                className={`${
                  mobileTab === "action" ? "block" : "hidden"
                } lg:block space-y-4 lg:col-span-7`}
              >
                {state.lastFeedback && (
                  <div className="rounded-2xl border border-amber-400/50 bg-amber-950/30 p-4 backdrop-blur-md">
                    <p className="font-mono text-xs font-black uppercase text-amber-300">
                      Retroalimentación del Sistema MAGI
                    </p>
                    <p className="mt-1 text-sm text-white">
                      {state.lastFeedback}
                    </p>
                  </div>
                )}

                {state.stageStep === "briefing" && (
                  <div className="comic-panel rounded-2xl p-4 sm:p-5 space-y-3">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
                      Decisión de Dirección de Proyecto ({stageConfig.code})
                    </p>
                    <div className="space-y-3">
                      {stageConfig.decisions.map((opt) => {
                        const isBlockedGo =
                          state.currentStage === 5 &&
                          opt.id === "m-s5-a" &&
                          !goGate.allowed;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              setState((prev) => applyMissionDecision(prev, opt))
                            }
                            className={`w-full rounded-xl border p-3.5 sm:p-4 text-left transition-all duration-150 cursor-pointer ${
                              isBlockedGo
                                ? "border-red-500/50 bg-red-950/20 hover:border-red-400"
                                : "border-white/10 bg-zinc-900/75 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-zinc-900"
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-mono text-xs font-black text-cyan-300">
                                [{opt.code}] {opt.label}
                              </span>
                              <span className="rounded-md bg-zinc-800 px-2 py-0.5 font-mono text-[11px] text-zinc-300">
                                +${opt.costDeltaMillion}M | +{opt.monthsDelta}m
                              </span>
                            </div>
                            <p className="mt-1.5 text-xs leading-relaxed text-zinc-200">
                              {opt.description}
                            </p>
                            {isBlockedGo && (
                              <p className="mt-2 font-mono text-[11px] font-bold text-red-400">
                                ⛔ BLOQUEADO POR CIS: {goGate.blockers.join(" ")}
                              </p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {state.stageStep === "event" && state.activeEvent && (
                  <div className="comic-panel-red rounded-2xl p-4 sm:p-5 space-y-4">
                    <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-amber-400">
                      <Flame className="h-4 w-4 text-red-400" />
                      EVENTO PERSISTENTE // {state.activeEvent.actor}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">
                        {state.activeEvent.title}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-200">
                        {state.activeEvent.description}
                      </p>
                      <p className="mt-1.5 font-mono text-[11px] text-amber-300">
                        Efecto: {state.activeEvent.persistentEffectNote}
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {state.activeEvent.options.map((evOpt) => (
                        <button
                          key={evOpt.id}
                          type="button"
                          onClick={() =>
                            setState((prev) =>
                              applyMissionEventChoice(prev, evOpt)
                            )
                          }
                          className="w-full rounded-xl border border-white/10 bg-zinc-900/80 p-3.5 text-left transition-all hover:border-amber-400/60 hover:bg-zinc-900 cursor-pointer"
                        >
                          <div className="flex flex-wrap justify-between gap-2 font-mono text-xs font-bold text-white">
                            <span>{evOpt.label}</span>
                            <span className="text-amber-300">
                              +${evOpt.costDeltaMillion}M | +{evOpt.monthsDelta}m
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-zinc-300">
                            {evOpt.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {state.stageStep === "stage_done" && (
                  <div className="comic-panel rounded-2xl p-4 sm:p-5 space-y-4">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" />
                      Etapa {state.currentStage} Completada
                    </div>
                    <p className="text-sm text-zinc-200">
                      Revisa tus indicadores EVM, reservas y documentación editable antes de avanzar a la siguiente etapa.
                    </p>
                    <button
                      type="button"
                      onClick={() => setState((prev) => advanceMissionStage(prev))}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 px-5 py-3 font-mono text-xs font-black uppercase text-zinc-950 shadow-lg hover:brightness-105 cursor-pointer"
                    >
                      <span>Avanzar a Etapa {state.currentStage + 1}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {state.persistentModifiers.length > 0 && (
                  <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4">
                    <p className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase text-amber-300">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Condiciones Activas en la Misión
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {state.persistentModifiers.map((m, idx) => (
                        <span
                          key={`${m}-${idx}`}
                          className="rounded-lg border border-white/10 bg-zinc-900 px-2.5 py-1 font-mono text-[10px] text-zinc-200"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {state.logs.length > 0 && (
                  <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4 space-y-2">
                    <p className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase text-zinc-400">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                      Últimos Registros de Misión
                    </p>
                    <div className="space-y-1.5">
                      {state.logs.slice(-3).map((l, i) => (
                        <div key={i} className="font-mono text-[11px] text-zinc-300">
                          <span className="text-cyan-400">E{l.stage}:</span> {l.choiceLabel} ({l.impactSummary})
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
