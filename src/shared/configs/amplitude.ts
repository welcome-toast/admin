import { PAGE_TYPE } from "@/shared/constants/amplitude";
import type {
  AmplitudeContextType,
  AmplitudeEvent,
  AmplitudeOptions,
  AmplitudePlugin,
  PageType,
  PageViewEvent,
} from "@/types/amplitude";

declare global {
  interface Window {
    amplitude: {
      init: (apiKey: string, options?: AmplitudeOptions) => void;
      add: (plugin: AmplitudePlugin) => void;
      track: (eventName: string, eventData: Record<string, unknown>) => void;
    };
    sessionReplay: {
      plugin: (options: { sampleRate: number }) => AmplitudePlugin;
    };
  }
}

const getViewedPageType = (pathname: string): PageType => {
  const path = pathname.split("/").filter(Boolean);

  if (path.length === 0) {
    return PAGE_TYPE.HOME;
  }
  if (path[0] === "project") {
    return PAGE_TYPE.PROJECT_LIST;
  }
  if (path[0] === "toast") {
    return path[1] === "sample" ? PAGE_TYPE.SAMPLE_PROJECT : PAGE_TYPE.PROJECT_DETAIL;
  }
  return PAGE_TYPE.ERROR;
};

const trackEvent = async (eventName: string, eventData: Record<string, unknown>) => {
  if (process.env.NODE_ENV === "development") {
    window.amplitude?.track(eventName, eventData);
    return;
  }

  try {
    await fetch("/api/amplitude/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        eventData,
      }),
    });
  } catch (error) {
    console.error("Failed to track event:", error);
  }
};

const trackPageView = async (pathname: string) => {
  const event: PageViewEvent = {
    title: getViewedPageType(pathname),
    path: pathname,
    url: window.location.href,
    timestamp: new Date().toISOString(),
  };

  await trackEvent("viewed_page", { ...event });
};

export const initAmplitude = () => {
  window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }));
  window.amplitude.init(import.meta.env.VITE_AMPLITUDE_API_KEY, {
    autocapture: { elementInteractions: true },
  });
};

export type { PageType, AmplitudeEvent, AmplitudeContextType };
export { getViewedPageType, trackEvent, trackPageView };
