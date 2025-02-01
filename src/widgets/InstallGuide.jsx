import { INSTALL_GUIDE_STEPS } from "../shared/constant";

function InstallGuide() {
  return (
    <section className="h-fit bg-gray-100">
      <div className="my-3">
        <h3 className="mb-4 font-bold text-gray-900 text-xl">웰컴토스트 이용 가이드</h3>
        <span className="ml-3 font-normal">준비물 : 배포된 웹사이트</span>
      </div>
      <div className="grid min-w-[90vw] grid-cols-1 grid-rows-1 gap-4 md:grid-cols-4">
        {INSTALL_GUIDE_STEPS.map((step) => {
          return (
            <div key={step.index} className="flex flex-col">
              <span>{step.title}</span>
              <span>{step.description}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default InstallGuide;
