import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { invalidateQueries } from "../config/react-query";
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
  function invalidatePerson() {
    invalidateQueries({ queryKey: ["/persons", person._id] });
  }

  const addPhoneMutation = useMutation<
    void,
    AxiosError,
    Omit<PersonPhone, "_id">
  >(
    ["/persons/contact/phone", person],
    async (variables) => {
      await addPhoneNumber(person, variables);
    },
    {
      onSuccess: () => invalidatePerson(),
    }
  );
  const deletePhoneMutation = useMutation<void, AxiosError, PersonPhone>(
    ["/persons/contact/phone", person],
    async (variables) => {
      await deletePhoneNumber(person, variables);
    },
    {
      onSuccess: () => invalidatePerson(),
    }
  );
  const updatePhoneMutation = useMutation<void, AxiosError, PersonPhone>(
    ["/persons/contact/phone", person],
    async (variables) => {
      await updatePhoneNumber(person, variables);
    },
    {
      onSuccess: () => invalidatePerson(),
    }
  );

  const addMailMutation = useMutation<
    void,
    AxiosError,
    Omit<PersonMail, "_id">
  >(
    ["/persons/contact/mail", person],
    async (variables) => {
      await addMailAddress(person, variables);
    },
    {
      onSuccess: () => invalidatePerson(),
    }
  );
  const deleteMailMutation = useMutation<void, AxiosError, PersonMail>(
    ["/persons/contact/mail", person],
    async (variables) => {
      await deleteMailAddress(person, variables);
    },
    {
      onSuccess: () => invalidatePerson(),
    }
  );
  const updateMailMutation = useMutation<void, AxiosError, PersonMail>(
    ["/persons/contact/mail", person],
    async (variables) => {
      await updateMailAddress(person, variables);
    },
    {
      onSuccess: () => invalidatePerson(),
    }
  );

  const addAddressMutation = useMutation<
    void,
    AxiosError,
    Omit<PersonAddress, "_id">
  >(
    ["/persons/contact/address", person],
    async (variables) => {
      await addAddress(person, variables);
    },
    {
      onSuccess: () => invalidatePerson(),
    }
  );
  const deleteAddressMutation = useMutation<void, AxiosError, PersonAddress>(
    ["/persons/contact/address", person],
    async (variables) => {
      await deleteAddress(person, variables);
    }
  );
  const updateAddressMutation = useMutation<
    void,
    AxiosError,
    PersonAddress | Address
  >(
    ["/persons/contact/address", person],
    async (variables) => {
      await updateAddress(person, variables);
    },
    {
      onSuccess: () => invalidatePerson(),
    }
  );

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
