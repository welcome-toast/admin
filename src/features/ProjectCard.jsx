import PropTypes from "prop-types";
import { getDate } from "../shared/utils/getDate";

function ProjectCard({ project, handleProjectClick }) {
  const date = getDate(project.created_at);

  return (
    <div className="flex w-full max-w-sm flex-col rounded border bg-gray-900 p-6 text-white shadow-xl hover:bg-gray-700">
      <button key={project.id} type="button" onClick={() => handleProjectClick(project.id)}>
        <ul className="p-2">
          <li className="mb-3 font-semibold text-2xl">{project.name}</li>
          <li className="my-1 font-extralight text-gray-300 text-sm italic">{project.link}</li>
          <li className="mt-5 text-gray-400 text-sm">
            생성 일자{" "}
            {`${date.year}. ${date.month}. ${date.currentDate}. ${date.currentHour}:${date.currentMinute}`}
          </li>
        </ul>
      </button>
    </div>
  );
}

export default ProjectCard;

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  handleProjectClick: PropTypes.func.isRequired,
};
