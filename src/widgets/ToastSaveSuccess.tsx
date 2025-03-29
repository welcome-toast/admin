import CheckIcon from "@/shared/Icon/CheckIcon";
import type { ToastMessage } from "@/types";

interface ToastSaveSuccessProps {
  isToastSaved: boolean;
  toastMessage: ToastMessage;
}

function ToastSaveSuccess({ isToastSaved, toastMessage }: ToastSaveSuccessProps): JSX.Element {
  return (
    <div
      className={`fixed top-16 right-3 transition-all duration-500 md:right-5 ${isToastSaved ? "opacity-100" : "opacity-0"} z-50 flex h-fit w-fit max-w-2xl items-start gap-2 rounded border border-blue-700 bg-blue-100 py-3 pr-8 pl-3 shadow-2xl`}
    >
      <div className="mt-1">
        <CheckIcon color={"blue"} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-base">{toastMessage.title}</span>
        <span className="font-normal text-sm">{toastMessage.description}</span>
      </div>
    </div>
  );
}

export default ToastSaveSuccess;
