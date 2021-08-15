import { Omit } from "ast-types/types";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { apiAxios } from "../axios";
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
import { URL_API_Persons } from "../global/urls";

export const findAllPersons: () => Promise<Person[]> = async () => {
  return apiAxios.get("/persons").then((value) => value.data);
};

export const findAllFavoritePersons: () => Promise<Person[]> = async () => {
  return apiAxios.get("/persons?filter=favorites").then((value) => value.data);
};

export const findDetailsFor: (aPersonId: string) => Promise<PersonDetails> = (
  aPersonId
) => apiAxios.get("/persons/" + aPersonId).then((value) => value.data);

export const createPerson: (aPerson: CreatePerson) => Promise<IdOnly> = async (
  aPerson
) => {
  return apiAxios.post<IdOnly>("/persons", aPerson).then((value) => value.data);
};

export const updatePerson: (aPerson: UpdatePerson) => Promise<unknown> = async (
  aPerson
) => {
  return apiAxios
    .put<unknown>("/persons/" + aPerson._id, aPerson)
    .then((value) => {
      Logger.log("Response", value);
      return value.data;
    });
};

export const deletePerson: (aPerson: IdOnly) => Promise<void> = async (
  aPerson
) => {
  return apiAxios
    .delete<void>("/persons/" + aPerson._id)
    .then((value) => value.data);
};

export const favoritePerson: (
  aPerson: IdOnly,
  state: boolean
) => Promise<void> = async (aPerson, state) => {
  return apiAxios
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
  return apiAxios
    .post<void>("/persons/" + aPerson._id + "/contact/phone/add", phone)
    .then((value) => value.data)
    .catch(() => undefined);
};

export const updatePhoneNumber: (
  aPerson: IdOnly,
  phone: PersonPhone
) => Promise<void> = async (aPerson, phone) => {
  return apiAxios
    .put<void>("/persons/" + aPerson._id + "/contact/phone/" + phone._id, phone)
    .then((value) => value.data)
    .catch(() => undefined);
};

export const deletePhoneNumber: (
  aPersonId: IdOnly,
  aPhoneID: IdOnly
) => Promise<void> = async ({ _id: aPerson }, { _id: aPhone }) => {
  return apiAxios
    .delete<void>("/persons/" + aPerson + "/contact/phone/" + aPhone)
    .then((value) => value.data)
    .catch(() => undefined);
};

export const addMailAddress: (
  aPerson: IdOnly,
  mail: Omit<PersonMail, "_id">
) => Promise<void> = async (aPerson, mail) => {
  return apiAxios
    .post<void>(`/persons/${aPerson._id}/contact/mail/add`, mail)
    .then((value) => value.data);
};

export const updateMailAddress: (
  aPerson: IdOnly,
  mail: PersonMail
) => Promise<void> = async (aPerson, mail) => {
  return apiAxios
    .put<void>("/persons/" + aPerson._id + "/contact/mail/" + mail._id, mail)
    .then((value) => value.data)
    .catch(() => undefined);
};

export const deleteMailAddress: (
  aPersonId: IdOnly,
  aMailId: IdOnly
) => Promise<void> = async ({ _id: aPerson }, { _id: aMail }) => {
  return apiAxios
    .delete<void>("/persons/" + aPerson + "/contact/mail/" + aMail)
    .then((value) => value.data);
};

export function addAddress(
  aPerson: IdOnly,
  address: CreateElement<PersonAddress>
): Promise<void> {
  return apiAxios
    .post<void>(`/persons/${aPerson._id}/contact/address/add`, address)
    .then((value) => value.data);
}

export function updateAddress(
  aPerson: IdOnly,
  address: PersonAddress | unknown
): Promise<void> {
  Logger.log("updating address with data:", address);
  return apiAxios
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
  return apiAxios
    .delete<void>(`/persons/${aPerson}/contact/address/${anAddress}`)
    .then((value) => value.data);
}

// API
const useCacheInvalidations = () => {
  return {
    invalidatePersons: () => undefined,
    invalidateFavorites: () => undefined,
  };
};

export const usePersons: (filters?: string) => {
  persons?: Person[];
  isLoading: boolean;
  isError?: AxiosError;
  navigateTo: () => Promise<void>;
} = (filter) => {
  const { navigateTo } = usePersonNavigate();
  const { data, error } = useQuery<Person[], AxiosError>(
    [URL_API_Persons, filter ? "?filter=" + filter : ""],
    (context) => {
      const filter = context.queryKey[1];
      return apiAxios
        .get<Person[]>(URL_API_Persons + filter)
        .then((value) => value.data);
    }
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
  const { navigateTo } = usePersonNavigate();
  const { data, error } = useQuery<PersonDetails, AxiosError>(
    [URL_API_Persons, aPersonId],
    () => {
      return apiAxios
        .get<PersonDetails>(`${URL_API_Persons}/${aPersonId}`)
        .then((value) => value.data);
    }
  );

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
