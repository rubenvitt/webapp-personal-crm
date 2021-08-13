import Stripe from "stripe";
import { apiStripe } from "../global/constants";

export const stripe = new Stripe(apiStripe.stripeSecretKey, {
  apiVersion: "2020-08-27",
});
