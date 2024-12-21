import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { supabase } from "../shared/supabase";
import ToastCard from "./ToastCard";

const initialToastList = [
  {
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
  },
];

function ToastCardList({ project, isToastSavedRef, previewRef }) {
  const [toastList, setToastList] = useState(initialToastList);

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
    async function getToastList() {
      const { data: resultToastList, error } = await supabase
        .from("toast")
        .select("*")
        .eq("project_id", project.id);

      if (error !== null) {
        throw new Error(error);
      }

      if (resultToastList.length > 0) {
        isToastSavedRef.current = true;
        setToastList(resultToastList);
      }
    }
    getToastList();
    return;
  }, [project.id, isToastSavedRef]);

  useEffect(() => {
    function setTargetElementId(e) {
      const targetElementId = e.data.target;

      if (targetElementId === "") {
        return;
      }

      if (project.link.includes(e.origin)) {
        setToastList((state) => ({ ...state, target_element_id: targetElementId }));
      }
      return;
    }

    window.addEventListener("message", setTargetElementId);

    return () => window.removeEventListener("message", setTargetElementId);
  }, [project.link]);

  return (
    <>
      <div className="flex w-full flex-col border-2 border-solid">
        {toastList.map((toastSaved) => {
          return (
            <ToastCard
              key={toastSaved.id}
              toastSaved={toastSaved}
              isToastSavedRef={isToastSavedRef}
              sendToastInput={sendToastInput}
              projectId={project.id}
            />
          );
        })}
      </div>
    </>
  );
}

export default ToastCardList;

ToastCardList.propTypes = {
  project: PropTypes.object.isRequired,
  isToastSavedRef: PropTypes.object.isRequired,
  previewRef: PropTypes.object,
};
