import { Session } from "@auth0/nextjs-auth0";
import { User } from "auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession, managementClient } from "../config/auth0";
import { UserAppMetadata, UserUserMetadata } from "../global/interfaces";

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
