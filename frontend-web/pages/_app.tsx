// noinspection JSUnusedLocalSymbols

import "../styles/globals.css";
import React from "react";
import { Layout } from "../components/layout/layout.component";
import { UserProvider } from "@auth0/nextjs-auth0";
import { SWRConfig } from "swr";
import { fetcher } from "../globals/swr.utils";

const MyApp: React.ReactNode = ({ Component, pageProps }) => (
  <UserProvider>
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

export default MyApp;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Element: React.FC = () => {
  return (
    <>
      <div className="bg-primary-50 bg-primary-100 bg-primary-200 bg-primary-300 bg-primary-400 bg-primary-500 bg-primary-600 bg-primary-700 bg-primary-800 bg-primary-900" />
      <div className="bg-green-50 bg-green-100 bg-green-200 bg-green-300 bg-green-400 bg-green-500 bg-green-600 bg-green-700 bg-green-800 bg-green-900" />
      <div className="bg-blue-50 bg-blue-100 bg-blue-200 bg-blue-300 bg-blue-400 bg-blue-500 bg-blue-600 bg-blue-700 bg-blue-800 bg-blue-900" />
      <div className="bg-yellow-50 bg-yellow-100 bg-yellow-200 bg-yellow-300 bg-yellow-400 bg-yellow-500 bg-yellow-600 bg-yellow-700 bg-yellow-800 bg-yellow-900" />
      <div className="bg-orange-50 bg-orange-100 bg-orange-200 bg-orange-300 bg-orange-400 bg-orange-500 bg-orange-600 bg-orange-700 bg-orange-800 bg-orange-900" />
      <div className="bg-gray-50 bg-gray-100 bg-gray-200 bg-gray-300 bg-gray-400 bg-gray-500 bg-gray-600 bg-gray-700 bg-gray-800 bg-gray-900" />
    </>
  );
};
