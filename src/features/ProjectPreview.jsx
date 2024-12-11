import PropTypes from "prop-types";

function ProjectPreview({ project }) {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full border-2 border-solid">미리보기 콘텐츠</div>
      <div className="w-full h-full">
        <iframe
          id="projectPreview"
          title="projectPreview"
          src={project.link}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default ProjectPreview;

ProjectPreview.propTypes = {
  project: PropTypes.object.isRequired,
};
