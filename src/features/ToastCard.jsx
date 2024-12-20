import PropTypes from "prop-types";

import Button from "../shared/Button";
import { supabase } from "../shared/supabase";
import ToastCardEditor from "./ToastCardEditor";

function ToastCard({ projectId, toast, setToast, isToastSavedRef, sendToastInfo }) {
  async function handleSaveToastButtonClick() {
    if (!isToastSavedRef.current) {
      const { data, error } = await supabase
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

      if (!data) {
        throw new Error(error.message);
      }
      setToast(data[0]);
      isToastSavedRef.current = true;
      alert("토스트가 저장 되었어요.");
    } else {
      const { data, error } = await supabase
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

      if (!data) {
        throw new Error(error.message);
      }
      setToast(data[0]);
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
        sendToastInfo={sendToastInfo}
      />
      <div className="mb-5">
        <Button text={"저장"} onClick={handleSaveToastButtonClick} />
      </div>
    </div>
  );
}

export default ToastCard;

ToastCard.propTypes = {
  projectId: PropTypes.string.isRequired,
  toast: PropTypes.object.isRequired,
  setToast: PropTypes.func.isRequired,
  isToastSavedRef: PropTypes.object.isRequired,
  sendToastInfo: PropTypes.func.isRequired,
};
