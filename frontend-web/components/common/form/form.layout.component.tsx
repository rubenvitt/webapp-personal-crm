import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { classNames } from "../../../globals/utils";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import { Transition } from "@headlessui/react";

interface Props {
  cancel?: {
    label?: string;
    action: () => void;
  };
  save?: {
    label?: string;
    isLoading?: boolean;
    action: () => void;
  };
}

export const FormLayout: React.FC<Props> = ({ children, cancel, save }) => {
  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        if (!save?.isLoading) {
          save?.action();
        }
      }}
    >
      {children}

      <div className="flex justify-end">
        {cancel && (
          <button
            onClick={cancel.action}
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {cancel.label ?? "Abbrechen"}
          </button>
        )}
        <button
          type="submit"
          disabled={save?.isLoading}
          className={classNames(
            save?.isLoading
              ? "bg-primary-400"
              : "bg-primary-600 hover:bg-primary-700",
            "ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          )}
        >
          {save?.label ?? "Speichern"}
          <Transition
            as={Fragment}
            show={save?.isLoading}
            enter="transform transition duration-300"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <div className="w-full h-full ">
              <FontAwesomeIcon
                className="self-center ml-2"
                spin
                icon={faSpinner}
              />
            </div>
          </Transition>
        </button>
      </div>
    </form>
  );
};
