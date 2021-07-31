import React from "react";
import { TextInput } from "../../../../elements/common/input.component";
import { PersonAddress } from "../../../../../global/interfaces";

interface Props {
  initialElement: PersonAddress;
}

export const EditAddress: React.FC<Props> = ({ initialElement }) => {
  return (
    <>
      <TextInput
        autoComplete="address-level2"
        type="text"
        className="col-span-6"
        title={"E-Mail"}
        change={(s) => undefined}
        value={initialElement.value.street}
      />
      <TextInput
        autoComplete="address-line1"
        type="text"
        className="col-span-6"
        title={"E-Mail"}
        value={initialElement.value.city}
        change={(s) => undefined}
      />
      <div className="md:col-span-2 hidden md:block" />
      <TextInput
        autoComplete="postal-code"
        type="text"
        className="col-span-2 pr-2"
        title={"E-Mail"}
        change={(s) => undefined}
        value={initialElement.value.zip}
      />
      <TextInput
        autoComplete="country"
        type="text"
        className="col-span-4"
        title={"E-Mail"}
        change={(s) => undefined}
        value={initialElement.value.country}
      />
    </>
  );
};
