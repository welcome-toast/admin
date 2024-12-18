import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import { CTA_SIGNIN, TITLE_HOME } from "../shared/constant";

import { useEffect } from "react";
import { signIn, supabase } from "../shared/supabase";

function PageHome({ user, setUser }) {
  const navigate = useNavigate();

  function handleSignInButtonClick() {
    signIn();
    return;
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
    <main className="mt-20 flex h-screen w-full flex-col items-center justify-center gap-10">
      <div>
        <span className="font-bold text-5xl">{TITLE_HOME}</span>
      </div>
      <Button text={CTA_SIGNIN} onClick={handleSignInButtonClick} />
      <div className="flex gap-10">
        <img alt="intro-home" src="/assets/intro-home.png" width="1600" />
      </div>
    </main>
  );
}

export default PageHome;

PageHome.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};
