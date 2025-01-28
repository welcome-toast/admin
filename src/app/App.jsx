import { Route, Routes } from "react-router-dom";

import PageError from "../pages/PageError";
import PageHome from "../pages/PageHome";
import PageProject from "../pages/PageProject";
import PageProjectList from "../pages/PageProjectList";
import Footer from "../widgets/Footer";
import Header from "../widgets/Header";
import "../index.css";
import { useEffect, useState } from "react";
import { getSessionSignIn } from "../shared/supabase";

function App() {
  const [user, setUser] = useState({
    id: "",
    email: "",
    displayName: "",
    photoUrl: "",
    lastSignInAt: "",
  });

  useEffect(() => {
    async function getSession() {
      const session = await getSessionSignIn();
      if (session) {
        const { id, last_sign_in_at: lastSignInAt } = session.user;
        const { email, full_name: displayName, avatar_url: photoUrl } = session.user.user_metadata;

        setUser((state) => ({ ...state, id, email, displayName, photoUrl, lastSignInAt }));
      }
    }
    getSession();
  }, []);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" exact element={<PageHome user={user} setUser={setUser} />} />
        <Route path="project" exact element={<PageProjectList user={user} />} />
        <Route path="toast/:projectId" exact element={<PageProject />} />
        <Route path="*" element={<PageError />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
