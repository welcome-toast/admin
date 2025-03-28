import type { Dispatch, SetStateAction } from "react";

import CodeBlock from "@/shared/CodeBlock";
import ModalBackground from "@/shared/ModalBackground";
import ModalContainer from "@/shared/ModalContainer";
import { getInstallCode } from "@/shared/utils/getInstallCode";
import type { Modal } from "@/types";

interface GuideInstallProjectModalProps {
  text: string;
  apiKeyInstallModal: string;
  setIsOpenModal: Dispatch<SetStateAction<Modal>>;
}

function GuideInstallProjectModal({
  text,
  apiKeyInstallModal,
  setIsOpenModal,
}: GuideInstallProjectModalProps): JSX.Element {
  const installCode = getInstallCode(apiKeyInstallModal);

  return (
    <ModalBackground setIsOpenModal={setIsOpenModal}>
      <ModalContainer modalTitle={"연동 스크립트"} setIsOpenModal={setIsOpenModal}>
        <div className="my-5 flex justify-center text-center">{text}</div>
        <CodeBlock title={"스크립트"} code={installCode} />
      </ModalContainer>
    </ModalBackground>
  );
}

export default GuideInstallProjectModal;
