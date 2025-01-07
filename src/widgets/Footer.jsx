import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  if (location.pathname.includes("toast")) {
    return null;
  }

  return (
    <footer className="w-full py-5 text-center">
      <div>Footer</div>
    </footer>
  );
}

export default Footer;
