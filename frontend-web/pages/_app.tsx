// noinspection JSUnusedLocalSymbols

import { UserProvider } from "@auth0/nextjs-auth0";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import React from "react";
import { SWRConfig } from "swr";
import { AppLayout } from "../components/layouts/app-layout";
import { PublicLayout } from "../components/layouts/public-layout";
import { fetcher } from "../globals/swr.utils";
import "../styles/globals.css";

const MyApp: React.ComponentType<AppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  console.log("my router", router);
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

export default appWithTranslation(MyApp);
