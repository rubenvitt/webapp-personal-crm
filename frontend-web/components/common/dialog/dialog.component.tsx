import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/pro-solid-svg-icons";

interface Props {
  onClose: () => void;
  withClose?: boolean;
}

export const Dialog: React.FC<Props> = ({
  onClose,
  children,
  withClose = true,
}) => {
  return (
    <div className="fixed inset-0 pb-24 overflow-auto flex bg-black bg-opacity-20">
      <div className="relative p-8 bg-white w-full shadow-md max-w-md m-auto flex-col flex rounded-lg">
        <div>{children}</div>
        {withClose && (
          <span className="absolute top-0 right-0 p-4">
            <button
              className="p-2 hover:text-red-500"
              onClick={() => onClose()}
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};
