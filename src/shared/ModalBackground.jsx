import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { INITIAL_MODAL } from "./constant";

function ModalBackground({ children, setIsOpenModal, canCloseBackgroundClick = true }) {
  const backgroundRef = useRef(null);

  useEffect(() => {
    function handleModalBackgroundClick(event) {
      if (event?.target === backgroundRef.current) {
        setIsOpenModal(INITIAL_MODAL);
      }
    }

    if (canCloseBackgroundClick) {
      window.addEventListener("click", handleModalBackgroundClick);
      return () => window.removeEventListener("click", handleModalBackgroundClick);
    }
  }, [setIsOpenModal, canCloseBackgroundClick]);

  return (
    <div
      ref={backgroundRef}
      className="fixed top-0 left-0 z-100 flex h-screen w-full items-center justify-center gap-5 border-2 border-black border-solid bg-black bg-opacity-70 p-18"
    >
      {children}
    </div>
  );
}

export default ModalBackground;

ModalBackground.propTypes = {
  children: PropTypes.object.isRequired,
  setIsOpenModal: PropTypes.func,
  canCloseBackgroundClick: PropTypes.bool,
};
