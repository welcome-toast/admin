import PropTypes from "prop-types";

import { useEffect } from "react";
import { supabase } from "../shared/supabase";
import ToastCard from "./ToastCard";

const initialToast = {
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

function ToastCardList({ project, toast, setToast, isToastSavedRef, previewRef }) {
  function sendToastInfo(toastInput) {
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
    async function getToastList() {
      const { data: resultToastList, error } = await supabase
        .from("toast")
        .select("*")
        .eq("project_id", project.id);

      if (error !== null) {
        throw new Error(error);
      }

      if (resultToastList.length === 0) {
        setToast(initialToast);
      } else {
        isToastSavedRef.current = true;
        setToast(resultToastList[0]);
      }
    }
    getToastList();
    return;
  }, [project.id, setToast, isToastSavedRef]);

  useEffect(() => {
    function setTargetElementId(e) {
      const targetElementId = e.data.target;

      if (targetElementId === "") {
        return;
      }

      if (project.link.includes(e.origin)) {
        setToast((state) => ({ ...state, target_element_id: targetElementId }));
      }
      return;
    }

    window.addEventListener("message", setTargetElementId);

    return () => window.removeEventListener("message", setTargetElementId);
  }, [project.link, setToast]);

  return (
    <>
      <div className="flex w-full flex-col border-2 border-solid">
        <ToastCard
          projectId={project.id}
          toast={toast}
          setToast={setToast}
          isToastSavedRef={isToastSavedRef}
          sendToastInfo={sendToastInfo}
        />
      </div>
    </>
  );
}

export default ToastCardList;

ToastCardList.propTypes = {
  project: PropTypes.object.isRequired,
  toast: PropTypes.shape({
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
  setToast: PropTypes.func.isRequired,
  isToastSavedRef: PropTypes.object.isRequired,
  previewRef: PropTypes.object,
};
