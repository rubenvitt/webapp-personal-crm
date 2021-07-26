import { PageRoute } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { withPageAuthRequired } from "../globals/auth0";

export function withAuthenticatedTranslatedServerSideProps(props?: {
  additionalProps?: (context: GetServerSidePropsContext) => unknown;
  translations?: string[];
}): PageRoute {
  return withPageAuthRequired({
    getServerSideProps: async (context) => {
      console.log("using translations", props?.translations);
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
    },
  });
}
