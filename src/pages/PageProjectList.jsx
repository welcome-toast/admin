import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { supabase } from "../shared/supabase";

function PageProjectList({ user }) {
  const [project, setProject] = useState([]);

  useEffect(() => {
    async function getProject() {
      const { data: project, error } = await supabase
        .from("project")
        .select("*")
        .eq("owner_id", user.id);
      setProject(project);
      return;
    }
    getProject();
  }, [user.id]);

  return (
    <section className="flex flex-col items-center justify-center gap-10 mt-20 w-full h-screen">
      <div>프로젝트 리스트</div>
      <div className="flex gap-5">
        {project?.map((proejct) => (
          <div key={proejct.id} className="border-solid border-2 rounded bg-black text-white p-10">
            <ul className="flex flex-col gap-3">
              <li>{proejct.name}</li>
              <li>{proejct.created_at}</li>
              <li>{proejct.link}</li>
              <li>{proejct.is_installed ? "true" : "false"}</li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PageProjectList;

PageProjectList.propTypes = {
  user: PropTypes.object,
};
