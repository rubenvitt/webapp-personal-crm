import { AppUser } from "../globals/interfaces";
import useSWR from "swr";
import { useRouter } from "next/router";
import { URL_API_Auth_Login, URL_API_Auth_Logout } from "../globals/urls";
import axios from "../axios";
import { AxiosError } from "axios";

const updateUser = async (data: AppUser) => {
  return await axios.patch("/user", data);
};

export const useCurrentUser: () => {
  currentUser?: AppUser;
  error?: AxiosError;
  isLoading?: boolean;
  isLoggedIn?: boolean;
  logout: () => Promise<void>;
  login: () => Promise<void>;
  update: (data: AppUser) => Promise<void>;
} = () => {
  const {
    data: currentUser,
    mutate,
    error,
  } = useSWR<AppUser, AxiosError>("/user");
  const { push } = useRouter();
  const logout = async () => {
    await push(URL_API_Auth_Logout);
  };
  const login = async () => {
    await push(URL_API_Auth_Login);
  };

  const update = async (data: AppUser) => {
    mutate(
      {
        ...currentUser,
        ...data,
        name: [data.given_name, data.family_name]
          .filter((a) => a && a != "")
          .join(" "),
      },
      false
    );
    await updateUser(data).then(() => {
      mutate();
    });
  };

  return {
    currentUser,
    error:
      error && error.isAxiosError && error.response.status !== 401 && error,
    isLoading: !currentUser && !error,
    logout,
    login,
    update,
  };
};
