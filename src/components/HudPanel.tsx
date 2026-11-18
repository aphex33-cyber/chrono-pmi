"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  DollarSign,
  HeartHandshake,
  RotateCcw,
  Timer,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";
import { TOTAL_ROUNDS, formatBudgetUsd } from "@/domain/engine";
import { GameIndicators, IndicatorKey, ProjectMode } from "@/domain/types";

interface HudPanelProps {
  mode: ProjectMode;
  modeTitle: string;
  round: number;
  indicators: GameIndicators;
  lastDeltas: GameIndicators | null;
  muted: boolean;
  roundTimerSeconds?: number | null;
  isPlaying?: boolean;
  onToggleMute: () => void;
  onReset: () => void;
}

interface IndicatorMeta {
  key: IndicatorKey;
  label: string;
  icon: typeof DollarSign;
  accentBar: string;
}

const INDICATOR_META: IndicatorMeta[] = [
  {
    key: "budget",
    label: "Presupuesto",
    icon: DollarSign,
    accentBar: "bg-amber-400",
  },
  {
    key: "schedule",
    label: "Cronograma",
    icon: Clock,
    accentBar: "bg-cyan-400",
  },
  {
    key: "morale",
    label: "Moral",
    icon: Users,
    accentBar: "bg-emerald-400",
  },
  {
    key: "stakeholders",
    label: "Stakeholders",
    icon: HeartHandshake,
    accentBar: "bg-violet-400",
  },
];

function getBarColorClass(value: number, defaultAccent: string): string {
  if (value <= 25) return "bg-red-500";
  if (value <= 45) return "bg-amber-500";
  return defaultAccent;
}

function getIndicatorStatusText(
  key: IndicatorKey,
  value: number,
  mode: ProjectMode
): string {
  if (key === "budget") {
    const disp = formatBudgetUsd(value, mode);
    if (value >= 70) return `Margen disp: ${disp} · En presupuesto`;
    if (value >= 46) return `Margen disp: ${disp} · Presión de gasto`;
    return `Margen disp: ${disp} · Sobregiro crítico`;
  }
  if (key === "schedule") {
    if (value >= 70) return "Cumplimiento de plazo · En ruta";
    if (value >= 46) return "Holgura consumida · Riesgo atraso";
    return "Desfase severo · Atraso crítico";
  }
  if (key === "morale") {
    if (value >= 70) return "Ritmo sostenible · Equipo firme";
    if (value >= 46) return "Desgaste moderado";
    return "Fatiga alta · Riesgo burnout";
  }
  if (value >= 70) return "Respaldo sólido";
  if (value >= 46) return "Fricción con interesados";
  return "Confianza crítica · Riesgo veto";
}

export function HudPanel({
  mode,
  modeTitle,
  round,
  indicators,
  lastDeltas,
  muted,
  roundTimerSeconds = null,
  isPlaying = true,
  onToggleMute,
  onReset,
}: HudPanelProps) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(
    roundTimerSeconds
  );

  useEffect(() => {
    setSecondsLeft(roundTimerSeconds);
  }, [round, roundTimerSeconds]);

  useEffect(() => {
    if (!roundTimerSeconds || !isPlaying) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null || prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [roundTimerSeconds, isPlaying, round]);

  const formattedTimer =
    secondsLeft !== null
      ? `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(
          secondsLeft % 60
        ).padStart(2, "0")}`
      : null;

  return (
    <header className="w-full border-b-2 border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4 py-2.5 sm:px-6">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest ${
                mode === "private"
                  ? "border-amber-500/50 bg-amber-500/15 text-amber-300"
                  : "border-cyan-500/50 bg-cyan-500/15 text-cyan-300"
              }`}
            >
              {mode === "private" ? "PRIVADO" : "PÚBLICO"}
            </span>
            <span className="hidden text-xs font-semibold text-zinc-300 sm:inline">
              {modeTitle}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {formattedTimer && (
              <div
                className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-0.5 font-mono text-xs font-bold tracking-wider ${
                  secondsLeft !== null && secondsLeft <= 15
                    ? "border-red-500/80 bg-red-950/60 text-red-300 animate-pulse"
                    : "border-zinc-700 bg-zinc-900 text-cyan-300"
                }`}
                title="Temporizador de discusión de taller"
              >
                <Timer className="h-3.5 w-3.5" />
                {formattedTimer}
              </div>
            )}
            <div className="rounded-sm border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 font-mono text-xs font-bold tracking-widest text-zinc-200">
              PÁGINA{" "}
              <span className="text-amber-400">
                0{Math.min(round, TOTAL_ROUNDS)}
              </span>
              <span className="text-zinc-500">/0{TOTAL_ROUNDS}</span>
            </div>

            <button
              type="button"
              onClick={onToggleMute}
              title={muted ? "Activar sonido" : "Silenciar sonido"}
              className="inline-flex items-center justify-center rounded-sm border border-zinc-700 bg-zinc-900 p-1.5 text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white cursor-pointer"
            >
              {muted ? (
                <VolumeX className="h-3.5 w-3.5 text-zinc-500" />
              ) : (
                <Volume2 className="h-3.5 w-3.5 text-amber-400" />
              )}
            </button>

            <button
              type="button"
              onClick={onReset}
              title="Reiniciar"
              className="inline-flex items-center gap-1 rounded-sm border border-zinc-700 bg-zinc-900 px-2 py-1 font-mono text-[11px] text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {INDICATOR_META.map(({ key, label, icon: Icon, accentBar }) => {
            const value = indicators[key];
            const delta = lastDeltas ? lastDeltas[key] : null;
            const isCritical = value <= 25;
            const barColor = getBarColorClass(value, accentBar);

            return (
              <div
                key={key}
                className={`rounded-sm border px-2.5 py-2 transition-colors ${
                  isCritical
                    ? "border-red-500/70 bg-red-950/25"
                    : "border-zinc-800 bg-zinc-900/80"
                }`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-300">
                    <Icon
                      className={`h-3.5 w-3.5 ${
                        isCritical
                          ? "text-red-400 animate-pulse"
                          : "text-zinc-400"
                      }`}
                    />
                    <span>{label}</span>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-xs font-bold">
                    {delta !== null && delta !== 0 && (
                      <span
                        className={`rounded px-1 text-[10px] font-extrabold ${
                          delta > 0
                            ? "bg-emerald-500/25 text-emerald-300"
                            : "bg-red-500/25 text-red-300"
                        }`}
                      >
                        {delta > 0 ? `+${delta}` : delta}%
                      </span>
                    )}
                    <span
                      className={
                        isCritical ? "text-red-400" : "text-zinc-100"
                      }
                    >
                      {value}%
                    </span>
                  </div>
                </div>

                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-xs bg-zinc-800">
                  <div
                    className={`h-full transition-all duration-500 ease-out ${barColor}`}
                    style={{ width: `${value}%` }}
                  />
                </div>

                <p className="mt-1 truncate font-mono text-[10px] text-zinc-400">
                  {getIndicatorStatusText(key, value, mode)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
