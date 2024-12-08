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

function App() {
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
