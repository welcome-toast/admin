import PropTypes from "prop-types";
import { getDate } from "../shared/utils/getDate";

function ProjectCard({ toastSaved, index, indexToastForEdit, handleToastCardClick }) {
  const date = getDate(toastSaved.updated_at);

  return (
    <button
      type="button"
      key={toastSaved.id}
      onClick={() => handleToastCardClick(index)}
      className={`${index === indexToastForEdit ? "border-blue-700 bg-blue-100" : "hover:border-blue-600"} flex flex-col gap-3 rounded border-2 p-2`}
    >
      <div>
        <span className="mb-1 font-bold text-base text-gray-900">{toastSaved.name}</span>
      </div>
      <div>
        <span className="mb-1 text-gray-900 text-sm">{toastSaved.message_title}</span>
      </div>
      <div>
        <span className="mb-1 text-gray-900 text-sm">{toastSaved.target_element_id}</span>
      </div>
      <div>
        <span className="mb-1 text-gray-500 text-sm">업데이트 </span>
        <span className="mb-1 text-gray-500 text-sm">{`${date.year}.${date.month}.${date.currentDate}. ${date.currentHour}:${date.currentMinute}`}</span>
      </div>
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
