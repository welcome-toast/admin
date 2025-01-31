import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function ProjectDetailsDropdown({
  projectApiKey,
  setApiKeyInstallModal,
  setIsOpenDropdown,
  setIsOpenModal,
}) {
  const dropdownRef = useRef(null);

  function handleViewInstallScriptClick(event) {
    event.stopPropagation();
    setIsOpenModal((prev) => ({ ...prev, install: true }));
    setApiKeyInstallModal(projectApiKey);
    setIsOpenDropdown(false);
  }

  function handleDeleteProjectClick(event) {
    event.stopPropagation();
    setIsOpenModal((prev) => ({ ...prev, delete: true }));
    setIsOpenDropdown(false);
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
      className="absolute top-10 right-2 z-50 flex flex-col gap-1 rounded border-2 border-gray-300 bg-white p-1"
    >
      <li>
        <button
          type="button"
          className="m-1 rounded px-3 py-2 hover:bg-gray-200"
          onClick={handleViewInstallScriptClick}
        >
          연동 스크립트
        </button>
      </li>
      <li>
        <button
          type="button"
          className="m-1 rounded px-3 py-2 hover:bg-gray-200"
          onClick={handleDeleteProjectClick}
        >
          프로젝트 삭제
        </button>
      </li>
    </ul>
  );
}

export default ProjectDetailsDropdown;

ProjectDetailsDropdown.propTypes = {
  projectApiKey: PropTypes.string.isRequired,
  setApiKeyInstallModal: PropTypes.func.isRequired,
  setIsOpenDropdown: PropTypes.func.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
};
