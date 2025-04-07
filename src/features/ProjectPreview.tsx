import {
  type Dispatch,
  type ForwardedRef,
  type SetStateAction,
  forwardRef,
  useEffect,
  useState,
} from "react";

import Loading from "@/shared/components/Loading";
import type { Project } from "@/types/project";
import type { FirstToast, SendToastInput } from "@/types/toast";

interface ProjectPreviewProps {
  project: Project;
  isMatchedProject: boolean;
  setIsMatchedProject: Dispatch<SetStateAction<boolean>>;
  sendToastInput: SendToastInput;
  firstToast: FirstToast;
}

const ProjectPreview = forwardRef(function ProjectPreview(
  {
    project,
    isMatchedProject,
    setIsMatchedProject,
    sendToastInput,
    firstToast,
  }: ProjectPreviewProps,
  ref: ForwardedRef<HTMLIFrameElement>,
) {
  const [isLoadSuccedd, setIsLoadSuccedd] = useState(false);

  useEffect(() => {
    function handlePreviewLoad(e: MessageEvent) {
      if (!project.link.includes(e.origin)) {
        return;
      }

      if (e.data?.previewInfo) {
        const { previewApiKey, isPreviewLoadSuccedd } = e.data.previewInfo;

        if (previewApiKey !== undefined && previewApiKey === project?.api_key) {
          setIsMatchedProject(true);

          if (isPreviewLoadSuccedd) {
            setIsLoadSuccedd(true);
          }

          if (firstToast !== null) {
            sendToastInput(firstToast);
          }
        } else {
          setIsMatchedProject(false);
        }
      }
    }

    window.addEventListener("message", handlePreviewLoad);
    return () => window.removeEventListener("message", handlePreviewLoad);
  }, [project?.api_key, project?.link, setIsMatchedProject, sendToastInput, firstToast]);

  return (
    <div className="flex h-full w-full flex-col justify-center gap-1">
      <span className="mt-2 font-bold text-base text-gray-900 md:text-xl">미리 보기</span>
      <div className="h-full w-full">
        {!isLoadSuccedd && (
          <div className="mt-10 flex flex-col items-center justify-center gap-5">
            <Loading />
            <span className="text-center text-xs lg:text-base">
              연결된 웹사이트를 불러오고 있습니다.
              <br />
              로딩이 길어진다면 연동 여부를 다시 확인해주세요.
            </span>
          </div>
        )}
        {isMatchedProject && (
          <iframe
            id="projectPreview"
            title="projectPreview"
            ref={ref}
            src={project?.link}
            loading="lazy"
            className={`${isLoadSuccedd ? "h-full w-full" : "h-1 w-1"} rounded-sm border p-1`}
          />
        )}
      </div>
    </div>
  );
});

ProjectPreview.displayName = "ProjectPreview";

export default ProjectPreview;
