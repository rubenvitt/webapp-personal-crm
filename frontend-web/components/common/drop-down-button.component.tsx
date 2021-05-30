import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { ActionType } from "../../globals/interfaces";
import { classNames } from "../../globals/utils";

interface Props {
  title: JSX.Element | string;
  className: string;
  type?: ActionType;
}

export const DropDownButton: React.FC<Props> = ({
  title,
  children,
  className,
  type = ActionType.DEFAULT,
}) => {
  const getItemColorForType = (aType: ActionType) => {
    const color = getColorForType(aType);
    if (aType === ActionType.DEFAULT) {
      return "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500";
    }
    return `bg-${color}-600 hover:bg-${color}-700 focus:ring-${color}-500 text-white border-transparent`;
  };

  const [color, setColor] = useState(getItemColorForType(type));

  useEffect(() => {
    setColor(getItemColorForType(type));
  }, [type]);

  return (
    <>
      <Menu as="div" className={className}>
        <div className="flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <Menu.Button
            className={classNames(
              color,
              "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100"
            )}
          >
            {title}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-blue-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-10 absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {children}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

interface ItemProps {
  title: string;
  type?: ActionType;
  icon?: {
    active: React.FC<{ className: string }>;
    inactive?: React.FC<{ className: string }>;
  };
}

export const DropDownItem: React.FC<ItemProps> = ({
  title,
  type = ActionType.DEFAULT,
  icon,
}) => {
  const getItemColorForType = (aType: ActionType) => {
    return "bg-" + getColorForType(aType) + "-500";
  };

  const [color, setColor] = useState(getItemColorForType(type));

  useEffect(() => {
    setColor(getItemColorForType(type));
  }, [type]);

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? `${color} text-white` : "text-gray-900"
          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
        >
          {icon ? (
            active ? (
              <icon.active className="w-5 h-5 mr-2" />
            ) : icon.inactive ? (
              <icon.inactive className="w-5 h-5 mr-2" />
            ) : (
              <icon.active className="w-5 h-5 mr-2" />
            )
          ) : undefined}
          {title}
        </button>
      )}
    </Menu.Item>
  );
};

export const DropDownGroup: React.FC = ({ children }) => {
  return <div className="p-1">{children}</div>;
};

const getColorForType = (type: ActionType) => {
  switch (type) {
    case ActionType.DANGER:
      return "red";
    case ActionType.WARNING:
      return "yellow";
    case ActionType.DEFAULT:
    case ActionType.PRIMARY:
    case ActionType.INFO:
      return "blue";
    case ActionType.ARCHIVE:
      return "gray";
  }
};
