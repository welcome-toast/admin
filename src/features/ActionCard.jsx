import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { supabase } from "../shared/supabase";
import ActionCardEditor from "./ActionCardEditor";
import ActionCardHeader from "./ActionCardHeader";

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

function ActionCard({ user, project }) {
  const [action, setAction] = useState(initialAction);

  useEffect(() => {
    async function getAction() {
      const { data: action, error } = await supabase
        .from("action")
        .select("*")
        .eq("project_id", project.id);

      if (project.owner_id === user.id) {
        setAction(action[0]);
      }

      if (!project) {
        throw new Error(error.message);
      }
    }
    getAction();

    return;
  }, [user.id, project]);

  return (
    <div className="flex flex-col gap-5 px-5 mx-10 border-2 border-black rounded">
      <ActionCardHeader action={action} />
      <ActionCardEditor action={action} setAction={setAction} />
    </div>
  );
}

export default ActionCard;

ActionCard.propTypes = {
  user: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};
