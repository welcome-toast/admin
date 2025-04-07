import { createContext, useContext } from "react";

import type { AmplitudeContextType } from "@/types/amplitude";

const AmplitudeContext = createContext<AmplitudeContextType | null>(null);

const useAmplitude = () => {
  const context = useContext(AmplitudeContext);
  if (!context) {
    throw new Error("useAmplitude must be used within AmplitudeProvider");
  }
  return context;
};

export { AmplitudeContext, useAmplitude };
