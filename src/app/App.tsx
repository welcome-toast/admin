import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import PageError from "@/pages/PageError";
import PageHome from "@/pages/PageHome";
import PageProject from "@/pages/PageProject";
import PageProjectList from "@/pages/PageProjectList";
import PageProjectSample from "@/pages/PageProjectSample";
import Footer from "@/widgets/Footer";
import Header from "@/widgets/Header";
import "../index.css";
import { INITIAL_PROJECTS, INITIAL_USER } from "@/shared/constant";
import { getSessionSignIn } from "@/shared/supabase";
import type { Project, User } from "@/types";

function App() {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [sampleProject, setSampleProject] = useState<Project>(INITIAL_PROJECTS[0]);

  useEffect(() => {
    async function getSession() {
      const session = await getSessionSignIn();

      if (session) {
        const { id, last_sign_in_at: lastSignInAt } = session.user;
        const { email, full_name: displayName, avatar_url: photoUrl } = session.user.user_metadata;
        const userInfo: User = { id, email, displayName, photoUrl, lastSignInAt };

        setUser((state) => ({ ...state, ...userInfo }));
      }
    }
    getSession();
  }, []);

  return (
    <>
      <Header user={user} setUser={setUser} sampleProject={sampleProject} />
      <Routes>
        <Route path="/" element={<PageHome user={user} setUser={setUser} />} />
        <Route path="project" element={<PageProjectList user={user} />} />
        <Route path="toast/:projectId" element={<PageProject />} />
        <Route
          path="toast/sample"
          element={
            <PageProjectSample sampleProject={sampleProject} setSampleProject={setSampleProject} />
          }
        />
        <Route path="*" element={<PageError />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
