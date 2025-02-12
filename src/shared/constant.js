export const TITLE_HOME = "5분 만에 띄우는 토스트 메시지";
export const TITLE_DESC = "사용자 온보딩을 돕거나 새로운 기능을 소개해보세요.";
export const CTA_SIGNIN = "🧑‍💻 로그인";
export const CTA_SAMPLE = "🎨 토스트 에디터 체험하기";
export const CTA_SIGNOUT = "로그아웃";
export const DESC_REDIRECT_API_KEY_ACCESS =
  "프로젝트의 API Key로 연동된 웹사이트만 확인할 수 있습니다. 연동 여부 혹은 프로젝트 목록에서 API Key를 확인해주세요.";
export const DESC_INSTALL_API_KEY =
  "토스트 메시지를 적용할 웹사이트 페이지의 </head> 태그 앞에 아래 JavaScript 코드 스니펫을 붙여넣어주세요.";
export const DESC_DELETE_PROJECT =
  "프로젝트를 삭제하면 해당 프로젝트의 토스트 메시지, 데이터도 함께 삭제됩니다. 프로젝트를 삭제할까요?";
export const INITIAL_PROJECTS = [
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
export const TITLE_INSTALL_GUIDE = "웰컴토스트 이용 가이드";
export const DESC_INSTALL_GUIDE =
  "준비물은 배포된 웹사이트 하나면 충분해요. (💬 문의 : 오른쪽 하단 채널톡을 이용해주세요!)";
export const INITIAL_USER = {
  id: "",
  email: "",
  displayName: "",
  photoUrl: "",
  lastSignInAt: "",
};
export const INITIAL_TOAST = {
  id: "",
  name: "",
  type: "",
  target_element_id: "",
  message_title: "",
  message_body: "",
  image_url: "",
  message_button_color: "#000000",
  background_opacity: "20",
  project_id: "",
  created_at: "",
  updated_at: "",
};
export const INITIAL_MODAL = {
  create: false,
  install: false,
  delete: false,
};
export const INSTALL_GUIDE_STEPS = [
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
