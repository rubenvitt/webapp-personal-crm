import { IdOnly } from "./interfaces";
import { useRouter } from "next/router";

export const usePersonNavigate: () => {
  navigateTo: (aPerson?: IdOnly) => Promise<boolean>;
} = () => {
  const { push } = useRouter();

  const navigateTo = (aPerson?: IdOnly) => {
    return push("/contacts/" + (aPerson?._id ?? ""));
  };

  return { navigateTo };
};
