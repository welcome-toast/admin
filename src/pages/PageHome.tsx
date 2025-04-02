import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/shared/Button";
import { CTAS, TITLES } from "@/shared/constant";
import { signIn, supabase } from "@/shared/supabase";
import type { User } from "@/types";

interface PageHomeProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

function PageHome({ user, setUser }: PageHomeProps) {
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
        <span className="font-bold text-2xl md:text-4xl">{TITLES.HOME}</span>
        <span className="font-base text-md md:text-xl">{TITLES.DESC}</span>
      </div>
      <div className="relative flex gap-5">
        <Button text={CTAS.SIGNIN} onClick={handleSignInButtonClick} />
        <div className="-right-1 -top-1 absolute">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-sky-500" />
          </span>
        </div>
        <Button text={CTAS.SAMPLE} onClick={handleSampleButtonClick} />
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
