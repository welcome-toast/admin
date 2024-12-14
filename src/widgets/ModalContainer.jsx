import { useState } from "react";
import Button from "../shared/Button";
import { createProject } from "../shared/supabase";

function ModalContainer() {
  const [input, setInput] = useState({
    name: "",
    link: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  function handleInputChange(type, input) {
    setInput((state) => ({ ...state, [type]: input }));
    return;
  }

  async function handleCreateButtonClick() {
    if (input.name === "" || input.link === "") {
      setErrorMessage("생성할 프로젝트 이름과 도메인을 모두 입력해 주세요.");
      return;
    }

    const { projectResult, error } = await createProject(input);

    if (projectResult === null) {
      if (error.message.includes("duplicate key")) {
        setErrorMessage("이미 등록된 도메인이에요. 다른 URL을 등록해주세요.");
        return;
      }
    }

    setInput({ name: "", link: "" });
    setErrorMessage("");
    return;
  }

  return (
    <div className="flex flex-col gap-5 border-2 border-solid border-black w-full h-full p-20">
      <div>
        <h3 className="text-xl font-bold text-gray-900">프로젝트 생성</h3>
      </div>
      <label className="flex flex-col gap-2 w-96 font-bold text-gray-900 mt-5">
        프로젝트 이름
        <input
          type="text"
          id="projectTitle"
          name="projectTitle"
          value={input.name}
          placeholder="(예시) 웰컴토스트 12월 런칭 하이라이트"
          className="border-2 border-solid rounded font-normal w-full h-11 p-5"
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-2 w-96 font-bold text-gray-900 mt-5">
        프로젝트 도메인
        <span className="text-gray-400 italic font-normal">
          액션이 적용될 웹페이지 URL 앞 부분을 입력해주세요
        </span>
        <input
          type="text"
          id="projectLink"
          name="projectLink"
          value={input.link}
          placeholder="(예시) https://welcome-toast.io/"
          className="border-2 border-solid rounded font-normal w-full h-11 p-5"
          onChange={(e) => handleInputChange("link", e.target.value)}
        />
      </label>
      <div className="my-1">
        <span className="text-red-400">{errorMessage}</span>
      </div>
      <Button text="생성" onClick={handleCreateButtonClick} />
    </div>
  );
}

export default ModalContainer;
