import { createContext, useContext } from "react";

import type { AmplitudeContextType, PageType } from "@/types/amplitude";

export interface AmplitudeEvent {
  title: PageType;
  path: string;
  url: string;
  timestamp: string;
}

export const AmplitudeContext = createContext<AmplitudeContextType | null>(null);

export const useAmplitude = () => {
  const context = useContext(AmplitudeContext);
  if (!context) {
    throw new Error("useAmplitude must be used within AmplitudeProvider");
  }
  return context;
};
