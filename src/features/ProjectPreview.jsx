import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function ProjectPreview({ project, setPreviewRef }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    setPreviewRef(iframeRef);
  }, [setPreviewRef]);

  return (
    <div className="h-full w-full">
      <iframe
        id="projectPreview"
        title="projectPreview"
        ref={iframeRef}
        src={project.link}
        loading="lazy"
        className="h-full w-full"
      />
    </div>
  );
}

export default ProjectPreview;

ProjectPreview.propTypes = {
  project: PropTypes.object.isRequired,
  setPreviewRef: PropTypes.func.isRequired,
};
