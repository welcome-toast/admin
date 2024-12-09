import Button from "../shared/Button";
import { CTA_SIGNIN, TITLE_HOME } from "../shared/constant";

function PageHome() {
  return (
    <main className="flex flex-col items-center justify-center gap-10 mt-20 w-full h-screen">
      <div>
        <span className="text-5xl	font-bold">{TITLE_HOME}</span>
      </div>
      <Button text={CTA_SIGNIN} />
      <div className="flex gap-10">
        <div>image #1</div>
        <div>image #2</div>
      </div>
    </main>
  );
}

export default PageHome;
