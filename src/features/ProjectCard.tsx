import {
  type Dispatch,
  type KeyboardEvent,
  type MouseEvent,
  type SetStateAction,
  useState,
} from "react";

import KebabIcon from "@/shared/Icon/KebabIcon";
import { getDate } from "@/shared/utils/getDate";
import type { ApiKeyInstallModal, Modal } from "@/types";
import type { Project, ProjectDeleteConfirmed, ProjectId } from "@/types/project";
import ProjectDetailsDropdown from "@/widgets/ProjectDetailsDropdown";

interface ProjectCardProps {
  project: Project;
  setIsOpenModal: Dispatch<SetStateAction<Modal>>;
  setApiKeyInstallModal: Dispatch<SetStateAction<ApiKeyInstallModal>>;
  setProjectDeleteConfirmed: Dispatch<SetStateAction<ProjectDeleteConfirmed>>;
  handleProjectClick: (projectId: ProjectId) => void;
}

function ProjectCard({
  project,
  setIsOpenModal,
  setApiKeyInstallModal,
  setProjectDeleteConfirmed,
  handleProjectClick,
}: ProjectCardProps) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const date = getDate(project.created_at);
  const projectId: ProjectId = project.id;

  function handleProjectDetailClick(
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
  ) {
    event.stopPropagation();

    switch (event.type) {
      case "click": {
        setIsOpenDropdown(true);
        return;
      }
      case "keydown": {
        const { key } = event as KeyboardEvent;
        if (key === "Enter" || key === " ") {
          setIsOpenDropdown(true);
        }
        return;
      }
    }
  }

  return (
    <button
      key={project.id}
      type="button"
      className="relative flex w-full flex-col items-center justify-center overflow-y-clip rounded border border-gray-300 bg-gray-100 p-6 text-black hover:border-blue-700 hover:bg-blue-100 hover:shadow-xl"
      onClick={() => handleProjectClick(projectId)}
    >
      <ul className="p-2">
        <li className="mb-3 font-semibold text-lg lg:text-xl">{project.name}</li>
        <li className="my-1 font-extralight text-gray-800 text-xs italic lg:text-sm">
          {project.link}
        </li>
        <li className="mt-3 text-gray-800 text-xs lg:mt-5 lg:text-sm">
          생성일{" "}
          {`${date?.year}. ${date?.month}. ${date?.currentDate}. ${date?.currentHour}:${date?.currentMinute}`}
        </li>
      </ul>
      <div
        onClick={handleProjectDetailClick}
        onKeyDown={handleProjectDetailClick}
        className="absolute top-2 right-1 p-1"
      >
        <KebabIcon />
      </div>
      {isOpenDropdown && (
        <ProjectDetailsDropdown
          project={project}
          setApiKeyInstallModal={setApiKeyInstallModal}
          setProjectDeleteConfirmed={setProjectDeleteConfirmed}
          setIsOpenDropdown={setIsOpenDropdown}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </button>
  );
}

export default ProjectCard;
