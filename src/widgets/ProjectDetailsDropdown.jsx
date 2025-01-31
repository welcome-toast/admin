import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import ClipboardIcon from "../shared/Icon/ClipboardIcon";
import TrashIcon from "../shared/Icon/TrashIcon";

function ProjectDetailsDropdown({
  project,
  setApiKeyInstallModal,
  setProjectDeleteConfirmed,
  setIsOpenDropdown,
  setIsOpenModal,
}) {
  const dropdownRef = useRef(null);

  function handleViewInstallScriptClick(event, projectApiKey) {
    event.stopPropagation();

    switch (event.type) {
      case "click":
        setIsOpenModal((prev) => ({ ...prev, install: true }));
        setApiKeyInstallModal(projectApiKey);
        setIsOpenDropdown(false);
        return;
      case "keydown":
        if (event.key === "Enter" || event.key === " ") {
          setIsOpenModal((prev) => ({ ...prev, install: true }));
          setApiKeyInstallModal(projectApiKey);
          setIsOpenDropdown(false);
        }
        return;
    }
  }

  function handleDeleteProjectClick(event, projectId, projectName) {
    event.stopPropagation();

    switch (event.type) {
      case "click":
        setIsOpenModal((prev) => ({ ...prev, delete: true }));
        setProjectDeleteConfirmed((prev) => ({ ...prev, projectId, projectName }));
        setIsOpenDropdown(false);
        return;
      case "keydown":
        if (event.key === "Enter" || event.key === " ") {
          setIsOpenModal((prev) => ({ ...prev, delete: true }));
          setProjectDeleteConfirmed((prev) => ({ ...prev, projectId, projectName }));
          setIsOpenDropdown(false);
        }
        return;
    }
  }

  useEffect(() => {
    function handleDropdownOutsideClick(event) {
      if (event.target !== dropdownRef.current) {
        setIsOpenDropdown(false);
      }
    }

    window.addEventListener("click", handleDropdownOutsideClick);
    return () => window.removeEventListener("click", handleDropdownOutsideClick);
  }, [setIsOpenDropdown]);

  return (
    <ul
      ref={dropdownRef}
      className="absolute top-10 right-2 z-50 flex flex-col gap-1 rounded border-2 border-gray-300 bg-white p-1 text-sm"
    >
      <li>
        <div
          type="button"
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
          type="button"
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

ProjectDetailsDropdown.propTypes = {
  project: PropTypes.object.isRequired,
  setApiKeyInstallModal: PropTypes.func.isRequired,
  setProjectDeleteConfirmed: PropTypes.func.isRequired,
  setIsOpenDropdown: PropTypes.func.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
};
