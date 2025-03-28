import { type Dispatch, type SetStateAction, useState } from "react";

import Button from "@/shared/Button";
import ModalBackground from "@/shared/ModalBackground";
import ModalContainer from "@/shared/ModalContainer";
import { INITIAL_MODAL } from "@/shared/constant";
import { createProject } from "@/shared/supabase";
import { validateUrl } from "@/shared/utils/validateUrl";
import type { Modal } from "@/types";

interface CreateProjectModalProps {
  setIsOpenModal: Dispatch<SetStateAction<Modal>>;
}

interface ProjectInput {
  name: string;
  link: string;
}

interface ProjectInputEditing {
  name: string;
  input: string;
}

function CreateProjectModal({ setIsOpenModal }: CreateProjectModalProps): JSX.Element {
  const [input, setInput] = useState<ProjectInput>({
    name: "",
    link: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleInputChange({ name, input }: ProjectInputEditing) {
    setInput((state) => ({ ...state, [name]: input }));
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
        setErrorMessage(errorMessage ?? "");
        return;
      }

      await createProject({ name, link: linkWithProtocol });

      setInput({ name: "", link: "" });
      setErrorMessage("");
      setIsOpenModal(INITIAL_MODAL);
    } catch (error) {
      setErrorMessage("프로젝트 생성 중 오류가 발생했습니다");
      console.error((error as Error).message);
    }
  }

  return (
    <ModalBackground setIsOpenModal={setIsOpenModal}>
      <ModalContainer modalTitle={"프로젝트 생성"} setIsOpenModal={setIsOpenModal}>
        <label className="mt-5 flex w-full flex-col gap-2 font-bold text-gray-900">
          프로젝트 이름
          <input
            type="text"
            id="projectTitle"
            name="projectTitle"
            value={input.name}
            placeholder="(예시) 웰컴토스트 12월 런칭 하이라이트"
            className={`${errorMessage.includes("이름") ? "border-red-400" : "border-gray-500"} h-11 w-full rounded border-2 border-solid p-5 font-normal`}
            onChange={(e) => handleInputChange({ name: "name", input: e.target.value })}
          />
        </label>
        <label className="mt-5 flex w-full flex-col gap-2 font-bold text-gray-900">
          웹사이트 도메인
          <span className="font-normal text-gray-400 italic">
            토스트를 적용할 웹사이트 URL 주소를 입력해주세요
          </span>
          <input
            type="url"
            id="projectLink"
            name="projectLink"
            value={input.link}
            placeholder="(예시) https://welcome-toast.io/"
            className={`${errorMessage.includes("도메인") ? "border-red-400" : "border-gray-500"} h-11 w-full rounded border-2 border-solid p-5 font-normal`}
            onChange={(e) => handleInputChange({ name: "link", input: e.target.value })}
          />
        </label>
        <div className="my-1">
          <span className="text-red-400">{errorMessage}</span>
        </div>
        <div className="mt-5 flex justify-center">
          <Button text="생성" onClick={handleCreateButtonClick} />
        </div>
      </ModalContainer>
    </ModalBackground>
  );
}

export default CreateProjectModal;
