"use client";

import { ArrowRight, Building2, Landmark, ShieldAlert, Sparkles } from "lucide-react";
import { MODE_CONFIGS } from "@/domain/scenarios";
import { ProjectMode } from "@/domain/types";

interface StartScreenProps {
  onSelectMode: (mode: ProjectMode) => void;
}

export function StartScreen({ onSelectMode }: StartScreenProps) {
  const privateMode = MODE_CONFIGS.private;
  const publicMode = MODE_CONFIGS.public;

  return (
    <div className="min-h-screen tactical-grid flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl space-y-6">
        {/* Top Gainax Episode Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3 font-mono text-xs uppercase tracking-widest text-zinc-400">
          <span className="flex items-center gap-2 text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            SIMULADOR DE DIRECCIÓN DE PROYECTOS // PMBOK EDITION
          </span>
          <span>5 RONDAS • NOVELA GRÁFICA DE DECISIONES</span>
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
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

            <div className="hidden sm:block absolute bottom-0 left-0 right-0 p-8">
              <div className="inline-block border border-amber-500/60 bg-amber-500/15 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-amber-300 backdrop-blur-sm">
                SISTEMA TÁCTICO MAGI // MODO SIMULACIÓN
              </div>
              <h1 className="mt-2 text-5xl font-black tracking-tight text-white">
                CHRONO<span className="text-amber-400">-PMI</span>
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-zinc-200">
                Asume el mando de un proyecto de alto riesgo en 5 rondas críticas.
                Cada decisión impacta tu{" "}
                <span className="font-semibold text-amber-300">Presupuesto</span>,{" "}
                <span className="font-semibold text-cyan-300">Cronograma</span>,{" "}
                <span className="font-semibold text-emerald-300">Moral</span> y{" "}
                <span className="font-semibold text-violet-300">Stakeholders</span>.
                Si un indicador llega a cero, el proyecto es cancelado.
              </p>
            </div>
          </div>

          {/* Mobile Hero Text (keeps 16:9 image uncropped on small screens) */}
          <div className="border-t border-zinc-800 p-4 sm:hidden">
            <div className="inline-block border border-amber-500/60 bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-300">
              SISTEMA TÁCTICO MAGI // MODO SIMULACIÓN
            </div>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
              CHRONO<span className="text-amber-400">-PMI</span>
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-200">
              Asume el mando de un proyecto en 5 rondas críticas. Cada decisión
              impacta tu{" "}
              <span className="font-semibold text-amber-300">Presupuesto</span>,{" "}
              <span className="font-semibold text-cyan-300">Cronograma</span>,{" "}
              <span className="font-semibold text-emerald-300">Moral</span> y{" "}
              <span className="font-semibold text-violet-300">Stakeholders</span>.
            </p>
          </div>
        </div>

        {/* Mode Selection Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-zinc-400">
            <span>SELECCIONA TU ESCENARIO DE OPERACIÓN</span>
            <span className="hidden sm:inline text-zinc-500">
              <ShieldAlert className="mr-1 inline h-3.5 w-3.5 text-amber-400" />
              CADA DECISIÓN TIENE CONSECUENCIAS IRREVERSIBLES
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Mode A: Private Sector */}
            <button
              type="button"
              onClick={() => onSelectMode("private")}
              className="comic-panel-amber group relative flex flex-col justify-between rounded-sm bg-zinc-900/95 p-6 text-left transition-transform duration-150 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-sm bg-amber-500/15 px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-amber-300 border border-amber-500/40">
                    <Building2 className="h-3.5 w-3.5" />
                    {privateMode.code}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    CAPEX: $500,000 USD
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  {privateMode.title}
                </h2>
                <p className="mt-1 font-mono text-xs text-amber-400/90">
                  {privateMode.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {privateMode.focus}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4 font-mono text-xs font-semibold uppercase tracking-wider text-amber-300">
                <span>Iniciar Operación Privada</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            {/* Mode B: Public Sector */}
            <button
              type="button"
              onClick={() => onSelectMode("public")}
              className="comic-panel-cyan group relative flex flex-col justify-between rounded-sm bg-zinc-900/95 p-6 text-left transition-transform duration-150 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-sm bg-cyan-500/15 px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-cyan-300 border border-cyan-500/40">
                    <Landmark className="h-3.5 w-3.5" />
                    {publicMode.code}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    FONDO: $1,200,000 USD
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {publicMode.title}
                </h2>
                <p className="mt-1 font-mono text-xs text-cyan-400/90">
                  {publicMode.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {publicMode.focus}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4 font-mono text-xs font-semibold uppercase tracking-wider text-cyan-300">
                <span>Iniciar Operación Pública</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
