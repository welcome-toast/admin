import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function ProjectPreview({ project, setPreviewRef }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    setPreviewRef(iframeRef);
  }, [setPreviewRef]);

  return (
    <div className="h-full w-full px-1">
      <iframe
        id="projectPreview"
        title="projectPreview"
        ref={iframeRef}
        src={project.link}
        loading="lazy"
        className="h-full w-full rounded-sm p-1"
      />
    </div>
  );
}

export default ProjectPreview;

ProjectPreview.propTypes = {
  project: PropTypes.object.isRequired,
  setPreviewRef: PropTypes.func.isRequired,
};
