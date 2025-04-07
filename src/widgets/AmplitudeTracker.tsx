import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { trackEvent, trackPageView } from "@/shared/configs/amplitude";
import { AmplitudeContext } from "@/shared/contexts/AmplitudeContext";

export const AmplitudeProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const value = { trackPageView, trackEvent };

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return <AmplitudeContext.Provider value={value}>{children}</AmplitudeContext.Provider>;
};

export default AmplitudeProvider;
