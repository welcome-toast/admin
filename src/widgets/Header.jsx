import Button from "../shared/Button";
import { CTA_SIGNIN } from "../shared/constant";

import { signIn } from "../shared/supabase";

function Header() {
  function handleSignInButtonClick() {
    signIn();
  }

  return (
    <header className="mx-auto fixed z-100 h-max w-full inset-0 backdrop-blur-xl">
      <nav className="flex justify-between border-solid border-2 boreder-b-gray-100">
        <div className="my-4 ml-10">
          <img alt="logo-white-home" src="/src/assets/logo-header.png" width="100" />
        </div>
        <div className="my-4 mr-10">
          <Button text={CTA_SIGNIN} onClick={handleSignInButtonClick} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
