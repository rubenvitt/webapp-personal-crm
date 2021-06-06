import React, { useEffect, useState } from "react";
import { TextInput } from "../../../common/input.component";
import { PersonMail } from "../../../../globals/interfaces";
import { RadioGroup } from "@headlessui/react";
import { classNames } from "../../../../globals/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown as fasCrown } from "@fortawesome/pro-solid-svg-icons";
import {
  faCircle,
  faCrown as farCrown,
} from "@fortawesome/pro-regular-svg-icons";

interface InputProps {
  initialMailAddress: PersonMail;
  onChange: (mail: string) => undefined;
  isEdit: boolean;
}

interface RadioProps {
  isEdit: boolean;
  mails: PersonMail[];
}

export const MailEditRadio: React.FC<RadioProps> = ({ isEdit, mails }) => {
  const [selectedMail, setSelectedMail] = useState(mails[0].id);
  return (
    <>
      <RadioGroup
        value={selectedMail}
        onChange={(value) => setSelectedMail(value)}
      >
        <RadioGroup.Label>E-Mail Adressen</RadioGroup.Label>
        <div className="space-y-2">
          {mails.map((mail) => {
            return (
              <li
                key={mail.id}
                className={classNames(
                  isEdit && selectedMail === mail.id && "border-indigo-500",
                  "flex justify-between items-center px-3 py-1 border-2 border-transparent rounded-md"
                )}
              >
                <MailEditInput
                  isEdit={isEdit}
                  initialMailAddress={mail}
                  onChange={() => undefined}
                />
                <RadioGroup.Option
                  key={mail.id}
                  value={mail.id}
                  className={({ active }) =>
                    classNames(
                      !isEdit ? "" : "relative block",
                      active ? "" : "",
                      "rounded-lg px-4 py-4 cursor-pointer focus:outline-none"
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
        </div>
      </RadioGroup>
    </>
  );
};

const MailEditInput: React.FC<InputProps> = ({
  initialMailAddress,
  isEdit,
}) => {
  const [mail, setMail] = useState<string>(initialMailAddress.address);

  useEffect(() => setMail(initialMailAddress.address), [isEdit]);

  return (
    <div className="flex grid grid-cols-4">
      {isEdit ? (
        <TextInput
          autocomplete="email"
          inputType="email"
          className="col-span-2"
          title={"E-Mail"}
          showLabel={false}
          initialValue={initialMailAddress.address}
        />
      ) : (
        <p className="col-span-4">{mail}</p>
      )}
    </div>
  );
};
