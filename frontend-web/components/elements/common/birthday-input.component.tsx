import React, { useEffect, useRef, useState } from "react";
import create from "zustand";
import { Birthday, DateType } from "../../../global/interfaces";
import { Logger } from "../../../global/logging";
import { daysFor, Month, nameFor } from "../../../global/month";
import { classNames } from "../../../global/utils";
import { SelectInput } from "./select.input.component";

interface Props {
  disabled?: boolean;
  initialValue?: Birthday;
  value?: Birthday;
  onChange?: (element: Birthday) => void;
  className?: string;
  required?: boolean;
}

const labelFor = (aDateType: DateType) => {
  switch (aDateType) {
    case DateType.EXACT:
      return "Exaktes Datum";
    case DateType.MONTH_DAY:
      return "Monat und Tag";
    case DateType.YEAR_MONTH:
      return "Jahr und Monat";
    case DateType.AGE:
      return "Ungefähres Alter";
    case DateType.UNKNOWN:
      return "Alter unbekannt";
  }
};

interface FormType {
  exact: string;
  monthDay: string;
  monthYear: string;
  age: string;
  dateType?: DateType;
  set: (birthday: Birthday) => void;
  get: () => Birthday;
}

const useFormStore = create<FormType>((set, get) => ({
  exact: "",
  monthDay: "",
  monthYear: "",
  age: "",
  set: ({ dateType, dateValue }) => {
    switch (dateType) {
      case DateType.EXACT:
        set({
          dateType,
          exact: dateValue,
        });
        break;
      case DateType.MONTH_DAY:
        set({
          dateType,
          monthDay: dateValue,
        });
        break;
      case DateType.YEAR_MONTH:
        set({
          dateType,
          monthYear: dateValue,
        });
        break;
      case DateType.AGE:
        set({
          dateType,
          age: dateValue,
        });
        break;
      case DateType.UNKNOWN:
        set({
          dateType,
        });
    }
  },
  get: () => {
    switch (get().dateType) {
      case DateType.EXACT:
        return {
          dateType: get().dateType,
          dateValue: get().exact,
        };
      case DateType.MONTH_DAY:
        return {
          dateType: get().dateType,
          dateValue: get().monthDay,
        };
      case DateType.YEAR_MONTH:
        return {
          dateType: get().dateType,
          dateValue: get().monthYear,
        };
      case DateType.AGE:
        return {
          dateType: get().dateType,
          dateValue: get().age,
        };
      case DateType.UNKNOWN:
        return {
          dateType: get().dateType,
        };
    }
  },
}));

