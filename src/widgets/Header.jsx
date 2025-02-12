import PropTypes from "prop-types";

import Button from "../shared/Button";
import HomeIcon from "../shared/Icon/HomeIcon";
import { CTA_SIGNIN, CTA_SIGNOUT, INITIAL_USER } from "../shared/constant";

import { useLocation, useNavigate } from "react-router-dom";
import OutLinkIcon from "../shared/Icon/OutlinkIcon";
import { signIn, signOut } from "../shared/supabase";

function Header({ user, setUser, sampleProject }) {
  const navigate = useNavigate();
  const location = useLocation();
  const inPageProject = location.pathname.includes("toast");
  const inPageProjectSample = location.pathname.includes("toast/sample");

  if (inPageProject) {
    return (
      <header className="flex h-12 w-screen items-center justify-between border-2 border-gray-200 p-3">
        <button type="button" onClick={handleHomeButtonClick}>
          <HomeIcon />
        </button>
        <a
          target="_blank"
          rel="noreferrer"
          href={sampleProject.link}
          className="flex h-fit gap-2 rounded border border-gray-200 px-2 py-1 align-middle shadow-sm hover:border-blue-700 hover:bg-blue-100"
        >
          <OutLinkIcon />
          <span className="text-sm">적용된 토스트 보러가기</span>
        </a>
      </header>
    );
  }
  function handleHomeButtonClick() {
    if (inPageProjectSample) {
      navigate("/");
      return;
    }
    navigate("/project");
  }

  function handleSignInButtonClick() {
    signIn();
  }

  async function handleSignOutButtonClick() {
    const signOutError = await signOut();

    if (signOutError === null) {
      setUser(INITIAL_USER);
    }
    navigate("/");
  }

  return (
    <header className="fixed inset-0 z-100 mx-auto h-max w-full backdrop-blur-xl">
      <nav className="flex items-center justify-between border-2 border-b-gray-100 border-solid">
        <div className="ml-4 md:ml-10">
          <img
            alt="logo-white-home"
            src="/assets/logo-header.png"
            className="w-[70px] md:w-[90px]"
          />
        </div>
        <div className="my-3 mr-10">
          {user.id === "" ? (
            <Button text={CTA_SIGNIN} onClick={handleSignInButtonClick} />
          ) : (
            <Button text={CTA_SIGNOUT} onClick={handleSignOutButtonClick} />
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

Header.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  sampleProject: PropTypes.object.isRequired,
};
