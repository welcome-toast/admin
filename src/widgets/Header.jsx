import Button from "../shared/Button";
import { CTA_SIGNIN } from "../shared/constant";

function Header() {
  return (
    <header className="mx-auto fixed h-max w-full inset-0">
      <nav className="flex justify-between border-solid border-2 boreder-b-gray-100">
        <div className="my-5 ml-10">
          <img alt="logo-white-home" src="/src/assets/logo-header.png" width="100" />
        </div>
        <div className="my-5 mr-10">
          <Button text={CTA_SIGNIN} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
