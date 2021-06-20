import React, { useEffect, useState } from "react";
import { classNames } from "../../globals/utils";

interface Props {
  title: string;
  showLabel?: boolean;
  className?: string;
  autocomplete?: string;
  initialValue?: string;
  inputType?: string;
  onChange?: (aValue: string) => void;
  disabled?: boolean;
}

export const TextInput: React.FC<Props> = ({
  title,
  className,
  autocomplete = "off",
  showLabel = true,
  initialValue,
  inputType = "text",
  onChange,
  disabled = false,
}) => {
  const [id] = useState(String(Math.random()));

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, []);

  if (onChange) {
    useEffect(() => {
      onChange(value);
    }, [value]);
  }

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={classNames(
          showLabel ? "block" : "sr-only",
          "text-sm font-medium text-gray-700"
        )}
      >
        {title}
      </label>
      <input
        type={inputType}
        name={id}
        id={id}
        disabled={disabled}
        autoComplete={autocomplete}
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
      />
    </div>
  );
};
