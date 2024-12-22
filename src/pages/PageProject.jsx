import { useState } from "react";
import { useLocation } from "react-router-dom";

import ProjectPreview from "../features/ProjectPreview";
import ToastCardList from "../features/ToastCardList";

function PageProject() {
  const location = useLocation();
  const project = location.state?.project;
  const [previewRef, setPreviewRef] = useState(null);

  return (
    <div className="flex h-screen w-screen gap-5 px-2">
      <section className="flex h-[90vh] w-[10vw] flex-col gap-5 border-2 border-solid">
        <div className="flex">
          <h3 className="mb-4 font-bold text-gray-900 text-xl">토스트 리스트</h3>
        </div>
      </section>
      <section className="flex h-[90vh] w-[70vw] flex-col gap-5 border-2 border-solid">
        <div className="flex justify-between">
          <h3 className="mb-4 font-bold text-gray-900 text-xl">미리 보기</h3>
        </div>
        <div className="h-full w-full">
          <ProjectPreview project={project} setPreviewRef={setPreviewRef} />
        </div>
      </section>
      <section className="flex h-[90vh] w-[20vw] flex-col gap-5 border-2 border-solid">
        <div className="flex flex-col">
          <h3 className="mb-4 font-bold text-gray-900 text-xl">토스트 에디터</h3>
        </div>
        <ToastCardList project={project} previewRef={previewRef} />
      </section>
    </div>
  );
}

export default PageProject;
