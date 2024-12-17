import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function ProjectPreview({ project, action, setPreviewRef }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    setPreviewRef(iframeRef);
  }, [setPreviewRef]);

  if (action.id === "") {
    return null;
  }

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
  action: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    target_element_id: PropTypes.string,
    message_title: PropTypes.string,
    message_body: PropTypes.string,
    message_button_color: PropTypes.string,
    background_opacity: PropTypes.string,
    project_id: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  setPreviewRef: PropTypes.func.isRequired,
};
