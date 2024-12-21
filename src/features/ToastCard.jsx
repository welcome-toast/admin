import PropTypes from "prop-types";

import { useState } from "react";
import Button from "../shared/Button";
import { supabase } from "../shared/supabase";
import ToastCardEditor from "./ToastCardEditor";

function ToastCard({ toastSaved, isToastSavedRef, sendToastInput, projectId }) {
  const [toast, setToast] = useState(toastSaved);

  async function handleSaveToastButtonClick() {
    if (!isToastSavedRef.current) {
      const { data: resultToastList, error } = await supabase
        .from("toast")
        .insert([
          {
            name: toast.name,
            target_element_id: toast.target_element_id,
            message_title: toast.message_title,
            message_body: toast.message_body,
            image_url: toast.image_url,
            message_button_color: toast.message_button_color,
            background_opacity: toast.background_opacity,
            project_id: projectId,
          },
        ])
        .select();

      if (resultToastList.length === 0) {
        throw new Error(error.message);
      }

      setToast(resultToastList[0]);
      isToastSavedRef.current = true;

      alert("토스트가 저장 되었어요.");
    } else {
      const { data: resultToastList, error } = await supabase
        .from("toast")
        .update({
          name: toast.name,
          target_element_id: toast.target_element_id,
          message_title: toast.message_title,
          message_body: toast.message_body,
          image_url: toast.image_url,
          message_button_color: toast.message_button_color,
          background_opacity: toast.background_opacity,
        })
        .eq("id", toast.id)
        .select();

      if (resultToastList.length === 0) {
        throw new Error(error.message);
      }

      setToast(resultToastList[0]);
      isToastSavedRef.current = true;

      alert("토스트가 저장 되었어요.");
    }

    return;
  }

  return (
    <div className="flex flex-col gap-5 rounded border-2 border-black px-5">
      <ToastCardEditor
        toast={toast}
        setToast={setToast}
        isToastSavedRef={isToastSavedRef}
        sendToastInput={sendToastInput}
      />
      <div className="mb-5">
        <Button text={"저장"} onClick={handleSaveToastButtonClick} />
      </div>
    </div>
  );
}

export default ToastCard;

ToastCard.propTypes = {
  toastSaved: PropTypes.shape({
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
  isToastSavedRef: PropTypes.object.isRequired,
  sendToastInput: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
};
