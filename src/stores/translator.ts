import { create } from "zustand";
import createSelectors from "./createSelectors";

type State = {
  translator: Record<"vi" | "en", Record<string, string>> | null;
  locale: "vi" | "en";
};

type Action = {
  setTranslator: (
    translator: Record<"vi" | "en", Record<string, string>>
  ) => void;
  setLocale: (locale: "vi" | "en") => void;
};

const useTranslator = createSelectors(
  create<State & Action>((set) => ({
    translator: null,
    locale: "vi",
    setTranslator: (translator) => {
      set({ translator });
    },
    setLocale: (locale) => {
      set({ locale });
    },
  }))
);

export default useTranslator;
