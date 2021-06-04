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
      <Element />
      <ReactQueryDevtools panelProps={{ className: "z-50" }} />
    </QueryClientProvider>
  );
}

export default MyApp;

const Element = () => {
  return <div className="bg-green-600" />;
};
