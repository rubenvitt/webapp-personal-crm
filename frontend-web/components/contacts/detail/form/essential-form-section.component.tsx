import { TextInput } from "../../../common/input.component";
import { SelectInput } from "../../../common/form/select.input.component";
import { GenderInput } from "../../../common/form/gender.input.component";
import { BirthdayInput } from "../../../common/form/birthday.input.component";
import {
  Birthday,
  Birthdayed,
  DateType,
  Gendered,
  PersonDetails,
  RichName,
} from "../../../../globals/interfaces";
import { FormSection } from "../../../common/form/section.component";
import React, { useEffect } from "react";
import create from "zustand";

interface Props {
  personDetails?: PersonDetails;
}

interface EssentialData extends RichName, Gendered, Birthdayed {}

interface FormType {
  formValue: EssentialData;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setNickName: (value: string) => void;
  setDisplayName: (value: string) => void;
  setGender: (gender: { gender: string; anrede: string }) => void;
  setBirthday: (value: Birthday) => void;
  initialize: (value?: PersonDetails) => void;
}

const EMPTY_FORM_VALUE = {
  anrede: "",
  nickName: "",
  birthday: { dateType: DateType.UNKNOWN },
  firstName: "",
  gender: "",
  lastName: "",
  displayName: "",
};

export const useEssentialFormStore = create<FormType>((set, get) => ({
  formValue: {
    ...EMPTY_FORM_VALUE,
    birthday: {
      ...EMPTY_FORM_VALUE.birthday,
    },
  },
  setFirstName: (value) => {
    set({
      formValue: {
        ...get().formValue,
        firstName: value,
      },
    });
  },
  setLastName: (value) => {
    set({
      formValue: {
        ...get().formValue,
        lastName: value,
      },
    });
  },
  setNickName: (value) => {
    set({
      formValue: {
        ...get().formValue,
        nickName: value,
      },
    });
  },
  setDisplayName: (value) => {
    set({
      formValue: {
        ...get().formValue,
        displayName: value,
      },
    });
  },
  setGender: (value) => {
    set({
      formValue: {
        ...get().formValue,
        gender: value.gender,
        anrede: value.anrede,
      },
    });
  },
  setBirthday: (value) => {
    set({
      formValue: {
        ...get().formValue,
        birthday: value,
      },
    });
  },
  initialize: (person) => {
    if (person) {
      console.log("set person as formValue");
      set({
        formValue: {
          ...person,
          birthday: {
            ...person.birthday,
          },
        },
      });
      console.log("formValue", {
        formValue: {
          ...person,
          birthday: {
            ...person.birthday,
          },
        },
      });
    } else {
      console.log("set empy formValue");
      set({
        formValue: {
          ...EMPTY_FORM_VALUE,
          birthday: {
            ...EMPTY_FORM_VALUE.birthday,
          },
        },
      });
    }
  },
}));

enum DisplayNameType {
  FIRSTNAME_ONLY,
  LASTNAME_ONLY,
  FIRSTNAME_LASTNAME,
  NICKNAME,
}

function descriptionFor(aDisplayNameType: DisplayNameType) {
  switch (aDisplayNameType) {
    case DisplayNameType.FIRSTNAME_ONLY:
      return "Vorname";
    case DisplayNameType.LASTNAME_ONLY:
      return "Nachname";
    case DisplayNameType.FIRSTNAME_LASTNAME:
      return "Vorname Nachname";
    case DisplayNameType.NICKNAME:
      return "Spitzname";
  }
}

export const EssentialFormSection: React.FC<Props> = ({ personDetails }) => {
  const {
    formValue,
    setLastName,
    setGender,
    setNickName,
    setFirstName,
    setDisplayName,
    setBirthday,
    initialize,
  } = useEssentialFormStore();

  useEffect(() => {
    setTimeout(() => {
      console.log("initialize with details", personDetails);
      initialize(personDetails);
    });
  }, [personDetails]);

  return (
    <>
      <FormSection
        title={"Generelle Informationen"}
        description={"Allgemeine Informationen über den Kontakt"}
      >
        <TextInput
          required={
            !formValue.firstName && !formValue.lastName && !formValue.nickName
          }
          onChange={setFirstName}
          value={formValue.firstName}
          title={"Vorname"}
          className={"col-span-4 sm:col-span-2"}
        />
        <TextInput
          required={
            !formValue.firstName && !formValue.lastName && !formValue.nickName
          }
          onChange={setLastName}
          value={formValue.lastName}
          title={"Nachname"}
          className={"col-span-4 sm:col-span-2"}
        />
        <TextInput
          required={
            !formValue.firstName && !formValue.lastName && !formValue.nickName
          }
          onChange={setNickName}
          value={formValue.nickName}
          title={"Spitzname"}
          className={"col-span-4 sm:col-span-2"}
        />
        <SelectInput
          title="Anzeigename"
          id="displayName"
          className="col-span-4 sm:col-span-2"
          initialValue={formValue.displayName}
          buttonClassName="mt-1"
          onChange={(value) => {
            setDisplayName(value);
          }}
        >
          {[
            {
              condition: formValue.firstName && formValue.lastName,
              value: formValue.firstName + " " + formValue.lastName,
              form: DisplayNameType.FIRSTNAME_LASTNAME,
            },
            {
              condition: formValue.firstName,
              value: formValue.firstName,
              form: DisplayNameType.FIRSTNAME_ONLY,
            },
            {
              condition: formValue.lastName,
              value: formValue.lastName,
              form: DisplayNameType.LASTNAME_ONLY,
            },
            {
              condition: formValue.nickName,
              value: formValue.nickName,
              form: DisplayNameType.NICKNAME,
            },
          ]
            .filter((it) => it.condition)
            .map((it) => {
              return (
                <option key={it.form} value={it.value}>
                  {it.value} ({descriptionFor(it.form)})
                </option>
              );
            })}
        </SelectInput>
        <GenderInput
          required
          disabled={false}
          onChange={setGender}
          value={{
            gender: formValue.gender,
            anrede: formValue.anrede,
          }}
          className={"col-span-4 sm:col-span-4"}
        />
        <BirthdayInput
          initialValue={formValue.birthday}
          placeholder={"Geburtstag"}
          required={
            !formValue.birthday?.dateValue &&
            formValue.birthday?.dateType !== DateType.UNKNOWN
          }
          className={"col-span-4 sm:col-span-2"}
          onChange={setBirthday}
        />
      </FormSection>
    </>
  );
};
