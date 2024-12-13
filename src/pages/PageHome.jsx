import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import { CTA_SIGNIN, TITLE_HOME } from "../shared/constant";

import { useEffect } from "react";
import { signIn, supabase } from "../shared/supabase";

function PageHome({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    function setUserInfo(response) {
      if (response) {
        const { id, last_sign_in_at: lastSignInAt } = response.user;
        const { email, full_name: displayName, avatar_url: photoUrl } = response.user.user_metadata;
        setUser((state) => ({ ...state, id, email, displayName, photoUrl, lastSignInAt }));
      }
      return;
    }

    async function getAuthSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserInfo(session);
      if (user.id !== "" && user.id !== undefined && user.id !== null) {
        navigate("/project");
      }
    }
    getAuthSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserInfo(session);
      if (user.id !== "" && user.id !== undefined && user.id !== null) {
        navigate("/project");
      }
    });

    return () => subscription.unsubscribe();
  }, [user.id, setUser, navigate]);

  function handleButtonClick() {
    signIn();
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

PageHome.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};
