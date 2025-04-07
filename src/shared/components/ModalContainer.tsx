import type { Dispatch, SetStateAction } from "react";

import { INITIAL_MODAL } from "@/shared/constants";
import type { Modal } from "@/types";

import CloseIcon from "@/shared/Icon/CloseIcon";

interface ModalContainerProps {
  children: React.ReactNode;
  modalTitle: string;
  hasCloseButton?: boolean;
  setIsOpenModal?: Dispatch<SetStateAction<Modal>>;
}

function ModalContainer({
  children,
  modalTitle,
  hasCloseButton = true,
  setIsOpenModal,
}: ModalContainerProps): JSX.Element {
  function handleCloseButtonClick() {
    setIsOpenModal?.(INITIAL_MODAL);
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
