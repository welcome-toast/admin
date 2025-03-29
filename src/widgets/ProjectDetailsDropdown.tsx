import {
  type Dispatch,
  type KeyboardEvent,
  type MouseEvent,
  type SetStateAction,
  useEffect,
  useRef,
} from "react";

import ClipboardIcon from "@/shared/Icon/ClipboardIcon";
import TrashIcon from "@/shared/Icon/TrashIcon";
import type { ApiKeyInstallModal, Modal } from "@/types";
import type {
  Project,
  ProjectApiKey,
  ProjectDeleteConfirmed,
  ProjectId,
  ProjectName,
} from "@/types/project";

interface ProjectDetailsDropdownProps {
  project: Project;
  setApiKeyInstallModal: Dispatch<SetStateAction<ApiKeyInstallModal>>;
  setProjectDeleteConfirmed: Dispatch<SetStateAction<ProjectDeleteConfirmed>>;
  setIsOpenDropdown: Dispatch<SetStateAction<boolean>>;
  setIsOpenModal: Dispatch<SetStateAction<Modal>>;
}

function ProjectDetailsDropdown({
  project,
  setApiKeyInstallModal,
  setProjectDeleteConfirmed,
  setIsOpenDropdown,
  setIsOpenModal,
}: ProjectDetailsDropdownProps): JSX.Element {
  const dropdownRef = useRef<HTMLUListElement>(null);

  function handleViewInstallScriptClick(
    event: MouseEvent | KeyboardEvent,
    projectApiKey: ProjectApiKey,
  ) {
    event.stopPropagation();

    switch (event.type) {
      case "click": {
        setIsOpenModal((prev) => ({ ...prev, install: true }));
        setApiKeyInstallModal(projectApiKey);
        setIsOpenDropdown(false);
        return;
      }
      case "keydown": {
        const key = (event as KeyboardEvent).key;
        if (key === "Enter" || key === " ") {
          setIsOpenModal((prev) => ({ ...prev, install: true }));
          setApiKeyInstallModal(projectApiKey);
          setIsOpenDropdown(false);
        }
        return;
      }
    }
  }

  function handleDeleteProjectClick(
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    projectId: ProjectId,
    projectName: ProjectName,
  ) {
    event.stopPropagation();

    switch (event.type) {
      case "click": {
        setIsOpenModal((prev) => ({ ...prev, delete: true }));
        setProjectDeleteConfirmed((prev) => ({ ...prev, projectId, projectName }));
        setIsOpenDropdown(false);
        return;
      }
      case "keydown": {
        const key = (event as KeyboardEvent).key;
        if (key === "Enter" || key === " ") {
          setIsOpenModal((prev) => ({ ...prev, delete: true }));
          setProjectDeleteConfirmed((prev) => ({ ...prev, projectId, projectName }));
          setIsOpenDropdown(false);
        }
        return;
      }
    }
  }

  useEffect(() => {
    function handleDropdownOutsideClick(event: globalThis.MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpenDropdown(false);
      }
    }

    window.addEventListener("mousedown", handleDropdownOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleDropdownOutsideClick);
    };
  }, [setIsOpenDropdown]);

  return (
    <ul
      ref={dropdownRef}
      className="absolute top-10 right-2 z-50 flex flex-col gap-1 rounded border-2 border-gray-300 bg-white p-1 text-sm"
    >
      <li>
        <div
          className="m-1 flex items-center justify-between gap-2 rounded px-2 py-2 hover:bg-gray-200"
          onClick={(event) => handleViewInstallScriptClick(event, project.api_key)}
          onKeyDown={(event) => handleViewInstallScriptClick(event, project.api_key)}
        >
          <ClipboardIcon />
          연동 스크립트
        </div>
      </li>
      <li>
        <div
          className="m-1 flex items-center justify-between gap-2 rounded px-2 py-2 hover:bg-gray-200"
          onClick={(event) => handleDeleteProjectClick(event, project.id, project.name)}
          onKeyDown={(event) => handleDeleteProjectClick(event, project.id, project.name)}
        >
          <TrashIcon />
          프로젝트 삭제
        </div>
      </li>
    </ul>
  );
}

export default ProjectDetailsDropdown;
