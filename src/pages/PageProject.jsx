import { useLocation } from "react-router-dom";
import ProjectInstall from "../features/ProjectInstall";
import ProjectSetting from "../features/ProjectSetting";

function PageProject() {
  const location = useLocation();
  const project = location.state?.project;

  return (
    <section className="mt-40 flex h-screen w-full flex-col items-center justify-center gap-10">
      <h3 className="mb-4 font-extrabold text-gray-900 text-xl">
        {project?.name ? project.name : ""}
      </h3>
      <div className="flex gap-10">
        <button type="button">설정</button>
        <button type="button">연동</button>
      </div>
      <div>
        <ProjectSetting project={project} />
      </div>
      <div>
        <ProjectInstall />
      </div>
    </section>
  );
}

export default PageProject;
