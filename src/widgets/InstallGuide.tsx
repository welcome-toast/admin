import CheckIcon from "@/shared/Icon/CheckIcon";
import { DESCRIPTIONS, INSTALL_GUIDE_STEPS, TITLES } from "@/shared/constants";

function InstallGuide(): JSX.Element {
  return (
    <section className="mb-10 h-fit">
      <div className="my-3 flex flex-col gap-2">
        <h3 className="font-bold text-gray-900 text-xl">{TITLES.INSTALL_GUIDE}</h3>
        <span className="ml-1 font-normal text-gray-500 text-xs md:text-base">
          {DESCRIPTIONS.INSTALL_GUIDE}
        </span>
      </div>
      <div className="grid min-w-[90vw] grid-cols-1 grid-rows-1 gap-3 md:grid-cols-3">
        {INSTALL_GUIDE_STEPS.map((step) => {
          return (
            <div key={step.index} className="flex flex-col gap-3 rounded bg-blue-50 p-3 md:p-5">
              <div className="flex items-center gap-2">
                <CheckIcon color={"#0F52BA"} />
                <span className="font-semibold text-blue-800 text-sm md:text-base">
                  {step.title}
                </span>
              </div>
              <span className="font-normal text-gray-700 text-xs md:text-sm">
                {step.description}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default InstallGuide;
