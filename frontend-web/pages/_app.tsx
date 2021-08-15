// noinspection JSUnusedLocalSymbols

import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppLayout } from "../components/layouts/app-layout";
import { PublicLayout } from "../components/layouts/public-layout";
import "../styles/globals.css";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      //
    },
    mutations: {
      //
    },
  },
});

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
      <QueryClientProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserProvider>
  );
};

export default MyApp;
