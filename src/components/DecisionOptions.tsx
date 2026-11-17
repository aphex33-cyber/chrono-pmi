"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { TOTAL_ROUNDS } from "@/domain/engine";
import { DecisionOption, ProjectMode } from "@/domain/types";

interface DecisionOptionsProps {
  mode: ProjectMode;
  round: number;
  options: [DecisionOption, DecisionOption, DecisionOption];
  selectedOptionId: string | null;
  hideHints?: boolean;
  onSelect: (option: DecisionOption) => void;
  onNextRound: () => void;
}

export function DecisionOptions({
  mode,
  round,
  options,
  selectedOptionId,
  hideHints = false,
  onSelect,
  onNextRound,
}: DecisionOptionsProps) {
  const isPrivate = mode === "private";
  const hasSelection = selectedOptionId !== null;

  const hoverBorder = isPrivate
    ? "hover:border-amber-400 focus:ring-amber-400"
    : "hover:border-cyan-400 focus:ring-cyan-400";

  const selectedStyle = isPrivate
    ? "border-amber-400 bg-amber-950/40 shadow-[0_0_30px_-6px_rgba(245,158,11,0.45)] ring-1 ring-amber-300/80 -translate-y-0.5"
    : "border-cyan-400 bg-cyan-950/40 shadow-[0_0_30px_-6px_rgba(6,182,212,0.45)] ring-1 ring-cyan-300/80 -translate-y-0.5";

  const codeBadge = isPrivate
    ? "bg-amber-400/95 text-zinc-950 border-amber-300/50"
    : "bg-cyan-400/95 text-zinc-950 border-cyan-300/50";

  const nextButtonActive = isPrivate
    ? "border-amber-300/60 bg-gradient-to-r from-amber-400 to-amber-300 text-zinc-950 shadow-[0_12px_30px_-8px_rgba(245,158,11,0.55)] hover:brightness-105 cursor-pointer"
    : "border-cyan-300/60 bg-gradient-to-r from-cyan-400 to-cyan-300 text-zinc-950 shadow-[0_12px_30px_-8px_rgba(6,182,212,0.55)] hover:brightness-105 cursor-pointer";

  return (
    <section aria-label="Opciones de decisión" className="space-y-3.5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const isDimmed = hasSelection && !isSelected;

          return (
            <motion.button
              key={option.id}
              type="button"
              disabled={hasSelection}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: isDimmed ? 0.42 : 1, y: 0 }}
              transition={{ duration: 0.22, delay: 0.22 + idx * 0.06 }}
              onClick={() => onSelect(option)}
              className={`group flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 backdrop-blur-md ${
                isSelected
                  ? selectedStyle
                  : isDimmed
                    ? "border-white/5 bg-zinc-950/60 cursor-default"
                    : `border-white/10 bg-zinc-900/80 shadow-lg hover:-translate-y-0.5 hover:bg-zinc-900 ${hoverBorder} focus:outline-none focus:ring-2 cursor-pointer`
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center border-2 px-2 py-0.5 font-mono text-xs font-black ${codeBadge}`}
                  >
                    [{option.code}]
                  </span>

                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 rounded-sm bg-emerald-400 px-2 py-0.5 font-mono text-[10px] font-black uppercase text-zinc-950">
                      <CheckCircle2 className="h-3 w-3" />
                      Elegida
                    </span>
                  ) : (
                    <span className="font-mono text-[11px] font-semibold text-zinc-400">
                      {hideHints && !hasSelection ? "Debate en mesa" : option.hint}
                    </span>
                  )}
                </div>

                <h3 className="mt-2.5 text-sm font-black uppercase tracking-tight text-white sm:text-base">
                  {option.label}
                </h3>

                <p className="mt-1 text-xs leading-snug text-zinc-300">
                  {option.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Glowing Next Page / Round Button */}
      <div className="flex justify-center pt-1">
        <button
          type="button"
          disabled={!hasSelection}
          onClick={onNextRound}
          className={`flex w-full max-w-md items-center justify-center gap-2.5 rounded-xl border px-6 py-3.5 font-mono text-sm font-black uppercase tracking-wider transition-all duration-200 ${
            hasSelection
              ? nextButtonActive
              : "border-white/10 bg-zinc-900/60 text-zinc-500 cursor-not-allowed"
          }`}
        >
          {hasSelection ? (
            <>
              <span>
                {round >= TOTAL_ROUNDS
                  ? "Ver Evaluación Final"
                  : "Pasar Página (Siguiente Ronda)"}
              </span>
              <ArrowRight className="h-4 w-4 animate-pulse" />
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              <span>Elige una viñeta de acción</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
