import PropTypes from "prop-types";

function ProjectCard({ project, handleProjectClick }) {
  return (
    <div>
      <button
        key={project.id}
        type="button"
        onClick={() => handleProjectClick(project.id)}
        className="rounded border-2 border-solid bg-black p-10 text-white"
      >
        <ul className="flex gap-3">
          <li>{project.name}</li>
          <li>{project.created_at}</li>
          <li>{project.link}</li>
          <li>{project.is_installed ? "true" : "false"}</li>
        </ul>
      </button>
    </div>
  );
}

export default ProjectCard;

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  handleProjectClick: PropTypes.func.isRequired,
};
