import PropTypes from "prop-types";
import CloseIcon from "../shared/Icon/CloseIcon";

function ModalContainer({ ModalTitle, setIsOpenModal }) {
  function handleCloseButtonClick() {
    setIsOpenModal(false);
  }

  return (
    <div className="w-full rounded bg-white p-10 md:w-1/3">
      <div className="flex justify-between">
        <h3 className="font-bold text-gray-900 text-xl">{ModalTitle}</h3>
        <button type="button" onClick={handleCloseButtonClick}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default ModalContainer;

ModalContainer.propTypes = {
  ModalTitle: PropTypes.string.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
};
