import {
  faCircle,
  faCrown as farCrown,
  faStars,
  faTrash,
} from "@fortawesome/pro-regular-svg-icons";
import { faCrown as fasCrown } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RadioGroup } from "@headlessui/react";
import React, { Ref, useEffect, useRef, useState } from "react";
import {
  ActionType,
  CreateElement,
  PersonCommunicationChannel,
} from "../../../../../global/interfaces";
import { AsyncAction, MaybeAsyncAction } from "../../../../../global/types";
import { classNames } from "../../../../../global/utils";
import { Button } from "../../../../elements/common/button.component";
import { TextInput } from "../../../../elements/common/input.component";

interface InputOptions {
  title?: string;
  inputType?: string;
  autocomplete?: string;
  placeholder?: string;
}

export interface InputProps<T> {
  initialElement?: T;
  inputRef?: Ref<HTMLInputElement>;
  onChange?: MaybeAsyncAction<CreateElement<T> | string>;
  isEdit: boolean;
  inputOptions?: InputOptions;
  element?: T;
}

interface RadioProps<T> {
  isEdit: boolean;
  values: T[];
  label: string;
  CustomEditInput?: React.FC<InputProps<T>>;
  inputOptions?: InputOptions;
  onChange?: (value: T) => void;
  addItem?: AsyncAction<string | T>;
  deleteItem?: AsyncAction<T>;
  updateItem?: AsyncAction<T>;
}

export function EditRadio<T extends PersonCommunicationChannel>({
  values,
  isEdit,
  label,
  CustomEditInput,
  inputOptions,
  onChange,
  addItem,
  deleteItem,
  updateItem,
}: React.PropsWithChildren<RadioProps<T>>): JSX.Element {
  const [selectedId, setSelectedId] = useState(values?.[0]?._id);
  const [isAdding, setAdding] = useState(false);
  const addReference = useRef<HTMLInputElement | null>(null);
  const [addInputValue, setAddInputValue] = useState<T>();

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
              <InputListItem
                key={element._id}
                element={element}
                isEdit={isEdit}
                CustomEditInput={CustomEditInput}
                inputOptions={inputOptions}
                deleteItem={deleteItem}
                updateItem={updateItem}
                selectedId={selectedId}
              />
            );
          })}
        </ul>
        {(!values || values.length === 0) && (
          <p className="pl-4 text-red-500">Keine Elemente vorhanden</p>
        )}
      </RadioGroup>
      {addItem && (
        <form
          className="flex"
          onSubmit={async (event) => {
            setAdding(true);
            event.preventDefault();
            if (event.currentTarget.reportValidity()) {
              if (addReference?.current) {
                await addItem?.(addReference.current.value);
                addReference.current.value = "";
              } else {
                await addItem?.(addInputValue);
              }
              setAdding(false);
            }
          }}
        >
          {CustomEditInput ? (
            <CustomEditInput
              isEdit={isEdit}
              inputOptions={{ ...inputOptions, placeholder: "Neu anlegen" }}
              onChange={(value) => setAddInputValue(value as T)}
              element={addInputValue}
            />
          ) : (
            <EditInput
              isEdit={isEdit}
              inputRef={addReference}
              inputOptions={{ ...inputOptions, placeholder: "Neu anlegen" }}
            />
          )}
          <Button
            isLoading={isAdding}
            className={classNames(isEdit ? "block" : "hidden")}
            type="submit"
          >
            Hinzufügen
          </Button>
        </form>
      )}
    </>
  );
}

interface ItemProps<T extends PersonCommunicationChannel> {
  element: T;
  isEdit: boolean;
  selectedId: string;
  deleteItem?: AsyncAction<T>;
  updateItem?: AsyncAction<T>;
  CustomEditInput?: React.FC<InputProps<T>>;
  inputOptions?: InputOptions;
}

const InputListItem: <T extends PersonCommunicationChannel>(
  props: React.PropsWithoutRef<ItemProps<T>>
) => JSX.Element = ({
  element,
  isEdit,
  selectedId,
  deleteItem,
  updateItem,
  CustomEditInput,
  inputOptions,
}) => {
  const [touched, setTouched] = useState<boolean>();
  const [currentValue, setCurrentValue] = useState<string>();

  const currentSelected = element._id === selectedId;
  return (
    <li
      key={element._id}
      className={classNames(
        isEdit && "py-1",
        isEdit && currentSelected && "border-primary-500",
        "justify-center px-3 border-2 border-transparent rounded-md"
      )}
    >
      <form
        className="flex items-center space-x-2"
        onSubmit={async (event) => {
          event.preventDefault();
          setTouched(false);
          await updateItem({
            ...element,
            value: currentValue,
          });
        }}
      >
        <p className={classNames(isEdit ? "hidden" : "block", "w-6")}>
          {currentSelected && <FontAwesomeIcon icon={faStars} />}
        </p>
        {isEdit && deleteItem && (
          <Button
            action={() => {
              return deleteItem(element);
            }}
            actionType={ActionType.DANGER}
            className="self-center rounded-full "
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        )}
        {CustomEditInput ? (
          <CustomEditInput
            isEdit={isEdit && Boolean(updateItem)}
            onChange={(aValue) => {
              if (aValue !== element?.value) setTouched(true);
              else setTouched(false);
            }}
            initialElement={element}
            inputOptions={inputOptions}
          />
        ) : (
          <EditInput
            initialElement={element}
            onChange={(aValue) => {
              if (aValue !== element?.value) setTouched(true);
              else setTouched(false);
              setCurrentValue(aValue as string);
            }}
            isEdit={isEdit && Boolean(updateItem)}
            inputOptions={inputOptions}
          />
        )}
        {updateItem && isEdit && touched && (
          <div className="flex space-x-1">
            <Button
              actionType={ActionType.INFO}
              className={classNames("self-center")}
              type="submit"
            >
              Update
            </Button>
          </div>
        )}
        <RadioGroup.Option
          value={element._id}
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
      </form>
    </li>
  );
};

const EditInput: <T extends PersonCommunicationChannel>(
  props: React.PropsWithChildren<InputProps<T>>
) => JSX.Element = ({
  onChange,
  isEdit,
  inputRef,
  initialElement,
  inputOptions: {
    inputType = "text",
    autocomplete = "off",
    title = "Text",
    placeholder = "",
  } = {
    inputType: "text",
    autocomplete: "off",
    title: "Text",
    placeholder: "",
  },
}) => {
  const [value, setValue] = useState(initialElement?.value as string);

  useEffect(() => setValue(initialElement?.value as string), [isEdit]);

  return (
    <div className="flex flex-1">
      {isEdit ? (
        <TextInput
          inputRef={inputRef}
          autoComplete={autocomplete}
          type={inputType}
          className="flex-1 mr-3"
          placeholder={placeholder}
          change={(aValue) => {
            onChange?.(aValue);
          }}
          title={title}
          value={initialElement?.value as string}
        />
      ) : (
        <p className="col-span-4">{value}</p>
      )}
    </div>
  );
};
