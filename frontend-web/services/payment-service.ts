import { useRouter } from "next/router";
import axios from "../axios";
import { PaymentPlan } from "../global/interfaces";
import { AsyncAction } from "../global/types";

export function usePayment(): {
  createPayment: AsyncAction<PaymentPlan>;
} {
  const { push } = useRouter();

  return {
    createPayment: async (plan: PaymentPlan) => {
      await axios
        .post<{ url: string }>("/payment", {
          plan: plan,
        })
        .then((res) => push(res.data.url));
    },
  };
}
