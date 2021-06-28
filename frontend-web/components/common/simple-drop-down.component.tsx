import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { classNames } from "../../globals/utils";

interface Props {
  className: string;
  values: Element[];
  value?: Element;
  initialValue?: Element;
  onChange: (element: Element) => void;
  title?: string;
  buttonClasses?: string;
}

interface Element {
  id: string;
  label: string;
}

export const SimpleDropDown: React.FC<Props> = ({
  className,
  values,
  value = values[0],
  initialValue = values[0],
  onChange,
  title,
  buttonClasses = "rounded-md",
}) => {
  const [selected, setSelected] = useState<Element>();

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    setSelected(initialValue);
  }, [initialValue]);

  return (
    <div className={classNames(className)}>
      <Listbox
        value={selected}
        onChange={(element) => {
          onChange(element);
          setSelected(element);
        }}
      >
        {({ open }) => (
          <>
            {title && (
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                {title}
              </Listbox.Label>
            )}
            <div className={"w-full"}>
              <Listbox.Button
                className={classNames(
                  buttonClasses,
                  "bg-white w-full border border-gray-300 shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                )}
              >
                <span className="block truncate">{selected?.label}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  {values.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-orange-600" : "text-gray-900",
                          "cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {item.label}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-orange-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
