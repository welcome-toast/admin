import { useLocation } from "react-router-dom";

const HOME_PATH_NAME = "/";

function Footer() {
  const location = useLocation();

  if (location.pathname !== HOME_PATH_NAME) {
    return null;
  }

  return (
    <footer className="my-1 w-full text-center">
      <div className="mx-4 mb-5 flex justify-end md:mx-8">
        <a
          href="https://github.com/welcome-toast/welcome-toast"
          target="_blank"
          rel="noreferrer"
          className="flex items-center text-left hover:opacity-50"
        >
          <img alt="logo-github" src="/assets/logo-footer-github.png" width="25rem" />
          <span className="mx-3 font-medium font-mono">@welcome-toast</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
