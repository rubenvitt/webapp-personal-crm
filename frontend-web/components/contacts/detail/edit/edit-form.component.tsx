import {
  Birthday,
  DateType,
  IdOnly,
  PersonDetails,
  UpdatePerson,
} from "../../../../globals/interfaces";
import React, { useEffect } from "react";
import { FormLayout } from "../../../common/form/form.layout.component";
import { useRouter } from "next/router";
import create from "zustand";
import { useMutation } from "react-query";
import { reactQuery } from "../../../../globals/react-query.config";
import { updatePerson } from "../../../../services/person-service";
import { EssentialFormSection } from "../form/essential-form-section.component";

interface Props {
  person: PersonDetails;
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
        await reactQuery.invalidateQueries(["persons", person._id]);
        await navigateTo(person);
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
        <EssentialFormSection />
      </FormLayout>
    </>
  );
};
