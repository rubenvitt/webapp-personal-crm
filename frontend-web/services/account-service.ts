import { AxiosError } from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "../axios";
import { AppUser, OnboardingStep } from "../global/interfaces";
import { MaybeAsyncAction } from "../global/types";
import { URL_API_Auth_Login, URL_API_Auth_Logout } from "../global/urls";

const updateUser = async (data: AppUser) => {
  return await axios.patch("/user", data);
};

export function useUserOnboarding(): {
  updateCurrentStep: MaybeAsyncAction<{
    step: string;
    data: unknown;
  }>;
  finishOnboarding: MaybeAsyncAction;
  currentStep?: string;
  steps: OnboardingStep[];
} {
  const { data } =
    useSWR<{ currentStep: string; steps: OnboardingStep[] }>("/onboarding");

  function updateCurrentStep({ step, data }) {
    return axios.post("/onboarding/step/" + step, data);
  }

  return {
    updateCurrentStep: updateCurrentStep,
    finishOnboarding: () => undefined,
    currentStep: data?.currentStep,
    steps: data?.steps,
  };
}

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
      error && error.isAxiosError && error.response?.status !== 401 && error,
    isLoading: !currentUser && !error,
    isLoggedIn: Boolean(currentUser),
    logout,
    login,
    update,
  };
};
