import PropTypes from "prop-types";
import CloseIcon from "../shared/Icon/CloseIcon";
import { INITIAL_MODAL } from "./constant";

function ModalContainer({ children, modalTitle, hasCloseButton = true, setIsOpenModal }) {
  function handleCloseButtonClick() {
    setIsOpenModal(INITIAL_MODAL);
  }

  return (
    <div className="w-full max-w-lg rounded bg-white p-10 md:w-lg">
      <div className="flex justify-between">
        <h3 className="font-bold text-gray-900 text-xl">{modalTitle}</h3>
        {hasCloseButton && (
          <button type="button" onClick={handleCloseButtonClick}>
            <CloseIcon />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export default ModalContainer;

ModalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  modalTitle: PropTypes.string.isRequired,
  hasCloseButton: PropTypes.bool,
  setIsOpenModal: PropTypes.func,
};
