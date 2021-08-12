import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { Stripe } from "stripe";
import { managementClient } from "../../../config/auth0";
import { stripe, webhookSecret } from "../../../config/stripe.api";
import { Logger } from "../../../global/logging";
import { loadEnvironmentVar } from "../../../global/utils";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const stripePremium = loadEnvironmentVar("STRIPE_PLAN_PREMIUM", true);
const stripePro = loadEnvironmentVar("STRIPE_PLAN_PRO", true);
const auth0Free = loadEnvironmentVar("AUTH0_ROLE_FREE", true);
const auth0Premium = loadEnvironmentVar("AUTH0_ROLE_PREMIUM", true);
const auth0Pro = loadEnvironmentVar("AUTH0_ROLE_PRO", true);

function getRoleForProductId(product: string): string {
  switch (product) {
    case stripePro:
      return auth0Pro;
    case stripePremium:
      return auth0Premium;
    default:
      return auth0Free;
  }
}

handler.all((req, res) => {
  const signature = req.headers["stripe-signature"];
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      (req.read() as Buffer).toString().toString(),
      signature,
      webhookSecret
    );

    // TODO: save account details
    switch (event.type) {
      case "invoice.payment_succeeded":
        Logger.log("Payment success");
        Logger.log("The event content is:", event);
        stripe.subscriptions
          .retrieve(event.data.object["subscription"])
          .then((subscription) => {
            Logger.log("Got subscription:", subscription);
            return subscription["plan"] as Stripe.Plan;
          })
          .then((plan) => {
            Logger.log("Working with plan", plan);
            managementClient
              .getUsers({
                q: `app_metadata.payment.customerId:"${event.data.object["customer"]}"`,
                fields:
                  "user_id,app_metadata.payment,app_metadata.subscription",
              })
              .then((users) => {
                Logger.log("Found users", users);
                if (users.length !== 1) {
                  throw new Error(
                    "customerID must be unique or customerID not found"
                  );
                }
                return users[0];
              })
              .then((user) => {
                Logger.log("Working with user", user);
                return managementClient
                  .updateAppMetadata(
                    {
                      id: user.user_id,
                    },
                    {
                      subscription: {
                        ...user.app_metadata.subscription,
                        type: plan.product as string,
                      },
                    }
                  )
                  .then((user) => {
                    const roleForProductId: string = getRoleForProductId(
                      plan.product as string
                    );
                    Logger.log(
                      "Going to add role to user",
                      roleForProductId,
                      user.user_id
                    );
                    return managementClient
                      .assignRolestoUser(
                        { id: user.user_id },
                        {
                          roles: [roleForProductId],
                        }
                      )
                      .then(() => {
                        Logger.log("role was successfully assigned to user");
                      });
                  });
              });
          });

        break;
      default:
        Logger.log("event not handled:", event.type);
        break;
    }

    res.status(200).send({ received: true });
  } catch (e) {
    res.status(400).send(`Webhook error: ${e.message}`);
  }
});

export default handler;
