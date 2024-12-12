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
  message_button_color_code: "2766DE",
  background_opacity: 20,
  project_id: "",
  created_at: "",
  updated_at: "",
};

function ActionCardList({ user, project, previewRef }) {
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

      if (project.user_id === user.id) {
        setAction(action[0]);
      }

      if (action === undefined) {
        throw new Error(error);
      }
    }
    getAction();

    return;
  }, [user.id, project]);

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

    window.addEventListener("message", (e) => setTargetElementId(e));

    return window.removeEventListener("message", (e) => setTargetElementId(e));
  }, [project.link]);

  return (
    <>
      {action === undefined ? (
        <div className="flex flex-col w-full border-2 border-solid">액션 없음</div>
      ) : (
        <div className="flex flex-col w-full border-2 border-solid">
          <ActionCard action={action} setAction={setAction} sendActionInfo={sendActionInfo} />
        </div>
      )}
    </>
  );
}

export default ActionCardList;

ActionCardList.propTypes = {
  user: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  previewRef: PropTypes.object,
};
