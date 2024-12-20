import PropTypes from "prop-types";

import { useEffect } from "react";
import { supabase } from "../shared/supabase";
import ToastCard from "./ToastCard";

const initialAction = {
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

function ToastCardList({ project, action, setAction, isActionSavedRef, previewRef }) {
  function sendActionInfo(actionInput) {
    const {
      name,
      type,
      target_element_id,
      message_title,
      message_body,
      image_url,
      message_button_color,
      background_opacity,
    } = actionInput;
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
    async function getAction() {
      const { data: resultAction, error } = await supabase
        .from("action")
        .select("*")
        .eq("project_id", project.id);

      if (error !== null) {
        throw new Error(error);
      }

      if (resultAction.length === 0) {
        setAction(initialAction);
      } else {
        isActionSavedRef.current = true;
        setAction(resultAction[0]);
      }
    }
    getAction();
    return;
  }, [project.id, setAction, isActionSavedRef]);

  useEffect(() => {
    function setTargetElementId(e) {
      const targetElementId = e.data.target;

      if (targetElementId === "") {
        return;
      }

      if (project.link.includes(e.origin)) {
        setAction((state) => ({ ...state, target_element_id: targetElementId }));
      }
      return;
    }

    window.addEventListener("message", setTargetElementId);

    return () => window.removeEventListener("message", setTargetElementId);
  }, [project.link, setAction]);

  return (
    <>
      <div className="flex w-full flex-col border-2 border-solid">
        <ToastCard
          projectId={project.id}
          action={action}
          setAction={setAction}
          isActionSavedRef={isActionSavedRef}
          sendActionInfo={sendActionInfo}
        />
      </div>
    </>
  );
}

export default ToastCardList;

ToastCardList.propTypes = {
  project: PropTypes.object.isRequired,
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
  previewRef: PropTypes.object,
};
