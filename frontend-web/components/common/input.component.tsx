import React, { Ref, useEffect, useState } from "react";
import { classNames } from "../../globals/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/pro-light-svg-icons";
import { useCopyToClipboard } from "react-use";

interface Props {
  title: string;
  showLabel?: boolean;
  className?: string;
  autocomplete?: string;
  initialValue?: string;
  inputType?: string;
  onChange?: (aValue: string) => void;
  disabled?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  value?: string;
  placeholder?: string;
  inputRef?: Ref<HTMLInputElement>;
  required?: boolean;
  clickToCopy?: boolean;
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
  onBlur,
  onFocus,
  value,
  placeholder,
  inputRef,
  required,
  clickToCopy,
}) => {
  const [id] = useState(String(Math.random()));
  const [, copy] = useCopyToClipboard();

  const [internalValue, setInternalValue] = useState(initialValue);
  useEffect(() => {
    if (value) setInternalValue(value);
  }, [value]);

  if (onChange) {
    useEffect(() => {
      onChange?.(internalValue);
    }, [internalValue]);
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
        {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={
          clickToCopy
            ? () => {
                copy(internalValue);
              }
            : undefined
        }
        className={classNames(clickToCopy && "relative cursor-pointer")}
      >
        <input
          title={clickToCopy ? "Zum Kopieren klicken" : ""}
          ref={inputRef}
          type={inputType}
          name={id}
          required={required}
          id={id}
          disabled={disabled}
          autoComplete={autocomplete}
          value={internalValue}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          onChange={(event) => {
            setInternalValue(event.currentTarget.value);
          }}
          className={classNames(
            clickToCopy && "hover:bg-gray-200 pr-7",
            "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
          )}
        />
        {clickToCopy && (
          <div className="absolute inset-y-0 right-0 pr-3 block flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faClipboard} />
          </div>
        )}
      </div>
    </div>
  );
};
