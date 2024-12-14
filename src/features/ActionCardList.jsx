import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { supabase } from "../shared/supabase";
import ActionCard from "./ActionCard";

const initialAction = {
  id: "",
  name: "",
  type: "",
  target_element_id: "",
  message_title: "",
  message_body: "",
  message_button_color_code: "#000000",
  background_opacity: "20",
  project_id: "",
  created_at: "",
  updated_at: "",
};

function ActionCardList({ project, previewRef }) {
  const [action, setAction] = useState(initialAction);

  function sendActionInfo(actionInput) {
    const {
      name,
      type,
      target_element_id,
      message_title,
      message_body,
      message_button_color_code,
      background_opacity,
    } = actionInput;
    previewRef.current.contentWindow.postMessage(
      {
        name,
        type,
        target_element_id,
        message_title,
        message_body,
        message_button_color_code,
        background_opacity,
      },
      project.link,
    );
  }

  useEffect(() => {
    async function getAction() {
      const { data: action, error } = await supabase
        .from("action")
        .select("*")
        .eq("project_id", project.id);

      if (error !== null) {
        throw new Error(error);
      }

      if (action.length === 0) {
        setAction(initialAction);
      } else {
        setAction(action[0]);
      }
    }
    getAction();
    return;
  }, [project.id]);

  useEffect(() => {
    function setTargetElementId(e) {
      const targetElementId = e.data.target;

      if (targetElementId === "") {
        return;
      }

      if (e.origin === project.link) {
        setAction((state) => ({ ...state, target_element_id: targetElementId }));
      }
      return;
    }

    window.addEventListener("message", setTargetElementId);

    return window.removeEventListener("message", setTargetElementId);
  }, [project.link]);

  return (
    <>
      <div className="flex w-full flex-col border-2 border-solid">
        <ActionCard action={action} setAction={setAction} sendActionInfo={sendActionInfo} />
      </div>
    </>
  );
}

export default ActionCardList;

ActionCardList.propTypes = {
  project: PropTypes.object.isRequired,
  previewRef: PropTypes.object,
};
