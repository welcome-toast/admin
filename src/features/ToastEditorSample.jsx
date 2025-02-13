import PropTypes from "prop-types";
import { useState } from "react";
import Button from "../shared/Button";
import { supabase } from "../shared/supabase";

function ToastEditorSample({ toast, setToastList, sendToastInput, setToastShown }) {
  const [toastInput, setToastInput] = useState(() => toast);
  let debounceTimerId;

  function handleToastInputChange(toastType, input, debounce) {
    setToastInput((prev) => ({ ...prev, [toastType]: input }));

    if (debounce) {
      clearTimeout(debounceTimerId);
      debounceTimerId = setTimeout(() => {
        sendToastInput({ ...toastInput, [toastType]: input });
      }, 500);
      return;
    }

    sendToastInput({ ...toastInput, [toastType]: input });
  }

  function handleToastImageUpload(event) {
    event.preventDefault();

    setToastShown((prev) => ({ ...prev, isRedirect: true }));
    setTimeout(() => setToastShown((prev) => ({ ...prev, isRedirect: false })), 2000);
  }

  async function handleSaveToastButtonClick() {
    if (toastInput.id === "") {
      return;
    }

    const { data: resultToastList, error } = await supabase
      .from("toast_sample")
      .update(toastInput)
      .eq("id", toastInput.id)
      .select();

    if (resultToastList.length === 0) {
      throw new Error(error.message);
    }

    setToastList((prev) =>
      prev.map((toast) => (toast.id === toastInput.id ? resultToastList[0] : toast)),
    );

    setToastShown((prev) => ({ ...prev, isToastSaved: true }));
    setTimeout(() => setToastShown((prev) => ({ ...prev, isToastSaved: false })), 2000);
  }

  return (
    <div className="px-1 md:px-3">
      <div className="mb-3 flex flex-col divide-y-2">
        <span className="mt-3 font-bold text-base text-gray-900 md:text-xl">토스트 편집</span>
        <label className="my-3 flex flex-col gap-5">
          <span className="mt-5 font-bold text-base md:text-lg">토스트 이름</span>
          <input
            type="text"
            id="actionName"
            name="actionName"
            value={toastInput.name}
            placeholder="토스트 이름을 입력하세요"
            className="h-10 rounded border border-solid bg-gray-50 px-2 text-sm"
            onChange={(e) => handleToastInputChange("name", e.target.value)}
          />
        </label>
      </div>
      <div className="mb-5 flex flex-col gap-3">
        <span className="font-bold text-base md:text-lg">메시지</span>
        <label className="flex flex-col">
          <input
            type="text"
            id="toastMessageTitle"
            name="toastMessageTitle"
            value={toastInput.message_title}
            placeholder="제목을 입력하세요"
            className="h-10 rounded border border-solid bg-gray-50 px-2 text-sm"
            onChange={(e) => handleToastInputChange("message_title", e.target.value)}
          />
        </label>
        <label className="flex h-32 flex-col">
          <textarea
            rows="4"
            id="toastMessageBody"
            placeholder="본문을 입력하세요"
            value={toastInput.message_body}
            className="block h-full w-full resize-none rounded border bg-gray-50 p-2.5 text-gray-900 text-sm"
            onChange={(e) => handleToastInputChange("message_body", e.target.value)}
          />
        </label>
      </div>
      <div className="my-8 flex flex-col">
        <div className="flex justify-between">
          <span className="font-bold text-base md:text-lg">선택된 타겟 요소 ID</span>
          <span className="font-semibold text-base">{toastInput.target_element_id}</span>
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
            className="h-10 rounded border bg-gray-50 px-2 text-sm"
            onChange={(e) => handleToastInputChange("target_element_id", e.target.value)}
          />
        </label>
      </div>
      <div className="my-8 flex flex-col gap-3">
        <span className="font-bold text-base md:text-lg">이미지</span>
        <label htmlFor="upload" className="flex flex-col">
          <input
            type="file"
            id="toastMessageImage"
            name="toastMessageImage"
            accept="image/png, image/jpeg"
            className="block w-full text-base text-slate-500 file:mr-4 file:rounded file:border file:border-gray-500 file:bg-gray-50 file:px-4 file:py-2 file:font-semibold file:text-base file:text-gray-700 hover:file:bg-gray-200"
            onClick={handleToastImageUpload}
          />
        </label>
      </div>
      <div className="mt-10 flex flex-col">
        <div className="flex justify-between">
          <span className="font-bold text-base md:text-lg">배경 투명도</span>
          <input
            type="number"
            id="toastBackgroundOpacityNumber"
            name="toastBackgroundOpacityNumber"
            value={toastInput.background_opacity}
            className="w-16 rounded border bg-gray-50 px-2 py-1"
            onChange={(e) =>
              handleToastInputChange("background_opacity", e.target.value, "debounce")
            }
          />
        </div>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="range"
            id="toastBackgroundOpacityRange"
            name="toastBackgroundOpacityRange"
            value={toastInput.background_opacity}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
            onChange={(e) => handleToastInputChange("background_opacity", e.target.value)}
          />
        </label>
      </div>
      <div className="my-5 flex">
        <Button text={"저장"} onClick={handleSaveToastButtonClick} />
      </div>
    </div>
  );
}

export default ToastEditorSample;

ToastEditorSample.propTypes = {
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
  sendToastInput: PropTypes.func.isRequired,
  setToastShown: PropTypes.func.isRequired,
};
