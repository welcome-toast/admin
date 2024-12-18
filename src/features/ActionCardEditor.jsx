import PropTypes from "prop-types";
import { supabase } from "../shared/supabase";
// import { useRef } from "react";

function ActionCardEditor({ action, setAction, isActionSavedRef, sendActionInfo }) {
  // const actionImageRef = useRef(null);
  // const file = document.getElementById("actionImage")?.files[0];
  // console.dir("#file", file);
  // console.log("#file", file);

  function handleActionChange(actionType, input) {
    setAction((state) => ({ ...state, [actionType]: input }));

    if (isActionSavedRef.current) {
      sendActionInfo({ ...action, [actionType]: input });
    }
    return;
  }

  async function handleImage(files) {
    const uploadFile = files[0];

    const { data, error } = await supabase.storage
      .from("action_image")
      .upload(uploadFile.name, uploadFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log("파일이 업로드 되지 않았습니다", error);
      return;
    }
  }

  return (
    <div className="mt-5">
      <div className="mb-3 flex flex-col">
        <span className="font-bold text-gray-900 text-l">액션 이름</span>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="text"
            id="actionName"
            name="actionName"
            value={action.name}
            placeholder="액션 이름을 입력하세요"
            className="h-10 border-2 border-solid"
            onChange={(e) => handleActionChange("name", e.target.value)}
          />
        </label>
      </div>
      <div className="mb-5 flex flex-col">
        <span className="font-bold text-gray-900 text-l">적용할 요소 ID</span>
        <label className="my-2 flex flex-col gap-2">
          <span className="font-normal text-gray-400 italic">
            액션을 적용할 요소의 id를 입력하세요
          </span>
          <input
            type="text"
            id="actionTargetElementId"
            name="actionTargetElementId"
            value={action.target_element_id}
            placeholder="(예시) welcomeToast"
            className="h-10 border-2 border-solid"
            onChange={(e) => handleActionChange("target_element_id", e.target.value)}
          />
        </label>
      </div>
      <div className="flex h-10 justify-center rounded border-1 border-solid">
        <button
          type="button"
          className="h-full w-full rounded border-2 border-gray bg-black text-white"
        >
          콘텐츠
        </button>
        <button type="button" className="h-full w-full rounded border-2 border-gray">
          스타일
        </button>
      </div>
      <div className="my-3 flex flex-col">
        <span>메시지</span>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="text"
            id="actionMessageTitle"
            name="actionMessageTitle"
            value={action.message_title}
            placeholder="제목을 입력하세요"
            className="h-10 border-2 border-solid"
            onChange={(e) => handleActionChange("message_title", e.target.value)}
          />
        </label>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="text"
            id="actionMessageBody"
            name="actionMessageBody"
            value={action.message_body}
            placeholder="본문을 입력하세요"
            className="h-10 border-2 border-solid"
            onChange={(e) => handleActionChange("message_body", e.target.value)}
          />
        </label>
      </div>
      <div className="my-3 flex flex-col">
        <span>이미지</span>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="file"
            id="actionImage"
            name="actionImage"
            accept="image/png, image/jpeg"
            onChange={(e) => handleImage(e.target.files)}
          />
        </label>
      </div>
      {/* {actionImageRef.files[0]} */}
      <div className="my-3 flex flex-col">
        <span>배경 투명도</span>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="range"
            id="actionBackgroundOpacity"
            name="actionBackgroundOpacity"
            value={action.background_opacity}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
            onChange={(e) => handleActionChange("background_opacity", e.target.value)}
          />
        </label>
      </div>
      <div className="my-3 flex justify-between">
        <span>메시지 버튼 색상</span>
        <label>
          <input
            type="color"
            id="actionMessageButtonColor"
            name="actionMessageButtonColor"
            value={action.message_button_color}
            className="w-24"
            onChange={(e) => handleActionChange("message_button_color", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default ActionCardEditor;

ActionCardEditor.propTypes = {
  action: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    target_element_id: PropTypes.string,
    message_title: PropTypes.string,
    message_body: PropTypes.string,
    message_button_color: PropTypes.string,
    background_opacity: PropTypes.string,
    project_id: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  setAction: PropTypes.func.isRequired,
  isActionSavedRef: PropTypes.object.isRequired,
  sendActionInfo: PropTypes.func.isRequired,
};
