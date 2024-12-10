import { useLocation } from "react-router-dom";
import PageProjectInstall from "../features/ProjectInstall";
import PageProjectSetting from "../features/ProjectSetting";

function PageProject() {
  const { user, project } = useLocation().state;

  return (
    <section className="flex flex-col items-center justify-center gap-10 mt-40 w-full h-screen">
      <h3 className="mb-4 text-xl font-extrabold text-gray-900">{project.name}</h3>
      <div className="flex gap-10">
        <button type="button">설정</button>
        <button type="button">연동</button>
      </div>
      <div>
        <PageProjectSetting user={user} project={project} />
      </div>
      <div>
        <PageProjectInstall />
      </div>
    </section>
  );
}

export default PageProject;
