import React, { useEffect, useState } from "react";
import { TextInput } from "../../../common/input.component";

interface Props {
  initialMailAddress: string;
  onChange: (phone: string) => undefined;
  isEdit: boolean;
}

export const MailEditInput: React.FC<Props> = ({
  initialMailAddress,
  isEdit,
}) => {
  const [mail, setMail] = useState<string>(initialMailAddress);

  useEffect(() => setMail(initialMailAddress), [isEdit]);

  return (
    <div className="flex grid grid-cols-4">
      {isEdit ? (
        <TextInput
          autocomplete="email"
          inputType="email"
          className="col-span-2"
          title={"E-Mail"}
          showLabel={false}
          initialValue={initialMailAddress}
        />
      ) : (
        <p>{mail}</p>
      )}
    </div>
  );
};
