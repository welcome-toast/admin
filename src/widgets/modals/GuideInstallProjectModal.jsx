import PropTypes from "prop-types";
import CodeBlock from "../../shared/CodeBlock";
import ModalBackground from "../../shared/ModalBackground";
import ModalContainer from "../../shared/ModalContainer";
import { getInstallCode } from "../../shared/utils/getInstallCode";

function GuideInstallProjectModal({ text, apiKeyInstallModal, setIsOpenModal }) {
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

GuideInstallProjectModal.propTypes = {
  text: PropTypes.string.isRequired,
  apiKeyInstallModal: PropTypes.string.isRequired,
  setIsOpenModal: PropTypes.func,
};
