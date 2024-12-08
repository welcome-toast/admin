import Button from "../shared/Button";

function PageHome() {
  return (
    <main className="flex flex-col items-center justify-center gap-10 mt-20 w-full h-screen">
      <div>
        <img alt="logo-white-home" src="/src/assets/logo-white-home.png" width="300" />
      </div>
      <div>
        <span className="text-5xl	font-bold">새로운 유저를 맞이할 준비</span>
      </div>
      <Button text="시작하기" />
      <div className="flex gap-10">
        <div>image #1</div>
        <div>image #2</div>
      </div>
    </main>
  );
}

export default PageHome;
