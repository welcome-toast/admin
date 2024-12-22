import PropTypes from "prop-types";
import ArrowIcon from "../shared/Icon/ArrowIcon";

function ToastCardHeader({ toast, handleToastInputChange }) {
  return (
    <div className="mt-5 flex w-full justify-between">
      <div>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="text"
            id="toastName"
            name="toastName"
            value={toast.name}
            placeholder="토스트 이름을 입력하세요"
            className="h-10 border-2 border-solid"
            onChange={(e) => handleToastInputChange("name", e.target.value)}
          />
        </label>
      </div>
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
  handleToastInputChange: PropTypes.func.isRequired,
};
