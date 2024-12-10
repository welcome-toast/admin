import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
import Button from "../shared/Button";
import { supabase } from "../shared/supabase";
import ActionCardEditor from "./ActionCardEditor";
import ActionCardHeader from "./ActionCardHeader";

function ActionCard({ action, setAction }) {
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
    <div className="flex flex-col gap-5 px-5 mx-10 border-2 border-black rounded">
      <ActionCardHeader action={action} />
      <ActionCardEditor action={action} setAction={setAction} />
      <div className="mb-5">
        <Button text={"저장"} onClick={handleSaveActionButtonClick} />
      </div>
    </div>
  );
}

export default ActionCard;

ActionCard.propTypes = {
  user: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  action: PropTypes.array.isRequired,
  setAction: PropTypes.func.isRequired,
};
