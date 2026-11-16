"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  ClipboardCheck,
  Cloud,
  Download,
  EyeOff,
  Landmark,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Timer,
  Trash2,
  Trophy,
  UserCheck,
} from "lucide-react";
import { computeWorkshopAnalytics } from "@/domain/engine";
import { MODE_CONFIGS } from "@/domain/scenarios";
import { LeaderboardEntry, ProjectMode } from "@/domain/types";
import { exportLeaderboardCsv } from "@/infrastructure/storage";

interface StartScreenProps {
  participantName: string;
  workshopCode: string;
  workshopMode: boolean;
  roundTimerSeconds: number | null;
  leaderboard: LeaderboardEntry[];
  isRemoteSyncEnabled: boolean;
  onChangeParticipantName: (name: string) => void;
  onChangeWorkshopCode: (code: string) => void;
  onChangeWorkshopMode: (enabled: boolean) => void;
  onChangeRoundTimer: (seconds: number | null) => void;
  onRefreshLeaderboard: () => Promise<void>;
  onStartWithPreTest: (mode: ProjectMode) => void;
  onStartDirect: (mode: ProjectMode) => void;
  onClearLeaderboard: () => void;
}

export function StartScreen({
  participantName,
  workshopCode,
  workshopMode,
  roundTimerSeconds,
  leaderboard,
  isRemoteSyncEnabled,
  onChangeParticipantName,
  onChangeWorkshopCode,
  onChangeWorkshopMode,
  onChangeRoundTimer,
  onRefreshLeaderboard,
  onStartWithPreTest,
  onStartDirect,
  onClearLeaderboard,
}: StartScreenProps) {
  const privateMode = MODE_CONFIGS.private;
  const publicMode = MODE_CONFIGS.public;
  const [nameError, setNameError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const filteredLeaderboard = useMemo(() => {
    const code = workshopCode.trim().toUpperCase();
    if (!code) return leaderboard;
    return leaderboard.filter(
      (e) => (e.workshopCode || "").trim().toUpperCase() === code
    );
  }, [leaderboard, workshopCode]);

  const analytics = useMemo(
    () => computeWorkshopAnalytics(leaderboard, workshopCode),
    [leaderboard, workshopCode]
  );

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

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefreshLeaderboard();
    setRefreshing(false);
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

        {/* Participant & Workshop Configuration */}
        <div className="comic-panel rounded-sm bg-zinc-950/95 p-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="participant-name"
                className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-300"
              >
                <UserCheck className="h-4 w-4" />
                Participante o Equipo (Requerido)
              </label>
              <input
                id="participant-name"
                type="text"
                maxLength={40}
                value={participantName}
                onChange={(e) => {
                  onChangeParticipantName(e.target.value);
                  if (e.target.value.trim()) setNameError(false);
                }}
                placeholder="Ej. Mesa 1 - Ana García"
                className={`mt-2 w-full rounded-sm border-2 bg-zinc-900 px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-zinc-500 focus:outline-none ${
                  nameError
                    ? "border-red-500 focus:border-red-400"
                    : "border-zinc-700 focus:border-amber-400"
                }`}
              />
              {nameError && (
                <p className="mt-1 font-mono text-[11px] font-semibold text-red-400">
                  Ingresa tu nombre o equipo para registrar puntuaciones.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="workshop-code"
                className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-300"
              >
                <BarChart3 className="h-4 w-4" />
                Código de Taller / Sala (Opcional)
              </label>
              <input
                id="workshop-code"
                type="text"
                maxLength={24}
                value={workshopCode}
                onChange={(e) => onChangeWorkshopCode(e.target.value)}
                placeholder="Ej. TALLER-PMO-01 (vacío = General)"
                className="mt-2 w-full rounded-sm border-2 border-zinc-700 bg-zinc-900 px-3.5 py-2.5 font-mono text-sm uppercase text-white placeholder:normal-case placeholder:text-zinc-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Workshop Facilitation Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-3.5">
            <label className="inline-flex items-center gap-2.5 font-mono text-xs text-zinc-200 cursor-pointer">
              <input
                type="checkbox"
                checked={workshopMode}
                onChange={(e) => onChangeWorkshopMode(e.target.checked)}
                className="h-4 w-4 accent-amber-400"
              />
              <EyeOff className="h-3.5 w-3.5 text-amber-400" />
              <span>
                <strong className="text-white">Modo Taller (Sin Pistas):</strong>{" "}
                oculta pistas en las opciones para fomentar debate en equipo
              </span>
            </label>

            <div className="flex items-center gap-2 font-mono text-xs">
              <Timer className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-zinc-400">Timer por ronda:</span>
              <select
                value={roundTimerSeconds ?? ""}
                onChange={(e) =>
                  onChangeRoundTimer(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="rounded-sm border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs font-bold text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="">Sin límite</option>
                <option value="60">60 seg</option>
                <option value="90">90 seg</option>
                <option value="120">120 seg</option>
              </select>
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

        {/* Workshop Analytics + Leaderboard */}
        <div className="comic-panel rounded-sm bg-zinc-950/95 p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
                <Trophy className="h-4 w-4" />
                Ranking y Analítica {workshopCode.trim() ? `// ${workshopCode.trim()}` : "// General"} ({filteredLeaderboard.length})
              </h2>
              <span
                className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-[10px] font-bold ${
                  isRemoteSyncEnabled
                    ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                    : "border-zinc-700 bg-zinc-900 text-zinc-400"
                }`}
              >
                <Cloud className="h-3 w-3" />
                {isRemoteSyncEnabled ? "Supabase Sync Activo" : "Guardado Local"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {isRemoteSyncEnabled && (
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-zinc-700 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-200 hover:border-cyan-400 cursor-pointer"
                >
                  <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
                  Actualizar
                </button>
              )}
              {filteredLeaderboard.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() => exportLeaderboardCsv(filteredLeaderboard, workshopCode)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-300 hover:bg-emerald-500/25 cursor-pointer"
                  >
                    <Download className="h-3 w-3" />
                    Exportar CSV
                  </button>
                  <button
                    type="button"
                    onClick={onClearLeaderboard}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-zinc-700 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-300 hover:border-red-500/60 hover:text-red-300 cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" />
                    Limpiar
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Group Analytics Summary */}
          {analytics.totalRuns > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 font-mono text-xs">
              <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-3">
                <p className="text-[11px] text-zinc-400">Promedio Simulación</p>
                <p className="mt-1 text-lg font-black text-white">
                  {analytics.avgSimulationScore} <span className="text-xs text-zinc-400">/ 1000</span>
                </p>
              </div>
              <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-3">
                <p className="text-[11px] text-zinc-400">Pre-Test vs. Post-Test Grupo</p>
                <p className="mt-1 text-lg font-black text-cyan-300">
                  {analytics.avgPreTest !== null ? `${analytics.avgPreTest}/10` : "—"} →{" "}
                  {analytics.avgPostTest !== null ? `${analytics.avgPostTest}/10` : "—"}
                </p>
              </div>
              <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-3">
                <p className="text-[11px] text-zinc-400">Brechas Más Frecuentes</p>
                {analytics.topGaps.length > 0 ? (
                  <p className="mt-1 text-xs font-bold text-amber-300">
                    {analytics.topGaps
                      .slice(0, 2)
                      .map((g) => `${g.domain} (${g.pct}%)`)
                      .join(" • ")}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-zinc-400">Sin datos de Pre-Test aún</p>
                )}
              </div>
            </div>
          )}

          {filteredLeaderboard.length === 0 ? (
            <p className="font-mono text-xs text-zinc-400">
              Aún no hay partidas registradas{workshopCode.trim() ? ` para el taller ${workshopCode.trim()}` : ""}. Completa una simulación para aparecer en el ranking.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-[11px] uppercase text-zinc-400">
                    <th className="py-2 pr-3">Participante</th>
                    <th className="py-2 pr-3">Taller</th>
                    <th className="py-2 pr-3">Sector</th>
                    <th className="py-2 pr-3">Pre-Test</th>
                    <th className="py-2 pr-3">Simulación</th>
                    <th className="py-2 pr-3">Post-Test</th>
                    <th className="py-2 pr-3">Brechas</th>
                    <th className="py-2">Rango</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70">
                  {filteredLeaderboard.slice(0, 20).map((entry) => (
                    <tr key={entry.id} className="text-zinc-200">
                      <td className="py-2 pr-3 font-bold text-white">
                        {entry.participantName}
                      </td>
                      <td className="py-2 pr-3 text-zinc-400">
                        {entry.workshopCode || "GENERAL"}
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
