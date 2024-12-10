import ActionCardEditor from "./ActionCardEditor";
import ActionCardHeader from "./ActionCardHeader";

function ActionCard() {
  return (
    <div className="flex flex-col gap-5 px-5 mx-10 border-2 border-black rounded">
      <ActionCardHeader />
      <ActionCardEditor />
    </div>
  );
}

export default ActionCard;
