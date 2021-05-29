import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";

interface Props {
  title: string;
  className: string;
}

export const DropDownButton: React.FC<Props> = ({
  title,
  children,
  className,
}) => {
  return (
    <>
      <Menu as="div" className={className}>
        <div className="flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <Menu.Button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 focus:ring-blue-500">
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
  type?: "DEFAULT" | "DANGER" | "OLD";
  icon?: {
    active: React.FC<{ className: string }>;
    inactive?: React.FC<{ className: string }>;
  };
}

export const DropDownItem: React.FC<ItemProps> = ({
  title,
  type = "DEFAULT",
  icon,
}) => {
  const [color, setColor] = useState("bg-blue-500");

  function getColorForType(type: "DEFAULT" | "DANGER" | "OLD") {
    switch (type) {
      case "DEFAULT":
        return "bg-blue-500";
      case "DANGER":
        return "bg-red-500";
      case "OLD":
        return "bg-gray-500";
    }
  }

  useEffect(() => {
    setColor(getColorForType(type));
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