export const BirthdayInput: React.FC<Props> = ({
  disabled,
  initialValue = { dateType: DateType.UNKNOWN, dateValue: undefined },
  onChange,
  className,
  required,
}) => {
  const yearInputRef = useRef<HTMLInputElement>();
  const monthYearInputRef = useRef<HTMLSelectElement>();
  const monthDayInputRef = useRef<HTMLSelectElement>();
  const dayInputRef = useRef<HTMLSelectElement>();
  const exactInputRef = useRef<HTMLInputElement>();
  const ageInputRef = useRef<HTMLInputElement>();

  const { set, get, dateType, monthDay, age, exact, monthYear } =
    useFormStore();

  useEffect(() => {
    set(initialValue);
  }, []);

  useEffect(() => {
    Logger.log("store contains", get());
    onChange &&
      yearInputRef.current.reportValidity() &&
      monthYearInputRef.current.reportValidity() &&
      monthDayInputRef.current.reportValidity() &&
      dayInputRef.current.reportValidity() &&
      exactInputRef.current.reportValidity() &&
      ageInputRef.current.reportValidity() &&
      onChange(get());
  }, [get()?.dateValue, get()?.dateType]);

  const [month, setMonth] = useState("JANUARY");

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
            initialValue={initialValue?.dateType}
            onChange={(element) => {
              set({
                dateType: DateType[element],
                dateValue: (() => {
                  switch (element) {
                    case DateType.MONTH_DAY:
                      return (
                        monthDayInputRef.current?.reportValidity() &&
                        dayInputRef.current?.reportValidity() &&
                        monthDayInputRef.current?.value +
                          "-" +
                          dayInputRef.current?.value
                      );
                    case DateType.UNKNOWN:
                      return undefined;
                    case DateType.AGE:
                      return (
                        ageInputRef.current?.reportValidity() &&
                        ageInputRef.current?.value
                      );
                    case DateType.EXACT:
                      return (
                        exactInputRef.current?.reportValidity() &&
                        exactInputRef.current?.value
                      );
                    case DateType.YEAR_MONTH:
                      return (
                        yearInputRef.current?.reportValidity() &&
                        monthYearInputRef.current?.reportValidity() &&
                        yearInputRef.current?.value +
                          "-" +
                          monthYearInputRef.current?.value
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

          <input
            ref={exactInputRef}
            value={exact}
            type="date"
            id="birthday"
            name="exactBirthday"
            required={dateType === DateType.EXACT}
            disabled={disabled}
            autoComplete="bday"
            placeholder="Geburtstag"
            onChange={(event) => {
              set({
                dateType: DateType.EXACT,
                dateValue: event.currentTarget.value,
              });
            }}
            className={classNames(
              dateType === DateType.EXACT ? "inline-flex" : "hidden",
              " flex-1 border border-gray-300 rounded-b-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            )}
          />

          <input
            ref={ageInputRef}
            value={age ?? ""}
            type="number"
            id="age"
            name="age"
            required={dateType === DateType.AGE}
            min={(dateType === DateType.AGE && 0) || undefined}
            max={(dateType === DateType.AGE && 150) || undefined}
            disabled={disabled}
            autoComplete="bday"
            placeholder="Ungefähres Alter"
            onChange={(event) => {
              set({
                dateType: DateType.AGE,
                dateValue: event.currentTarget.value,
              });
            }}
            className={classNames(
              dateType === DateType.AGE ? "inline-flex" : "hidden",
              " flex-1 border border-gray-300 rounded-b-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            )}
          />

          <div
            className={classNames(
              dateType === DateType.MONTH_DAY ||
                dateType === DateType.YEAR_MONTH
                ? "flex"
                : "hidden",
              "w-full items-stretch"
            )}
          >
            <select
              ref={monthDayInputRef}
              id="dayMonth"
              name="dayMonth"
              onChange={(event) => {
                setMonth(Month[event.currentTarget.value]);
                set({
                  dateType: DateType.MONTH_DAY,
                  dateValue:
                    event.currentTarget.value + "-" + dayInputRef.current.value,
                });
              }}
              value={Number(monthDay ? monthDay.split("-")[0] : 0)}
              className={classNames(
                dateType === DateType.MONTH_DAY ? "block" : "hidden",
                "flex-1 border rounded-bl-md border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
              )}
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

            <select
              ref={dayInputRef}
              id="day"
              name="day"
              onChange={(event) => {
                set({
                  dateType: DateType.MONTH_DAY,
                  dateValue:
                    monthDayInputRef.current.value +
                    "-" +
                    event.currentTarget.value,
                });
              }}
              value={monthDay ? monthDay.split("-")[1] : 1}
              className={classNames(
                dateType === DateType.MONTH_DAY ? "block" : "hidden",
                "flex-1 border border-gray-300 rounded-br-md shadow px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
              )}
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

            <select
              ref={monthYearInputRef}
              id="yearMonth"
              name="yearMonth"
              onChange={(event) => {
                setMonth(Month[event.currentTarget.value]);
                set({
                  dateType: DateType.YEAR_MONTH,
                  dateValue:
                    yearInputRef.current.value +
                    "-" +
                    event.currentTarget.value,
                });
              }}
              value={monthYear ? monthYear.split("-")[1] : 0}
              className={classNames(
                dateType === DateType.YEAR_MONTH ? "block" : "hidden",
                "flex-1 border rounded-bl-md border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
              )}
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

            <input
              ref={yearInputRef}
              onChange={(event) => {
                set({
                  dateType,
                  dateValue:
                    event.currentTarget.value +
                    "-" +
                    monthYearInputRef.current.value,
                });
              }}
              id="year"
              name="year"
              value={monthYear ? monthYear.split("-")[0] : ""}
              type="number"
              placeholder={"Jahr"}
              required={dateType == DateType.YEAR_MONTH}
              max={new Date().getFullYear()}
              min={new Date().getFullYear() - 150}
              className={classNames(
                dateType === DateType.YEAR_MONTH ? "block" : "hidden",
                "flex-1 border border-gray-300 rounded-br-md shadow px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};
