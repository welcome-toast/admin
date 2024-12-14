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
    const name = input.name.trim();
    const link = input.link.trim();

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
    <div className="flex h-full w-full flex-col gap-5 border-2 border-black border-solid p-20">
      <div>
        <h3 className="font-bold text-gray-900 text-xl">프로젝트 생성</h3>
      </div>
      <label className="mt-5 flex w-96 flex-col gap-2 font-bold text-gray-900">
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
      <label className="mt-5 flex w-96 flex-col gap-2 font-bold text-gray-900">
        프로젝트 도메인
        <span className="font-normal text-gray-400 italic">
          액션이 적용될 웹페이지 URL 앞 부분을 입력해주세요
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
      <Button text="생성" onClick={handleCreateButtonClick} />
    </div>
  );
}

export default ModalContainer;
