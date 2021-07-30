import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { ActionType } from "../../../globals/interfaces";
import { MaybeAsyncAction } from "../../../globals/types";
import { classNames, getColorForType } from "../../../globals/utils";

export type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  action?: MaybeAsyncAction;
  className?: string;
  customColor?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  actionType?: ActionType;
};

export function Button({
  children,
  action,
  className,
  actionType = ActionType.PRIMARY,
  isLoading,
  customColor,
  isDisabled,
  ...rest
}: Props): JSX.Element {
  const [_isLoading, setLoading] = useState(false);

  const getItemColorForType = (aType: ActionType) => {
    if (aType === ActionType.DEFAULT) {
      return "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500";
    }
    const color = customColor || getColorForType(aType);
    return classNames(
      isLoading || _isLoading || isDisabled
        ? `bg-${color}-200 focus:ring-${color}-300 cursor-not-allowed`
        : `bg-${color}-600 hover:bg-${color}-700 focus:ring-${color}-500`,
      `text-white border-transparent`
    );
  };

  const [color, setColor] = useState(getItemColorForType(actionType));

  useEffect(() => {
    setColor(getItemColorForType(actionType));
  }, [isDisabled, _isLoading, isLoading]);

  return (
    <button
      onClick={() => {
        setLoading(true);
        Promise.resolve(action?.()).finally(() => {
          setLoading(false);
        });
      }}
      disabled={isLoading || _isLoading || isDisabled || rest?.disabled}
      className={classNames(
        color,
        className,
        "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 "
      )}
      {...rest}
    >
      {children}
      <Transition
        as={Fragment}
        show={Boolean(_isLoading || isLoading)}
        enter="transform transition duration-200"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="transform duration-50 transition ease-in-out"
        leaveFrom="opacity-100 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <div className="w-full h-full">
          <FontAwesomeIcon className="self-center ml-2" spin icon={faSpinner} />
        </div>
      </Transition>
    </button>
  );
}
