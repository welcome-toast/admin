import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProjectPreview from "../features/ProjectPreview";
import ToastCard from "../features/ToastCard";
import ToastCardEditor from "../features/ToastCardEditor";
import { INITIAL_TOAST } from "../shared/constant";
import { supabase } from "../shared/supabase";

function PageProject() {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;
  const [previewNode, setPreviewNode] = useState(null);
  const [isMatchedProject, setIsMatchedProject] = useState(false);
  const [toastList, setToastList] = useState([]);
  const [indexToastForEdit, setIndexToastForEdit] = useState(0);
  const [isToastSaved, setIsToastSaved] = useState(false);

  function sendToastInput(toastInput) {
    if (!isMatchedProject) {
      return;
    }

    const {
      name,
      type,
      target_element_id,
      message_title,
      message_body,
      image_url,
      message_button_color,
      background_opacity,
    } = toastInput;

    previewNode.contentWindow.postMessage(
      {
        name,
        type,
        target_element_id,
        message_title,
        message_body,
        image_url,
        message_button_color,
        background_opacity,
      },
      project.link,
    );
  }

  function handleToastCardClick(index) {
    setIndexToastForEdit(index);
    sendToastInput(toastList[index]);
    setIsToastSaved(false);
    return;
  }

  function handleNewToastButtonClick() {
    setIndexToastForEdit(-1);
    return;
  }

  useEffect(() => {
    if (project !== undefined) {
      async function getToastList() {
        const { data: resultToastList, error } = await supabase
          .from("toast")
          .select("*")
          .eq("project_id", project?.id)
          .order("id", { ascending: false });

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
    }
  }, [project]);

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

  useEffect(() => {
    if (project === undefined) {
      navigate("/project");
      return;
    }
  }, [project, navigate]);

  return (
    <div className="flex h-fit w-screen overflow-scroll px-3 [&::-webkit-scrollbar]:hidden">
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
              className="h-14 w-full rounded border-2 border-gray-500 text-base hover:bg-indigo-50"
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
            setIsMatchedProject={setIsMatchedProject}
          />
        </div>
      </section>
      <section className="flex h-[90vh] w-[20vw] flex-col gap-5">
        {indexToastForEdit >= 0 && toastList.length > 0 ? (
          <>
            <ToastCardEditor
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
            <ToastCardEditor
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

export default PageProject;
