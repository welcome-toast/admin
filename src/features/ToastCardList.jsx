import PropTypes from "prop-types";

import { useEffect, useState } from "react";
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

function ToastCardList({ project, previewRef }) {
  const [toastList, setToastList] = useState([]);
  const [isCreatingToast, setIsCreatingToast] = useState(false);

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

  function handleNewToastButtonClick() {
    setIsCreatingToast(!isCreatingToast);
    return;
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
        setToastList(resultToastList);
      }
    }
    getToastList();
    return;
  }, [project.id]);

  useEffect(() => {
    function setTargetElementId(e) {
      const targetElementId = e.data.target;

      if (targetElementId === "") {
        return;
      }

      if (project.link.includes(e.origin)) {
        setToastList(
          toastList.map((el) => {
            return { ...el, target_element_id: targetElementId };
          }),
        );
      }
      return;
    }

    window.addEventListener("message", setTargetElementId);

    return () => window.removeEventListener("message", setTargetElementId);
  }, [project.link, toastList]);

  return (
    <>
      <div className="flex w-full flex-col border-2 border-solid">
        {toastList.map((toastSaved) => {
          return (
            <ToastCard
              key={toastSaved.id}
              initialToast={toastSaved}
              sendToastInput={sendToastInput}
              projectId={project.id}
            />
          );
        })}
      </div>
      {isCreatingToast && (
        <div className="flex flex-col gap-3">
          <span className="font-bold text-gray-400 text-l">새로운 토스트</span>
          <ToastCard
            initialToast={initialToast}
            sendToastInput={sendToastInput}
            projectId={project.id}
          />
        </div>
      )}
      <div className="mb-5">
        {isCreatingToast ? (
          <button
            type="button"
            onClick={handleNewToastButtonClick}
            className="h-14 w-full border-2 border-black text-xl"
          >
            X
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNewToastButtonClick}
            className="h-14 w-full border-2 border-black text-2xl"
          >
            +
          </button>
        )}
      </div>
    </>
  );
}

export default ToastCardList;

ToastCardList.propTypes = {
  project: PropTypes.object.isRequired,
  previewRef: PropTypes.object,
};
