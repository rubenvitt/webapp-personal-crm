import { useRouter } from "next/router";
import { IdOnly } from "./interfaces";

export const usePersonNavigate: () => {
  navigateTo: (aPerson?: IdOnly) => Promise<boolean>;
} = () => {
  const { push } = useRouter();

  const navigateTo = (aPerson?: IdOnly) => {
    return push("/app/contacts/" + (aPerson?._id ?? ""));
  };

  return { navigateTo };
};
