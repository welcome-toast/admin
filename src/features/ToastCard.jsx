import PropTypes from "prop-types";
import { getDate } from "../shared/utils/getDate";

function ProjectCard({ toastSaved, index, indexToastForEdit, handleToastCardClick }) {
  const date = getDate(toastSaved.updated_at);

  return (
    <button
      type="button"
      key={toastSaved.id}
      onClick={() => handleToastCardClick(index)}
      className={`${index === indexToastForEdit ? "border-blue-700 bg-blue-100" : "hover:border-blue-600"} flex flex-col gap-1 rounded border-2 p-2 text-left md:p-2`}
    >
      <span className="mb-1 font-bold text-gray-900 text-xs md:text-sm">{toastSaved.name}</span>
      <span className="mb-1 text-gray-900 text-xs md:text-sm">{toastSaved.message_title}</span>
      <span className="mb-1 hidden text-gray-500 text-xs md:flex md:text-xs">
        업데이트{" "}
        {`${date.year}.${date.month}.${date.currentDate}. ${date.currentHour}:${date.currentMinute}`}
      </span>
    </button>
  );
}

export default ProjectCard;

ProjectCard.propTypes = {
  toastSaved: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  indexToastForEdit: PropTypes.number.isRequired,
  handleToastCardClick: PropTypes.func.isRequired,
};
