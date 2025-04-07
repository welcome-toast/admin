import type { PAGE_TYPE } from "@/shared/constants/amplitude";

type PageType = (typeof PAGE_TYPE)[keyof typeof PAGE_TYPE];

interface AmplitudeEvent {
  title: PageType;
  path: string;
  url: string;
  timestamp: string;
}

interface AmplitudeContextType {
  trackPageView: (pathname: string) => Promise<void>;
}

interface AmplitudeOptions {
  autocapture?: {
    elementInteractions: boolean;
  };
}

interface AmplitudePlugin {
  name: string;
  type: string;
  setup: () => void;
}

export interface PageViewEvent {
  title: string;
  path: string;
  url: string;
  timestamp: string;
}

export type { PageType, AmplitudeEvent, AmplitudeContextType, AmplitudeOptions, AmplitudePlugin };
