import React, { useEffect, useRef, useState } from "react";
import { classNames } from "../../../global/utils";
import { WithForcedChildren } from "../../../global/types";

type Props = WithForcedChildren<{
  className?: string;
  buttonClassName?: string;
  id: string;
  showLabel?: boolean;
  value?: string;
  required?: boolean;
  initialValue?: string;
  title?: string;
  onChange: (value: string) => void;
  rounded?: boolean;
}>;

export function SelectInput({
  className,
  id,
  initialValue,
  title,
  showLabel = Boolean(title),
  rounded = true,
  required,
  children,
  onChange,
  buttonClassName,
}: Props): JSX.Element {
  const ref = useRef<HTMLSelectElement>();
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    setTimeout(() => {
      ref.current.value = initialValue;
    });
  }, [initialValue]);

  useEffect(() => {
    if (value !== ref.current.value) {
      setValue(ref.current.value);
    }
  }, [children]);

  useEffect(() => {
    onChange(value);
  }, [value]);

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
      <select
        ref={ref}
        id="day"
        required={required}
        onChange={(event) => {
          const valid = event.currentTarget.reportValidity();
          if (valid) {
            onChange(event.currentTarget.value);
          }
        }}
        className={classNames(
          buttonClassName,
          rounded && "rounded-md",
          "block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
        )}
      >
        {children}
      </select>
    </div>
  );
}
