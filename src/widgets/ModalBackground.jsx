import PropTypes from "prop-types";

function ModalBackground({ children }) {
  return (
    <div className="fixed top-0 left-0 flex h-screen w-full flex-col items-center justify-center gap-5 border-2 border-black border-solid bg-black bg-opacity-70 p-18">
      {children}
    </div>
  );
}

export default ModalBackground;

ModalBackground.propTypes = {
  children: PropTypes.object.isRequired,
};
