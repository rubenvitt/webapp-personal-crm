import { AppUser } from "../globals/interfaces";
import useSWR from "swr";
import { useRouter } from "next/router";
import { URL_API_Auth_Login, URL_API_Auth_Logout } from "../globals/urls";
import axios from "../axios";

const updateUser = async (data: AppUser) => {
  return await axios.patch("/user", data);
};

export const useCurrentUser: () => {
  currentUser?: AppUser;
  logout: () => Promise<void>;
  login: () => Promise<void>;
  update: (data: AppUser) => Promise<void>;
} = () => {
  const { data: currentUser } = useSWR<AppUser>("/user");
  const { push } = useRouter();
  const logout = async () => {
    await push(URL_API_Auth_Logout);
  };
  const login = async () => {
    await push(URL_API_Auth_Login);
  };

  const update = async (data: AppUser) => {
    await updateUser(data);
  };

  return {
    currentUser,
    logout,
    login,
    update,
  };
};
