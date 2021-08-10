import React, { useEffect, useState } from "react";
import {
  AddressType,
  CreateElement,
  PersonAddress,
} from "../../../../../global/interfaces";
import { TextInput } from "../../../../elements/common/input.component";
import { InputProps } from "./edit-input.component";

type Props = Omit<InputProps<PersonAddress>, "isEdit">;

export function EditAddress({ initialElement, onChange }: Props): JSX.Element {
  const [state, setState] = useState<CreateElement<PersonAddress>>(
    initialElement ?? {
      value: {
        zip: "",
        street: "",
        country: "",
        city: "",
      },
      type: AddressType.PRIVATE,
    }
  );

  useEffect(() => {
    onChange(state);
  }, [state]);

  return (
    <>
      <TextInput
        autoComplete="address-level3"
        type="text"
        className="col-span-6"
        title="Straße"
        value={state?.value.street}
        placeholder="Straße"
        change={(val) => {
          setState((prevState) => ({
            ...prevState,
            value: {
              ...prevState.value,
              street: val,
            },
          }));
        }}
      />
      <div className="md:col-span-2 hidden md:block" />
      <TextInput
        autoComplete="postal-code"
        type="text"
        className="col-span-2 pr-2"
        title="Postleitzahl"
        placeholder="PLZ"
        value={state?.value.zip}
        change={(val) => {
          setState((prevState) => ({
            ...prevState,
            value: {
              ...prevState.value,
              zip: val,
            },
          }));
        }}
      />
      <TextInput
        autoComplete="address-level2"
        type="text"
        required
        className="col-span-4"
        title="Ort"
        placeholder="Ort"
        value={state?.value.city}
        change={(val) => {
          setState((prevState) => ({
            ...prevState,
            value: {
              ...prevState.value,
              city: val,
            },
          }));
        }}
      />
      <TextInput
        autoComplete="country"
        type="text"
        className="col-span-6"
        title="Land"
        placeholder="Land"
        value={state?.value.country}
        change={(val) => {
          setState((prevState) => ({
            ...prevState,
            value: {
              ...prevState.value,
              country: val,
            },
          }));
        }}
      />
    </>
  );
}
