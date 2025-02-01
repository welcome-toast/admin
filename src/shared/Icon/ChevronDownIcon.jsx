import PropTypes from "prop-types";

function ChevronDownIcon({ color }) {
  return (
    <svg
      id="CheckIcon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={`${color}`}
      className="size-4"
    >
      <title id="ChevronDownIcon">ChevronDownIcon</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export default ChevronDownIcon;

ChevronDownIcon.propTypes = {
  color: PropTypes.string.isRequired,
};
