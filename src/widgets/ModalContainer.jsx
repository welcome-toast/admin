import PropTypes from "prop-types";
import CloseIcon from "../shared/Icon/CloseIcon";

function ModalContainer({ children, modalTitle, setIsOpenModal }) {
  function handleCloseButtonClick() {
    setIsOpenModal(false);
  }

  return (
    <div className="w-full max-w-lg rounded bg-white p-10 md:w-lg">
      <div className="flex justify-between">
        <h3 className="font-bold text-gray-900 text-xl">{modalTitle}</h3>
        <button type="button" onClick={handleCloseButtonClick}>
          <CloseIcon />
        </button>
      </div>
      {children}
    </div>
  );
}

export default ModalContainer;

ModalContainer.propTypes = {
  children: PropTypes.object.isRequired,
  modalTitle: PropTypes.string.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
};
