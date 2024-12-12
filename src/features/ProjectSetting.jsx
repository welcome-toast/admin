import PropTypes from "prop-types";

import { useState } from "react";
import ActionCardList from "./ActionCardList";
import ProjectPreview from "./ProjectPreview";

function ProjectSetting({ user, project }) {
  const [previewRef, setPreviewRef] = useState(null);

  return (
    <div className="flex gap-10">
      <section className="flex flex-col gap-5 border-2 border-solid w-[20vw] h-[90vh]">
        <div className="flex justify-between">
          <h3 className="mb-4 text-xl font-bold text-gray-900">액션 에디터</h3>
        </div>
        <ActionCardList user={user} project={project} previewRef={previewRef} />
      </section>
      <section className="flex flex-col gap-5 border-2 border-solid w-[70vw] h-[90vh]">
        <div className="flex justify-between">
          <h3 className="mb-4 text-xl font-bold text-gray-900">미리 보기</h3>
        </div>
        <div className="w-full h-full">
          <ProjectPreview project={project} setPreviewRef={setPreviewRef} />
        </div>
      </section>
    </div>
  );
}

export default ProjectSetting;

ProjectSetting.propTypes = {
  user: PropTypes.object,
  project: PropTypes.object,
};
