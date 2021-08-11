import axios from "axios";
import {
  AccessToken,
  ClientCredentials,
  ClientCredentialTokenConfig,
} from "simple-oauth2";
import { Logger } from "../global/logging";
import { loadEnvironmentVar } from "../global/utils";

const tokenConfig: ClientCredentialTokenConfig = {
  audience: "https://dav.rubeen.dev",
  grant_type: "client_credentials",
};

let cachedToken: AccessToken | undefined;

const accessToken = async () => {
  if (cachedToken && !cachedToken.expired(300)) {
    return cachedToken.token;
  } else if (cachedToken) {
    cachedToken = await cachedToken.refresh(tokenConfig);
    return cachedToken.token;
  } else {
    const client = new ClientCredentials({
      client: {
        id: loadEnvironmentVar("API_AUTH0_CLIENT_ID", true),
        secret: loadEnvironmentVar("API_AUTH0_CLIENT_SECRET", true),
      },
      auth: {
        tokenHost: `https://${loadEnvironmentVar(
          "API_AUTH0_CLIENT_DOMAIN",
          true
        )}`,
      },
      options: {
        authorizationMethod: "header",
      },
    });

    cachedToken = await client.getToken(tokenConfig);
    return cachedToken.token;
  }
};

const fetcher = async <T>(...args: [url: string]): Promise<T> => {
  Logger.tagged("[sabre] REQUEST", args[0]);
  const token = await accessToken();
  const authorization = `${token.token_type} ${token.access_token}`;
  return axios
    .get<T>(...args, {
      baseURL: loadEnvironmentVar("SABRE_API_URL", true),
      headers: {
        Authorization: authorization,
      },
    })
    .then((res) => res.data);
};

const mutator = async <T>(
  ...args: [url: string, body: unknown]
): Promise<T> => {
  Logger.tagged("[sabre] POST-REQUEST", args[0]);
  const token = await accessToken();
  const authorization = `${token.token_type} ${token.access_token}`;
  return axios
    .post<T>(...args, {
      baseURL: loadEnvironmentVar("SABRE_API_URL", true),
      headers: {
        Authorization: authorization,
      },
    })
    .then((res) => res.data);
};

export const findAllSabreUser = () => {
  return fetcher("/users").catch((e) => e);
};

export const encryptText = (body: {
  secret: string;
}): Promise<{ iv: string; content: string }> => {
  return mutator<{ iv: string; content: string }>("/secrets/encrypt", body);
};

export const decryptText = (body: { iv: string; content: string }) => {
  return mutator<string>("/secrets/decrypt", body);
};

export const createNewUser = (user: {
  username: string;
  password: string;
  email: string;
  displayName: string;
}) => {
  return mutator("/users", user);
};
