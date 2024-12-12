import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function ProjectPreview({ project, setPreviewRef }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    setPreviewRef(iframeRef);
  }, [setPreviewRef]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full border-2 border-solid">미리보기 콘텐츠</div>
      <div className="w-full h-full">
        <iframe
          id="projectPreview"
          title="projectPreview"
          ref={iframeRef}
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
  setPreviewRef: PropTypes.func.isRequired,
};
