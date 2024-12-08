import PropTypes from "prop-types";

function Button({ text }) {
  return (
    <button
      type="button"
      className="border-solid border-2 rounded text-white font-medium bg-black border-black hover:bg-zinc-800	hover:border-transparent px-5 py-2"
    >
      {text}
    </button>
  );
}

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
};
