import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { apiAxios } from "../axios";
import { invalidateQueries } from "../config/react-query";
import {
  AppUser,
  AvailableOnboardingStep,
  OnboardingStep,
} from "../global/interfaces";
import { MaybeAsyncAction } from "../global/types";
import { URL_API_Auth_Login, URL_API_Auth_Logout } from "../global/urls";

const updateUser = async (data: AppUser) => {
  return await apiAxios.patch("/user", data);
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
  const { data } = useQuery("/onboarding", () => {
    return apiAxios
      .get<{ currentStep: string; steps: OnboardingStep[] }>("/onboarding")
      .then((value) => value.data);
  });

  function updateCurrentStep({
    step,
    data,
  }: {
    step: AvailableOnboardingStep;
    data: unknown;
  }) {
    return apiAxios.post("/onboarding/step/" + step, data);
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
  const { data: currentUser, error: getError } = useQuery<AppUser, AxiosError>(
    "/user",
    () => {
      return apiAxios.get("/user").then((value) => value.data);
    }
  );
  const { mutate, error: mutateError } = useMutation<void, AxiosError, AppUser>(
    "/user",
    async (variables) => {
      await updateUser(variables);
    },
    {
      onSuccess: () => invalidateQueries({ queryKey: "/user" }),
    }
  );

  const { push } = useRouter();
  const logout = async () => {
    await push(URL_API_Auth_Logout);
  };
  const login = async () => {
    await push(URL_API_Auth_Login);
  };

  const update = async (data: AppUser) => {
    await mutate(data);
  };

  return {
    currentUser,
    error:
      (getError &&
        getError.isAxiosError &&
        getError.response?.status !== 401 &&
        getError) ||
      (mutateError &&
        mutateError.isAxiosError &&
        mutateError.response?.status !== 491 &&
        mutateError),
    isLoading: !currentUser && !getError,
    isLoggedIn: Boolean(currentUser),
    logout,
    login,
    update,
  };
};
