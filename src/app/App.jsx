import { Route, Routes, useNavigate } from "react-router-dom";

import ProjectSetting from "../features/ProjectSetting";
import ProjectInstall from "../features/ProjectSetting";
import PageError from "../pages/PageError";
import PageHome from "../pages/PageHome";
import PageProject from "../pages/PageProject";
import PageProjectList from "../pages/PageProjectList";
import { supabase } from "../shared/supabase";
import Footer from "../widgets/Footer";
import Header from "../widgets/Header";
import "../index.css";
import { useEffect, useState } from "react";

function App() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session !== null) {
        navigate("/project");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<PageHome />} />
        <Route path="project">
          <Route index element={<PageProjectList />} />
          <Route path=":projectId" exact element={<PageProject />}>
            <Route path="setting" exact element={<ProjectSetting />} />
            <Route path="install" exact element={<ProjectInstall />} />
          </Route>
        </Route>
        <Route path="*" element={<PageError />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
