import { LeaderboardEntry } from "@/domain/types";

const PARTICIPANT_KEY = "chrono_pmi_participant_v1";
const WORKSHOP_CODE_KEY = "chrono_pmi_workshop_code_v1";
const LEADERBOARD_KEY = "chrono_pmi_leaderboard_v1";

const RAW_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_URL = RAW_SUPABASE_URL.trim()
  .replace(/\/+$/, "")
  .replace(/\/rest\/v1$/i, "");
const SUPABASE_ANON_KEY = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export function loadParticipantName(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(PARTICIPANT_KEY) ?? "";
  } catch {
    return "";
  }
}

export function saveParticipantName(name: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PARTICIPANT_KEY, name.trim());
  } catch {
    // Ignore storage errors
  }
}

export function loadWorkshopCode(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(WORKSHOP_CODE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function saveWorkshopCode(code: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(WORKSHOP_CODE_KEY, code.trim().toUpperCase());
  } catch {
    // Ignore storage errors
  }
}

export function loadLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as LeaderboardEntry[]) : [];
  } catch {
    return [];
  }
}

function saveLocalLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  const sorted = [...entries]
    .sort((a, b) => b.simulationScore - a.simulationScore)
    .slice(0, 100);

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(sorted));
    } catch {
      // Ignore storage errors
    }
  }
  return sorted;
}

export function upsertLeaderboardEntry(entry: LeaderboardEntry): LeaderboardEntry[] {
  const existing = loadLeaderboard();
  const idx = existing.findIndex((e) => e.id === entry.id);
  const updated =
    idx >= 0
      ? existing.map((e, i) => (i === idx ? entry : e))
      : [entry, ...existing];

  const sorted = saveLocalLeaderboard(updated);

  // Fire-and-forget Supabase sync with Graceful Degradation
  if (isSupabaseConfigured()) {
    void syncEntryToSupabase(entry);
  }

  return sorted;
}

export async function fetchRemoteLeaderboard(
  workshopCode?: string
): Promise<LeaderboardEntry[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const filter = workshopCode?.trim()
      ? `&workshop_code=eq.${encodeURIComponent(workshopCode.trim().toUpperCase())}`
      : "";
    const url = `${SUPABASE_URL}/rest/v1/chrono_pmi_results?select=id,participant_name,workshop_code,mode,level,status,simulation_score,grade,pre_test_score,pre_test_level,post_test_score,gaps_detected,gaps_closed,total_gaps,indicators,played_at&order=simulation_score.desc&limit=100${filter}`;
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });
    if (!res.ok) return null;
    const rows = (await res.json()) as Array<{
      id: string;
      participant_name: string;
      workshop_code: string;
      mode: "private" | "public";
      level?: 1 | 2 | 3;
      status: "victory" | "gameover";
      simulation_score: number;
      grade: "S" | "A" | "B" | "C" | "F";
      pre_test_score: number | null;
      pre_test_level: "Inicial" | "Intermedio" | "Avanzado" | null;
      post_test_score: number | null;
      gaps_detected: LeaderboardEntry["gapsDetected"];
      gaps_closed: number | null;
      total_gaps: number | null;
      indicators: LeaderboardEntry["indicators"];
      played_at: string;
    }>;
    return rows.map((r) => ({
      id: r.id,
      participantName: r.participant_name,
      workshopCode: r.workshop_code ?? "",
      mode: r.mode,
      level: r.level ?? 1,
      status: r.status,
      simulationScore: r.simulation_score,
      grade: r.grade,
      preTestScore: r.pre_test_score,
      preTestLevel: r.pre_test_level,
      postTestScore: r.post_test_score,
      gapsDetected: Array.isArray(r.gaps_detected) ? r.gaps_detected : [],
      gapsClosed: r.gaps_closed,
      totalGaps: r.total_gaps,
      indicators: r.indicators,
      playedAt: r.played_at,
    }));
  } catch {
    return null;
  }
}

async function syncEntryToSupabase(entry: LeaderboardEntry): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/chrono_pmi_results?on_conflict=id`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        id: entry.id,
        participant_name: entry.participantName,
        workshop_code: entry.workshopCode,
        mode: entry.mode,
        level: entry.level,
        status: entry.status,
        simulation_score: entry.simulationScore,
        grade: entry.grade,
        pre_test_score: entry.preTestScore,
        pre_test_level: entry.preTestLevel,
        post_test_score: entry.postTestScore,
        gaps_detected: entry.gapsDetected,
        gaps_closed: entry.gapsClosed,
        total_gaps: entry.totalGaps,
        indicators: entry.indicators,
        played_at: entry.playedAt,
      }),
    });
  } catch {
    // Graceful degradation: local storage already persisted the entry
  }
}

export function clearLeaderboard(): LeaderboardEntry[] {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(LEADERBOARD_KEY);
    } catch {
      // Ignore
    }
  }
  return [];
}

export function exportLeaderboardCsv(
  entries: LeaderboardEntry[],
  workshopCode?: string
): void {
  if (typeof window === "undefined" || entries.length === 0) return;

  const headers = [
    "Participante",
    "Taller",
    "Sector",
    "Estado",
    "Puntuacion_Simulacion",
    "Rango",
    "PreTest_10",
    "Nivel_Inicial",
    "PostTest_10",
    "Brechas_Cerradas",
    "Total_Brechas",
    "Presupuesto_Pct",
    "Cronograma_Pct",
    "Moral_Pct",
    "Stakeholders_Pct",
    "Fecha",
  ];

  const escapeCsv = (val: string | number | null | undefined) => {
    const str = String(val ?? "");
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = entries.map((e) =>
    [
      e.participantName,
      e.workshopCode || "GENERAL",
      e.mode === "private" ? "Privado" : "Publico",
      e.status,
      e.simulationScore,
      e.grade,
      e.preTestScore ?? "",
      e.preTestLevel ?? "",
      e.postTestScore ?? "",
      e.gapsClosed ?? "",
      e.totalGaps ?? "",
      e.indicators.budget,
      e.indicators.schedule,
      e.indicators.morale,
      e.indicators.stakeholders,
      e.playedAt,
    ]
      .map(escapeCsv)
      .join(",")
  );

  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const tag = workshopCode?.trim() ? `_${workshopCode.trim().toUpperCase()}` : "";
  link.href = url;
  link.download = `chrono_pmi_resultados${tag}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
