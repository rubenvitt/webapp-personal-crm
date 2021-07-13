import React, { useState } from "react";
import { withPageAuthRequired } from "../globals/auth0";
import { OnboardProgressNav } from "../components/onboard/onboard-progress-nav.component";
import { OnboardProgressContent } from "../components/onboard/onboard-progress-content.component";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlinds, faFileContract } from "@fortawesome/pro-solid-svg-icons";
import { classNames } from "../globals/utils";

export const getServerSideProps = withPageAuthRequired();

const Onboarding: React.ReactNode = () => {
  const { data } = useSWR<{ text }>("/privacy");

  const [isPrivacyPolicy, setPrivacyPolicy] = useState(false);
  const [isTermsOfService, setTermsOfService] = useState(false);

  return (
    <>
      <OnboardProgressNav
        steps={[
          {
            id: "privacy",
            name: "Privacy Policy & Terms of Service",
            href: "#",
            status: "complete",
          },
          {
            id: "general",
            name: "Name",
            href: "#",
            status: "current",
          },
          {
            id: "Plans & Payment",
            name: "Test",
            href: "#",
            status: "upcomming",
          },
          {
            id: "App Setup",
            name: "Test",
            href: "#",
            status: "upcomming",
          },
        ]}
      />
      <OnboardProgressContent stepId="1">
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>

          <div className="relative flex items-center justify-between">
            <span className="pr-3 bg-white text-lg font-medium text-gray-900">
              Privacy Policy
            </span>
            <button
              onClick={() => {
                setPrivacyPolicy(!isPrivacyPolicy);
              }}
              type="button"
              className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FontAwesomeIcon
                icon={faBlinds}
                className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
              />
              <span>
                {isPrivacyPolicy
                  ? "Close the privacy policy"
                  : "Read the privacy policy"}
              </span>
            </button>
          </div>
        </div>
        <div
          className={classNames(
            !isPrivacyPolicy && "hidden",
            "bg-white shadow rounded-lg h-screen mt-4"
          )}
        >
          <div className="px-4 py-5 sm:p-6 overflow-y-scroll max-h-full">
            <ReactMarkdown>{data?.text}</ReactMarkdown>
          </div>
        </div>

        <div className="relative mt-4">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>

          <div className="relative flex items-center justify-between">
            <span className="pr-3 bg-white text-lg font-medium text-gray-900">
              Terms of Service
            </span>
            <button
              onClick={() => {
                setTermsOfService(!isTermsOfService);
              }}
              type="button"
              className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FontAwesomeIcon
                icon={faFileContract}
                className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
              />
              <span>
                {isTermsOfService
                  ? "Close the terms of service"
                  : "Read the terms of service"}
              </span>
            </button>
          </div>
        </div>
        <div
          className={classNames(
            !isTermsOfService && "hidden",
            "bg-white shadow rounded-lg h-screen mt-4"
          )}
        >
          <div className="px-4 py-5 sm:p-6 overflow-y-scroll max-h-full">
            <ReactMarkdown>{data?.text}</ReactMarkdown>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex items-start">
            <div className="h-5 flex items-center">
              <input
                id="comments"
                name="comments"
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="comments" className="font-medium text-gray-700">
                Accept the Privacy Policy
              </label>
              <p className="text-gray-500">
                I have read and understood the privacy policy.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex items-start">
            <div className="h-5 flex items-center">
              <input
                id="comments"
                name="comments"
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="comments" className="font-medium text-gray-700">
                Accept the terms of service
              </label>
              <p className="text-gray-500">
                I have read and understood the terms of service.
              </p>
            </div>
          </div>
        </div>
      </OnboardProgressContent>
    </>
  );
};

export default Onboarding;
