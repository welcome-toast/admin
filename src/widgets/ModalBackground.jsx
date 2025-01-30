import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function ModalBackground({ children, setIsOpenModal, canCloseBackgroundClick = true }) {
  const backgroundRef = useRef(null);

  useEffect(() => {
    function handleModalBackgroundClick(event) {
      if (event?.target === backgroundRef.current) {
        setIsOpenModal(false);
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
      className="fixed top-0 left-0 flex h-screen w-full items-center justify-center gap-5 border-2 border-black border-solid bg-black bg-opacity-70 p-18"
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
