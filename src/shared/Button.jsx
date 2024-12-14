import PropTypes from "prop-types";

function Button({ text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded border-2 border-black border-solid bg-black px-5 py-2 font-medium text-white hover:border-transparent hover:bg-zinc-800"
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
