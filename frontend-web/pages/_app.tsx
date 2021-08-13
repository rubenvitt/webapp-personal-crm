// noinspection JSUnusedLocalSymbols

import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/app";
import React from "react";
import { SWRConfig } from "swr";
import { AppLayout } from "../components/layouts/app-layout";
import { PublicLayout } from "../components/layouts/public-layout";
import { fetcher } from "../config/swr.utils";
import "../styles/globals.css";

const MyApp: React.ComponentType<AppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  const Layout = (router.pathname as string).startsWith("/app")
    ? AppLayout
    : PublicLayout;
  return (
    <UserProvider profileUrl={"/api/user"}>
      <SWRConfig
        value={{
          fetcher: fetcher,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </UserProvider>
  );
};

export default MyApp;
