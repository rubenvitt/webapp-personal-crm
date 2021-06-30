import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { classNames } from "../../../globals/utils";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";

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
          {save?.isLoading ? (
            <FontAwesomeIcon className="self-center" spin icon={faSpinner} />
          ) : (
            save?.label ?? "Speichern"
          )}
        </button>
      </div>
    </form>
  );
};
