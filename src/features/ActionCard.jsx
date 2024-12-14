import PropTypes from "prop-types";

import Button from "../shared/Button";
import { supabase } from "../shared/supabase";
import ActionCardEditor from "./ActionCardEditor";
import ActionCardHeader from "./ActionCardHeader";

function ActionCard({ action, setAction, sendActionInfo }) {
  async function handleSaveActionButtonClick() {
    const { data, error } = await supabase
      .from("action")
      .upsert({
        id: action.id,
        target_element_id: action.target_element_id,
        message_title: action.message_title,
        message_body: action.message_body,
        message_button_color_code: action.message_button_color_code,
        background_opacity: action.background_opacity,
      })
      .select();

    if (!data) {
      throw new Error(error.message);
    }

    return;
  }

  return (
    <div className="mx-10 flex flex-col gap-5 rounded border-2 border-black px-5">
      <ActionCardHeader action={action} />
      <div>
        <span>{action.target_element_id === null ? "null" : action.target_element_id}</span>
      </div>
      <ActionCardEditor action={action} setAction={setAction} sendActionInfo={sendActionInfo} />
      <div className="mb-5">
        <Button text={"저장"} onClick={handleSaveActionButtonClick} />
      </div>
    </div>
  );
}

export default ActionCard;

ActionCard.propTypes = {
  action: PropTypes.object.isRequired,
  setAction: PropTypes.func.isRequired,
  sendActionInfo: PropTypes.func.isRequired,
};
