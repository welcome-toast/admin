import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function ProjectDetailsDropdown({ setIsOpenDropdown }) {
  const dropdownRef = useRef(null);

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
      className="absolute top-10 right-2 flex flex-col gap-2 rounded border-2 border-gray-300 bg-gray-100 p-5"
    >
      <li>연동 스크립트</li>
      <li>프로젝트 삭제</li>
    </ul>
  );
}

export default ProjectDetailsDropdown;

ProjectDetailsDropdown.propTypes = {
  setIsOpenDropdown: PropTypes.func.isRequired,
};
