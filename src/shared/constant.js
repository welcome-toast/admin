export const TITLE_HOME = "새로운 유저의 눈길을 끄는 방법";
export const CTA_SIGNIN = "🧑‍💻 코드 한 줄로 끝내기";
export const CTA_SIGNOUT = "로그아웃";
export const DESC_REDIRECT_API_KEY_ACCESS =
  "프로젝트의 API Key로 연동된 웹사이트만 확인할 수 있습니다. 연동 여부 혹은 프로젝트 목록에서 API Key를 확인해주세요.";
export const DESC_INSTALL_API_KEY =
  "토스트 메시지를 적용할 웹사이트 페이지의 </head> 태그 앞에 아래 JavaScript 코드 스니펫을 붙여넣어주세요.";
export const DESC_DELETE_PROJECT =
  "프로젝트를 삭제하면 해당 프로젝트의 토스트 메시지, 데이터도 함께 삭제됩니다. 프로젝트를 삭제할까요?";
export const INITIAL_PROJECT = [
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
    title: "🏠 STEP 01. 새 프로젝트 만들기",
    description: "프로젝트로 만들면 스크립트가 생성돼요.",
  },
  {
    index: 1,
    title: "👋 STEP 02. 웰컴 토스트와 웹사이트 연동하기",
    description: "프로젝트 카드의 오른 쪽 ⋮ 클릭 후 연동 스크립트를 확인하세요.",
  },
  {
    index: 2,
    title: "🎨 STEP 03. 엘리먼트 id 심기",
    description:
      "웰컴 토스트는 HTML 요소 ID 값이 있는 요소에 토스트 메시지가 적용돼요. ID를 심고 토스트 편집을 시작해주세요!",
  },
];
