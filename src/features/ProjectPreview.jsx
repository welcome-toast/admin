import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function ProjectPreview({ project, setPreviewRef }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    setPreviewRef(iframeRef);
  }, [setPreviewRef]);

  return (
    <div className="h-full w-full">
      <div className="flex w-full flex-col border-2 border-solid">미리보기 콘텐츠</div>
      <div className="h-full w-full">
        <iframe
          id="projectPreview"
          title="projectPreview"
          ref={iframeRef}
          src={project.link}
          className="h-full w-full"
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
