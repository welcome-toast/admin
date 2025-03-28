import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProjectPreview from "@/features/ProjectPreview";
import ToastCard from "@/features/ToastCard";
import ToastEditor from "@/features/ToastEditor";
import {
  DESC_REDIRECT_API_KEY_ACCESS,
  INITIAL_ERROR_MESSAGE_TOAST_INPUT,
  INITIAL_TOAST,
} from "@/shared/constant";
import { supabase } from "@/shared/supabase";
import type { Toast, ToastInput, firstToast, sendToastInput } from "@/types/toast";
import ToastSaveSuccess from "@/widgets/ToastSaveSuccess";
import ToastWarning from "@/widgets/ToastWarning";
import RedirectModal from "@/widgets/modals/RedirectModal";

type isMatchedProject = boolean;
type indexToastForEdit = number;
type PreviewNode = HTMLIFrameElement | null;

interface ToastShown {
  isToastSaved: boolean;
  warningType: string;
}
interface inputError {
  name: string;
  message_title: string;
  message_body: string;
  target_element_id: string;
}

function PageProject(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;
  const [isMatchedProject, setIsMatchedProject] = useState<isMatchedProject>(true);
  const [toastList, setToastList] = useState<Toast[]>([]);
  const [indexToastForEdit, setIndexToastForEdit] = useState<indexToastForEdit>(0);
  const [toastShown, setToastShown] = useState<ToastShown>({
    isToastSaved: false,
    warningType: "",
  });
  const [inputError, setInputError] = useState<inputError>(INITIAL_ERROR_MESSAGE_TOAST_INPUT);
  const [previewNode, setPreviewNode] = useState<PreviewNode>(null);
  const firstToast: firstToast = toastList.length > 0 ? toastList[0] : null;
  const sendToastInput: sendToastInput = useCallback(
    (toastInput: ToastInput) => {
      if (!isMatchedProject) {
        return;
      }

      if (previewNode?.contentWindow) {
        previewNode.contentWindow.postMessage(toastInput, project?.link);
      }
    },
    [isMatchedProject, previewNode?.contentWindow, project?.link],
  );

  function handleToastCardClick(index: indexToastForEdit) {
    setIndexToastForEdit(index);
    setInputError(INITIAL_ERROR_MESSAGE_TOAST_INPUT);
    sendToastInput(toastList[index]);
  }

  function handleNewToastButtonClick() {
    setIndexToastForEdit(-1);
    setInputError(INITIAL_ERROR_MESSAGE_TOAST_INPUT);
  }

  useEffect(() => {
    if (project !== undefined) {
      async function getToastList() {
        const { data: resultToastList, error } = await supabase
          .from("toast")
          .select("*")
          .eq("project_id", project?.id)
          .order("created_at", { ascending: true });

        if (error !== null) {
          throw new Error(error.message);
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

      return () => {
        channels.unsubscribe();
      };
    }
  }, [project]);

  useEffect(() => {
    function setTargetElementId(e: MessageEvent) {
      if (!isMatchedProject) {
        return;
      }

      const targetElementId = e.data.target;
      if (!targetElementId || targetElementId.includes("welcomeToast")) {
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
    }

    window.addEventListener("message", setTargetElementId);

    return () => window.removeEventListener("message", setTargetElementId);
  }, [isMatchedProject, project?.link, toastList, indexToastForEdit]);

  useEffect(() => {
    if (project === undefined) {
      navigate("/project");
    }
  }, [project, navigate]);

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
          project={project}
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
            <ToastEditor
              toast={toastList[indexToastForEdit]}
              setToastList={setToastList}
              inputError={inputError}
              setInputError={setInputError}
              sendToastInput={sendToastInput}
              setToastShown={setToastShown}
            />
          </>
        ) : (
          <>
            <div id="titleNewToast" className="w-full bg-gray-200 p-3">
              <span>새로운 토스트를 만들어보세요</span>
            </div>
            <ToastEditor
              toast={INITIAL_TOAST}
              setToastList={setToastList}
              inputError={inputError}
              setInputError={setInputError}
              sendToastInput={sendToastInput}
              setToastShown={setToastShown}
              projectId={project.id}
            />
          </>
        )}
      </section>
      {!isMatchedProject && (
        <RedirectModal text={DESC_REDIRECT_API_KEY_ACCESS} route={"/project"} />
      )}
      <ToastSaveSuccess
        isToastSaved={toastShown.isToastSaved}
        title={"토스트가 저장되었어요"}
        description={"웹사이트에서 적용된 토스트를 확인해보세요!"}
      />
      <ToastWarning
        warningType={toastShown.warningType}
        title={"필수 정보를 모두 입력해주세요"}
        description={"토스트 저장을 위해 필수* 정보 입력이 필요해요!"}
      />
    </div>
  );
}

export default PageProject;
