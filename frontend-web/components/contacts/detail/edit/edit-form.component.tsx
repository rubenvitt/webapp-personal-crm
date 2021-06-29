import {
  Birthday,
  DateType,
  IdOnly,
  PersonDetails,
  UpdatePerson,
} from "../../../../globals/interfaces";
import { TextInput } from "../../../common/input.component";
import { GenderInput } from "../../../common/form/gender.input.component";
import React, { useEffect } from "react";
import { BirthdayInput } from "../../../common/form/birthday.input.component";
import { FormSection } from "../../../common/form/section.component";
import { SelectInput } from "../../../common/form/select.input.component";
import { FormLayout } from "../../../common/form/form.layout.component";
import { useRouter } from "next/router";
import create from "zustand";
import { useMutation } from "react-query";
import { reactQuery } from "../../../../globals/react-query.config";
import { updatePerson } from "../../../../services/person-service";

interface Props {
  person: PersonDetails;
}

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

interface FormType {
  updatePersonModel: UpdatePerson;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setNickName: (value: string) => void;
  setDisplayName: (value: string) => void;
  setGender: (gender: { gender: string; anrede: string }) => void;
  setBirthday: (value: Birthday) => void;
  initialize: (value: PersonDetails) => void;
}

const useFormStore = create<FormType>((set, get) => ({
  updatePersonModel: {
    _id: "",
    anrede: "",
    nickName: "",
    birthday: { dateType: DateType.UNKNOWN },
    firstName: "",
    gender: "",
    lastName: "",
    displayName: "",
  },
  setFirstName: (value) => {
    set({
      updatePersonModel: {
        ...get().updatePersonModel,
        firstName: value,
      },
    });
  },
  setLastName: (value) => {
    set({
      updatePersonModel: {
        ...get().updatePersonModel,
        lastName: value,
      },
    });
  },
  setNickName: (value) => {
    set({
      updatePersonModel: {
        ...get().updatePersonModel,
        nickName: value,
      },
    });
  },
  setDisplayName: (value) => {
    set({
      updatePersonModel: {
        ...get().updatePersonModel,
        displayName: value,
      },
    });
  },
  setGender: (value) => {
    set({
      updatePersonModel: {
        ...get().updatePersonModel,
        gender: value.gender,
        anrede: value.anrede,
      },
    });
  },
  setBirthday: (value) => {
    set({
      updatePersonModel: {
        ...get().updatePersonModel,
        birthday: value,
      },
    });
  },
  initialize: (person) => {
    set({
      updatePersonModel: {
        ...person,
        birthday: person.birthday ?? { dateType: DateType.UNKNOWN },
      },
    });
  },
}));

export const EditPersonForm: React.FC<Props> = ({ person }) => {
  const {
    updatePersonModel,
    setBirthday,
    initialize,
    setFirstName,
    setNickName,
    setLastName,
    setGender,
    setDisplayName,
  } = useFormStore();

  const { push } = useRouter();

  const { mutate } = useMutation<void, unknown, UpdatePerson>(
    "update-contacts",
    async (element) => {
      return await updatePerson(element);
    },
    {
      onSuccess: async () => {
        await reactQuery.invalidateQueries("persons");
        console.log("success 1/3");
        await reactQuery.invalidateQueries(["persons", person._id]);
        console.log("success 2/3");
        await navigateTo(person);
        console.log("success 3/3");
      },
    }
  );

  function navigateTo(aPerson: IdOnly) {
    return push("/contacts/" + aPerson._id);
  }

  useEffect(() => {
    console.log("initialize with: ", person);
    initialize(person);
  }, [person]);

  return (
    <>
      <FormLayout
        cancel={{ action: () => navigateTo(person) }}
        save={{
          action: () => {
            console.log("update person");
            mutate(updatePersonModel);
          },
        }}
      >
        <FormSection
          title={"Generelle Informationen"}
          description={"Allgemeine Informationen über den Kontakt"}
        >
          <TextInput
            required={
              !updatePersonModel.firstName &&
              !updatePersonModel.lastName &&
              !updatePersonModel.nickName
            }
            onChange={setFirstName}
            value={updatePersonModel.firstName}
            title={"Vorname"}
            className={"col-span-4 sm:col-span-2"}
          />
          <TextInput
            required={
              !updatePersonModel.firstName &&
              !updatePersonModel.lastName &&
              !updatePersonModel.nickName
            }
            onChange={setLastName}
            value={updatePersonModel.lastName}
            title={"Nachname"}
            className={"col-span-4 sm:col-span-2"}
          />
          <TextInput
            required={
              !updatePersonModel.firstName &&
              !updatePersonModel.lastName &&
              !updatePersonModel.nickName
            }
            onChange={setNickName}
            value={updatePersonModel.nickName}
            title={"Spitzname"}
            className={"col-span-4 sm:col-span-2"}
          />
          <SelectInput
            title="Anzeigename"
            id="displayName"
            className="col-span-4 sm:col-span-2"
            buttonClassName="mt-1"
            onChange={(value) => {
              setDisplayName(value);
            }}
          >
            {[
              {
                condition:
                  updatePersonModel.firstName && updatePersonModel.lastName,
                value:
                  updatePersonModel.firstName +
                  " " +
                  updatePersonModel.lastName,
                form: DisplayNameType.FIRSTNAME_LASTNAME,
              },
              {
                condition: updatePersonModel.firstName,
                value: updatePersonModel.firstName,
                form: DisplayNameType.FIRSTNAME_ONLY,
              },
              {
                condition: updatePersonModel.lastName,
                value: updatePersonModel.lastName,
                form: DisplayNameType.LASTNAME_ONLY,
              },
              {
                condition: updatePersonModel.nickName,
                value: updatePersonModel.nickName,
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
              gender: updatePersonModel.gender,
              anrede: updatePersonModel.anrede,
            }}
            className={"col-span-4 sm:col-span-4"}
          />
          <BirthdayInput
            placeholder={"Geburtstag"}
            required={
              !updatePersonModel.birthday?.dateValue &&
              updatePersonModel.birthday?.dateType !== DateType.UNKNOWN
            }
            className={"col-span-4 sm:col-span-2"}
            onChange={setBirthday}
          />
        </FormSection>
      </FormLayout>
    </>
  );
};
