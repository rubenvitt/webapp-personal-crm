import { AxiosError } from "axios";
import { useMutation } from "react-query";
import {
  Address,
  IdOnly,
  PersonAddress,
  PersonMail,
  PersonPhone,
} from "../global/interfaces";
import {
  addAddress,
  addMailAddress,
  addPhoneNumber,
  deleteAddress,
  deleteMailAddress,
  deletePhoneNumber,
  updateAddress,
  updateMailAddress,
  updatePhoneNumber,
} from "../services/person-service";

export function useContactMutations(person: IdOnly) {
  const addPhoneMutation = useMutation<
    void,
    AxiosError,
    Omit<PersonPhone, "_id">
  >(["/api/persons/contact/phone", person], async (variables) => {
    await addPhoneNumber(person, variables);
  });
  const deletePhoneMutation = useMutation<void, AxiosError, PersonPhone>(
    ["/api/persons/contact/phone", person],
    async (variables) => {
      await deletePhoneNumber(person, variables);
    }
  );
  const updatePhoneMutation = useMutation<void, AxiosError, PersonPhone>(
    ["/api/persons/contact/phone", person],
    async (variables) => {
      await updatePhoneNumber(person, variables);
    }
  );

  const addMailMutation = useMutation<
    void,
    AxiosError,
    Omit<PersonMail, "_id">
  >(["/api/persons/contact/mail", person], async (variables) => {
    await addMailAddress(person, variables);
  });
  const deleteMailMutation = useMutation<void, AxiosError, PersonMail>(
    ["/api/persons/contact/mail", person],
    async (variables) => {
      await deleteMailAddress(person, variables);
    }
  );
  const updateMailMutation = useMutation<void, AxiosError, PersonMail>(
    ["/api/persons/contact/mail", person],
    async (variables) => {
      await updateMailAddress(person, variables);
    }
  );

  const addAddressMutation = useMutation<
    void,
    AxiosError,
    Omit<PersonAddress, "_id">
  >(["/api/persons/contact/address", person], async (variables) => {
    await addAddress(person, variables);
  });
  const deleteAddressMutation = useMutation<void, AxiosError, PersonAddress>(
    ["/api/persons/contact/address", person],
    async (variables) => {
      await deleteAddress(person, variables);
    }
  );
  const updateAddressMutation = useMutation<
    void,
    AxiosError,
    PersonAddress | Address
  >(["/api/persons/contact/address", person], async (variables) => {
    await updateAddress(person, variables);
  });

  return {
    mutatePhoneAdd: addPhoneMutation.mutateAsync,
    mutatePhoneDelete: deletePhoneMutation.mutateAsync,
    mutatePhoneUpdate: updatePhoneMutation.mutateAsync,

    mutateMailAdd: addMailMutation.mutateAsync,
    mutateMailDelete: deleteMailMutation.mutateAsync,
    mutateMailUpdate: updateMailMutation.mutateAsync,

    mutateAddressAdd: addAddressMutation.mutateAsync,
    mutateAddressDelete: deleteAddressMutation.mutateAsync,
    mutateAddressUpdate: updateAddressMutation.mutateAsync,
  };
}
