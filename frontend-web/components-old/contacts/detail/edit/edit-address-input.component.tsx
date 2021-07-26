import React from "react";
import { TextInput } from "../../../../components/elements/common/input.component";
import { PersonAddress } from "../../../../globals/interfaces";

interface Props {
  initialElement: PersonAddress;
}

export const EditAddress: React.FC<Props> = ({ initialElement }) => {
  return (
    <>
      <TextInput
        autocomplete="address-level2"
        inputType="text"
        className="col-span-6"
        title={"E-Mail"}
        showLabel={false}
        initialValue={initialElement.value.street}
      />
      <TextInput
        autocomplete="address-line1"
        inputType="text"
        className="col-span-6"
        title={"E-Mail"}
        showLabel={false}
        initialValue={initialElement.value.city}
      />
      <div className="md:col-span-2 hidden md:block" />
      <TextInput
        autocomplete="postal-code"
        inputType="text"
        className="col-span-2 pr-2"
        title={"E-Mail"}
        showLabel={false}
        initialValue={initialElement.value.zip}
      />
      <TextInput
        autocomplete="country"
        inputType="text"
        className="col-span-4"
        title={"E-Mail"}
        showLabel={false}
        initialValue={initialElement.value.country}
      />
    </>
  );
};
