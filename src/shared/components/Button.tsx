interface ButtonProps {
  text: string;
  onClick: () => void;
}

function Button({ text, onClick }: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-fit rounded border border-black border-solid bg-black px-5 py-2 font-bold text-white text-xs hover:border-transparent hover:bg-gray-700 md:text-sm"
    >
      {text}
    </button>
  );
}

export default Button;
