import Button from "../shared/Button";
import { CTA_SIGNIN } from "../shared/constant";

import { supabase } from "../shared/supabase";

function Header() {
  async function handleSignInButtonClick() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: import.meta.env.VITE_SUPABASE_GOOGLE_REDIRECT_URL,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
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
