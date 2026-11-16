"use client";

import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Home,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import { INDICATOR_LABELS, formatBudgetUsd } from "@/domain/engine";
import { FinalEvaluation, GameState, ProjectMode } from "@/domain/types";

interface ResultScreenProps {
  state: GameState;
  mode: ProjectMode;
  evaluation: FinalEvaluation | null;
  onRetrySameMode: () => void;
  onBackToStart: () => void;
}

export function ResultScreen({
  state,
  mode,
  evaluation,
  onRetrySameMode,
  onBackToStart,
}: ResultScreenProps) {
  const isVictory = state.status === "victory" && evaluation !== null;

  if (!isVictory) {
    const failedLabel = state.failedIndicator
      ? INDICATOR_LABELS[state.failedIndicator]
      : "Indicador Crítico";

    return (
      <div className="min-h-screen tactical-grid flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-4xl space-y-6">
          <div className="comic-panel-red overflow-hidden rounded-sm bg-zinc-950">
            <div className="relative aspect-video w-full overflow-hidden sm:aspect-[16/7]">
              <img
                src="/images/gameover.jpg"
                alt="Proyecto fracasado en sala de mando"
                className="h-full w-full object-cover object-center"
              />
              <div className="scanlines-overlay pointer-events-none absolute inset-0" />
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-transparent" />

              <div className="hidden sm:block absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-flex items-center gap-2 border border-red-500/70 bg-red-500/20 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-red-300">
                  <AlertTriangle className="h-4 w-4" />
                  TERMINACIÓN ANTICIPADA // RONDA 0{state.currentRoundIndex + 1}
                </div>
                <h1 className="mt-3 text-5xl font-black uppercase tracking-tight text-white">
                  Proyecto Fracasado /{" "}
                  <span className="text-red-500">Cancelado</span>
                </h1>
              </div>
            </div>

            <div className="border-t border-zinc-800 px-6 pt-5 sm:hidden">
              <div className="inline-flex items-center gap-2 border border-red-500/70 bg-red-500/20 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-red-300">
                <AlertTriangle className="h-3.5 w-3.5" />
                TERMINACIÓN // RONDA 0{state.currentRoundIndex + 1}
              </div>
              <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-white">
                Proyecto Fracasado /{" "}
                <span className="text-red-500">Cancelado</span>
              </h1>
            </div>

            <div className="space-y-5 p-6 sm:p-8">
              <div className="rounded-sm border border-red-500/40 bg-red-950/30 p-4">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-red-300">
                  Causa Raíz del Colapso
                </p>
                <p className="mt-1 text-base font-semibold text-white">
                  El indicador <span className="text-red-400">{failedLabel}</span>{" "}
                  llegó a 0%. El comité ejecutivo ordenó la cancelación inmediata
                  del proyecto.
                </p>
                {state.lastOutcome && (
                  <p className="mt-2 text-sm text-zinc-300">
                    Última acción ({state.lastOutcome.label}):{" "}
                    {state.lastOutcome.outcomeNarrative}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={onRetrySameMode}
                  className="inline-flex items-center gap-2 rounded-sm bg-red-500 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-400"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reintentar Mismo Modo
                </button>
                <button
                  type="button"
                  onClick={onBackToStart}
                  className="inline-flex items-center gap-2 rounded-sm border border-zinc-700 bg-zinc-900 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
                >
                  <Home className="h-4 w-4" />
                  Volver al Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen tactical-grid px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Victory Hero Banner */}
        <div className="comic-panel-amber overflow-hidden rounded-sm bg-zinc-950">
          <div className="relative aspect-video w-full overflow-hidden sm:aspect-[16/7]">
            <img
              src="/images/victory.jpg"
              alt="Equipo celebrando proyecto exitoso estilo Gainax"
              className="h-full w-full object-cover object-center"
            />
            <div className="scanlines-overlay pointer-events-none absolute inset-0" />
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

            <div className="hidden sm:flex absolute bottom-0 left-0 right-0 flex-wrap items-end justify-between gap-4 p-8">
              <div>
                <div className="inline-flex items-center gap-2 border border-emerald-400/60 bg-emerald-500/20 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-emerald-300">
                  <Award className="h-4 w-4" />
                  5 RONDAS COMPLETADAS // CIERRE EXITOSO
                </div>
                <h1 className="mt-2 text-5xl font-black tracking-tight text-white">
                  ¡Proyecto <span className="text-amber-400">Exitoso</span>!
                </h1>
                <p className="mt-1 font-mono text-sm text-amber-300">
                  Rango Obtenido: {evaluation.title}
                </p>
              </div>

              {/* Score & Grade Stamp */}
              <div className="flex items-center gap-4 rounded-sm border-2 border-amber-400 bg-zinc-950/90 px-5 py-3 backdrop-blur-sm">
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    Puntuación Final
                  </p>
                  <p className="font-mono text-2xl font-black text-white">
                    {evaluation.totalScore}
                    <span className="text-sm text-zinc-400"> / 1000</span>
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-amber-400 font-mono text-2xl font-black text-zinc-950">
                  {evaluation.grade}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-zinc-800 px-6 pt-5 sm:hidden">
            <div className="inline-flex items-center gap-2 border border-emerald-400/60 bg-emerald-500/20 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-300">
              <Award className="h-3.5 w-3.5" />
              5 RONDAS COMPLETADAS
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              ¡Proyecto <span className="text-amber-400">Exitoso</span>!
            </h1>
            <div className="flex items-center justify-between rounded-sm border-2 border-amber-400 bg-zinc-900 px-4 py-2.5">
              <div>
                <p className="font-mono text-[10px] uppercase text-zinc-400">
                  {evaluation.title}
                </p>
                <p className="font-mono text-xl font-black text-white">
                  {evaluation.totalScore} / 1000
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-amber-400 font-mono text-xl font-black text-zinc-950">
                {evaluation.grade}
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-zinc-200 sm:text-base">
              {evaluation.summary}
            </p>

            {/* Final HUD Summary */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-3">
                <p className="font-mono text-[11px] text-zinc-400">
                  Presupuesto Final
                </p>
                <p className="mt-1 font-mono text-lg font-bold text-amber-300">
                  {formatBudgetUsd(state.indicators.budget, mode)}
                </p>
              </div>
              <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-3">
                <p className="font-mono text-[11px] text-zinc-400">
                  Cronograma
                </p>
                <p className="mt-1 font-mono text-lg font-bold text-cyan-300">
                  {state.indicators.schedule}%
                </p>
              </div>
              <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-3">
                <p className="font-mono text-[11px] text-zinc-400">
                  Moral del Equipo
                </p>
                <p className="mt-1 font-mono text-lg font-bold text-emerald-300">
                  {state.indicators.morale}%
                </p>
              </div>
              <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-3">
                <p className="font-mono text-[11px] text-zinc-400">
                  Stakeholders
                </p>
                <p className="mt-1 font-mono text-lg font-bold text-violet-300">
                  {state.indicators.stakeholders}%
                </p>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-sm border border-emerald-500/30 bg-emerald-950/15 p-4">
                <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  Fortalezas Detectadas
                </h2>
                <ul className="mt-2.5 space-y-1.5 text-sm text-zinc-200">
                  {evaluation.strengths.length > 0 ? (
                    evaluation.strengths.map((s) => <li key={s}>• {s}</li>)
                  ) : (
                    <li>• Resiliencia operativa para completar las 5 rondas.</li>
                  )}
                </ul>
              </div>

              <div className="rounded-sm border border-amber-500/30 bg-amber-950/15 p-4">
                <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
                  <TrendingUp className="h-4 w-4" />
                  Áreas de Mejora (PMBOK)
                </h2>
                <ul className="mt-2.5 space-y-1.5 text-sm text-zinc-200">
                  {evaluation.improvements.length > 0 ? (
                    evaluation.improvements.map((imp) => (
                      <li key={imp}>• {imp}</li>
                    ))
                  ) : (
                    <li>
                      • ¡Ninguna desviación crítica! Mantén este estándar en
                      portafolios complejos.
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Round-by-Round PMI Evaluation */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400">
                BITÁCORA DE EVALUACIÓN // BUENAS PRÁCTICAS PMI
              </h2>
              <div className="space-y-2">
                {evaluation.decisionBreakdown.map((item) => (
                  <div
                    key={item.round}
                    className="flex flex-col justify-between gap-2 rounded-sm border border-zinc-800 bg-zinc-900/80 p-3.5 sm:flex-row sm:items-center"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-amber-400">
                        RONDA 0{item.round} — {item.area}
                      </span>
                      <p className="mt-0.5 text-sm text-zinc-200">
                        {item.feedback}
                      </p>
                    </div>
                    <span className="shrink-0 self-start rounded-sm border border-zinc-700 bg-zinc-950 px-2.5 py-1 font-mono text-xs font-bold text-zinc-100 sm:self-center">
                      {item.score}/20 PTS
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 border-t border-zinc-800 pt-5">
              <button
                type="button"
                onClick={onRetrySameMode}
                className="inline-flex items-center gap-2 rounded-sm bg-amber-500 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-zinc-950 transition-colors hover:bg-amber-400"
              >
                <RotateCcw className="h-4 w-4" />
                Jugar de Nuevo
              </button>
              <button
                type="button"
                onClick={onBackToStart}
                className="inline-flex items-center gap-2 rounded-sm border border-zinc-700 bg-zinc-900 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
              >
                <Home className="h-4 w-4" />
                Cambiar Modo de Proyecto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
