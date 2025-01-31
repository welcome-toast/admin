import PropTypes from "prop-types";
import Button from "../../shared/Button";
import ModalBackground from "../../shared/ModalBackground";
import ModalContainer from "../../shared/ModalContainer";

function ConfirmModal({ action, description, setIsOpenModal }) {
  return (
    <ModalBackground setIsOpenModal={setIsOpenModal}>
      <ModalContainer modalTitle={action} setIsOpenModal={setIsOpenModal}>
        <div className="my-10 flex justify-center text-center">{description}</div>
        <div className="mt-5 flex justify-center">
          <Button text={action} />
        </div>
      </ModalContainer>
    </ModalBackground>
  );
}

export default ConfirmModal;

ConfirmModal.propTypes = {
  action: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
};
