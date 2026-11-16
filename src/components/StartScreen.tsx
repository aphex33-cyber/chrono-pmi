"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  Landmark,
  ShieldAlert,
  Sparkles,
  Trash2,
  Trophy,
  UserCheck,
} from "lucide-react";
import { MODE_CONFIGS } from "@/domain/scenarios";
import { LeaderboardEntry, ProjectMode } from "@/domain/types";

interface StartScreenProps {
  participantName: string;
  leaderboard: LeaderboardEntry[];
  onChangeParticipantName: (name: string) => void;
  onStartWithPreTest: (mode: ProjectMode) => void;
  onStartDirect: (mode: ProjectMode) => void;
  onClearLeaderboard: () => void;
}

export function StartScreen({
  participantName,
  leaderboard,
  onChangeParticipantName,
  onStartWithPreTest,
  onStartDirect,
  onClearLeaderboard,
}: StartScreenProps) {
  const privateMode = MODE_CONFIGS.private;
  const publicMode = MODE_CONFIGS.public;
  const [nameError, setNameError] = useState(false);

  const handleLaunch = (mode: ProjectMode, withPreTest: boolean) => {
    if (!participantName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    if (withPreTest) {
      onStartWithPreTest(mode);
    } else {
      onStartDirect(mode);
    }
  };

  return (
    <div className="min-h-screen tactical-grid flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl space-y-6">
        {/* Top Gainax Episode Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3 font-mono text-xs uppercase tracking-widest text-zinc-400">
          <span className="flex items-center gap-2 text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            SIMULADOR DE DIRECCIÓN DE PROYECTOS // PMBOK® v8 EDITION
          </span>
          <span>DIAGNÓSTICO • 8 RONDAS • TEST DE SALIDA</span>
        </div>

        {/* Hero Comic Cover Panel */}
        <div className="comic-panel relative overflow-hidden rounded-sm bg-zinc-950">
          <div className="relative aspect-video w-full overflow-hidden sm:aspect-[16/7]">
            <img
              src="/images/cover.jpg"
              alt="Director de proyectos en centro de mando táctico estilo anime Gainax"
              className="h-full w-full object-cover object-center"
            />
            <div className="scanlines-overlay pointer-events-none absolute inset-0" />
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-transparent" />

            <div className="hidden sm:block absolute bottom-0 left-0 right-0 p-8">
              <div className="inline-block border border-amber-500/60 bg-amber-500/15 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-amber-300 backdrop-blur-sm">
                SISTEMA TÁCTICO MAGI // MODO SIMULACIÓN PMBOK® 8
              </div>
              <h1 className="mt-2 text-5xl font-black tracking-tight text-white">
                CHRONO<span className="text-amber-400">-PMI</span>
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-zinc-200">
                Valida tu nivel previo, detecta brechas y asume el mando en{" "}
                <span className="font-semibold text-white">8 rondas críticas</span>.
                Cada decisión impacta tu{" "}
                <span className="font-semibold text-amber-300">Presupuesto</span>,{" "}
                <span className="font-semibold text-cyan-300">Cronograma</span>,{" "}
                <span className="font-semibold text-emerald-300">Moral</span> y{" "}
                <span className="font-semibold text-violet-300">Stakeholders</span>.
              </p>
            </div>
          </div>

          <div className="border-t border-zinc-800 p-4 sm:hidden">
            <div className="inline-block border border-amber-500/60 bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-300">
              SISTEMA TÁCTICO MAGI // PMBOK® 8
            </div>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
              CHRONO<span className="text-amber-400">-PMI</span>
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-200">
              Diagnóstico de brechas + 8 rondas críticas de decisión + Test de salida comparativo.
            </p>
          </div>
        </div>

        {/* Participant Registration */}
        <div className="comic-panel rounded-sm bg-zinc-950/95 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="participant-name"
                className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-300"
              >
                <UserCheck className="h-4 w-4" />
                Registro de Participante (Requerido para Puntuación)
              </label>
              <p className="text-xs text-zinc-400">
                Tu nombre quedará asociado a tu diagnóstico, simulación (/1000) y test de salida.
              </p>
            </div>
            <div className="w-full sm:w-80">
              <input
                id="participant-name"
                type="text"
                maxLength={40}
                value={participantName}
                onChange={(e) => {
                  onChangeParticipantName(e.target.value);
                  if (e.target.value.trim()) setNameError(false);
                }}
                placeholder="Ej. Ana García / PMP-01"
                className={`w-full rounded-sm border-2 bg-zinc-900 px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-zinc-500 focus:outline-none ${
                  nameError
                    ? "border-red-500 focus:border-red-400"
                    : "border-zinc-700 focus:border-amber-400"
                }`}
              />
              {nameError && (
                <p className="mt-1 font-mono text-[11px] font-semibold text-red-400">
                  Ingresa tu nombre o alias para registrar tus puntuaciones.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Mode Selection Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-zinc-400">
            <span>SELECCIONA TU ESCENARIO DE OPERACIÓN</span>
            <span className="hidden sm:inline text-zinc-400">
              <ShieldAlert className="mr-1 inline h-3.5 w-3.5 text-amber-400" />
              8 RONDAS • PUNTUACIÓN EXACTA SOBRE 1000
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Mode A: Private Sector */}
            <div className="comic-panel-amber flex flex-col justify-between rounded-sm bg-zinc-900/95 p-6 text-left">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-sm border border-amber-500/40 bg-amber-500/15 px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-amber-300">
                    <Building2 className="h-3.5 w-3.5" />
                    {privateMode.code}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    CAPEX: $500,000 USD
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-extrabold text-white">
                  {privateMode.title}
                </h2>
                <p className="mt-1 font-mono text-xs text-amber-400/90">
                  {privateMode.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {privateMode.focus}
                </p>
              </div>

              <div className="mt-6 space-y-2 border-t border-zinc-800 pt-4">
                <button
                  type="button"
                  onClick={() => handleLaunch("private", true)}
                  className="flex w-full items-center justify-between rounded-sm border-2 border-black bg-amber-400 px-4 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-zinc-950 shadow-[3px_3px_0px_#000] transition-colors hover:bg-amber-300 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4" />
                    Diagnóstico (10p) + Simulador
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleLaunch("private", false)}
                  className="flex w-full items-center justify-between rounded-sm border border-zinc-700 bg-zinc-950 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:border-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  <span>Ir directo al Simulador (8 Rondas)</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Mode B: Public Sector */}
            <div className="comic-panel-cyan flex flex-col justify-between rounded-sm bg-zinc-900/95 p-6 text-left">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-sm border border-cyan-500/40 bg-cyan-500/15 px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-cyan-300">
                    <Landmark className="h-3.5 w-3.5" />
                    {publicMode.code}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    FONDO: $1,200,000 USD
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-extrabold text-white">
                  {publicMode.title}
                </h2>
                <p className="mt-1 font-mono text-xs text-cyan-400/90">
                  {publicMode.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {publicMode.focus}
                </p>
              </div>

              <div className="mt-6 space-y-2 border-t border-zinc-800 pt-4">
                <button
                  type="button"
                  onClick={() => handleLaunch("public", true)}
                  className="flex w-full items-center justify-between rounded-sm border-2 border-black bg-cyan-400 px-4 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-zinc-950 shadow-[3px_3px_0px_#000] transition-colors hover:bg-cyan-300 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4" />
                    Diagnóstico (10p) + Simulador
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleLaunch("public", false)}
                  className="flex w-full items-center justify-between rounded-sm border border-zinc-700 bg-zinc-950 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:border-cyan-400 hover:text-cyan-300 cursor-pointer"
                >
                  <span>Ir directo al Simulador (8 Rondas)</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Participant Leaderboard / Score Registry */}
        <div className="comic-panel rounded-sm bg-zinc-950/95 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
              <Trophy className="h-4 w-4" />
              Registro de Puntuaciones ({leaderboard.length})
            </h2>
            {leaderboard.length > 0 && (
              <button
                type="button"
                onClick={onClearLeaderboard}
                className="inline-flex items-center gap-1.5 rounded-sm border border-zinc-700 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-300 hover:border-red-500/60 hover:text-red-300 cursor-pointer"
              >
                <Trash2 className="h-3 w-3" />
                Limpiar historial
              </button>
            )}
          </div>

          {leaderboard.length === 0 ? (
            <p className="mt-3 font-mono text-xs text-zinc-400">
              Aún no hay partidas registradas en este navegador. Completa una simulación para aparecer en el ranking.
            </p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-[11px] uppercase text-zinc-400">
                    <th className="py-2 pr-3">Participante</th>
                    <th className="py-2 pr-3">Sector</th>
                    <th className="py-2 pr-3">Pre-Test</th>
                    <th className="py-2 pr-3">Simulación</th>
                    <th className="py-2 pr-3">Post-Test</th>
                    <th className="py-2 pr-3">Brechas</th>
                    <th className="py-2">Rango</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70">
                  {leaderboard.slice(0, 10).map((entry) => (
                    <tr key={entry.id} className="text-zinc-200">
                      <td className="py-2 pr-3 font-bold text-white">
                        {entry.participantName}
                      </td>
                      <td className="py-2 pr-3">
                        <span
                          className={
                            entry.mode === "private"
                              ? "text-amber-300"
                              : "text-cyan-300"
                          }
                        >
                          {entry.mode === "private" ? "Privado" : "Público"}
                        </span>
                      </td>
                      <td className="py-2 pr-3">
                        {entry.preTestScore !== null
                          ? `${entry.preTestScore}/10 (${entry.preTestLevel})`
                          : "—"}
                      </td>
                      <td className="py-2 pr-3 font-bold text-white">
                        {entry.simulationScore} / 1000
                      </td>
                      <td className="py-2 pr-3">
                        {entry.postTestScore !== null
                          ? `${entry.postTestScore}/10`
                          : "—"}
                      </td>
                      <td className="py-2 pr-3">
                        {entry.gapsClosed !== null && entry.totalGaps !== null
                          ? `${entry.gapsClosed}/${entry.totalGaps} cerradas`
                          : "—"}
                      </td>
                      <td className="py-2">
                        <span
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-sm font-black ${
                            entry.grade === "F"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-amber-400 text-zinc-950"
                          }`}
                        >
                          {entry.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
