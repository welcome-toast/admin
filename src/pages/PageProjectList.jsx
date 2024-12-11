import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../shared/supabase";

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

    navigate(`/project/${projectId}`, {
      state: {
        user,
        project: projectClicked[0],
      },
    });
  }

  useEffect(() => {
    async function getProject() {
      const { data: project, error } = await supabase
        .from("project")
        .select("*")
        .eq("user_id", user.id);
      setProject(project);

      if (!project) {
        throw new Error(error.message);
      }
      return;
    }
    getProject();
  }, [user.id]);

  return (
    <section className="flex flex-col items-center justify-center gap-10 mt-20 w-full h-screen">
      <h3>프로젝트 리스트</h3>
      <div className="flex gap-5">
        {project?.map((proejct) => (
          <button
            key={proejct.id}
            type="button"
            onClick={() => handleProjectClick(proejct.id)}
            className="border-solid border-2 rounded bg-black text-white p-10"
          >
            <ul className="flex flex-col gap-3">
              <li>{proejct.name}</li>
              <li>{proejct.created_at}</li>
              <li>{proejct.link}</li>
              <li>{proejct.is_installed ? "true" : "false"}</li>
            </ul>
          </button>
        ))}
      </div>
    </section>
  );
}

export default PageProjectList;

PageProjectList.propTypes = {
  user: PropTypes.object.isRequired,
};
