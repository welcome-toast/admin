import PageProjectInstall from "../features/ProjectInstall";
import PageProjectSetting from "../features/ProjectSetting";

function PageProject() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 mt-40 w-full h-screen">
      <h3 className="mb-4 text-xl font-extrabold text-gray-900">프로젝트 이름</h3>
      <div className="flex gap-10">
        <button type="button">설정</button>
        <button type="button">연동</button>
      </div>
      <div>
        <PageProjectSetting />
      </div>
      <div>
        <PageProjectInstall />
      </div>
    </section>
  );
}

export default PageProject;
