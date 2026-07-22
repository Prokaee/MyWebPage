import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type {
  AppState,
  Beleg,
  Kontakt,
  Kontierung,
  ReceiptData,
  Rechnung,
  Theme,
} from "../types";
import { SEED_BELEGE, SEED_KONTAKTE, SEED_RECHNUNGEN } from "../data/seed";
import { loadState, saveState } from "./persistence";

type Action =
  | { type: "addBeleg"; beleg: Beleg }
  | { type: "updateBeleg"; beleg: Beleg }
  | { type: "addRechnung"; rechnung: Rechnung }
  | { type: "updateRechnung"; rechnung: Rechnung }
  | { type: "addKontakt"; kontakt: Kontakt }
  | { type: "setTheme"; theme: Theme }
  | { type: "setDraft"; draft: Beleg | null }
  | { type: "patchDraftData"; patch: Partial<ReceiptData> }
  | { type: "patchDraftKontierung"; patch: Partial<Kontierung> }
  | { type: "commitDraft" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "addBeleg":
      return { ...state, belege: [action.beleg, ...state.belege] };
    case "updateBeleg":
      return {
        ...state,
        belege: state.belege.map((b) => (b.id === action.beleg.id ? action.beleg : b)),
      };
    case "addRechnung":
      return { ...state, rechnungen: [action.rechnung, ...state.rechnungen] };
    case "updateRechnung":
      return {
        ...state,
        rechnungen: state.rechnungen.map((r) =>
          r.id === action.rechnung.id ? action.rechnung : r,
        ),
      };
    case "addKontakt":
      return { ...state, kontakte: [action.kontakt, ...state.kontakte] };
    case "setTheme":
      return { ...state, settings: { ...state.settings, theme: action.theme } };
    case "setDraft":
      return { ...state, draft: action.draft };
    case "patchDraftData":
      return state.draft
        ? { ...state, draft: { ...state.draft, data: { ...state.draft.data, ...action.patch } } }
        : state;
    case "patchDraftKontierung":
      return state.draft
        ? {
            ...state,
            draft: {
              ...state.draft,
              kontierung: { candidates: [], ...state.draft.kontierung, ...action.patch },
            },
          }
        : state;
    case "commitDraft": {
      if (!state.draft) return state;
      const gebucht: Beleg = { ...state.draft, status: "gebucht" };
      return { ...state, belege: [gebucht, ...state.belege], draft: null };
    }
    default:
      return state;
  }
}

function initialState(): AppState {
  const persisted = loadState();
  if (persisted) {
    return {
      belege: persisted.belege ?? SEED_BELEGE,
      rechnungen: persisted.rechnungen ?? SEED_RECHNUNGEN,
      kontakte: persisted.kontakte ?? SEED_KONTAKTE,
      settings: persisted.settings ?? { theme: "light" },
      draft: null,
    };
  }
  return {
    belege: SEED_BELEGE,
    rechnungen: SEED_RECHNUNGEN,
    kontakte: SEED_KONTAKTE,
    settings: { theme: "light" },
    draft: null,
  };
}

interface AppContextValue {
  state: AppState;
  addBeleg: (b: Beleg) => void;
  updateBeleg: (b: Beleg) => void;
  addRechnung: (r: Rechnung) => void;
  updateRechnung: (r: Rechnung) => void;
  addKontakt: (k: Kontakt) => void;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setDraft: (b: Beleg | null) => void;
  patchDraftData: (p: Partial<ReceiptData>) => void;
  patchDraftKontierung: (p: Partial<Kontierung>) => void;
  commitDraft: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  // Persistieren bei jeder Aenderung.
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Theme auf <html> spiegeln.
  useEffect(() => {
    document.documentElement.dataset.theme = state.settings.theme;
  }, [state.settings.theme]);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      addBeleg: (beleg) => dispatch({ type: "addBeleg", beleg }),
      updateBeleg: (beleg) => dispatch({ type: "updateBeleg", beleg }),
      addRechnung: (rechnung) => dispatch({ type: "addRechnung", rechnung }),
      updateRechnung: (rechnung) => dispatch({ type: "updateRechnung", rechnung }),
      addKontakt: (kontakt) => dispatch({ type: "addKontakt", kontakt }),
      setTheme: (theme) => dispatch({ type: "setTheme", theme }),
      toggleTheme: () =>
        dispatch({ type: "setTheme", theme: state.settings.theme === "dark" ? "light" : "dark" }),
      setDraft: (draft) => dispatch({ type: "setDraft", draft }),
      patchDraftData: (patch) => dispatch({ type: "patchDraftData", patch }),
      patchDraftKontierung: (patch) => dispatch({ type: "patchDraftKontierung", patch }),
      commitDraft: () => dispatch({ type: "commitDraft" }),
    }),
    [state],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppStoreProvider");
  return ctx;
}
