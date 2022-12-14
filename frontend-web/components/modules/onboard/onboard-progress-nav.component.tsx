import { faCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Logger } from "../../../global/logging";
import { useAppRouter } from "../../../global/router";
import { useUserOnboarding } from "../../../services/account-service";

export function OnboardProgressNav(): JSX.Element {
  const { pathname } = useAppRouter();
  const { steps, currentStep } = useUserOnboarding();

  const indexCurrent = steps?.findIndex((value) => value.id === currentStep);
  Logger.log("indexCurrent", indexCurrent);
  return (
    <>
      <nav aria-label="Progress">
        <ol className="border shadow rounded-t-lg divide-y divide-gray-300 md:flex md:divide-y-0">
          {steps?.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex-1 md:flex">
              {stepIdx < indexCurrent ? (
                <div className="group flex items-center w-full">
                  <span className="px-6 py-4 flex items-center text-sm font-medium">
                    <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={"h-7 w-6 text-white"}
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </div>
              ) : pathname.endsWith(step.id) ? (
                <div
                  className="px-6 py-4 flex items-center text-sm font-medium"
                  aria-current="step"
                >
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
                    <span className="text-indigo-600">{stepIdx + 1}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600">
                    {step.name}
                  </span>
                </div>
              ) : (
                <div className="group flex items-center">
                  <span className="px-6 py-4 flex items-center text-sm font-medium">
                    <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">
                        {stepIdx + 1}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </div>
              )}

              {stepIdx !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    className="hidden md:block absolute top-0 right-0 h-full w-5"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
