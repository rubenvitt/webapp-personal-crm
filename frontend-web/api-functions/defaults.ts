import { PageRoute, Session } from "@auth0/nextjs-auth0";
import { User } from "auth0";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  getSession,
  managementClient,
  withPageAuthRequired,
} from "../config/auth0";
import { UserAppMetadata, UserUserMetadata } from "../global/interfaces";

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

export function apiGetCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse
): {
  userPromise: Promise<User<UserAppMetadata, UserUserMetadata>>;
  userId: string;
} {
  const { user: sessionUser }: Session = getSession(req, res);

  async function getCurrentUser() {
    return await managementClient
      .getUser({
        id: sessionUser.sub,
      })
      .then((user) => {
        return user;
      });
  }

  return {
    userPromise: getCurrentUser(),
    userId: sessionUser.sub as string,
  };
}
