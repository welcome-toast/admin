import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ProjectPreview from "../features/ProjectPreview";
import ToastCardEditor from "../features/ToastCardEditor";
import { supabase } from "../shared/supabase";

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

function PageProject() {
  const location = useLocation();
  const project = location.state?.project;
  const [previewRef, setPreviewRef] = useState(null);
  const [toastList, setToastList] = useState([]);
  const [indexToastForEdit, setIndexToastForEdit] = useState(0);

  function handleToastCardClick(index) {
    setIndexToastForEdit(index);
    return;
  }

  function handleNewToastButtonClick() {
    setIndexToastForEdit(-1);
    return;
  }

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
        <div className="flex flex-col gap-5">
          <h3 className="mb-4 font-bold text-gray-900 text-xl">토스트 리스트</h3>
          {toastList.map((toastSaved, index) => (
            <button
              type="button"
              key={toastSaved.id}
              onClick={() => handleToastCardClick(index)}
              className="flex flex-col gap-1 border-2"
            >
              <span className="mb-1 font-bold text-gray-900 text-xl">{toastSaved.name}</span>
              <span className="mb-1 text-gray-900 text-l">{toastSaved.message_title}</span>
              <span className="mb-1 text-gray-500">업데이트 {toastSaved.updated_at}</span>
            </button>
          ))}
          <div className="mb-5">
            <button
              type="button"
              onClick={handleNewToastButtonClick}
              className="h-14 w-full border-2 border-black text-2xl"
            >
              +
            </button>
          </div>
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
          <h3 className="font-bold text-gray-900 text-xl">토스트 에디터</h3>
        </div>
        {indexToastForEdit >= 0 && toastList.length > 0 ? (
          <>
            <div className="w-full bg-slate-200 p-3">
              <span>{toastList[indexToastForEdit].name}</span>
            </div>
            <ToastCardEditor
              toast={toastList[indexToastForEdit]}
              setToastList={setToastList}
              previewRef={previewRef}
              project={project}
            />
          </>
        ) : (
          <>
            <div className="w-full bg-slate-200 p-3">
              <span>새로운 토스트를 만들어보세요</span>
            </div>
            <ToastCardEditor
              toast={initialToast}
              setToastList={setToastList}
              previewRef={previewRef}
              project={project}
            />
          </>
        )}
      </section>
    </div>
  );
}

export default PageProject;
