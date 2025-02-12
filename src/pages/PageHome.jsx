import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import { CTA_SAMPLE, CTA_SIGNIN, TITLE_DESC, TITLE_HOME } from "../shared/constant";

import { useEffect } from "react";
import { signIn, supabase } from "../shared/supabase";

function PageHome({ user, setUser }) {
  const navigate = useNavigate();

  function handleSignInButtonClick() {
    signIn();
  }
  function handleSampleButtonClick() {
    navigate("/toast/sample");
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const { id, last_sign_in_at: lastSignInAt } = session.user;
        const { email, full_name: displayName, avatar_url: photoUrl } = session.user.user_metadata;

        setUser((state) => ({ ...state, id, email, displayName, photoUrl, lastSignInAt }));
      }

      if (user.id !== "" && user.id !== undefined && user.id !== null) {
        navigate("/project");
      }
    });

    return () => subscription.unsubscribe();
  }, [user.id, setUser, navigate]);

  return (
    <main className="mt-20 flex h-[80vh] w-full flex-col items-center justify-center gap-10 md:h-[85vh]">
      <div className="flex flex-col gap-5 text-center">
        <span className="font-bold text-2xl md:text-4xl">{TITLE_HOME}</span>
        <span className="font-base text-md md:text-xl">{TITLE_DESC}</span>
      </div>
      <div className="relative flex gap-5">
        <Button text={CTA_SIGNIN} onClick={handleSignInButtonClick} />
        <div className="-right-1 -top-1 absolute">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-blue-500" />
          </span>
        </div>
        <Button text={CTA_SAMPLE} onClick={handleSampleButtonClick} />
      </div>
      <div className="flex justify-center">
        <img
          src="/assets/home-introduction.png"
          alt="home-introduction"
          className="h-[30vh] w-full md:h-[50vh]"
        />
      </div>
    </main>
  );
}

export default PageHome;

PageHome.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};
