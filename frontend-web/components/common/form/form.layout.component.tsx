import React from "react";

interface Props {
  cancel?: {
    label?: string;
    action: () => void;
  };
  save?: {
    label?: string;
    action: () => void;
  };
}

export const FormLayout: React.FC<Props> = ({ children, cancel, save }) => {
  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        save?.action();
      }}
    >
      {children}

      <div className="flex justify-end">
        {cancel && (
          <button
            onClick={cancel.action}
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {cancel.label ?? "Abbrechen"}
          </button>
        )}
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {save?.label ?? "Speichern"}
        </button>
      </div>
    </form>
  );
};
