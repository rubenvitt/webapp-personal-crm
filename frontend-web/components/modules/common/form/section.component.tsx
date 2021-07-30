import React from "react";
import { classNames } from "../../../../globals/utils";

interface Props {
  title: string;
  description: string;
  titleAsRow?: boolean;
}

export const FormSection: React.FC<Props> = ({
  children,
  title,
  description,
  titleAsRow,
}) => {
  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div
        className={classNames(
          !titleAsRow && "md:grid-cols-3",
          "md:grid md:gap-6"
        )}
      >
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="grid grid-cols-4 gap-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
