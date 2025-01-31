import PropTypes from "prop-types";
import { useState } from "react";
import KebabIcon from "../shared/Icon/KebabIcon";
import { getDate } from "../shared/utils/getDate";
import ProjectDetailsDropdown from "../widgets/ProjectDetailsDropdown";

function ProjectCard({ project, setIsOpenModal, setApiKeyInstallModal, handleProjectClick }) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const date = getDate(project.created_at);

  function handleProjectDetailClick(event) {
    event.stopPropagation();
    setIsOpenDropdown(true);
  }

  return (
    <button
      key={project.id}
      type="button"
      className="relative flex w-full max-w-sm flex-col items-center justify-center rounded border border-gray-300 bg-gray-100 p-6 text-black shadow-xl hover:border-2 hover:border-blue-700 hover:bg-blue-100"
      onClick={() => handleProjectClick(project.id)}
    >
      <ul className="p-2">
        <li className="mb-3 font-semibold text-2xl">{project.name}</li>
        <li className="my-1 font-extralight text-gray-800 text-sm italic">{project.link}</li>
        <li className="mt-5 text-gray-800 text-sm">
          생성일{" "}
          {`${date.year}. ${date.month}. ${date.currentDate}. ${date.currentHour}:${date.currentMinute}`}
        </li>
      </ul>
      <button
        type="button"
        onClick={handleProjectDetailClick}
        className="absolute top-2 right-1 p-1"
      >
        <KebabIcon />
      </button>
      {isOpenDropdown && (
        <ProjectDetailsDropdown
          projectApiKey={project.api_key}
          setApiKeyInstallModal={setApiKeyInstallModal}
          setIsOpenDropdown={setIsOpenDropdown}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </button>
  );
}

export default ProjectCard;

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
  setApiKeyInstallModal: PropTypes.func.isRequired,
  handleProjectClick: PropTypes.func.isRequired,
};
