import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

import ProjectPreview from "../features/ProjectPreview";
import ToastCard from "../features/ToastCard";
import ToastEditorSample from "../features/ToastEditorSample";
import { DESC_REDIRECT_API_KEY_ACCESS } from "../shared/constant";
import { supabase } from "../shared/supabase";
import ToastRedirectGuide from "../widgets/ToastRedirectGuide";
import ToastSaveSuccess from "../widgets/ToastSaveSuccess";
import RedirectModal from "../widgets/modals/RedirectModal";

function PageProjectSample({ sampleProject, setSampleProject }) {
  const [isMatchedProject, setIsMatchedProject] = useState(true);
  const [toastList, setToastList] = useState([]);
  const [indexToastForEdit, setIndexToastForEdit] = useState(0);
  const [previewNode, setPreviewNode] = useState(null);
  const [toastShown, setToastShown] = useState({
    isRedirect: false,
    isToastSaved: false,
  });
  const firstToast = toastList.length > 0 ? toastList[0] : null;
  const sendToastInput = useCallback(
    (toastInput) => {
      if (!isMatchedProject) {
        return;
      }

      if (previewNode?.contentWindow) {
        previewNode.contentWindow.postMessage(toastInput, sampleProject.link);
      }
    },
    [isMatchedProject, previewNode?.contentWindow, sampleProject.link],
  );

  function handleToastCardClick(index) {
    setIndexToastForEdit(index);
    sendToastInput(toastList[index]);
  }

  function handleNewToastButtonClick() {
    setToastShown((prev) => ({ ...prev, isRedirect: true }));
    setTimeout(() => setToastShown((prev) => ({ ...prev, isRedirect: false })), 2000);
  }

  useEffect(() => {
    let sampleProjectId;
    async function getProject() {
      const { data: projectResult, error } = await supabase
        .from("project_sample")
        .select("*")
        .eq("id", import.meta.env.VITE_SAMPLE_PROJECT_ID);

      if (!projectResult) {
        throw new Error(error.message);
      }

      setSampleProject(projectResult[0]);
      sampleProjectId = projectResult[0].id;
      getToastList(sampleProjectId);
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
            getToastList(sampleProjectId);
          }
        },
      )
      .subscribe();

    return () => channels.unsubscribe();
  }, [setSampleProject]);

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

      if (sampleProject.link.includes(e.origin)) {
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
  }, [isMatchedProject, sampleProject?.link, toastList, indexToastForEdit]);

  return (
    <div className="flex h-fit w-screen flex-col gap-1 overflow-scroll px-3 md:flex-row [&::-webkit-scrollbar]:hidden">
      <section className="flex h-fit w-full min-w-fit flex-col md:mx-3 md:h-[90vh] md:w-[13vw] md:gap-5">
        <div className="flex w-full flex-col">
          <h3
            id="titleToastList"
            className="mt-3 mb-1 font-bold text-base text-gray-900 md:mb-3 md:text-xl"
          >
            토스트 리스트
          </h3>
          <div className="flex gap-2 md:flex-col">
            <div className="flex gap-1 md:flex-col md:gap-5">
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
            <button
              type="button"
              id="createToastButton"
              onClick={handleNewToastButtonClick}
              className="invisible absolute w-xl rounded border border-gray-500 p-2 text-base hover:bg-blue-100 md:visible md:static md:h-14"
            >
              + 새로운 토스트
            </button>
          </div>
        </div>
      </section>
      <section className="flex h-[50vh] w-[95vw] flex-col gap-5 rounded md:h-[90vh] md:w-[70vw] md:border-none">
        <ProjectPreview
          project={sampleProject}
          ref={setPreviewNode}
          isMatchedProject={isMatchedProject}
          setIsMatchedProject={setIsMatchedProject}
          sendToastInput={sendToastInput}
          firstToast={firstToast}
        />
      </section>
      <section className="flex h-[50vh] w-[95vw] min-w-fit flex-col gap-5 md:h-[90vh] md:w-[20vw]">
        {indexToastForEdit >= 0 && toastList.length > 0 ? (
          <>
            <ToastEditorSample
              toast={toastList[indexToastForEdit]}
              setToastList={setToastList}
              previewNode={previewNode}
              project={sampleProject}
              sendToastInput={sendToastInput}
              setToastShown={setToastShown}
            />
          </>
        ) : (
          <>
            <div id="titleNewToast" className="w-full bg-gray-200 p-3">
              <span>토스트를 불러오고 있어요</span>
            </div>
          </>
        )}
      </section>
      {!isMatchedProject && <RedirectModal text={DESC_REDIRECT_API_KEY_ACCESS} route={"/"} />}
      <ToastSaveSuccess
        isToastSaved={toastShown.isToastSaved}
        title={"토스트가 저장되었어요"}
        description={"웹사이트에서 적용된 토스트를 확인해보세요!"}
      />
      <ToastRedirectGuide
        isRedirect={toastShown.isRedirect}
        title={"로그인, 연동 후 이용가능해요"}
        description={"샘플 에디터 미지원 기능은 로그인 후 이용해보세요!"}
      />
    </div>
  );
}

export default PageProjectSample;

PageProjectSample.propTypes = {
  sampleProject: PropTypes.object.isRequired,
  setSampleProject: PropTypes.func.isRequired,
};
