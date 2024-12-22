import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ProjectPreview from "../features/ProjectPreview";
import ToastCardEditor from "../features/ToastCardEditor";
import { supabase } from "../shared/supabase";

function PageProject() {
  const location = useLocation();
  const project = location.state?.project;
  const [previewRef, setPreviewRef] = useState(null);
  const [toastList, setToastList] = useState([]);

  useEffect(() => {
    async function getToastList() {
      const { data: resultToastList, error } = await supabase
        .from("toast")
        .select("*")
        .eq("project_id", project.id);

      if (error !== null) {
        throw new Error(error);
      }

      if (resultToastList.length > 0) {
        setToastList(resultToastList);
      }
    }
    getToastList();

    const channels = supabase
      .channel("custom-all-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "toast" }, (payload) => {
        if (payload.eventType !== null) {
          getToastList();
        }
      })
      .subscribe();

    return () => channels.unsubscribe();
  }, [project.id]);

  useEffect(() => {
    function setTargetElementId(e) {
      const targetElementId = e.data.target;

      if (targetElementId === "") {
        return;
      }

      if (project.link.includes(e.origin)) {
        setToastList(
          toastList.map((el) => {
            return { ...el, target_element_id: targetElementId };
          }),
        );
      }
      return;
    }

    window.addEventListener("message", setTargetElementId);

    return () => window.removeEventListener("message", setTargetElementId);
  }, [project.link, toastList]);

  return (
    <div className="mt-32 flex h-screen w-screen gap-5 px-2">
      <section className="flex h-[90vh] w-[10vw] flex-col gap-5 border-2 border-solid">
        <div className="flex flex-col">
          <h3 className="mb-4 font-bold text-gray-900 text-xl">토스트 리스트</h3>
          {toastList.map((toastSaved) => (
            <div key={toastSaved.id}>{toastSaved.name}</div>
          ))}
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
        {toastList.length > 0 ? (
          <ToastCardEditor
            toast={toastList[0]}
            setToast={setToastList}
            previewRef={previewRef}
            project={project}
          />
        ) : (
          <button type="button">button</button>
        )}
      </section>
    </div>
  );
}

export default PageProject;
