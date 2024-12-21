import PropTypes from "prop-types";
import { supabase } from "../shared/supabase";

function ToastCardEditor({ toast, setToast, sendToastInput }) {
  function handleToastInputChange(toastType, input) {
    setToast((state) => ({ ...state, [toastType]: input }));
    sendToastInput({ ...toast, [toastType]: input });
    return;
  }

  async function handleToastImageUpload(files) {
    const uploadImage = files[0];

    const { data, error } = await supabase.storage
      .from("toast_image_storage")
      .upload(uploadImage.name, uploadImage, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log("파일이 업로드 되지 않았습니다", error);
      return;
    }

    const imageUrl = supabase.storage.from("toast_image_storage").getPublicUrl(data.path)
      .data.publicUrl;
    setToast((state) => ({ ...state, image_url: imageUrl }));
    sendToastInput({ ...toast, image_url: imageUrl });

    return;
  }

  return (
    <div className="mt-5">
      <div className="mb-3 flex flex-col">
        <span className="font-bold text-gray-900 text-l">토스트 이름</span>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="text"
            id="toastName"
            name="toastName"
            value={toast.name}
            placeholder="토스트 이름을 입력하세요"
            className="h-10 border-2 border-solid"
            onChange={(e) => handleToastInputChange("name", e.target.value)}
          />
        </label>
      </div>
      <div className="mb-5 flex flex-col">
        <span className="font-bold text-gray-900 text-l">적용할 요소 ID</span>
        <label className="my-2 flex flex-col gap-2">
          <span className="font-normal text-gray-400 italic">
            토스트로 강조할 요소의 id를 입력하세요
          </span>
          <div className="flex justify-between">
            <span className="font-bold text-l">현재 선택된 타겟 ID</span>
            {toast.target_element_id === null ? "null" : toast.target_element_id}
          </div>
          <input
            type="text"
            id="toastTargetElementId"
            name="toastTargetElementId"
            value={toast.target_element_id}
            placeholder="(예시) welcomeToast"
            className="h-10 border-2 border-solid"
            onChange={(e) => handleToastInputChange("target_element_id", e.target.value)}
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
            id="toastMessageTitle"
            name="toastMessageTitle"
            value={toast.message_title}
            placeholder="제목을 입력하세요"
            className="h-10 border-2 border-solid"
            onChange={(e) => handleToastInputChange("message_title", e.target.value)}
          />
        </label>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="text"
            id="toastMessageBody"
            name="toastMessageBody"
            value={toast.message_body}
            placeholder="본문을 입력하세요"
            className="h-10 border-2 border-solid"
            onChange={(e) => handleToastInputChange("message_body", e.target.value)}
          />
        </label>
      </div>
      <div className="my-3 flex flex-col">
        <span>이미지</span>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="file"
            id="toastMessageImage"
            name="toastMessageImage"
            accept="image/png, image/jpeg"
            onChange={(e) => handleToastImageUpload(e.target.files)}
          />
        </label>
      </div>
      <div className="my-3 flex flex-col">
        <span>배경 투명도</span>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="range"
            id="toastBackgroundOpacity"
            name="toastBackgroundOpacity"
            value={toast.background_opacity}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
            onChange={(e) => handleToastInputChange("background_opacity", e.target.value)}
          />
        </label>
      </div>
      <div className="my-3 flex justify-between">
        <span>메시지 버튼 색상</span>
        <label>
          <input
            type="color"
            id="toastMessageButtonColor"
            name="toastMessageButtonColor"
            value={toast.message_button_color}
            className="w-24"
            onChange={(e) => handleToastInputChange("message_button_color", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default ToastCardEditor;

ToastCardEditor.propTypes = {
  toast: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    target_element_id: PropTypes.string,
    message_title: PropTypes.string,
    message_body: PropTypes.string,
    message_button_color: PropTypes.string,
    image_url: PropTypes.string,
    background_opacity: PropTypes.string,
    project_id: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  setToast: PropTypes.func.isRequired,
  sendToastInput: PropTypes.func.isRequired,
};
