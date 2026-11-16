import { LeaderboardEntry } from "@/domain/types";

const PARTICIPANT_KEY = "chrono_pmi_participant_v1";
const LEADERBOARD_KEY = "chrono_pmi_leaderboard_v1";

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
    // Ignore storage quota / private mode errors
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

export function upsertLeaderboardEntry(entry: LeaderboardEntry): LeaderboardEntry[] {
  const existing = loadLeaderboard();
  const idx = existing.findIndex((e) => e.id === entry.id);
  const updated =
    idx >= 0
      ? existing.map((e, i) => (i === idx ? entry : e))
      : [entry, ...existing];

  const sorted = [...updated]
    .sort((a, b) => b.simulationScore - a.simulationScore)
    .slice(0, 50);

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(sorted));
    } catch {
      // Ignore storage errors
    }
  }
  return sorted;
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
