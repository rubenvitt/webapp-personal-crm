import { User } from "../globals/interfaces";
import useSWR from "swr";
import { useRouter } from "next/router";
import { URL_API_Auth_Login, URL_API_Auth_Logout } from "../globals/urls";
import { UserProfile } from "@auth0/nextjs-auth0";

export const getCurrentUser: () => Promise<User> = async () => {
  return Promise.resolve({
    _id: "user-001",
    name: "Bertram Mantel",
    hashedMail: "",
  });
};

export const useCurrentUser: () => {
  currentUser?: UserProfile;
  logout: () => Promise<void>;
  login: () => Promise<void>;
} = () => {
  const { data: currentUser } = useSWR<UserProfile>("/auth/me");
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
