import PropTypes from "prop-types";
import { forwardRef, useEffect, useState } from "react";
import Loading from "../shared/Loading";

const ProjectPreview = forwardRef(function ProjectPreview({ project }, ref) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function handlePreviewLoad(e) {
      if (project.link.includes(e.origin) && e.data.isPreviewLoaded) {
        setIsLoading(false);
      }
      return;
    }

    window.addEventListener("message", handlePreviewLoad);

    return () => window.removeEventListener("message", handlePreviewLoad);
  }, [project?.link]);

  return (
    <div className="flex h-full w-full justify-center px-1">
      {isLoading && (
        <div className="mt-10 p-10">
          <Loading />
        </div>
      )}
      <iframe
        id="projectPreview"
        title="projectPreview"
        ref={ref}
        src={project?.link}
        loading="lazy"
        className={`${isLoading ? "h-1 w-1" : "h-full w-full"} rounded-sm p-1`}
      />
    </div>
  );
});

ProjectPreview.displayName = "ProjectPreview";

export default ProjectPreview;

ProjectPreview.propTypes = {
  project: PropTypes.object,
};
