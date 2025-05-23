import type { Dispatch, SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@/shared/Button";
import HomeIcon from "@/shared/Icon/HomeIcon";
import OutLinkIcon from "@/shared/Icon/OutlinkIcon";
import { CTAS, INITIAL_USER } from "@/shared/constant";
import { signIn, signOut } from "@/shared/supabase";
import type { User } from "@/types";
import type { Project } from "@/types/project";

interface HeaderProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  sampleProject: Project;
}

function Header({ user, setUser, sampleProject }: HeaderProps) {
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
        <div className="flex gap-3">
          {user.id === "" && (
            <button
              type="button"
              onClick={handleSignInButtonClick}
              className="invisible flex h-fit items-center rounded border border-gray-200 px-3 py-1 shadow-sm hover:border-blue-700 hover:bg-blue-100 sm:visible"
            >
              <span className="text-sm">로그인 하러가기</span>
            </button>
          )}
          <a
            target="_blank"
            rel="noreferrer"
            href={sampleProject.link}
            className="flex h-fit gap-2 rounded border border-gray-200 px-2 py-1 align-middle shadow-sm hover:border-blue-700 hover:bg-blue-100"
          >
            <OutLinkIcon />
            <span className="text-sm">적용된 토스트 보러가기</span>
          </a>
        </div>
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

  function handleSampleEditorButtonClick() {
    navigate("/toast/sample");
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
        <div className="my-3 mr-4 md:mr-10">
          {user.id === "" ? (
            <Button text={CTAS.SIGNIN} onClick={handleSignInButtonClick} />
          ) : (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSampleEditorButtonClick}
                className="flex h-full items-center gap-2 rounded border border-gray-200 px-3 py-2 shadow-sm hover:border-blue-700 hover:bg-blue-100"
              >
                <OutLinkIcon />
                <span className="text-sm">샘플 토스트 편집해보기</span>
              </button>
              <Button text={CTAS.SIGNOUT} onClick={handleSignOutButtonClick} />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
