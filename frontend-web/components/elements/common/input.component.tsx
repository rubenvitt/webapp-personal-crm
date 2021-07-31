import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faClipboard } from "@fortawesome/pro-light-svg-icons";
import { faExclamation } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _uniqueId from "lodash/uniqueId";
import React, { useEffect, useRef, useState } from "react";
import { useCopyToClipboard } from "react-use";
import { ActionType } from "../../../global/interfaces";
import { MaybeAsyncAction } from "../../../global/types";
import { classNames, getColorForType } from "../../../global/utils";

export type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  error?: string;
  errorIcon?: IconProp;
  change: MaybeAsyncAction<string>;
  copyOnly?: boolean;
  copyIcon?: IconProp;
  iconLeft?: IconProp;
  iconRight?: IconProp;
  inputClassName?: string;
};

export const TextInput: React.FC<Props> = ({
  ref,
  label,
  error,
  errorIcon,
  copyOnly,
  change,
  copyIcon,
  value,
  iconLeft,
  iconRight,
  className,
  inputClassName,
  disabled,
  required,
  ...rest
}) => {
  const [id] = useState(_uniqueId("text-input"));
  const _ref = useRef<HTMLInputElement | null>(null);
  const [, copy] = useCopyToClipboard();
  const [_value, setValue] = useState<string>(String(value ?? ""));
  const [color] = useState(getColorForType(ActionType.PRIMARY));

  useEffect(() => {
    setValue(value as string);
  }, [value]);

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className={classNames(
            error
              ? "text-red-700"
              : disabled
              ? "text-gray-500"
              : "text-gray-700",
            "block text-sm font-medium"
          )}
        >
          {label}
          {required ? "*" : ""} {error && (label ? "• " : "") + error}
        </label>
      )}
      <div
        onClick={
          copyOnly
            ? () => {
                copy(
                  ((ref as { current?: { value: string } })?.current?.value ??
                    _ref.current?.value) as string
                );
              }
            : undefined
        }
        className={classNames(
          error && `border-${color}-600`,
          `focus-within:border-${color}-600 focus-within:text-${color}-600`,
          copyOnly && "cursor-pointer",
          `mt-1 border-b border-gray-300 relative group text-gray-600`
        )}
      >
        {iconLeft && (
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <FontAwesomeIcon
              icon={iconLeft}
              className={classNames(error && "text-red-500", "h-5 w-5")}
              aria-hidden="true"
            />
          </div>
        )}
        <input
          id={id}
          ref={ref || _ref}
          onChange={(event) => {
            setValue(event.target.value);
            new Promise(() => {
              change?.(event.target.value);
              rest.onChange?.(event);
            }).then(() => undefined);
          }}
          readOnly={rest.readOnly || copyOnly}
          value={_value}
          className={classNames(
            inputClassName,
            iconLeft && "pl-8",
            (copyOnly || error || iconRight) && "pr-8",
            copyOnly && "cursor-pointer hover:bg-gray-100",
            error && `border-${color}-600`,
            error ? "bg-red-100 focus:bg-red-50" : "bg-gray-50",
            disabled && "text-gray-700",
            `focus:border-${color}-600`,
            "block w-full border-0 border-b border-transparent focus:ring-0 sm:text-sm text-black"
          )}
          type={rest.type ?? "text"}
          placeholder={rest.placeholder ?? (required ? "required" : "")}
          {...rest}
        />
        {(error || copyOnly || iconRight) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FontAwesomeIcon
              icon={
                (error && (errorIcon ?? faExclamation)) ||
                (copyOnly && (copyIcon ?? faClipboard)) ||
                iconRight
              }
              className={classNames(
                error && "text-red-500",
                copyOnly &&
                  "text-gray-600 " + "group-hover:text-" + color + "-600",
                "h-5 w-5"
              )}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  );
};
