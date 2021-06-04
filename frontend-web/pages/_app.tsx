import "../styles/globals.css";
import React from "react";
import { Layout } from "../components/layout/layout.component";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { reactQuery } from "../globals/react-query.config";

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={reactQuery}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools panelProps={{ className: "z-50" }} />
    </QueryClientProvider>
  );
}

export default MyApp;

const Element = () => {
  return (
    <>
      <div className="bg-green-50 bg-green-100 bg-green-200 bg-green-300 bg-green-400 bg-green-500 bg-green-600 bg-green-700 bg-green-800 bg-green-900" />
      <div className="bg-blue-50 bg-blue-100 bg-blue-200 bg-blue-300 bg-blue-400 bg-blue-500 bg-blue-600 bg-blue-700 bg-blue-800 bg-blue-900" />
      <div className="bg-yellow-50 bg-yellow-100 bg-yellow-200 bg-yellow-300 bg-yellow-400 bg-yellow-500 bg-yellow-600 bg-yellow-700 bg-yellow-800 bg-yellow-900" />
      <div className="bg-orange-50 bg-orange-100 bg-orange-200 bg-orange-300 bg-orange-400 bg-orange-500 bg-orange-600 bg-orange-700 bg-orange-800 bg-orange-900" />
      <div className="bg-gray-50 bg-gray-100 bg-gray-200 bg-gray-300 bg-gray-400 bg-gray-500 bg-gray-600 bg-gray-700 bg-gray-800 bg-gray-900" />
    </>
  );
};
