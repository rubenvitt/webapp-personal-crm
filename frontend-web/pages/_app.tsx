// noinspection JSUnusedLocalSymbols

import "../styles/globals.css";
import React from "react";
import { Layout } from "../components/layout/layout.component";
import { UserProvider } from "@auth0/nextjs-auth0";
import { SWRConfig } from "swr";
import { fetcher } from "../globals/swr.utils";

const MyApp: React.ReactNode = ({ Component, pageProps }) => {
  return (
    <UserProvider profileUrl={"/api/user"}>
      <SWRConfig
        value={{
          fetcher: fetcher,
        }}
      >
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </UserProvider>
  );
};

export default MyApp;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Element: React.FC = () => {
  return <></>;
};
