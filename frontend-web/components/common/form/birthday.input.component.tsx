import { classNames } from "../../../globals/utils";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Birthday, DateType } from "../../../globals/interfaces";
import { daysFor, Month, nameFor } from "../../../globals/month";
import { SelectInput } from "./select.input.component";

interface Props {
  disabled?: boolean;
  initialValue?: Birthday;
  value?: Birthday;
  onChange?: (element: Birthday) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const labelFor = (aDateType: DateType) => {
  switch (aDateType) {
    case DateType.EXACT:
      return "Exaktes Datum";
    case DateType.MONTH_DAY:
      return "Monat und Tag";
    case DateType.MONTH:
      return "Nur Monat";
    case DateType.AGE:
      return "Ungefähres Alter";
    case DateType.UNKNOWN:
      return "Alter Unbekannt";
  }
};

export const BirthdayInput: React.FC<Props> = ({
  disabled,
  initialValue = { dateValue: undefined, dateType: DateType.MONTH_DAY },
  value,
  onChange,
  placeholder,
  className,
  required,
}) => {
  const reducer = (
    state: Birthday,
    action: {
      name: "dateType" | "dateValue";
      value?: string;
    }
  ) => {
    if (action.name === "dateType") {
      action.value = DateType[action.value];
    }
    if (
      action.name === "dateType" &&
      action.value === DateType.UNKNOWN.toString()
    ) {
      return {
        dateType: DateType.UNKNOWN,
      };
    }
    return {
      ...state,
      [action.name]: action.value,
    };
  };

  const [{ dateType, dateValue }, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    if (value) {
      dispatch({ name: "dateType", value: value.dateType.toString() });
      dispatch({ name: "dateValue", value: value.dateValue });
    }
  }, [value]);
  useEffect(() => {
    dispatch({ name: "dateType", value: initialValue.dateType.toString() });
    dispatch({ name: "dateValue", value: initialValue.dateValue });
  }, []);

  if (onChange) {
    useEffect(() => {
      onChange({ dateType, dateValue });
    }, [dateValue, dateType]);
  }

  const [month, setMonth] = useState("JANUARY");

  const yearInputRef = useRef<HTMLInputElement>();
  const monthInputRef = useRef<HTMLSelectElement>();
  const dayInputRef = useRef<HTMLSelectElement>();
  const dateInputRef = useRef<HTMLInputElement>();

  return (
    <>
      <div className={className}>
        <label
          htmlFor={"birthday"}
          className={classNames("block", "text-sm font-medium text-gray-700")}
        >
          Geburtstag
          {required && <span className="text-red-500">*</span>}
        </label>
        <div className="mt-1 relative flex flex-col focus-within:z-10">
          <SelectInput
            id={"dateType"}
            onChange={(element) => {
              dispatch({
                name: "dateType",
                value: element,
              });
              dispatch({
                name: "dateValue",
                value: (() => {
                  switch (element) {
                    case DateType.MONTH_DAY:
                      return (
                        monthInputRef.current?.reportValidity() &&
                        dayInputRef.current?.reportValidity() &&
                        monthInputRef.current?.value +
                          "-" +
                          dayInputRef.current?.value
                      );
                    case DateType.UNKNOWN:
                      return undefined;
                    case DateType.AGE:
                    case DateType.EXACT:
                      return (
                        dateInputRef.current?.reportValidity() &&
                        dateInputRef.current?.value
                      );
                    case DateType.MONTH:
                      return (
                        yearInputRef.current?.reportValidity() &&
                        monthInputRef.current?.reportValidity() &&
                        yearInputRef.current?.value +
                          "-" +
                          monthInputRef.current?.value
                      );
                  }
                })(),
              });
            }}
            showLabel={false}
            rounded={dateType === DateType.UNKNOWN}
            className={classNames(
              dateType !== DateType.UNKNOWN && "rounded-t-md",
              "text-sm flex-1 font-medium"
            )}
            buttonClassName={classNames(
              dateType !== DateType.UNKNOWN && "rounded-t-md",
              "bg-gray-50 hover:bg-gray-100"
            )}
          >
            {Object.keys(DateType).map((element) => {
              return (
                <option key={element} value={element}>
                  {labelFor(DateType[element])}
                </option>
              );
            })}
          </SelectInput>

          {(dateType === DateType.EXACT || dateType === DateType.AGE) && (
            <input
              ref={dateInputRef}
              type={(() => {
                switch (dateType) {
                  case DateType.EXACT:
                    return "date";
                  case DateType.AGE:
                    return "number";
                }
              })()}
              name="birthday"
              id="birthday"
              required
              min={dateType === DateType.AGE && 0}
              max={dateType === DateType.AGE && 150}
              disabled={disabled}
              autoComplete={"bday"}
              placeholder={placeholder}
              onChange={(event) => {
                const valid = event.currentTarget.reportValidity();
                dispatch({
                  name: "dateValue",
                  value: valid && event.currentTarget.value,
                });
              }}
              className="inline-flex flex-1 border border-gray-300 rounded-b-md shadow-sm px-3 py-0 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            />
          )}
          {(dateType === DateType.MONTH_DAY || dateType === DateType.MONTH) && (
            <div className="flex w-full items-stretch">
              <select
                ref={monthInputRef}
                id="month"
                onChange={(event) => {
                  setMonth(Month[event.currentTarget.value]);
                  const valid =
                    event.currentTarget.reportValidity() &&
                    ((dateType === DateType.MONTH_DAY &&
                      dayInputRef.current.reportValidity()) ||
                      (DateType.MONTH &&
                        yearInputRef.current.reportValidity()));
                  dispatch({
                    name: "dateValue",
                    value:
                      valid &&
                      (dateType === DateType.MONTH_DAY
                        ? event.currentTarget.value +
                          "-" +
                          dayInputRef.current.value
                        : yearInputRef.current.value +
                          "-" +
                          event.currentTarget.value),
                  });
                }}
                value={Month[month]}
                className="flex-1 border rounded-bl-md border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
              >
                {Object.keys(Month)
                  .filter((k) => Number.isNaN(+k))
                  .map((monthName) => {
                    const month = Month[monthName];
                    return (
                      <option key={month} value={month}>
                        {nameFor(month)}
                      </option>
                    );
                  })}
              </select>
              {dateType === DateType.MONTH_DAY && (
                <select
                  ref={dayInputRef}
                  id="day"
                  onChange={(event) => {
                    const valid =
                      event.currentTarget.reportValidity() &&
                      monthInputRef.current.reportValidity();
                    dispatch({
                      name: "dateValue",
                      value:
                        valid &&
                        monthInputRef.current.value +
                          "-" +
                          event.currentTarget.value,
                    });
                  }}
                  className="flex-1 border border-gray-300 rounded-br-md shadow px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                >
                  {Array.from(
                    { length: daysFor(Month[month]) },
                    (_, k) => k + 1
                  ).map((element) => {
                    return (
                      <option key={element} value={element}>
                        {element}
                      </option>
                    );
                  })}
                </select>
              )}
              {dateType === DateType.MONTH && (
                <input
                  ref={yearInputRef}
                  onChange={(event) => {
                    const valid =
                      event.currentTarget.reportValidity() &&
                      monthInputRef.current.reportValidity();
                    dispatch({
                      name: "dateValue",
                      value:
                        valid &&
                        event.currentTarget.value +
                          "-" +
                          monthInputRef.current.value,
                    });
                  }}
                  id="year"
                  type="number"
                  required
                  max={new Date().getFullYear()}
                  min={new Date().getFullYear() - 150}
                  className="flex-1 border border-gray-300 rounded-br-md shadow px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
