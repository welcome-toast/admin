import Button from "../shared/Button";
import { CTA_SIGNIN, TITLE_HOME } from "../shared/constant";

import { supabase } from "../shared/supabase";

function PageHome() {
  async function handleButtonClick() {
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
    <main className="flex flex-col items-center justify-center gap-10 mt-20 w-full h-screen">
      <div>
        <span className="text-5xl	font-bold">{TITLE_HOME}</span>
      </div>
      <Button text={CTA_SIGNIN} onClick={handleButtonClick} />
      <div className="flex gap-10">
        <div>image #1</div>
        <div>image #2</div>
      </div>
    </main>
  );
}

export default PageHome;
