import React, { useEffect, useState } from "react";
import { TextInput } from "../../../common/input.component";

interface Props {
  initialPhoneNumber: string;
  onChange: (phone: string) => undefined;
  isEdit: boolean;
}

export const PhoneEditInput: React.FC<Props> = ({
  initialPhoneNumber,
  isEdit,
}) => {
  const [phone, setPhone] = useState<string>(initialPhoneNumber);

  useEffect(() => setPhone(initialPhoneNumber), [isEdit]);

  return (
    <div className="flex grid grid-cols-4">
      {isEdit ? (
        <TextInput
          autocomplete="tel"
          className="col-span-2"
          title={"Telefonnummer"}
          showLabel={false}
          initialValue={initialPhoneNumber}
        />
      ) : (
        <p>{phone}</p>
      )}
    </div>
  );
};
