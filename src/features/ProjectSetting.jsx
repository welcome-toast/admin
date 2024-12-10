import Button from "../shared/Button";
import ActionCardList from "./ActionCardList";
import ProjectPreview from "./ProjectPreview";

function ProjectSetting() {
  function handleSaveActionButtonClick() {
    return;
  }

  return (
    <div className="flex gap-10">
      <section className="flex flex-col gap-5 border-2 border-solid w-[40vw] h-[90vh]">
        <div className="flex justify-between">
          <h3 className="mb-4 text-xl font-bold text-gray-900">액션 에디터</h3>
          <Button text={"저장"} onClick={handleSaveActionButtonClick} />
        </div>
        <ActionCardList />
      </section>
      <section className="flex flex-col gap-5 border-2 border-solid w-[40vw] h-[90vh]">
        <div className="flex justify-between">
          <h3 className="mb-4 text-xl font-bold text-gray-900">미리 보기</h3>
        </div>
        <div>
          <ProjectPreview />
        </div>
      </section>
    </div>
  );
}

export default ProjectSetting;
