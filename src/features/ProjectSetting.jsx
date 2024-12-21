import PropTypes from "prop-types";

import { useState } from "react";
import ProjectPreview from "./ProjectPreview";
import ToastCardList from "./ToastCardList";

function ProjectSetting({ project }) {
  const [previewRef, setPreviewRef] = useState(null);

  return (
    <div className="flex gap-10">
      <section className="flex h-[90vh] w-[20vw] flex-col gap-5 border-2 border-solid">
        <div className="flex flex-col">
          <h3 className="mb-4 font-bold text-gray-900 text-xl">토스트 에디터</h3>
        </div>
        <ToastCardList project={project} previewRef={previewRef} />
      </section>
      <section className="flex h-[90vh] w-[70vw] flex-col gap-5 border-2 border-solid">
        <div className="flex justify-between">
          <h3 className="mb-4 font-bold text-gray-900 text-xl">미리 보기</h3>
        </div>
        <div className="h-full w-full">
          <ProjectPreview project={project} setPreviewRef={setPreviewRef} />
        </div>
      </section>
    </div>
  );
}

export default ProjectSetting;

ProjectSetting.propTypes = {
  project: PropTypes.object,
};
