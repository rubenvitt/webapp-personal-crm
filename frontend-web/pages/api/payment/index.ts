import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import Stripe from "stripe";
import { apiGetPriceIdsForPaymentPlan } from "../../../api-functions/payment";
import { Logger } from "../../../global/logging";
import { loadEnvironmentVar } from "../../../global/utils";

const stripe = new Stripe(loadEnvironmentVar("STRIPE_SK"), {
  apiVersion: "2020-08-27",
});

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  Logger.log(
    "Try to create payment for items",
    apiGetPriceIdsForPaymentPlan(req.body.plan)
  );
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: apiGetPriceIdsForPaymentPlan(req.body.plan),
    success_url: req.headers.origin + req.url + "?paymentStatus=success",
    cancel_url: req.headers.origin + req.url + "?paymentStatus=failed",
  });
  Logger.log("Created payment");
  res.status(200).send({ url: session.url });
});

export default handler;
