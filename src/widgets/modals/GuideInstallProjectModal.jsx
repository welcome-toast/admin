import PropTypes from "prop-types";
import ModalBackground from "../../shared/ModalBackground";
import ModalContainer from "../../shared/ModalContainer";

function GuideInstallProjectModal({ text, setIsOpenModal }) {
  return (
    <ModalBackground setIsOpenModal={setIsOpenModal}>
      <ModalContainer modalTitle={"연동 스크립트"} setIsOpenModal={setIsOpenModal}>
        <div className="my-5 flex justify-center text-center">{text}</div>
      </ModalContainer>
    </ModalBackground>
  );
}

export default GuideInstallProjectModal;

GuideInstallProjectModal.propTypes = {
  text: PropTypes.string.isRequired,
  setIsOpenModal: PropTypes.func,
};
