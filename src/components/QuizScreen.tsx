"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { POST_TEST_QUESTIONS, PRE_TEST_QUESTIONS } from "@/domain/quiz";
import { ProjectMode, QuizResult } from "@/domain/types";

interface QuizScreenProps {
  phase: "pre" | "post";
  mode: ProjectMode;
  participantName: string;
  preTestResult: QuizResult | null;
  currentResult: QuizResult | null;
  onSubmitQuiz: (selectedIndices: number[]) => void;
  onContinue: () => void;
}

export function QuizScreen({
  phase,
  mode,
  participantName,
  preTestResult,
  currentResult,
  onSubmitQuiz,
  onContinue,
}: QuizScreenProps) {
  const questions = phase === "pre" ? PRE_TEST_QUESTIONS : POST_TEST_QUESTIONS;
  const [answers, setAnswers] = useState<number[]>(() =>
    Array(questions.length).fill(-1)
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const isPrivate = mode === "private";
  const accentText = isPrivate ? "text-amber-400" : "text-cyan-400";
  const accentBorder = isPrivate ? "border-amber-400" : "border-cyan-400";
  const accentBg = isPrivate
    ? "bg-amber-400 text-zinc-950 hover:bg-amber-300"
    : "bg-cyan-400 text-zinc-950 hover:bg-cyan-300";

  const answeredCount = answers.filter((a) => a >= 0).length;
  const allAnswered = answeredCount === questions.length;
  const currentQuestion = questions[activeIndex];

  const handleSelectOption = (optIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[activeIndex] = optIndex;
      return next;
    });
  };

  if (currentResult) {
    const preScore = preTestResult?.score ?? null;
    const postScore = currentResult.score;
    const improvementPct =
      phase === "post" && preScore !== null
        ? Math.round(((postScore - preScore) / questions.length) * 100)
        : null;

    return (
      <div className="min-h-screen tactical-grid px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="comic-panel rounded-sm bg-zinc-950 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <p className={`font-mono text-xs font-bold uppercase tracking-widest ${accentText}`}>
                  {phase === "pre"
                    ? "DIAGNÓSTICO PREVIO COMPLETADO // PMBOK® v8"
                    : "TEST DE SALIDA COMPLETADO // COMPARATIVA DE BRECHAS"}
                </p>
                <h1 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                  Participante: {participantName || "Comandante"}
                </h1>
              </div>
              <div className={`rounded-sm border-2 ${accentBorder} bg-zinc-900 px-4 py-2 text-right`}>
                <p className="font-mono text-[10px] uppercase text-zinc-400">
                  Calificación
                </p>
                <p className="font-mono text-2xl font-black text-white">
                  {currentResult.score} / {currentResult.total}
                </p>
              </div>
            </div>

            {/* Level & Comparison */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-4">
                <p className="font-mono text-[11px] uppercase text-zinc-400">
                  Nivel Ubicado
                </p>
                <p className={`mt-1 font-mono text-xl font-black ${accentText}`}>
                  {currentResult.level}
                </p>
              </div>

              <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-4">
                <p className="font-mono text-[11px] uppercase text-zinc-400">
                  {phase === "pre" ? "Brechas Detectadas" : "Comparativa Pre vs Post"}
                </p>
                {phase === "pre" ? (
                  <p className="mt-1 font-mono text-xl font-black text-white">
                    {currentResult.gaps.length} Dominios
                  </p>
                ) : (
                  <p className="mt-1 font-mono text-xl font-black text-white">
                    {preScore !== null ? `${preScore}/10 → ${postScore}/10` : `${postScore}/10`}
                    {improvementPct !== null && (
                      <span
                        className={`ml-2 text-sm ${
                          improvementPct >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        ({improvementPct >= 0 ? `+${improvementPct}%` : `${improvementPct}%`})
                      </span>
                    )}
                  </p>
                )}
              </div>

              <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-4">
                <p className="font-mono text-[11px] uppercase text-zinc-400">
                  Objetivo Táctico
                </p>
                <p className="mt-1 text-xs leading-snug text-zinc-200">
                  {phase === "pre"
                    ? "Los casos de tus brechas aparecerán marcados durante la simulación."
                    : "Evalúa cuántas brechas iniciales lograste cerrar tras simular."}
                </p>
              </div>
            </div>

            {/* Gaps Status */}
            {phase === "pre" && (
              <div className="mt-5 rounded-sm border border-zinc-800 bg-zinc-900/70 p-4">
                <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
                  <Target className="h-4 w-4" />
                  Mapa de Brechas a Cerrar en la Simulación
                </h2>
                {currentResult.gaps.length === 0 ? (
                  <p className="mt-2 text-sm text-emerald-300">
                    ¡Excelente base! No se detectaron brechas iniciales. Pon a prueba tu criterio bajo presión táctica.
                  </p>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {currentResult.gaps.map((gap) => (
                      <span
                        key={gap}
                        className="rounded-sm border border-amber-500/40 bg-amber-500/15 px-2.5 py-1 font-mono text-xs font-semibold text-amber-200"
                      >
                        🎯 {gap}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {phase === "post" && preTestResult && (
              <div className="mt-5 rounded-sm border border-zinc-800 bg-zinc-900/70 p-4">
                <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <TrendingUp className="h-4 w-4" />
                  Cierre de Brechas (Pre-Test → Post-Test)
                </h2>
                {preTestResult.gaps.length === 0 ? (
                  <p className="mt-2 text-sm text-zinc-200">
                    No tenías brechas previas; mantuviste un puntaje de {postScore}/10 en salida.
                  </p>
                ) : (
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {preTestResult.gaps.map((gap) => {
                      const closed = currentResult.answers.find(
                        (a) => a.domain === gap
                      )?.correct;
                      return (
                        <div
                          key={gap}
                          className={`flex items-center justify-between rounded-sm border px-3 py-2 font-mono text-xs ${
                            closed
                              ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-200"
                              : "border-amber-500/40 bg-amber-950/30 text-amber-200"
                          }`}
                        >
                          <span>{gap}</span>
                          <span className="font-bold">
                            {closed ? "✅ CERRADA" : "⚠️ REFORZAR"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Question Review */}
            <div className="mt-5 space-y-2.5">
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                Retroalimentación Técnica (Pablo Lledó v8.0 / PMBOK® 8)
              </h2>
              <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const ans = currentResult.answers[idx];
                  const ok = ans?.correct;
                  return (
                    <div
                      key={q.id}
                      className="rounded-sm border border-zinc-800 bg-zinc-900 p-3 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono font-bold text-zinc-300">
                          {idx + 1}. [{q.domain}]
                        </span>
                        {ok ? (
                          <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Correcta
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-mono font-bold text-red-400">
                            <XCircle className="h-3.5 w-3.5" /> Brecha
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-semibold text-white">{q.question}</p>
                      <p className="mt-1 text-zinc-300">{q.explanation}</p>
                      <p className="mt-1 font-mono text-[10px] text-zinc-400">
                        Ref: {q.bookRef}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onContinue}
                className={`inline-flex items-center gap-2 rounded-sm border-2 border-black px-6 py-3 font-mono text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_#000] transition-colors cursor-pointer ${accentBg}`}
              >
                <span>
                  {phase === "pre"
                    ? "Iniciar Simulación Táctica (8 Rondas)"
                    : "Volver al Informe Final"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen tactical-grid px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3 font-mono text-xs uppercase tracking-widest text-zinc-400">
          <span className={`flex items-center gap-2 font-bold ${accentText}`}>
            <ClipboardCheck className="h-4 w-4" />
            {phase === "pre"
              ? "MÓDULO 1 // VALIDACIÓN DE CONOCIMIENTO PREVIO"
              : "MÓDULO FINAL // TEST DE SALIDA PMBOK® v8"}
          </span>
          <span>
            PREGUNTA {String(activeIndex + 1).padStart(2, "0")} / 10
          </span>
        </div>

        <div className="comic-panel rounded-sm bg-zinc-950 p-6 sm:p-8">
          {/* Progress dots */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {questions.map((q, idx) => {
              const isCurrent = idx === activeIndex;
              const isAnswered = answers[idx] >= 0;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-7 w-8 rounded-sm border font-mono text-xs font-bold transition-colors cursor-pointer ${
                    isCurrent
                      ? `${accentBorder} bg-zinc-800 text-white`
                      : isAnswered
                        ? "border-emerald-500/50 bg-emerald-950/40 text-emerald-300"
                        : "border-zinc-800 bg-zinc-900 text-zinc-500"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="inline-flex items-center gap-2 rounded-sm border border-zinc-700 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] font-bold uppercase text-zinc-300">
            <BookOpen className="h-3.5 w-3.5 text-amber-400" />
            Dominio: {currentQuestion.domain}
          </div>

          <h2 className="mt-3 text-lg font-extrabold leading-snug text-white sm:text-xl">
            {currentQuestion.question}
          </h2>

          <div className="mt-5 space-y-2.5">
            {currentQuestion.options.map((opt, optIdx) => {
              const selected = answers[activeIndex] === optIdx;
              const letter = ["A", "B", "C", "D"][optIdx];
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`flex w-full items-start gap-3 rounded-sm border-2 p-3.5 text-left transition-all cursor-pointer ${
                    selected
                      ? `${accentBorder} bg-zinc-800/90 text-white`
                      : "border-zinc-800 bg-zinc-900/70 text-zinc-200 hover:border-zinc-600"
                  }`}
                >
                  <span
                    className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm font-mono text-xs font-black ${
                      selected
                        ? isPrivate
                          ? "bg-amber-400 text-zinc-950"
                          : "bg-cyan-400 text-zinc-950"
                        : "bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-sm leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4">
            <div className="flex gap-2">
              <button
                type="button"
                disabled={activeIndex === 0}
                onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                className="rounded-sm border border-zinc-700 bg-zinc-900 px-4 py-2 font-mono text-xs font-bold uppercase text-zinc-200 disabled:opacity-40 cursor-pointer"
              >
                Anterior
              </button>
              <button
                type="button"
                disabled={activeIndex === questions.length - 1}
                onClick={() =>
                  setActiveIndex((i) => Math.min(questions.length - 1, i + 1))
                }
                className="rounded-sm border border-zinc-700 bg-zinc-900 px-4 py-2 font-mono text-xs font-bold uppercase text-zinc-200 disabled:opacity-40 cursor-pointer"
              >
                Siguiente
              </button>
            </div>

            <button
              type="button"
              disabled={!allAnswered}
              onClick={() => onSubmitQuiz(answers)}
              className={`inline-flex items-center gap-2 rounded-sm border-2 border-black px-5 py-2.5 font-mono text-xs font-black uppercase tracking-wider transition-all ${
                allAnswered
                  ? `${accentBg} shadow-[3px_3px_0px_#000] cursor-pointer`
                  : "border-zinc-800 bg-zinc-900 text-zinc-500 cursor-not-allowed"
              }`}
            >
              <span>
                {allAnswered
                  ? "Evaluar Respuestas"
                  : `Responde todas (${answeredCount}/10)`}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
