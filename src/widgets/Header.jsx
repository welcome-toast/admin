import PropTypes from "prop-types";

import Button from "../shared/Button";
import HomeIcon from "../shared/Icon/HomeIcon";
import { CTA_SIGNIN, CTA_SIGNOUT } from "../shared/constant";

import { useLocation, useNavigate } from "react-router-dom";
import { signIn, signOut } from "../shared/supabase";

function Header({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.includes("toast")) {
    return (
      <header className="h-12 w-screen border-2 border-gray-200 p-3">
        <button type="button" onClick={handleHomeButtonClick}>
          <HomeIcon />
        </button>
      </header>
    );
  }
  function handleHomeButtonClick() {
    navigate("/project");
    return;
  }

  function handleSignInButtonClick() {
    signIn();
    return;
  }

  async function handleSignOutButtonClick() {
    const signOutError = await signOut();

    if (signOutError === null) {
      setUser({
        id: "",
        email: "",
        displayName: "",
        photoUrl: "",
        lastSignInAt: "",
      });
    }

    navigate("/");

    return;
  }

  return (
    <header className="fixed inset-0 z-100 mx-auto h-max w-full backdrop-blur-xl">
      <nav className="flex justify-between border-2 border-b-gray-100 border-solid">
        <div className="my-3 ml-10">
          <img alt="logo-white-home" src="/assets/logo-header.png" width="90" />
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
};
