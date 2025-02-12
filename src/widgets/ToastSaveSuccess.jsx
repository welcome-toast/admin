import PropTypes from "prop-types";
import CheckIcon from "../shared/Icon/CheckIcon";

function ToastSaveSuccess({ isToastSaved, title, description }) {
  return (
    <div
      className={`fixed top-16 right-5 transition-all duration-500 ${isToastSaved ? "opacity-100" : "opacity-0"} z-50 flex h-fit w-fit max-w-2xl items-start gap-2 rounded border border-blue-700 bg-blue-100 py-3 pr-8 pl-3 shadow-2xl`}
    >
      <div className="mt-1">
        <CheckIcon color={"blue"} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-base">{title}</span>
        <span className="font-normal text-sm">{description}</span>
      </div>
    </div>
  );
}

export default ToastSaveSuccess;

ToastSaveSuccess.propTypes = {
  isToastSaved: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
