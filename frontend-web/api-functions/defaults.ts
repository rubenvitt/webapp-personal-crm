import { PageRoute } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  getSession,
  managementClient,
  withPageAuthRequired,
} from "../config/auth0";
import { Logger } from "../global/logging";
import { CURRENT_ONBOARD_VERSION } from "../global/person-utils";

export function withAuthenticatedTranslatedServerSideProps(props?: {
  additionalProps?: (context: GetServerSidePropsContext) => unknown;
  translations?: string[];
}): PageRoute {
  return withPageAuthRequired({
    getServerSideProps: async (context) => {
      console.log("using translations", props?.translations);
      const { user: sessionUser } = getSession(context.req, context.res);
      return await managementClient
        .getUser(sessionUser.sub)
        .then((u) => {
          const isOnboarding: boolean = context.req.url.endsWith("/onboarding");

          if (!isOnboarding) {
            Logger.log(
              "Checking, if " +
                u.app_metadata?.onboarding?.version +
                " < " +
                CURRENT_ONBOARD_VERSION,
              u.app_metadata?.onboarding?.version ??
                -1 < CURRENT_ONBOARD_VERSION
            );
            if (
              u.app_metadata?.onboarding?.version ??
              -1 < CURRENT_ONBOARD_VERSION
            ) {
              context.res.writeHead(302, {
                Location: "/app/onboarding",
              });
              context.res.end();
              throw new Error();
            }
          } else {
            Logger.log(
              "Checking, if " +
                u.app_metadata?.onboarding?.version +
                " < " +
                CURRENT_ONBOARD_VERSION,
              u.app_metadata?.onboarding?.version ??
                -1 < CURRENT_ONBOARD_VERSION
            );
            if (
              u.app_metadata?.onboarding?.version ??
              -1 >= CURRENT_ONBOARD_VERSION
            ) {
              context.res.writeHead(302, {
                Location: "/app/",
              });
              context.res.end();
              throw new Error();
            }
          }
        })
        .then(async () => {
          return {
            props: {
              ...(await serverSideTranslations(context.locale, [
                "common",
                ...(props?.translations ?? []),
              ])),
              // eslint-disable-next-line @typescript-eslint/ban-types
              ...(props?.additionalProps?.(context) as {}),
            },
          };
        })
        .catch(() => {
          return {
            props: {
              //
            },
          };
        });
    },
  });
}
