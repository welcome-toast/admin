import { useEffect, useState } from "react";

import ProjectPreview from "../features/ProjectPreview";
import ToastCard from "../features/ToastCard";
import ToastEditorSample from "../features/ToastEditorSample";
import { DESC_REDIRECT_API_KEY_ACCESS, INITIAL_PROJECTS, INITIAL_TOAST } from "../shared/constant";
import { supabase } from "../shared/supabase";
import RedirectModal from "../widgets/modals/RedirectModal";

function PageProjectSample() {
  const [project, setProject] = useState(INITIAL_PROJECTS[0]);
  const [isMatchedProject, setIsMatchedProject] = useState(true);
  const [toastList, setToastList] = useState([]);
  const [indexToastForEdit, setIndexToastForEdit] = useState(0);
  const [isToastSaved, setIsToastSaved] = useState(false);
  const [previewNode, setPreviewNode] = useState(null);

  function sendToastInput(toastInput) {
    if (!isMatchedProject) {
      return;
    }
    previewNode.contentWindow.postMessage(toastInput, project.link);
  }

  function handleToastCardClick(index) {
    setIndexToastForEdit(index);
    sendToastInput(toastList[index]);
    setIsToastSaved(false);
  }

  function handleNewToastButtonClick() {
    setIndexToastForEdit(-1);
  }

  useEffect(() => {
    let projectId;
    async function getProject() {
      const { data: project, error } = await supabase
        .from("project_sample")
        .select("*")
        .eq("id", import.meta.env.VITE_SAMPLE_PROJECT_ID);

      if (!project) {
        throw new Error(error.message);
      }

      setProject(project[0]);
      projectId = project[0].id;
      getToastList(projectId);
    }
    getProject();

    async function getToastList(projectId) {
      const { data: resultToastList, error } = await supabase
        .from("toast_sample")
        .select("*")
        .eq("project_id", projectId)
        .order("id", { ascending: true });

      if (error !== null) {
        throw new Error(error);
      }

      if (resultToastList.length > 0) {
        setToastList(resultToastList);
      }
    }
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "toast_sample" },
        (payload) => {
          if (payload.eventType !== null) {
            getToastList(projectId);
          }
        },
      )
      .subscribe();

    return () => channels.unsubscribe();
  }, []);

  useEffect(() => {
    function setTargetElementId(e) {
      if (!isMatchedProject) {
        return;
      }
      const targetElementId = e.data.target;

      if (
        targetElementId === "" ||
        targetElementId === null ||
        targetElementId === undefined ||
        targetElementId.includes("welcomeToast")
      ) {
        return;
      }

      if (project.link.includes(e.origin)) {
        setToastList(
          toastList.map((toast, index) => {
            return index === indexToastForEdit
              ? { ...toast, target_element_id: targetElementId }
              : { ...toast };
          }),
        );
      }
      return;
    }

    window.addEventListener("message", setTargetElementId);
    return () => window.removeEventListener("message", setTargetElementId);
  }, [isMatchedProject, project?.link, toastList, indexToastForEdit]);

  return (
    <div className="flex h-fit w-screen overflow-scroll px-3 [&::-webkit-scrollbar]:hidden">
      {!isMatchedProject && <RedirectModal text={DESC_REDIRECT_API_KEY_ACCESS} route={"/"} />}
      <section className="mx-3 flex h-[90vh] w-[13vw] flex-col gap-5">
        <div className="flex w-full flex-col ">
          <h3 id="titleToastList" className="mt-3 mb-3 font-bold text-gray-900 text-xl">
            토스트 리스트
          </h3>
          <div className="flex flex-col gap-5">
            {toastList.map((toastSaved, index) => (
              <ToastCard
                key={toastSaved.id}
                toastSaved={toastSaved}
                index={index}
                indexToastForEdit={indexToastForEdit}
                handleToastCardClick={() => handleToastCardClick(index)}
              />
            ))}
          </div>
          <div className="mt-5">
            <button
              type="button"
              id="createToastButton"
              onClick={handleNewToastButtonClick}
              className="h-14 w-full rounded border-2 border-gray-500 text-base hover:bg-blue-100"
            >
              + 새로운 토스트
            </button>
          </div>
        </div>
      </section>
      <section className="flex h-[90vh] w-[70vw] flex-col gap-5 px-1">
        <div className="h-full w-full">
          <ProjectPreview
            project={project}
            ref={setPreviewNode}
            isMatchedProject={isMatchedProject}
            setIsMatchedProject={setIsMatchedProject}
          />
        </div>
      </section>
      <section className="flex h-[90vh] w-[20vw] flex-col gap-5">
        {indexToastForEdit >= 0 && toastList.length > 0 ? (
          <>
            <ToastEditorSample
              toast={toastList[indexToastForEdit]}
              setToastList={setToastList}
              previewNode={previewNode}
              project={project}
              sendToastInput={sendToastInput}
              isToastSaved={isToastSaved}
              setIsToastSaved={setIsToastSaved}
            />
          </>
        ) : (
          <>
            <div id="titleNewToast" className="w-full bg-gray-200 p-3">
              <span>새로운 토스트를 만들어보세요</span>
            </div>
            <ToastEditorSample
              toast={INITIAL_TOAST}
              setToastList={setToastList}
              previewNode={previewNode}
              project={project}
              sendToastInput={sendToastInput}
              isToastSaved={isToastSaved}
              setIsToastSaved={setIsToastSaved}
            />
          </>
        )}
      </section>
    </div>
  );
}

export default PageProjectSample;
