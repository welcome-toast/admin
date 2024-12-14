import PropTypes from "prop-types";

function ActionCardHeader({ action }) {
  return (
    <div className="flex">
      <div className="my-5 flex w-full justify-between">
        <span>{action.name}</span>
        <span>{action.type}</span>
      </div>
    </div>
  );
}

export default ActionCardHeader;

ActionCardHeader.propTypes = {
  action: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    target_element_id: PropTypes.string,
    message_title: PropTypes.string,
    message_body: PropTypes.string,
    message_button_color_code: PropTypes.string,
    background_opacity: PropTypes.string,
    project_id: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
};
