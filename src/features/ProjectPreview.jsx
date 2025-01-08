import PropTypes from "prop-types";
import { forwardRef } from "react";

const ProjectPreview = forwardRef(function ProjectPreview({ project }, ref) {
  return (
    <div className="h-full w-full px-1">
      <iframe
        id="projectPreview"
        title="projectPreview"
        ref={ref}
        src={project.link}
        loading="lazy"
        className="h-full w-full rounded-sm p-1"
      />
    </div>
  );
});

ProjectPreview.displayName = "ProjectPreview";

export default ProjectPreview;

ProjectPreview.propTypes = {
  project: PropTypes.object.isRequired,
};
