import PropTypes from "prop-types";

import { useRef, useState } from "react";
import ActionCardList from "./ActionCardList";
import ProjectPreview from "./ProjectPreview";

const initialAction = {
  id: "",
  name: "",
  type: "",
  target_element_id: "",
  message_title: "",
  message_body: "",
  image_url: "",
  message_button_color: "#000000",
  background_opacity: "20",
  project_id: "",
  created_at: "",
  updated_at: "",
};

function ProjectSetting({ project }) {
  const [action, setAction] = useState(initialAction);
  const [previewRef, setPreviewRef] = useState(null);
  const isActionSavedRef = useRef(false);

  return (
    <div className="flex gap-10">
      <section
        className={`flex h-[90vh] ${action.id === "" ? "w-[40vw]" : "w-[20vw]"} flex-col gap-5 border-2 border-solid`}
      >
        <div className="flex flex-col">
          <h3 className="mb-4 font-bold text-gray-900 text-xl">액션 에디터</h3>
          <span className="">{action.id === "" ? "새로운 액션을 생성해주세요" : null}</span>
        </div>
        <ActionCardList
          project={project}
          action={action}
          setAction={setAction}
          previewRef={previewRef}
          isActionSavedRef={isActionSavedRef}
        />
      </section>
      {action.id === "" ? null : (
        <section className="flex h-[90vh] w-[70vw] flex-col gap-5 border-2 border-solid">
          <div className="flex justify-between">
            <h3 className="mb-4 font-bold text-gray-900 text-xl">미리 보기</h3>
          </div>
          <div className="h-full w-full">
            <ProjectPreview project={project} action={action} setPreviewRef={setPreviewRef} />
          </div>
        </section>
      )}
    </div>
  );
}

export default ProjectSetting;

ProjectSetting.propTypes = {
  project: PropTypes.object,
};
