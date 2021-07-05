import {
  CreatePerson,
  IdOnly,
  Person,
  PersonDetails,
  PersonMail,
  PersonPhone,
  UpdatePerson,
} from "../globals/interfaces";
import axios from "../axios";
import useSWR, { mutate as mutateGlobal } from "swr";
import { URL_API_Persons } from "../globals/urls";
import { AxiosError } from "axios";
import { usePersonNavigate } from "../globals/person-utils";
import { Omit } from "ast-types/types";

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

export const updatePerson: (aPerson: UpdatePerson) => Promise<void> = async (
  aPerson
) => {
  return axios
    .put<void>("/persons/" + aPerson._id, aPerson)
    .then((value) => value.data);
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

// API
const useCacheInvalidations = () => {
  return {
    invalidatePersons: () => mutateGlobal(URL_API_Persons),
    invalidateFavorites: () =>
      mutateGlobal(URL_API_Persons + "?filter=favorites"),
  };
};

export const usePersonMutation: (aPerson: IdOnly) => {
  deletePerson: () => Promise<void>;
  updatePerson: (essentialFormValue: unknown) => Promise<void>;
} = (aPerson: IdOnly) => {
  const url = URL_API_Persons + "/" + aPerson._id;
  const { mutate } = useSWR<PersonDetails>(url);
  const { invalidateFavorites, invalidatePersons } = useCacheInvalidations();

  const mutateDelete = async () => {
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
};

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
