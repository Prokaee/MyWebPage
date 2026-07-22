import type { AppState } from "../types";

const KEY = "bk_state_v1";

/** Persistierter Teil des States (ohne fluechtigen Scan-Draft). */
type Persisted = Omit<AppState, "draft">;

export function loadState(): Persisted | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Persisted) : null;
  } catch {
    return null;
  }
}

export function saveState(state: AppState): void {
  try {
    const { draft: _draft, ...persisted } = state;
    localStorage.setItem(KEY, JSON.stringify(persisted));
  } catch {
    // localStorage nicht verfuegbar (z.B. privater Modus) -> still ignorieren
  }
}
