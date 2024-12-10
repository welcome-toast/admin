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

function ActionCardList({ user, project }) {
  const [action, setAction] = useState(initialAction);

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

  return (
    <>
      {action === undefined ? (
        <div className="flex flex-col w-full border-2 border-solid">액션 없음</div>
      ) : (
        <div className="flex flex-col w-full border-2 border-solid">
          <ActionCard action={action} setAction={setAction} />
        </div>
      )}
    </>
  );
}

export default ActionCardList;

ActionCardList.propTypes = {
  user: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};
