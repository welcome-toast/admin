import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Button from "../shared/Button";
import { supabase } from "../shared/supabase";

function ToastCardEditor({ toast, setToastList, previewRef, project }) {
  const [toastInput, setToastInput] = useState(() => toast);

  function handleToastInputChange(toastType, input) {
    setToastInput((prev) => ({ ...prev, [toastType]: input }));
    sendToastInput({ ...toastInput, [toastType]: input });
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
    setToastInput((prev) => ({ ...prev, image_url: imageUrl }));
    sendToastInput({ ...toastInput, image_url: imageUrl });

    return;
  }

  async function handleSaveToastButtonClick() {
    if (toastInput.id === "") {
      const { data: resultToastList, error } = await supabase
        .from("toast")
        .insert([
          {
            name: toastInput.name,
            target_element_id: toastInput.target_element_id,
            message_title: toastInput.message_title,
            message_body: toastInput.message_body,
            image_url: toastInput.image_url,
            message_button_color: toastInput.message_button_color,
            background_opacity: toastInput.background_opacity,
            project_id: project.id,
          },
        ])
        .select();

      if (resultToastList.length === 0) {
        throw new Error(error.message);
      }

      setToastList((prev) =>
        prev.map((toast) => (toast.id === toastInput.id ? resultToastList[0] : toast)),
      );

      alert("토스트가 저장 되었어요.");
    } else {
      const { data: resultToastList, error } = await supabase
        .from("toast")
        .update({
          name: toastInput.name,
          target_element_id: toastInput.target_element_id,
          message_title: toastInput.message_title,
          message_body: toastInput.message_body,
          image_url: toastInput.image_url,
          message_button_color: toastInput.message_button_color,
          background_opacity: toastInput.background_opacity,
        })
        .eq("id", toastInput.id)
        .select();

      if (resultToastList.length === 0) {
        throw new Error(error.message);
      }

      setToastList((prev) =>
        prev.map((toast) => (toast.id === toastInput.id ? resultToastList[0] : toast)),
      );

      alert("토스트가 저장 되었어요.");
    }

    return;
  }

  function sendToastInput(toastInput) {
    const {
      name,
      type,
      target_element_id,
      message_title,
      message_body,
      image_url,
      message_button_color,
      background_opacity,
    } = toastInput;

    previewRef.current.contentWindow.postMessage(
      {
        name,
        type,
        target_element_id,
        message_title,
        message_body,
        image_url,
        message_button_color,
        background_opacity,
      },
      project.link,
    );
  }

  useEffect(() => {
    setToastInput(toast);
    return;
  }, [toast]);

  return (
    <div className="px-3">
      <div className="mb-3 flex flex-col">
        <span className="mt-3 font-bold text-gray-900 text-lg">토스트 편집</span>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="text"
            id="actionName"
            name="actionName"
            value={toastInput.name}
            placeholder="토스트 이름을 입력하세요"
            className="h-10 rounded-sm border-2 border-solid px-2 text-sm"
            onChange={(e) => handleToastInputChange("name", e.target.value)}
          />
        </label>
      </div>
      <div className="mb-5 flex flex-col">
        <div className="flex justify-between">
          <span className="font-bold text-base">선택된 타겟 요소 ID</span>
          {toastInput.target_element_id}
        </div>
        <label className="my-2 flex flex-col gap-2">
          <span className="font-normal text-gray-400 text-sm italic">
            강조할 부분을 클릭하거나 요소의 ID 속성값을 입력하세요
          </span>
          <input
            type="text"
            id="toastTargetElementId"
            name="toastTargetElementId"
            value={toastInput.target_element_id}
            placeholder="(예시) welcomeToast"
            className="h-10 rounded-sm border-2 border-solid px-2 text-sm"
            onChange={(e) => handleToastInputChange("target_element_id", e.target.value)}
          />
        </label>
      </div>
      <div className="my-3 flex flex-col gap-3">
        <span className="font-bold text-base">메시지</span>
        <label className="flex flex-col">
          <input
            type="text"
            id="toastMessageTitle"
            name="toastMessageTitle"
            value={toastInput.message_title}
            placeholder="제목을 입력하세요"
            className="h-10 rounded-sm border-2 border-solid px-2 text-sm"
            onChange={(e) => handleToastInputChange("message_title", e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <input
            type="text"
            id="toastMessageBody"
            name="toastMessageBody"
            value={toastInput.message_body}
            placeholder="본문을 입력하세요"
            className="h-32 rounded-sm border-2 border-solid px-2 text-sm"
            onChange={(e) => handleToastInputChange("message_body", e.target.value)}
          />
        </label>
      </div>
      <div className="my-5 flex flex-col">
        <span className="font-bold text-base">이미지</span>
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
        <span className="font-bold text-base">배경 투명도</span>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="range"
            id="toastBackgroundOpacity"
            name="toastBackgroundOpacity"
            value={toastInput.background_opacity}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
            onChange={(e) => handleToastInputChange("background_opacity", e.target.value)}
          />
        </label>
      </div>
      <div className="my-3 flex justify-between">
        <span className="font-bold text-base">메시지 버튼 색상</span>
        <label>
          <input
            type="color"
            id="toastMessageButtonColor"
            name="toastMessageButtonColor"
            value={toastInput.message_button_color}
            className="w-24"
            onChange={(e) => handleToastInputChange("message_button_color", e.target.value)}
          />
        </label>
      </div>
      <div className="my-10">
        <Button text={"저장"} onClick={handleSaveToastButtonClick} />
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
  setToastList: PropTypes.func.isRequired,
  previewRef: PropTypes.object,
  project: PropTypes.object.isRequired,
};
