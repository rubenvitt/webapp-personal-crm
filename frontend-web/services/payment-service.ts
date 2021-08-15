import { useRouter } from "next/router";
import { apiAxios } from "../axios";
import { SubscriptionType } from "../global/interfaces";
import { AsyncAction } from "../global/types";

export function usePayment(): {
  createPayment: AsyncAction<SubscriptionType>;
} {
  const { push } = useRouter();

  return {
    createPayment: async (plan: SubscriptionType) => {
      await apiAxios
        .post<{ url: string }>("/payment", {
          plan: plan,
        })
        .then((res) => push(res.data.url));
    },
  };
}
