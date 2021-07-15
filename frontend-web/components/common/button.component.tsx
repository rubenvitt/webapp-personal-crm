import React, { Fragment, useCallback, useEffect, useState } from "react";
import { classNames, getColorForType } from "../../globals/utils";
import { ActionType } from "../../globals/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import { Transition } from "@headlessui/react";
import { Logger } from "../../globals/logging";

interface Props {
  asyncAction?: () => Promise<void>;
  action?: () => void;
  className?: string;
  type?: ActionType;
  isLoading?: boolean;
  customColor?: string;
  isDisabled?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  asyncAction,
  action,
  className,
  type = ActionType.PRIMARY,
  isLoading,
  customColor,
  isDisabled,
}) => {
  const [_isLoading, setLoading] = useState(false);

  if (isLoading !== undefined) {
    useEffect(() => {
      setLoading(isLoading);
    }, [isLoading]);
  }

  const getItemColorForType = (aType: ActionType) => {
    if (aType === ActionType.DEFAULT) {
      return "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500";
    }
    const color = customColor || getColorForType(aType);
    return classNames(
      _isLoading || isDisabled
        ? `bg-${color}-200 focus:ring-${color}-300 cursor-not-allowed`
        : `bg-${color}-600 hover:bg-${color}-700 focus:ring-${color}-500`,
      `text-white border-transparent`
    );
  };

  const [color, setColor] = useState(getItemColorForType(type));

  useEffect(() => {
    setColor(getItemColorForType(type));
  }, [isDisabled]);

  const onClick = useCallback(() => {
    if (asyncAction) {
      Logger.log("setLoading(true) on click");
      setLoading(true);
      asyncAction()
        .then(() => {
          Logger.log("async fn finished");
          setLoading(false);
        })
        .catch(() => {
          setColor(getItemColorForType(ActionType.DANGER));
          setLoading(false);
        });
    } else if (action) {
      action();
    }
  }, [asyncAction, action]);

  return (
    <button
      onClick={onClick}
      disabled={_isLoading || isDisabled}
      className={classNames(
        color,
        className,
        "self-end inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
      )}
    >
      {children}
      <Transition
        as={Fragment}
        show={_isLoading}
        enter="transform transition duration-200"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="transform duration-50 transition ease-in-out"
        leaveFrom="opacity-100 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <div className="w-full h-full ">
          <FontAwesomeIcon className="self-center ml-2" spin icon={faSpinner} />
        </div>
      </Transition>
    </button>
  );
};
