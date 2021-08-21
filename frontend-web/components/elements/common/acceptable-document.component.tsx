import { faBlinds } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { classNames } from "../../../global/utils";

interface Props {
  content: string;
  initialCheck?: boolean;
  id: string;
  label: {
    title: string;
    withArticle: string;
  };
  required?: boolean;
  className?: string;
  onChange: (value: boolean) => void;
}

export const AcceptableDocument: React.FC<Props> = ({
  required,
  content,
  initialCheck,
  id,
  label,
  className,
  onChange,
}) => {
  const [isChecked, setChecked] = useState<boolean>(initialCheck);
  return (
    <>
      <div className={classNames("relative", className)}>
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>

        <div className="relative flex items-center justify-between">
          <span className="pr-3 bg-white text-lg font-medium text-gray-900">
            {label.title}
          </span>
          <button
            onClick={() => {
              setChecked(!isChecked);
            }}
            type="button"
            className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FontAwesomeIcon
              icon={faBlinds}
              className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
            />
            <span>
              {isChecked
                ? `Schließe ${label.withArticle}`
                : `Lese ${label.withArticle}`}
            </span>
          </button>
        </div>
      </div>
      <div
        className={classNames(
          !isChecked && "hidden",
          "bg-white shadow rounded-lg h-screen mt-4"
        )}
      >
        <div className="px-4 py-5 sm:p-6 overflow-y-scroll max-h-full">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex items-start">
          <div className="h-5 flex items-center">
            <input
              onChange={(event) => {
                onChange(event.currentTarget.checked);
              }}
              required={required}
              id={id}
              name={id}
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor={id} className="font-medium text-gray-700">
              Ich akzeptiere {label.withArticle}
            </label>
            <p className="text-gray-500">
              Ich habe {label.withArticle} verstanden und akzeptiere sie.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
