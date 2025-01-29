import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Button from "../shared/Button";
import CloseIcon from "../shared/Icon/CloseIcon";
import { createProject } from "../shared/supabase";
import { validateUrl } from "../shared/utils/validateUrl";

function CreateProjectModal({ setIsOpenModal }) {
  const outsideRef = useRef(null);
  const [input, setInput] = useState({
    name: "",
    link: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  function handleInputChange(type, input) {
    setInput((state) => ({ ...state, [type]: input }));
  }

  async function handleCreateButtonClick() {
    const name = input.name.trim();
    const link = input.link.trim().toLowerCase();
    const linkWithProtocol =
      link.startsWith("https://") || link.startsWith("http://") ? link : `https://${link}`;

    if (name === "" || link === "") {
      if (name === "" && link === "") {
        setErrorMessage("생성할 프로젝트 이름과 도메인을 모두 입력해주세요.");
        return;
      }
      setErrorMessage(
        name === ""
          ? "생성할 프로젝트 이름을 입력해주세요"
          : "생성할 프로젝트 도메인을 입력해주세요",
      );
      return;
    }

    try {
      const { isValid, errorMessage } = validateUrl(linkWithProtocol);

      if (!isValid) {
        setErrorMessage(errorMessage);
        return;
      }

      await createProject({ name, link: linkWithProtocol });

      setInput({ name: "", link: "" });
      setErrorMessage("");
      setIsOpenModal(false);
    } catch (error) {
      setErrorMessage("프로젝트 생성 중 오류가 발생했습니다");
      console.error(error.message);
    }
  }

  function handleCloseButtonClick() {
    setIsOpenModal(false);
  }

  useEffect(() => {
    function handleModalOutsideClick(event) {
      if (event?.target === outsideRef.current) {
        setIsOpenModal(false);
      }
    }

    window.addEventListener("click", handleModalOutsideClick);

    return () => window.removeEventListener("click", handleModalOutsideClick);
  }, [setIsOpenModal]);

  return (
    <div
      ref={outsideRef}
      className="fixed top-0 left-0 flex h-screen w-full flex-col items-center justify-center gap-5 border-2 border-black border-solid bg-black bg-opacity-70 p-18"
    >
      <div className="w-full rounded bg-white p-10 md:w-1/3">
        <div className="flex justify-between">
          <h3 className="font-bold text-gray-900 text-xl">프로젝트 생성</h3>
          <button type="button" onClick={handleCloseButtonClick}>
            <CloseIcon />
          </button>
        </div>
        <label className="mt-5 flex w-full flex-col gap-2 font-bold text-gray-900">
          프로젝트 이름
          <input
            type="text"
            id="projectTitle"
            name="projectTitle"
            value={input.name}
            placeholder="(예시) 웰컴토스트 12월 런칭 하이라이트"
            className={`${errorMessage.includes("이름") ? "border-red-400" : "border-gray-500"} h-11 w-full rounded border-2 border-solid p-5 font-normal`}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </label>
        <label className="mt-5 flex w-full flex-col gap-2 font-bold text-gray-900">
          프로젝트 도메인
          <span className="font-normal text-gray-400 italic">
            토스트를 적용할 웹페이지 URL 주소를 입력해주세요
          </span>
          <input
            type="url"
            id="projectLink"
            name="projectLink"
            value={input.link}
            placeholder="(예시) https://welcome-toast.io/"
            className={`${errorMessage.includes("도메인") ? "border-red-400" : "border-gray-500"} h-11 w-full rounded border-2 border-solid p-5 font-normal`}
            onChange={(e) => handleInputChange("link", e.target.value)}
          />
        </label>
        <div className="my-1">
          <span className="text-red-400">{errorMessage}</span>
        </div>
        <div className="mt-5 flex justify-center">
          <Button text="생성" onClick={handleCreateButtonClick} />
        </div>
      </div>
    </div>
  );
}

export default CreateProjectModal;

CreateProjectModal.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
};
