import { AppUser } from "../globals/interfaces";
import useSWR from "swr";
import { useRouter } from "next/router";
import { URL_API_Auth_Login, URL_API_Auth_Logout } from "../globals/urls";

export const useCurrentUser: () => {
  currentUser?: AppUser;
  logout: () => Promise<void>;
  login: () => Promise<void>;
} = () => {
  const { data: currentUser } = useSWR<AppUser>("/auth/me");
  const { push } = useRouter();
  const logout = async () => {
    await push(URL_API_Auth_Logout);
  };
  const login = async () => {
    await push(URL_API_Auth_Login);
  };

  return {
    currentUser,
    logout,
    login,
  };
};
