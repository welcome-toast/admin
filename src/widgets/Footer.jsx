import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  if (location.pathname.includes("toast")) {
    return null;
  }

  return (
    <footer className="my-1 w-full text-center">
      <div className="mx-8 mb-4 flex justify-end">
        <a
          href="https://github.com/welcome-toast/welcome-toast?tab=readme-ov-file#welcome-toast"
          target="_blank"
          rel="noreferrer"
          className="flex items-center text-left hover:text-gray-500"
        >
          <img alt="logo-github" src="/assets/logo-footer-github.png" width="40rem" />
          <span className="mx-3 font-semibold">
            웰컴토스트를
            <br />
            소개해요
          </span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
