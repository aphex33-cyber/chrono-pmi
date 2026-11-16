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
    ? "border-amber-400 bg-amber-950/50 shadow-[0_0_28px_rgba(245,158,11,0.5)] ring-2 ring-amber-300 -translate-y-1"
    : "border-cyan-400 bg-cyan-950/50 shadow-[0_0_28px_rgba(6,182,212,0.5)] ring-2 ring-cyan-300 -translate-y-1";

  const codeBadge = isPrivate
    ? "bg-amber-400 text-zinc-950 border-black"
    : "bg-cyan-400 text-zinc-950 border-black";

  const nextButtonActive = isPrivate
    ? "border-black bg-amber-400 text-zinc-950 shadow-[0_0_28px_rgba(245,158,11,0.6),4px_4px_0px_#000] hover:bg-amber-300 cursor-pointer"
    : "border-black bg-cyan-400 text-zinc-950 shadow-[0_0_28px_rgba(6,182,212,0.6),4px_4px_0px_#000] hover:bg-cyan-300 cursor-pointer";

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
              className={`group flex flex-col justify-between rounded-sm border-[3px] p-3.5 text-left transition-all duration-150 ${
                isSelected
                  ? selectedStyle
                  : isDimmed
                    ? "border-black bg-zinc-950/70 cursor-default"
                    : `border-black bg-zinc-900 shadow-[5px_5px_0px_#000] hover:-translate-y-1 ${hoverBorder} focus:outline-none focus:ring-2 cursor-pointer`
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
          className={`flex w-full max-w-md items-center justify-center gap-2.5 rounded-sm border-[3px] px-6 py-3 font-mono text-sm font-black uppercase tracking-wider transition-all duration-200 ${
            hasSelection
              ? nextButtonActive
              : "border-zinc-800 bg-zinc-900/70 text-zinc-500 cursor-not-allowed"
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
