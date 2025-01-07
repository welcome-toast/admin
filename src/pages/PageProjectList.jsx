import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../features/ProjectCard";
import { supabase } from "../shared/supabase";
import ModalContainer from "../widgets/ModalContainer";

const initialProject = [
  {
    id: "",
    name: "",
    user_id: "",
    link: "",
    api_key: "",
    is_installed: false,
    created_at: "",
    updated_at: "",
  },
];

function PageProjectList({ user }) {
  const [project, setProject] = useState(initialProject);
  const navigate = useNavigate();

  function handleProjectClick(projectId) {
    const projectClicked = project.filter((el) => el.id === projectId);

    navigate(`/project/setting/${projectId}`, {
      state: {
        user,
        project: projectClicked[0],
      },
    });
  }

  useEffect(() => {
    if (user.id === "" || user.id === undefined || user.id === null) {
      return;
    }
    async function getProject() {
      const { data: project, error } = await supabase
        .from("project")
        .select("*")
        .eq("user_id", user.id);

      if (!project) {
        throw new Error(error.message);
      }

      setProject(project);

      return;
    }

    getProject();

    const channels = supabase
      .channel("custom-all-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "project" }, (payload) => {
        if (payload.eventType !== null) {
          getProject();
        }
      })
      .subscribe();

    return () => channels.unsubscribe();
  }, [user.id, user]);

  return (
    <section className="mt-20 flex h-screen w-full items-center justify-center gap-10">
      <div className="flex flex-col">
        <h3 className="mb-4 font-bold text-gray-900 text-xl">프로젝트 리스트</h3>
        <div className="flex flex-col gap-5 rounded border-2 border-solid p-5">
          {project?.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              handleProjectClick={handleProjectClick}
            />
          ))}
        </div>
      </div>
      <div className="">
        <ModalContainer />
      </div>
    </section>
  );
}

export default PageProjectList;

PageProjectList.propTypes = {
  user: PropTypes.object.isRequired,
};
