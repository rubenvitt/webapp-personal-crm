import React, { useEffect, useState } from "react";
import { TextInput } from "../../../common/input.component";
import { PersonPhone } from "../../../../globals/interfaces";
import { RadioGroup } from "@headlessui/react";
import { classNames } from "../../../../globals/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCrown as farCrown,
} from "@fortawesome/pro-regular-svg-icons";
import { faCrown as fasCrown } from "@fortawesome/pro-solid-svg-icons";

interface InputProps {
  initialPhoneNumber: PersonPhone;
  onChange: (phone: string) => undefined;
  isEdit: boolean;
}

interface RadioProps {
  isEdit: boolean;
  phones: PersonPhone[];
}

export const PhoneEditRadio: React.FC<RadioProps> = ({ isEdit, phones }) => {
  const [selectedPhone, setSelectedPhone] = useState(phones[0].id);
  return (
    <>
      <RadioGroup
        value={selectedPhone}
        onChange={(value) => setSelectedPhone(value)}
      >
        <RadioGroup.Label>Telefonnummern</RadioGroup.Label>
        <div className="space-y-2">
          {phones.map((phone) => {
            return (
              <li
                key={phone.id}
                className={classNames(
                  isEdit && selectedPhone === phone.id && "border-indigo-500",
                  "flex justify-between items-center px-3 py-1 border-2 border-transparent rounded-md"
                )}
              >
                <PhoneEditInput
                  isEdit={isEdit}
                  initialPhoneNumber={phone}
                  onChange={() => undefined}
                />
                <RadioGroup.Option
                  key={phone.id}
                  value={phone.id}
                  className={({ active }) =>
                    classNames(
                      !isEdit ? "" : "relative block cursor-pointer",
                      active ? "" : "",
                      "rounded-lg px-4 py-4 focus:outline-none"
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

const PhoneEditInput: React.FC<InputProps> = ({
  initialPhoneNumber,
  isEdit,
}) => {
  const [phone, setPhone] = useState<string>(initialPhoneNumber.number);

  useEffect(() => setPhone(initialPhoneNumber.number), [isEdit]);

  return (
    <div className="flex grid grid-cols-4">
      {isEdit ? (
        <TextInput
          autocomplete="tel"
          className="col-span-2"
          title={"Telefonnummer"}
          showLabel={false}
          initialValue={initialPhoneNumber.number}
        />
      ) : (
        <p className="col-span-4">{phone}</p>
      )}
    </div>
  );
};
