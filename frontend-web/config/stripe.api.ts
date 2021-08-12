import Stripe from "stripe";
import { loadEnvironmentVar } from "../global/utils";

const SECRET_KEY = loadEnvironmentVar("STRIPE_SK", true);

export const webhookSecret = loadEnvironmentVar("STRIPE_ENDPOINT_SECRET");

export const stripe = new Stripe(SECRET_KEY, {
  apiVersion: "2020-08-27",
});
