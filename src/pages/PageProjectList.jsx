import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../features/ProjectCard";
import Loading from "../shared/Loading";
import { supabase } from "../shared/supabase";
import CreateProjectModal from "../widgets/CreateProjectModal";

const INITIAL_PROJECT = [
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
  const [project, setProject] = useState(INITIAL_PROJECT);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();

  function handleProjectClick(projectId) {
    const projectClicked = project.find((el) => el.id === projectId);

    navigate(`/toast/${projectId}`, {
      state: {
        user,
        project: projectClicked,
      },
    });
  }

  function handleCreateProjectClick() {
    setIsOpenModal(true);
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
    <section className="mt-28 flex h-[80vh] w-full justify-center gap-10">
      {project[0]?.id === "" ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          <h3 className="mb-4 font-bold text-gray-900 text-xl">프로젝트 리스트</h3>
          <div className="grid min-h-[80vh] min-w-[90vw] grid-cols-4 grid-rows-4 gap-4">
            <button
              type="button"
              id="createProjectButton"
              className="flex w-full max-w-sm flex-col items-center justify-center rounded border-2 border-gray-300 p-6 text-2xl hover:border-2 hover:border-gray-800 hover:bg-gray-300"
              onClick={handleCreateProjectClick}
            >
              <span className="font-semibold text-gray-800">+ 새로운 프로젝트</span>
            </button>
            {project?.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                handleProjectClick={handleProjectClick}
              />
            ))}
          </div>
        </div>
      )}
      {isOpenModal && <CreateProjectModal setIsOpenModal={setIsOpenModal} />}
    </section>
  );
}

export default PageProjectList;

PageProjectList.propTypes = {
  user: PropTypes.object.isRequired,
};
