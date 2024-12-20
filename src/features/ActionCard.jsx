import PropTypes from "prop-types";

import Button from "../shared/Button";
import { supabase } from "../shared/supabase";
import ActionCardEditor from "./ActionCardEditor";

function ActionCard({ projectId, action, setAction, isActionSavedRef, sendActionInfo }) {
  async function handleSaveActionButtonClick() {
    if (!isActionSavedRef.current) {
      const { data, error } = await supabase
        .from("action")
        .insert([
          {
            name: action.name,
            target_element_id: action.target_element_id,
            message_title: action.message_title,
            message_body: action.message_body,
            image_url: action.image_url,
            message_button_color: action.message_button_color,
            background_opacity: action.background_opacity,
            project_id: projectId,
          },
        ])
        .select();

      if (!data) {
        throw new Error(error.message);
      }
      setAction(data[0]);
      isActionSavedRef.current = true;
      alert("액션이 저장 되었어요.");
    } else {
      const { data, error } = await supabase
        .from("action")
        .update({
          name: action.name,
          target_element_id: action.target_element_id,
          message_title: action.message_title,
          message_body: action.message_body,
          image_url: action.image_url,
          message_button_color: action.message_button_color,
          background_opacity: action.background_opacity,
        })
        .eq("id", action.id)
        .select();

      if (!data) {
        throw new Error(error.message);
      }
      setAction(data[0]);
      isActionSavedRef.current = true;
      alert("액션이 저장 되었어요.");
    }

    return;
  }

  return (
    <div className="flex flex-col gap-5 rounded border-2 border-black px-5">
      <ActionCardEditor
        action={action}
        setAction={setAction}
        isActionSavedRef={isActionSavedRef}
        sendActionInfo={sendActionInfo}
      />
      <div className="mb-5">
        <Button text={"저장"} onClick={handleSaveActionButtonClick} />
      </div>
    </div>
  );
}

export default ActionCard;

ActionCard.propTypes = {
  projectId: PropTypes.string.isRequired,
  action: PropTypes.object.isRequired,
  setAction: PropTypes.func.isRequired,
  isActionSavedRef: PropTypes.object.isRequired,
  sendActionInfo: PropTypes.func.isRequired,
};
