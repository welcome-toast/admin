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
  const [user, setUser] = useState({
    id: "",
    email: "",
    displayName: "",
    photoUrl: "",
    lastSignInAt: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    function setUserInfo(response) {
      if (response) {
        const { id, last_sign_in_at: lastSignInAt } = response.user;
        const { email, full_name: displayName, avatar_url: photoUrl } = response.user.user_metadata;
        setUser((state) => ({ ...state, id, email, displayName, photoUrl, lastSignInAt }));
      }
      return;
    }

    async function getAuthSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserInfo(session);
      if (user.id !== "" && user.id !== undefined && user.id !== null) {
        navigate("/project");
      }
    }
    getAuthSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserInfo(session);
      if (user.id !== "" && user.id !== undefined && user.id !== null) {
        navigate("/project");
      }
    });

    return () => subscription.unsubscribe();
  }, [user.id, navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<PageHome />} />
        <Route path="project">
          <Route index element={<PageProjectList user={user} />} />
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
