import PropTypes from "prop-types";

import Button from "../shared/Button";
import { CTA_SIGNIN, CTA_SIGNOUT } from "../shared/constant";

import { useNavigate } from "react-router-dom";
import { signIn, signOut } from "../shared/supabase";

function Header({ user, setUser }) {
  const navigate = useNavigate();
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
    <header className="mx-auto fixed z-100 h-max w-full inset-0 backdrop-blur-xl">
      <nav className="flex justify-between border-solid border-2 boreder-b-gray-100">
        <div className="my-4 ml-10">
          <img alt="logo-white-home" src="/src/assets/logo-header.png" width="100" />
        </div>
        <div className="my-4 mr-10">
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
