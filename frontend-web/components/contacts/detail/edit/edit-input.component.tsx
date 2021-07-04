import {
  ActionType,
  IsLoadingAction,
  PersonCommunicationChannel,
} from "../../../../globals/interfaces";
import React, { Ref, useEffect, useRef, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { classNames } from "../../../../globals/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown as fasCrown } from "@fortawesome/pro-solid-svg-icons";
import {
  faCircle,
  faCrown as farCrown,
  faStars,
  faTrash,
} from "@fortawesome/pro-regular-svg-icons";
import { TextInput } from "../../../common/input.component";
import { Button } from "../../../common/button.component";

interface InputOptions {
  title?: string;
  inputType?: string;
  autocomplete?: string;
  placeholder?: string;
}

interface InputProps<T> {
  initialElement?: T;
  inputRef?: Ref<HTMLInputElement>;
  onChange?: (aValue: string) => void;
  isEdit: boolean;
  inputOptions?: InputOptions;
}

interface RadioProps<T> {
  isEdit: boolean;
  values: T[];
  label: string;
  CustomEditInput?: React.FC<InputProps<T>>;
  inputOptions?: InputOptions;
  onChange?: (value: T) => void;
  addItem?: IsLoadingAction<string>;
  deleteItem?: IsLoadingAction<T>;
  updateItem?: IsLoadingAction<T>;
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
  addItem,
  deleteItem,
  updateItem,
}) => {
  const [selectedId, setSelectedId] = useState(values?.[0]?._id);
  const [isAdding, setAdding] = useState(false);
  const addReference = useRef<HTMLInputElement>();

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
              await addItem.action?.(addReference.current.value);
              addReference.current.value = "";
              setAdding(false);
            }
          }}
        >
          <EditInput
            isEdit={isEdit}
            inputRef={addReference}
            inputOptions={{
              ...inputOptions,
              placeholder: "Neu anlegen",
            }}
          />
          <Button
            isLoading={isAdding}
            className={classNames(isEdit ? "block" : "hidden")}
          >
            Hinzufügen
          </Button>
        </form>
      )}
    </>
  );
};

interface ItemProps<T extends PersonCommunicationChannel> {
  element: T;
  isEdit: boolean;
  selectedId: string;
  deleteItem?: IsLoadingAction<T>;
  updateItem?: IsLoadingAction<T>;
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

  const inputRef = useRef<HTMLInputElement>();

  return (
    <li
      key={element._id}
      className={classNames(
        isEdit && "py-1",
        isEdit && selectedId === element._id && "border-primary-500",
        "flex justify-center items-center px-3 border-2 space-x-2 border-transparent rounded-md"
      )}
    >
      <p className={classNames(isEdit ? "hidden" : "block", "w-6")}>
        {element._id === selectedId && <FontAwesomeIcon icon={faStars} />}
      </p>
      {isEdit && deleteItem && (
        <Button
          asyncAction={() => {
            return deleteItem.action(element);
          }}
          type={ActionType.DANGER}
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
          }}
          isEdit={isEdit && Boolean(updateItem)}
          inputOptions={inputOptions}
          inputRef={inputRef}
        />
      )}
      {updateItem && touched && (
        <div className="flex space-x-1">
          <Button
            type={ActionType.INFO}
            className={classNames("self-center")}
            asyncAction={async () => {
              setTouched(false);
              await updateItem.action({
                ...element,
                value: inputRef.current.value,
              });
            }}
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
    <div className="flex flex-1 grid grid-cols-3 md:grid-cols-4">
      {isEdit ? (
        <TextInput
          inputRef={inputRef}
          autocomplete={autocomplete}
          inputType={inputType}
          className="col-span-3"
          placeholder={placeholder}
          onChange={(aValue) => {
            setValue(aValue);
            onChange?.(aValue);
          }}
          value={value}
          title={title}
          showLabel={false}
          initialValue={initialElement?.value as string}
        />
      ) : (
        <p className="col-span-4">{value}</p>
      )}
    </div>
  );
};
