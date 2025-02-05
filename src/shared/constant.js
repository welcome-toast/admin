export const TITLE_HOME = "새로운 유저의 눈길을 끄는 방법";
export const CTA_SIGNIN = "🧑‍💻 코드 한 줄로 끝내기";
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
  "준비물은 배포된 웹사이트 하나면 충분해요. 궁금한 점은 언제든 오른쪽 하단 채널톡으로 문의 주세요!";

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
    title: "STEP 01. 새 프로젝트 만들기",
    description:
      "웹사이트를 프로젝트로 등록해주세요. 프로젝트를 만들면 연동 스크립트 코드가 생성돼요. 스크립트는 프로젝트마다 고유의 key를 포함하고 있는 점을 참고해주세요.",
  },
  {
    index: 1,
    title: "STEP 02. 웰컴 토스트와 연동하기",
    description:
      "스크립트 코드를 웹사이트 HTML 코드에 붙여넣고 배포해주세요. 스크립트는 생성된 프로젝트 카드의 오른 쪽 ⋮ 클릭 후 확인할 수 있어요.",
  },
  {
    index: 2,
    title: "STEP 03. Element id 설정하기",
    description:
      "웹사이트 엘리먼트 ID의 속성 값을 설정했다면, 프로젝트 카드를 눌러 편집을 시작하세요! 웰컴 토스트는 ID 값을 탐색해서 해당 요소에 알맞는 토스트 메시지를 적용해요.",
  },
];
