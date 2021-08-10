import { Omit } from "ast-types/types";
import { AxiosError } from "axios";
import useSWR, { mutate as mutateGlobal } from "swr";
import axios from "../axios";
import {
  CreateElement,
  CreatePerson,
  IdOnly,
  Person,
  PersonAddress,
  PersonDetails,
  PersonMail,
  PersonPhone,
  UpdatePerson,
} from "../global/interfaces";
import { Logger } from "../global/logging";
import { usePersonNavigate } from "../global/person-utils";
import { AsyncAction } from "../global/types";
import { URL_API_Persons } from "../global/urls";

export const findAllPersons: () => Promise<Person[]> = async () => {
  return axios
    .get("/persons")
    .then((value) => value.data)
    .catch(() => undefined);
};

export const findAllFavoritePersons: () => Promise<Person[]> = async () => {
  return axios
    .get("/persons?filter=favorites")
    .then((value) => value.data)
    .catch(() => undefined);
};

export const findDetailsFor: (aPersonId: string) => Promise<PersonDetails> = (
  aPersonId
) => axios.get("/persons/" + aPersonId).then((value) => value.data);

export const createPerson: (aPerson: CreatePerson) => Promise<IdOnly> = async (
  aPerson
) => {
  return axios
    .post<IdOnly>("/persons", aPerson)
    .then((value) => value.data)
    .catch(() => undefined);
};

export const updatePerson: (aPerson: UpdatePerson) => Promise<unknown> = async (
  aPerson
) => {
  return axios
    .put<unknown>("/persons/" + aPerson._id, aPerson)
    .then((value) => {
      Logger.log("Response", value);
      return value.data;
    });
};

export const deletePerson: (aPerson: IdOnly) => Promise<void> = async (
  aPerson
) => {
  return axios
    .delete<void>("/persons/" + aPerson._id)
    .then((value) => value.data);
};

export const favoritePerson: (
  aPerson: IdOnly,
  state: boolean
) => Promise<void> = async (aPerson, state) => {
  return axios
    .post<void>("/persons/" + aPerson._id + "/favorite", {
      status: state,
    })
    .then((value) => value.data)
    .catch(() => undefined);
};

export const addPhoneNumber: (
  aPerson: IdOnly,
  phone: Omit<PersonPhone, "_id">
) => Promise<void> = async (aPerson, phone) => {
  return axios
    .post<void>("/persons/" + aPerson._id + "/contact/phone/add", phone)
    .then((value) => value.data)
    .catch(() => undefined);
};

export const updatePhoneNumber: (
  aPerson: IdOnly,
  phone: PersonPhone
) => Promise<void> = async (aPerson, phone) => {
  return axios
    .put<void>("/persons/" + aPerson._id + "/contact/phone/" + phone._id, phone)
    .then((value) => value.data)
    .catch(() => undefined);
};

export const deletePhoneNumber: (
  aPersonId: IdOnly,
  aPhoneID: IdOnly
) => Promise<void> = async ({ _id: aPerson }, { _id: aPhone }) => {
  return axios
    .delete<void>("/persons/" + aPerson + "/contact/phone/" + aPhone)
    .then((value) => value.data)
    .catch(() => undefined);
};

export const addMailAddress: (
  aPerson: IdOnly,
  mail: Omit<PersonMail, "_id">
) => Promise<void> = async (aPerson, mail) => {
  return axios
    .post<void>(`/persons/${aPerson._id}/contact/mail/add`, mail)
    .then((value) => value.data);
};

export const updateMailAddress: (
  aPerson: IdOnly,
  mail: PersonMail
) => Promise<void> = async (aPerson, mail) => {
  return axios
    .put<void>("/persons/" + aPerson._id + "/contact/mail/" + mail._id, mail)
    .then((value) => value.data)
    .catch(() => undefined);
};

export const deleteMailAddress: (
  aPersonId: IdOnly,
  aMailId: IdOnly
) => Promise<void> = async ({ _id: aPerson }, { _id: aMail }) => {
  return axios
    .delete<void>("/persons/" + aPerson + "/contact/mail/" + aMail)
    .then((value) => value.data);
};

export function addAddress(
  aPerson: IdOnly,
  address: CreateElement<PersonAddress>
): Promise<void> {
  return axios
    .post<void>(`/persons/${aPerson._id}/contact/address/add`, address)
    .then((value) => value.data);
}

export function updateAddress(
  aPerson: IdOnly,
  address: PersonAddress | unknown
): Promise<void> {
  Logger.log("updating address with data:", address);
  return axios
    .put<void>(
      `/persons/${aPerson._id}/contact/address/${
        (address as PersonAddress)._id
      }`,
      address
    )
    .then((value) => value.data);
}

export function deleteAddress(
  { _id: aPerson }: IdOnly,
  { _id: anAddress }: IdOnly
): Promise<void> {
  return axios
    .delete<void>(`/persons/${aPerson}/contact/address/${anAddress}`)
    .then((value) => value.data);
}

// API
const useCacheInvalidations = () => {
  return {
    invalidatePersons: () => mutateGlobal(URL_API_Persons),
    invalidateFavorites: () =>
      mutateGlobal(URL_API_Persons + "?filter=favorites"),
  };
};

export function usePersonMutation(aPerson: IdOnly): {
  deletePerson: AsyncAction;
  updatePerson: AsyncAction<unknown>;
} {
  const url = URL_API_Persons + "/" + aPerson._id;
  const { mutate } = useSWR<PersonDetails>(url);
  const { invalidateFavorites, invalidatePersons } = useCacheInvalidations();

  const mutateDelete = async () => {
    Logger.warning("Removing person", aPerson);
    mutate(undefined, false);
    await deletePerson(aPerson);
    invalidateFavorites();
    invalidatePersons();
    return Promise.resolve();
  };

  const mutateUpdate = async (essentialFormValue) => {
    mutate(
      {
        _id: aPerson._id,
        ...essentialFormValue,
      },
      false
    );
    await updatePerson({
      _id: aPerson._id,
      ...essentialFormValue,
    });
    invalidateFavorites();
    invalidatePersons();
    mutate();
    return Promise.resolve();
  };

  return {
    deletePerson: mutateDelete,
    updatePerson: mutateUpdate,
  };
}

export const usePersons: (filters?: string) => {
  persons?: Person[];
  isLoading: boolean;
  isError?: AxiosError;
  navigateTo: () => Promise<void>;
} = (filter) => {
  const { navigateTo } = usePersonNavigate();
  const { data, error } = useSWR<Person[], AxiosError>(
    URL_API_Persons + (filter ? "?filter=" + filter : "")
  );

  const _navigateTo = async () => {
    await navigateTo();
  };

  return {
    persons: data,
    isLoading: !error && !data,
    isError: error,
    navigateTo: _navigateTo,
  };
};

export const usePerson: (aPersonId: string) => {
  person?: PersonDetails;
  isLoading: boolean;
  isError?: AxiosError;
  navigateTo: () => Promise<void>;
} = (aPersonId) => {
  const url = URL_API_Persons + "/" + aPersonId;
  const { navigateTo } = usePersonNavigate();
  const { data, error } = useSWR<PersonDetails, AxiosError>(url);

  const _navigateTo = async () => {
    await navigateTo({ _id: aPersonId });
  };

  return {
    person: data,
    isLoading: !error && !data,
    isError: error,
    navigateTo: _navigateTo,
  };
};
