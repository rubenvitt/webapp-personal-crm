import { PaymentPlan } from "../global/interfaces";

export function apiGetPriceIdsForPaymentPlan(
  plan: number
): { price: string; quantity: 1 }[] {
  switch (PaymentPlan[plan].toLocaleLowerCase()) {
    case "pro":
      return [
        {
          price: "price_1JNKyNAQ30WNryXt92zRswmK",
          quantity: 1,
        },
      ];
    case "premium":
      return [
        {
          price: "price_1JNKznAQ30WNryXtLPQHHYd2",
          quantity: 1,
        },
      ];
    case "free":
      return [];
  }
  return [
    {
      price: "",
      quantity: 1,
    },
  ];
}
