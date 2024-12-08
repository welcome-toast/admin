import Button from "../shared/Button";

function Header() {
  return (
    <header className="mx-auto">
      <nav className="flex justify-between h-10 w-full bg-black ">
        <div className="text-white">logo</div>
        <div className="mr-10">
          <Button text="로그인" />
        </div>
      </nav>
    </header>
  );
}

export default Header;
