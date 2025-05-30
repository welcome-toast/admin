import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProjectCard from "@/features/ProjectCard";
import Loading from "@/shared/Loading";
import { DESCRIPTIONS, INITIAL_MODAL, INITIAL_PROJECTS } from "@/shared/constant";
import { supabase } from "@/shared/supabase";
import type { ApiKeyInstallModal, Modal, User } from "@/types";
import type { Project, ProjectDeleteConfirmed, ProjectId } from "@/types/project";
import InstallGuide from "@/widgets/InstallGuide";
import ConfirmDeleteProjectModal from "@/widgets/modals/ConfirmDeleteProjectModal";
import CreateProjectModal from "@/widgets/modals/CreateProjectModal";
import GuideInstallProjectModal from "@/widgets/modals/GuideInstallProjectModal";

function PageProjectList({ user }: { user: User }) {
  const [projects, setProject] = useState<Project[]>(INITIAL_PROJECTS);
  const [isOpenModal, setIsOpenModal] = useState<Modal>(INITIAL_MODAL);
  const [apiKeyInstallModal, setApiKeyInstallModal] = useState<ApiKeyInstallModal>("");
  const [projectDeleteConfirmed, setProjectDeleteConfirmed] = useState<ProjectDeleteConfirmed>({
    projectId: "",
    projectName: "",
  });
  const navigate = useNavigate();

  function handleProjectClick(projectId: ProjectId) {
    const projectClicked = projects.find((project) => project.id === projectId);

    navigate(`/toast/${projectId}`, {
      state: {
        user,
        project: projectClicked,
      },
    });
  }

  function handleCreateProjectClick() {
    setIsOpenModal((prev) => ({ ...prev, create: true }));
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

    return () => {
      channels.unsubscribe();
    };
  }, [user.id, user]);

  return (
    <main className="mt-20 flex h-[80vh] w-full justify-center gap-10 md:mt-28">
      {projects[0]?.id === "" ? (
        <Loading />
      ) : (
        <div className="mx-5 flex flex-col">
          <InstallGuide />
          <h3 className="mb-4 font-bold text-gray-900 text-xl">프로젝트 리스트</h3>
          <div className="grid min-h-[80vh] min-w-[90vw] grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-4">
            <button
              type="button"
              id="createProjectButton"
              className="flex w-full flex-col items-center justify-center rounded border-2 border-gray-300 p-6 text-2xl hover:border-2 hover:border-blue-700 hover:bg-blue-100"
              onClick={handleCreateProjectClick}
            >
              <span className="font-semibold text-gray-800">+ 새로운 프로젝트</span>
            </button>
            {projects?.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                setIsOpenModal={setIsOpenModal}
                setApiKeyInstallModal={setApiKeyInstallModal}
                setProjectDeleteConfirmed={setProjectDeleteConfirmed}
                handleProjectClick={handleProjectClick}
              />
            ))}
          </div>
        </div>
      )}
      {isOpenModal.create && <CreateProjectModal setIsOpenModal={setIsOpenModal} />}
      {isOpenModal.install && (
        <GuideInstallProjectModal
          text={DESCRIPTIONS.INSTALL_API_KEY}
          apiKeyInstallModal={apiKeyInstallModal}
          setIsOpenModal={setIsOpenModal}
        />
      )}
      {isOpenModal.delete && (
        <ConfirmDeleteProjectModal
          action={"프로젝트 삭제"}
          description={DESCRIPTIONS.DELETE_PROJECT}
          projectDeleteConfirmed={projectDeleteConfirmed}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </main>
  );
}

export default PageProjectList;
