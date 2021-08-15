import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { invalidateQueries } from "../config/react-query";
import { CreatePerson, IdOnly, UpdatePerson } from "../global/interfaces";
import { usePersonNavigate } from "../global/person-utils";
import { URL_API_Persons } from "../global/urls";
import {
  createPerson,
  deletePerson,
  favoritePerson,
  updatePerson,
} from "../services/person-service";

export function usePersonMutation(aPerson?: IdOnly) {
  function invalidatePersonList() {
    invalidateQueries({ queryKey: "/persons" });
  }

  const { navigateTo } = usePersonNavigate();

  const { mutateAsync: mutatePersonCreate } = useMutation<
    IdOnly,
    AxiosError,
    CreatePerson
  >(
    URL_API_Persons,
    (aPerson) => {
      return createPerson(aPerson);
    },
    {
      onSuccess: (idOnly) => navigateTo(idOnly),
    }
  );

  const { mutateAsync: mutatePersonDelete } = useMutation<void, AxiosError>(
    [URL_API_Persons, aPerson._id],
    () => {
      return deletePerson(aPerson);
    },
    {
      onSuccess: () => invalidatePersonList(),
    }
  );

  const { mutateAsync: mutatePersonUpdate } = useMutation<
    unknown,
    AxiosError,
    UpdatePerson
  >(
    [URL_API_Persons, aPerson._id],
    (data) => {
      return updatePerson({
        _id: aPerson._id,
        ...data,
      });
    },
    {
      onSuccess: () => invalidatePersonList(),
    }
  );

  const { mutateAsync: mutatePersonFavorite } = useMutation<
    void,
    AxiosError,
    boolean
  >(
    [URL_API_Persons, aPerson._id],
    (state) => {
      return favoritePerson(aPerson, state);
    },
    {
      onSuccess: () => invalidatePersonList(),
    }
  );

  return {
    createPerson: mutatePersonCreate,
    deletePerson: mutatePersonDelete,
    updatePerson: mutatePersonUpdate,
    favoritePerson: mutatePersonFavorite,
  };
}
