import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiGetCurrentUser } from "../../../api-functions/defaults";
import { apiGetPriceIdsForPaymentPlan } from "../../../api-functions/payment";
import { managementClient } from "../../../config/auth0";
import { stripe } from "../../../config/stripe.api";
import { Logger } from "../../../global/logging";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { userPromise, userId } = apiGetCurrentUser(req, res);

  const user = await userPromise;

  const customerId =
    user.app_metadata.payment?.customerId ??
    (await stripe.customers
      .create({
        email: user.email,
      })
      .then((customer) => customer.id));

  managementClient
    .updateAppMetadata(
      { id: userId },
      {
        payment: {
          ...user.app_metadata.payment,
          customerId,
        },
      }
    )
    .then(() => {
      Logger.log("customerId saved for user", customerId, userId);
    });

  Logger.log(
    "Try to create payment for items",
    apiGetPriceIdsForPaymentPlan(req.body.plan)
  );
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: customerId,
    metadata: {
      userId,
    },
    line_items: apiGetPriceIdsForPaymentPlan(req.body.plan),
    success_url: req.headers.origin + req.url + "?paymentStatus=success",
    cancel_url: req.headers.origin + req.url + "?paymentStatus=failed",
  });
  Logger.log("Created payment");
  res.status(200).send({ url: session.url });

  managementClient
    .updateAppMetadata(
      { id: userId },
      {
        payment: {
          ...user.app_metadata.payment,
          customerId,
        },
      }
    )
    .then(() => {
      Logger.log("customerId saved for user", customerId, userId);
    });
});

export default handler;
