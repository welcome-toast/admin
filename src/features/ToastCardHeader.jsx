import PropTypes from "prop-types";
import ArrowIcon from "../shared/Icon/ArrowIcon";

function ToastCardHeader({ toast }) {
  return (
    <div className="mt-5 flex w-full justify-between">
      <span>{toast.name}</span>
      <span>{toast.type}</span>
      <button type="button">
        <ArrowIcon />
      </button>
    </div>
  );
}

export default ToastCardHeader;

ToastCardHeader.propTypes = {
  toast: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    target_element_id: PropTypes.string,
    message_title: PropTypes.string,
    message_body: PropTypes.string,
    message_button_color: PropTypes.string,
    image_url: PropTypes.string,
    background_opacity: PropTypes.string,
    project_id: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
};
