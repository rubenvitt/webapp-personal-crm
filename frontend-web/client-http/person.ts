import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { IdOnly, UpdatePerson } from "../global/interfaces";
import { URL_API_Persons } from "../global/urls";
import {
  deletePerson,
  favoritePerson,
  updatePerson,
} from "../services/person-service";

export function usePersonMutation(aPerson: IdOnly) {
  const { mutateAsync: mutatePersonDelete } = useMutation<void, AxiosError>(
    [URL_API_Persons, aPerson._id],
    () => {
      return deletePerson(aPerson);
    }
  );

  const { mutateAsync: mutatePersonUpdate } = useMutation<
    unknown,
    AxiosError,
    UpdatePerson
  >([URL_API_Persons, aPerson._id], (data) => {
    return updatePerson({
      _id: aPerson._id,
      ...data,
    });
  });

  const { mutateAsync: mutatePersonFavorite } = useMutation<
    void,
    AxiosError,
    boolean
  >([URL_API_Persons, aPerson._id], (state) => {
    return favoritePerson(aPerson, state);
  });

  return {
    deletePerson: mutatePersonDelete,
    updatePerson: mutatePersonUpdate,
    favoritePerson: mutatePersonFavorite,
  };
}
