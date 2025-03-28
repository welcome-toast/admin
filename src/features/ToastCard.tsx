import { getDate } from "@/shared/utils/getDate";
import type { Toast } from "@/types/toast";

interface ToastCardProps {
  toastSaved: Toast;
  index: number;
  indexToastForEdit: number;
  handleToastCardClick: (index: number) => void;
}

function ToastCard({
  toastSaved,
  index,
  indexToastForEdit,
  handleToastCardClick,
}: ToastCardProps): JSX.Element {
  const date = getDate(toastSaved.updated_at);

  return (
    <button
      type="button"
      key={toastSaved.id}
      onClick={() => handleToastCardClick(index)}
      className={`${index === indexToastForEdit ? "border-blue-700 bg-blue-100" : "hover:border-blue-600"} flex flex-col gap-1 rounded border-2 p-2 text-left md:p-2`}
    >
      <span className="mb-1 font-bold text-gray-900 text-xs md:text-sm">{toastSaved.name}</span>
      <span className="mb-1 text-gray-900 text-xs md:text-sm">{toastSaved.message_title}</span>
      <span className="mb-1 hidden text-gray-500 text-xs md:flex md:text-xs">
        업데이트{" "}
        {`${date.year}.${date.month}.${date.currentDate}. ${date.currentHour}:${date.currentMinute}`}
      </span>
    </button>
  );
}

export default ToastCard;
