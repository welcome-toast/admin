import { Route, Routes } from "react-router-dom";

import ProjectSetting from "../features/ProjectSetting";
import ProjectInstall from "../features/ProjectSetting";
import PageError from "../pages/PageError";
import PageHome from "../pages/PageHome";
import PageProject from "../pages/PageProject";
import PageProjectList from "../pages/PageProjectList";
import Footer from "../widgets/Footer";
import Header from "../widgets/Header";
import "../index.css";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({
    id: "",
    email: "",
    displayName: "",
    photoUrl: "",
    lastSignInAt: "",
  });

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" exact element={<PageHome user={user} setUser={setUser} />} />
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
