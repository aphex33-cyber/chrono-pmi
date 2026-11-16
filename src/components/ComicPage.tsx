"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DecisionOption, ProjectMode, Scenario } from "@/domain/types";

interface ComicPageProps {
  mode: ProjectMode;
  scenario: Scenario;
  isFeedback: boolean;
  lastOutcome: DecisionOption | null;
  shakeTrigger: number;
  isGapTargeted?: boolean;
}

export function ComicPage({
  mode,
  scenario,
  isFeedback,
  lastOutcome,
  shakeTrigger,
  isGapTargeted = false,
}: ComicPageProps) {
  const isPrivate = mode === "private";
  const accentSfx = isPrivate ? "text-amber-400" : "text-cyan-400";
  const accentTag = isPrivate
    ? "bg-amber-400 text-zinc-950"
    : "bg-cyan-400 text-zinc-950";

  return (
    <motion.section
      key={scenario.id}
      aria-label={`Página ${scenario.round} del cómic`}
      animate={
        shakeTrigger > 0
          ? {
              x: [0, -8, 8, -5, 5, -2, 2, 0],
              y: [0, 3, -3, 2, -2, 0],
            }
          : { x: 0, y: 0 }
      }
      transition={{ duration: 0.4 }}
      className="space-y-3"
    >
      {/* Multi-Panel Comic Book Page Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        {/* PANEL 1: Establishing / Alert Vignette */}
        <motion.div
          initial={{ opacity: 0, x: -24, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="comic-vignette relative aspect-video overflow-hidden bg-zinc-950 md:col-span-5 md:aspect-auto md:min-h-[280px]"
        >
          <img
            src={scenario.imagePath}
            alt={`${scenario.title} - Viñeta 1`}
            className="h-full w-full scale-105 object-cover object-right-top brightness-85 contrast-125 saturate-150 md:scale-150 md:brightness-75 md:contrast-150"
          />
          <div className="speed-lines-overlay pointer-events-none absolute inset-0" />
          <div className="scanlines-overlay pointer-events-none absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75" />

          {/* Episode Stamp Top Left */}
          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5 pr-3">
            <span
              className={`border-2 border-black px-2 py-0.5 font-mono text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#000] ${accentTag}`}
            >
              {scenario.episodeCode}
            </span>
            <span className="border-2 border-black bg-white px-2 py-0.5 font-mono text-[11px] font-black uppercase text-black shadow-[2px_2px_0px_#000]">
              {scenario.title}
            </span>
            {isGapTargeted && (
              <span className="border-2 border-black bg-rose-500 px-2 py-0.5 font-mono text-[10px] font-black uppercase text-white shadow-[2px_2px_0px_#000]">
                🎯 BRECHA: {scenario.pmbokDomain}
              </span>
            )}
          </div>

          {/* Manga Onomatopoeia SFX */}
          <motion.div
            initial={{ scale: 1.5, rotate: -14, opacity: 0 }}
            animate={{ scale: 1, rotate: -8, opacity: 1 }}
            transition={{ delay: 0.12, type: "spring", stiffness: 320, damping: 16 }}
            className={`comic-sfx pointer-events-none absolute right-3 top-11 font-black italic tracking-tighter text-2xl sm:text-3xl md:right-4 md:top-12 md:text-4xl ${accentSfx}`}
          >
            {scenario.sfxText}
          </motion.div>

          {/* Yellow Comic Narrator Caption Box */}
          <div className="comic-narrator-box absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1.5 md:bottom-3 md:left-3 md:right-3 md:px-3 md:py-2">
            <p className="font-mono text-[11px] font-extrabold uppercase leading-snug tracking-tight sm:text-xs">
              {scenario.narratorBox}
            </p>
          </div>
        </motion.div>

        {/* PANEL 2: Character Close-Up + Real Comic Speech Bubble */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.14, ease: "easeOut" }}
          className="comic-vignette relative flex flex-col overflow-hidden bg-zinc-950 md:col-span-7 md:block md:min-h-[280px]"
        >
          <div className="relative aspect-video w-full overflow-hidden md:aspect-auto md:h-full">
            <img
              src={scenario.imagePath}
              alt={scenario.speaker}
              className="h-full w-full object-cover object-center"
            />
            <div className="scanlines-overlay pointer-events-none absolute inset-0" />
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          </div>

          {/* Real Comic Speech Bubble (below 16:9 image on mobile, overlaid inside on desktop) */}
          <div className="flex flex-col items-start gap-2.5 border-t-2 border-black bg-zinc-900 p-3 md:absolute md:bottom-4 md:left-5 md:right-5 md:gap-3 md:border-t-0 md:bg-transparent md:p-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.2 }}
              className="comic-speech-bubble max-w-xl rounded-xl px-3.5 py-2.5 md:px-4 md:py-3"
            >
              <p className="text-sm font-bold leading-snug text-zinc-950 sm:text-base">
                {scenario.dialogue}
              </p>
            </motion.div>

            {/* Speaker Nameplate */}
            <div className="ml-2 flex items-center gap-2">
              <span className="border-2 border-black bg-zinc-950 px-2.5 py-0.5 font-mono text-xs font-black uppercase tracking-wider text-white shadow-[2px_2px_0px_#000]">
                {scenario.speaker}
              </span>
              <span
                className={`border-2 border-black px-2 py-0.5 font-mono text-[10px] font-bold uppercase shadow-[2px_2px_0px_#000] ${accentTag}`}
              >
                {scenario.speakerRole}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* PANEL 3 (REACTION BEAT): Slams in when player picks a decision */}
      <AnimatePresence>
        {isFeedback && lastOutcome && (() => {
          const score = lastOutcome.pmiBestPracticeScore;
          const isOptimal = score >= 70;
          const isPartial = score >= 40 && score < 70;
          const tierColor = isOptimal
            ? "text-emerald-400"
            : isPartial
              ? "text-amber-400"
              : "text-red-400";
          const tierBadgeBg = isOptimal
            ? "bg-emerald-400 text-zinc-950"
            : isPartial
              ? "bg-amber-400 text-zinc-950"
              : "bg-red-500 text-white";
          const tierLabel = isOptimal
            ? `ÓPTIMA (${score}/75 PTS)`
            : isPartial
              ? `TÁCTICA CON COSTO (${score}/75 PTS)`
              : `ERROR CRÍTICO (${score}/75 PTS)`;
          const bestOption = !isOptimal
            ? scenario.options.reduce((best, opt) =>
                opt.pmiBestPracticeScore > best.pmiBestPracticeScore ? opt : best
              )
            : null;

          return (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 22 }}
              className="comic-vignette relative overflow-hidden bg-zinc-900 px-4 py-3.5 sm:px-6"
            >
              <div className="speed-lines-overlay pointer-events-none absolute inset-0" />
              <div className="relative z-10 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`comic-sfx -rotate-3 font-black italic text-xl ${tierColor}`}>
                    {lastOutcome.sfxWord}
                  </span>
                  <span className={`border-2 border-black px-2 py-0.5 font-mono text-[11px] font-black uppercase ${tierBadgeBg}`}>
                    {tierLabel}
                  </span>
                  <span className="border-2 border-black bg-zinc-800 px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-zinc-200">
                    {lastOutcome.pmiArea}
                  </span>
                </div>
                <p className="text-sm font-bold text-white sm:text-base">
                  {lastOutcome.outcomeNarrative}
                </p>
                <p className="font-mono text-xs text-zinc-200">
                  Diagnóstico PMBOK® v8: {lastOutcome.pmiFeedback}
                </p>
                {bestOption && (
                  <div className="rounded-sm border border-emerald-500/40 bg-emerald-950/35 px-3 py-2 font-mono text-xs text-emerald-200">
                    <span className="font-black text-emerald-300">
                      Ruta Óptima PMBOK® v8 ([{bestOption.code}] {bestOption.label}):
                    </span>{" "}
                    {bestOption.pmiFeedback}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </motion.section>
  );
}
