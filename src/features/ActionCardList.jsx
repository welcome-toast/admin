import PropTypes from "prop-types";

import ActionCard from "./ActionCard";

function ActionCardList({ user, project }) {
  return (
    <div className="flex flex-col w-full border-2 border-solid">
      <ActionCard user={user} project={project} />
    </div>
  );
}

export default ActionCardList;

ActionCardList.propTypes = {
  user: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};
