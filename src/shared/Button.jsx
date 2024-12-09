import PropTypes from "prop-types";

function Button({ text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-solid border-2 rounded text-white font-medium bg-black border-black hover:bg-zinc-800	hover:border-transparent px-5 py-2"
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
