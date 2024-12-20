import PropTypes from "prop-types";

import { useRef, useState } from "react";
import ProjectPreview from "./ProjectPreview";
import ToastCardList from "./ToastCardList";

const initialToast = {
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
  const [toast, setToast] = useState(initialToast);
  const [previewRef, setPreviewRef] = useState(null);
  const isToastSavedRef = useRef(false);

  return (
    <div className="flex gap-10">
      <section
        className={`flex h-[90vh] ${toast.id === "" ? "w-[40vw]" : "w-[20vw]"} flex-col gap-5 border-2 border-solid`}
      >
        <div className="flex flex-col">
          <h3 className="mb-4 font-bold text-gray-900 text-xl">토스트 에디터</h3>
          <span className="">{toast.id === "" ? "새로운 토스트를 생성해주세요" : null}</span>
        </div>
        <ToastCardList
          project={project}
          toast={toast}
          setToast={setToast}
          previewRef={previewRef}
          isToastSavedRef={isToastSavedRef}
        />
      </section>
      {toast.id === "" ? null : (
        <section className="flex h-[90vh] w-[70vw] flex-col gap-5 border-2 border-solid">
          <div className="flex justify-between">
            <h3 className="mb-4 font-bold text-gray-900 text-xl">미리 보기</h3>
          </div>
          <div className="h-full w-full">
            <ProjectPreview project={project} toast={toast} setPreviewRef={setPreviewRef} />
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
