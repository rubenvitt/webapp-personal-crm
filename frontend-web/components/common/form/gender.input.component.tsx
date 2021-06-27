import { TextInput } from "../input.component";
import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { classNames } from "../../../globals/utils";
import { CheckIcon } from "@heroicons/react/solid";

interface Props {
  disabled: boolean;
  onChange: (value: { gender: string; anrede: string }) => void;
  className?: string;
}

function getShortValueFor(aValue: string) {
  aValue = aValue?.toLocaleLowerCase();
  return aValue &&
    (aValue.toLocaleLowerCase() === "männlich" ||
      aValue.toLocaleLowerCase() === "masculine")
    ? "m"
    : aValue &&
      (aValue.toLocaleLowerCase() === "weiblich" ||
        aValue.toLocaleLowerCase() === "feminine")
    ? "w"
    : aValue;
}

export const GenderInput: React.FC<Props> = ({
  disabled,
  onChange,
  className,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [genderValue, setGenderValue] = useState("");
  const [anredeValue, setAnredeValue] = useState("");

  useEffect(() => {
    onChange({
      gender: genderValue,
      anrede: anredeValue,
    });
  }, [genderValue, anredeValue]);

  useEffect(() => {
    if (getShortValueFor(genderValue) === "m") {
      setAnredeValue("Er");
    } else if (getShortValueFor(genderValue) === "w") {
      setAnredeValue("Sie");
    } else {
      //
    }
  }, [genderValue]);

  return (
    <div className={classNames(className, "grid grid-cols-4 gap-6")}>
      <div
        className={"col-span-4 sm:col-span-2 relative"}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <Listbox
          onChange={(value) => {
            setGenderValue(value);
            setOpen(false);
          }}
          value={genderValue}
        >
          <TextInput
            disabled={disabled}
            onChange={(aValue) => {
              setGenderValue(aValue);
            }}
            title={"Geschlecht"}
            autocomplete={"gender"}
            value={genderValue}
          />
          <Transition
            show={isOpen}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              <Option
                activeValue={genderValue}
                value={"Weiblich"}
                shortValue={"w"}
                label={"Weiblich"}
              />
              <Option
                activeValue={genderValue}
                value={"Männlich"}
                shortValue={"m"}
                label={"Männlich"}
              />
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
      <TextInput
        className={"col-span-4 sm:col-span-2"}
        title={"Anrede"}
        placeholder={"z.B.: 'Sie' geht im Wald"}
        value={anredeValue}
        onChange={(aValue) => {
          setAnredeValue(aValue);
        }}
      />
    </div>
  );
};

const Option: React.FC<{
  activeValue: string;
  value: string;
  label: string;
  shortValue: string;
}> = ({ activeValue, value, label, shortValue }) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        classNames(
          "group cursor-default select-none relative py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600"
        )
      }
      value={value}
    >
      {({ selected, active }) => (
        <>
          <span
            className={classNames(
              getShortValueFor(activeValue) === shortValue
                ? "font-semibold"
                : "font-normal",
              "block truncate"
            )}
          >
            {label}
          </span>

          {getShortValueFor(activeValue) === shortValue ? (
            <span
              className={classNames(
                "absolute inset-y-0 left-0 flex items-center pl-1.5 group-hover:text-white text-indigo-600"
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
};