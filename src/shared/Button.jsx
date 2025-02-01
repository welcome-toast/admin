import PropTypes from "prop-types";

function Button({ text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-fit rounded border-2 border-black border-solid bg-black px-5 py-2 font-bold text-white text-xs hover:border-transparent hover:bg-gray-700 md:text-sm"
    >
      {text}
    </button>
  );
}

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
