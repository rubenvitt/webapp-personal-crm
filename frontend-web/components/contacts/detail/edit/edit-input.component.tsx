import { PersonCommunicationChannel } from "../../../../globals/interfaces";
import React, { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { classNames } from "../../../../globals/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown as fasCrown } from "@fortawesome/pro-solid-svg-icons";
import {
  faCircle,
  faCrown as farCrown,
  faStars,
} from "@fortawesome/pro-regular-svg-icons";
import { TextInput } from "../../../common/input.component";

interface InputOptions {
  title?: string;
  inputType?: string;
  autocomplete?: string;
}

interface InputProps<T> {
  initialElement: T;
  onChange: (id: string) => undefined;
  isEdit: boolean;
  inputOptions?: InputOptions;
}

interface RadioProps<T> {
  isEdit: boolean;
  values: T[];
  label: string;
  CustomEditInput?: React.FC<InputProps<T>>;
  inputOptions?: InputOptions;
  onChange?: (value: string) => void;
}

export const EditRadio: <T extends PersonCommunicationChannel>(
  props: React.PropsWithChildren<RadioProps<T>>
) => JSX.Element = ({
  values,
  isEdit,
  label,
  CustomEditInput,
  inputOptions,
  onChange,
}) => {
  const [selectedId, setSelectedId] = useState(values?.[0].id);

  const onChangeValue = (value) => {
    onChange?.(value);
    setSelectedId(value);
  };

  return (
    <>
      <RadioGroup value={selectedId} onChange={onChangeValue}>
        <RadioGroup.Label className="text-md leading-6 font-semibold text-gray-900">
          {label}
        </RadioGroup.Label>
        <ul className={classNames(isEdit ? "space-y-2" : "")}>
          {values?.map((element) => {
            return (
              <li
                key={element.id}
                className={classNames(
                  isEdit && "py-1",
                  isEdit && selectedId === element.id && "border-indigo-500",
                  "flex justify-center items-center px-3 border-2 border-transparent rounded-md"
                )}
              >
                <p className={classNames(isEdit ? "hidden" : "block", "w-6")}>
                  {element.id === selectedId && (
                    <FontAwesomeIcon icon={faStars} />
                  )}
                </p>
                {CustomEditInput ? (
                  <CustomEditInput
                    isEdit={isEdit}
                    onChange={() => undefined}
                    initialElement={element}
                    inputOptions={inputOptions}
                  />
                ) : (
                  <EditInput
                    initialElement={element}
                    onChange={() => undefined}
                    isEdit={isEdit}
                    inputOptions={inputOptions}
                  />
                )}
                <RadioGroup.Option
                  value={element.id}
                  className={({ active }) =>
                    classNames(
                      !isEdit ? "hidden" : "relative block cursor-pointer py-4",
                      active ? "" : "",
                      "rounded-lg px-4 focus:outline-none"
                    )
                  }
                >
                  {({ checked, active }) => (
                    <div className="flex space-x-2">
                      <FontAwesomeIcon
                        title="Als Standardnummer markieren"
                        className={classNames(
                          checked || isEdit ? "block" : "hidden",
                          "text-2xl"
                        )}
                        icon={checked ? fasCrown : active ? farCrown : faCircle}
                      />
                    </div>
                  )}
                </RadioGroup.Option>
              </li>
            );
          })}
        </ul>
        {!values && (
          <p className="pl-4 text-red-500">Keine Elemente vorhanden</p>
        )}
      </RadioGroup>
    </>
  );
};

const EditInput: <T extends PersonCommunicationChannel>(
  props: React.PropsWithChildren<InputProps<T>>
) => JSX.Element = ({
  isEdit,
  initialElement,
  inputOptions: {
    inputType = "tπext",
    autocomplete = "off",
    title = "Text",
  } = {
    inputType: "text",
    autocomplete: "off",
    title: "Text",
  },
}) => {
  const [value, setValue] = useState<string>(initialElement.value as string);

  useEffect(() => setValue(initialElement.value as string), [isEdit]);

  return (
    <div className="flex flex-1 grid grid-cols-3 md:grid-cols-4">
      {isEdit ? (
        <TextInput
          autocomplete={autocomplete}
          inputType={inputType}
          className="col-span-3"
          title={title}
          showLabel={false}
          initialValue={initialElement.value as string}
        />
      ) : (
        <p className="col-span-4">{value}</p>
      )}
    </div>
  );
};
