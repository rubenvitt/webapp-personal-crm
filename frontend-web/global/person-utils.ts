import { IdOnly } from "./interfaces";
import { useAppRouter } from "./router";

export const usePersonNavigate: () => {
  navigateTo: (aPerson?: IdOnly) => Promise<boolean>;
} = () => {
  const { push } = useAppRouter();

  const navigateTo = (aPerson?: IdOnly) => {
    return push("/contacts/" + (aPerson?._id ?? ""));
  };

  return { navigateTo };
};
