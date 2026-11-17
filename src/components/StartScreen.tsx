"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Cloud,
  Download,
  EyeOff,
  Landmark,
  Layers,
  Play,
  RefreshCw,
  Sparkles,
  Timer,
  Trash2,
  Trophy,
  UserCheck,
} from "lucide-react";
import { computeWorkshopAnalytics } from "@/domain/engine";
import { LEVEL_CONFIGS, MODE_CONFIGS } from "@/domain/scenarios";
import { DifficultyLevel, LeaderboardEntry, ProjectMode } from "@/domain/types";
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
  onStartWithPreTest: (mode: ProjectMode, level: DifficultyLevel) => void;
  onStartDirect: (mode: ProjectMode, level: DifficultyLevel) => void;
  onOpenMission: () => void;
  onClearLeaderboard: () => void;
}

const LEVELS: DifficultyLevel[] = [1, 2, 3];

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
  onOpenMission,
  onClearLeaderboard,
}: StartScreenProps) {
  const [selectedMode, setSelectedMode] = useState<ProjectMode>("public");
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>(1);
  const [nameError, setNameError] = useState(false);
  const [showWorkshopPanel, setShowWorkshopPanel] = useState(false);
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

  const handleLaunch = (withPreTest: boolean) => {
    if (!participantName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    if (withPreTest) {
      onStartWithPreTest(selectedMode, selectedLevel);
    } else {
      onStartDirect(selectedMode, selectedLevel);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefreshLeaderboard();
    setRefreshing(false);
  };

  const isPrivate = selectedMode === "private";

  return (
    <div className="min-h-screen tactical-grid flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-5">
        {/* SaaS Top Hub Switcher: PMind Arena vs PMind Mission */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-300 px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider text-zinc-950 shadow-[0_0_20px_-4px_rgba(245,158,11,0.45)]">
              <Sparkles className="h-3.5 w-3.5" />
              PMind Arena
            </span>
            <button
              type="button"
              onClick={onOpenMission}
              className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-400 hover:text-zinc-950 cursor-pointer"
            >
              🚀 PMind Mission (2045 Lunar)
            </button>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
            PMBOK® v8 • 3 NIVELES • 20p PRE/POST
          </span>
        </div>

        {/* Compact Hero Banner */}
        <div className="comic-panel relative overflow-hidden rounded-2xl">
          <div className="relative aspect-[16/6] w-full overflow-hidden sm:aspect-[16/5]">
            <img
              src="/images/cover.jpg"
              alt="Director de proyectos en centro de mando táctico estilo anime Gainax"
              className="h-full w-full object-cover object-center"
            />
            <div className="scanlines-overlay pointer-events-none absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
                CHRONO<span className="text-amber-400">-PMI</span>
              </h1>
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-200 sm:text-sm">
                Toma decisiones de proyecto como Director en formato cómic. Cuida{" "}
                <span className="font-semibold text-amber-300">Presupuesto</span>,{" "}
                <span className="font-semibold text-cyan-300">Cronograma</span>,{" "}
                <span className="font-semibold text-emerald-300">Moral</span> y{" "}
                <span className="font-semibold text-violet-300">Stakeholders</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Simple 3-Step Setup Card */}
        <div className="comic-panel rounded-2xl p-5 sm:p-7 space-y-6">
          {/* STEP 1: Name */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-amber-400 text-zinc-950 font-black">
                1
              </span>
              <UserCheck className="h-4 w-4" />
              <span>Tu Nombre o Equipo</span>
            </div>
            <input
              id="participant-name"
              type="text"
              maxLength={40}
              value={participantName}
              onChange={(e) => {
                onChangeParticipantName(e.target.value);
                if (e.target.value.trim()) setNameError(false);
              }}
              placeholder="Ej. Ana García o Mesa 1"
              className={`mt-2 w-full rounded-sm border-2 bg-zinc-900 px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-500 focus:outline-none ${
                nameError
                  ? "border-red-500 focus:border-red-400"
                  : "border-zinc-700 focus:border-amber-400"
              }`}
            />
            {nameError && (
              <p className="mt-1 font-mono text-xs font-semibold text-red-400">
                Escribe tu nombre o el de tu equipo para empezar.
              </p>
            )}
          </div>

          {/* STEP 2: Sector */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-amber-400 text-zinc-950 font-black">
                2
              </span>
              <span>Elige el Sector del Proyecto</span>
            </div>
            <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(["private", "public"] as ProjectMode[]).map((modeKey) => {
                const cfg = MODE_CONFIGS[modeKey];
                const active = selectedMode === modeKey;
                const isPriv = modeKey === "private";
                return (
                  <button
                    key={modeKey}
                    type="button"
                    onClick={() => setSelectedMode(modeKey)}
                    className={`rounded-sm border-2 p-4 text-left transition-all cursor-pointer ${
                      active
                        ? isPriv
                          ? "border-amber-400 bg-amber-950/35 ring-1 ring-amber-400"
                          : "border-cyan-400 bg-cyan-950/35 ring-1 ring-cyan-400"
                        : "border-zinc-800 bg-zinc-900/70 hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 font-mono text-xs font-black uppercase ${
                          isPriv ? "text-amber-300" : "text-cyan-300"
                        }`}
                      >
                        {isPriv ? (
                          <Building2 className="h-4 w-4" />
                        ) : (
                          <Landmark className="h-4 w-4" />
                        )}
                        {cfg.title}
                      </span>
                      <span
                        className={`rounded-sm px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                          active
                            ? isPriv
                              ? "bg-amber-400 text-zinc-950"
                              : "bg-cyan-400 text-zinc-950"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {active ? "Seleccionado" : "Elegir"}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-300">
                      {isPriv
                        ? "Fintech AI, ROI, contratos y App de Quejas Regionales."
                        : "Salud Digital, SIAFI, Contraloría y Construcción de Puentes."}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Level */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-amber-400 text-zinc-950 font-black">
                3
              </span>
              <Layers className="h-4 w-4" />
              <span>Elige el Nivel de Dificultad</span>
            </div>
            <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {LEVELS.map((lvl) => {
                const cfg = LEVEL_CONFIGS[lvl];
                const active = selectedLevel === lvl;
                const level3Project =
                  selectedMode === "private"
                    ? "Proyecto: App de Quejas para 8 Regionales (Inicio a Cierre)."
                    : "Proyecto: Construcción de Puente Estratégico (Inicio a Cierre).";
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`rounded-sm border-2 p-3.5 text-left transition-all cursor-pointer ${
                      active
                        ? isPrivate
                          ? "border-amber-400 bg-amber-950/30"
                          : "border-cyan-400 bg-cyan-950/30"
                        : "border-zinc-800 bg-zinc-900/70 hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[11px] font-black uppercase ${
                          active
                            ? isPrivate
                              ? "text-amber-300"
                              : "text-cyan-300"
                            : "text-zinc-400"
                        }`}
                      >
                        {cfg.badge}
                      </span>
                      {lvl === 3 && (
                        <span className="rounded-sm bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                          CASO REAL
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-extrabold text-white">
                      {cfg.title}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-zinc-300">
                      {lvl === 3 ? level3Project : cfg.shortDesc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Launch Actions */}
          <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row">
            <button
              type="button"
              onClick={() => handleLaunch(false)}
              className={`flex flex-1 items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 font-mono text-sm font-black uppercase tracking-wider text-zinc-950 shadow-lg transition-all hover:brightness-105 cursor-pointer ${
                isPrivate
                  ? "bg-gradient-to-r from-amber-400 to-amber-300 shadow-[0_12px_28px_-8px_rgba(245,158,11,0.5)]"
                  : "bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_12px_28px_-8px_rgba(6,182,212,0.5)]"
              }`}
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Iniciar Simulación (Nivel {selectedLevel})</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => handleLaunch(true)}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-zinc-900/80 px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-zinc-200 transition-colors hover:border-amber-400/60 hover:text-amber-300 cursor-pointer"
            >
              <ClipboardCheck className="h-4 w-4" />
              <span>Hacer Diagnóstico Previo (20p)</span>
            </button>
          </div>
        </div>

        {/* Collapsible Facilitator & Leaderboard Drawer */}
        <div className="comic-panel rounded-2xl">
          <button
            type="button"
            onClick={() => setShowWorkshopPanel((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-3.5 text-left font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-400" />
              Opciones de Taller y Ranking ({filteredLeaderboard.length})
              <span
                className={`ml-1 inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-[10px] ${
                  isRemoteSyncEnabled
                    ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                    : "border-zinc-700 bg-zinc-900 text-zinc-400"
                }`}
              >
                <Cloud className="h-3 w-3" />
                {isRemoteSyncEnabled ? "Supabase Activo" : "Local"}
              </span>
            </span>
            {showWorkshopPanel ? (
              <ChevronUp className="h-4 w-4 text-zinc-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-zinc-400" />
            )}
          </button>

          {showWorkshopPanel && (
            <div className="border-t border-zinc-800 p-5 space-y-5">
              {/* Workshop Facilitation Controls */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="workshop-code"
                    className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase text-cyan-300"
                  >
                    <BarChart3 className="h-3.5 w-3.5" />
                    Código de Taller / Sala
                  </label>
                  <input
                    id="workshop-code"
                    type="text"
                    maxLength={24}
                    value={workshopCode}
                    onChange={(e) => onChangeWorkshopCode(e.target.value)}
                    placeholder="Ej. TALLER-PMO-01"
                    className="mt-1.5 w-full rounded-sm border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-xs uppercase text-white placeholder:normal-case placeholder:text-zinc-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-end">
                  <label className="inline-flex items-center gap-2 rounded-sm border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-200 cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={workshopMode}
                      onChange={(e) => onChangeWorkshopMode(e.target.checked)}
                      className="h-4 w-4 accent-amber-400"
                    />
                    <EyeOff className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span>Modo Taller (Sin pistas)</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase text-zinc-400">
                    <Timer className="h-3.5 w-3.5 text-cyan-400" />
                    Timer por Ronda
                  </label>
                  <select
                    value={roundTimerSeconds ?? ""}
                    onChange={(e) =>
                      onChangeRoundTimer(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    className="mt-1.5 w-full rounded-sm border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-xs font-bold text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="">Sin límite</option>
                    <option value="60">60 segundos</option>
                    <option value="90">90 segundos</option>
                    <option value="120">120 segundos</option>
                  </select>
                </div>
              </div>

              {/* Leaderboard Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800 pt-4">
                <span className="font-mono text-xs font-bold text-amber-300">
                  Historial de Puntuaciones {workshopCode.trim() ? `// ${workshopCode.trim()}` : ""}
                </span>
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

              {/* Group Analytics */}
              {analytics.totalRuns > 0 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 font-mono text-xs">
                  <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-3">
                    <p className="text-[11px] text-zinc-400">Promedio Simulación</p>
                    <p className="mt-1 text-base font-black text-white">
                      {analytics.avgSimulationScore} / 1000
                    </p>
                  </div>
                  <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-3">
                    <p className="text-[11px] text-zinc-400">Pre vs Post Grupo</p>
                    <p className="mt-1 text-base font-black text-cyan-300">
                      {analytics.avgPreTest !== null ? `${analytics.avgPreTest}/20` : "—"} →{" "}
                      {analytics.avgPostTest !== null ? `${analytics.avgPostTest}/20` : "—"}
                    </p>
                  </div>
                  <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-3">
                    <p className="text-[11px] text-zinc-400">Brechas Frecuentes</p>
                    <p className="mt-1 text-xs font-bold text-amber-300">
                      {analytics.topGaps.length > 0
                        ? analytics.topGaps
                            .slice(0, 2)
                            .map((g) => `${g.domain} (${g.pct}%)`)
                            .join(" • ")
                        : "Sin datos de Pre-Test"}
                    </p>
                  </div>
                </div>
              )}

              {/* Leaderboard Table */}
              {filteredLeaderboard.length === 0 ? (
                <p className="font-mono text-xs text-zinc-400">
                  Aún no hay partidas registradas.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-[11px] uppercase text-zinc-400">
                        <th className="py-2 pr-3">Participante</th>
                        <th className="py-2 pr-3">Sector</th>
                        <th className="py-2 pr-3">Nivel</th>
                        <th className="py-2 pr-3">Pre-Test</th>
                        <th className="py-2 pr-3">Simulación</th>
                        <th className="py-2 pr-3">Post-Test</th>
                        <th className="py-2">Rango</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/70">
                      {filteredLeaderboard.slice(0, 20).map((entry) => (
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
                          <td className="py-2 pr-3 text-zinc-300">
                            N{entry.level ?? 1}
                          </td>
                          <td className="py-2 pr-3">
                            {entry.preTestScore !== null
                              ? `${entry.preTestScore}/20`
                              : "—"}
                          </td>
                          <td className="py-2 pr-3 font-bold text-white">
                            {entry.simulationScore} / 1000
                          </td>
                          <td className="py-2 pr-3">
                            {entry.postTestScore !== null
                              ? `${entry.postTestScore}/20`
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
          )}
        </div>
      </div>
    </div>
  );
}
