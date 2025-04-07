import type { Modal, User } from "@/types";
import type { Project } from "@/types/project";
import type { Toast, ToastInputError } from "@/types/toast";

export interface InstallGuideStep {
  index: number;
  title: string;
  description: string;
}

export const MAX_INPUT_LENGTH = 999;

export const TITLES = {
  HOME: "5분 만에 띄우는 토스트 메시지",
  DESC: "친절한 토스트 메시지로 사용자 온보딩 경험을 높여보세요!",
  INSTALL_GUIDE: "웰컴토스트 이용 가이드",
} as const;

export const CTAS = {
  SIGNIN: "🧑‍💻 로그인",
  SAMPLE: "🎨 토스트 에디터 체험하기",
  SIGNOUT: "로그아웃",
} as const;

export const DESCRIPTIONS = {
  REDIRECT_API_KEY_ACCESS:
    "프로젝트의 API Key로 연동된 웹사이트만 확인할 수 있습니다. 연동 여부 혹은 프로젝트 목록에서 API Key를 확인해주세요.",
  INSTALL_API_KEY:
    "토스트 메시지를 적용할 웹사이트 페이지의 </head> 태그 앞에 아래 JavaScript 코드 스니펫을 붙여넣어주세요.",
  DELETE_PROJECT:
    "프로젝트를 삭제하면 해당 프로젝트의 토스트 메시지, 데이터도 함께 삭제됩니다. 프로젝트를 삭제할까요?",
  INSTALL_GUIDE:
    "준비물은 배포된 웹사이트 하나면 충분해요. (💬 문의 : 오른쪽 하단 채널톡을 이용해주세요!)",
} as const;

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "",
    name: "",
    user_id: "",
    link: "",
    api_key: "",
    is_installed: false,
    created_at: "",
    updated_at: "",
  },
];

export const INITIAL_USER: User = {
  id: "",
  email: "",
  displayName: "",
  photoUrl: "",
  lastSignInAt: "",
};

export const INITIAL_TOAST: Toast = {
  id: "",
  name: "",
  type: "",
  message_title: "",
  message_body: "",
  target_element_id: "",
  image_url: "",
  background_opacity: 20,
  message_button_color: "#000000",
  project_id: "",
  updated_at: "",
};

export const INITIAL_ERROR_MESSAGE_TOAST_INPUT: ToastInputError = {
  name: "",
  message_title: "",
  message_body: "",
  target_element_id: "",
};

export const INITIAL_MODAL: Modal = {
  create: false,
  install: false,
  delete: false,
};

export const INSTALL_GUIDE_STEPS: InstallGuideStep[] = [
  {
    index: 0,
    title: "STEP 1. 새로운 프로젝트 만들기",
    description:
      "프로젝트를 만들고 웹사이트와 연동할 스크립트를 확인해요. (프로젝트 카드 ⋮ 클릭 후 확인)",
  },
  {
    index: 1,
    title: "STEP 2. 스크립트 연동, Element id 설정하기",
    description:
      "웹사이트에 스크립트 연동 후, 토스트 메시지 위치로 강조할 타겟 Element id를 설정해주세요.",
  },
  {
    index: 2,
    title: "STEP 3. 웹사이트 배포, 토스트 편집 시작하기",
    description: "웹사이트를 배포하면 모든 준비가 끝났어요. 토스트 에디터에서 편집을 시작하세요!",
  },
];
