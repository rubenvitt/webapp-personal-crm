import "../styles/globals.css";
import React from "react";
import { Layout } from "../components/layout/layout.component";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtoolsPanel } from "react-query/devtools";

const reactQuery = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={reactQuery}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtoolsPanel />
    </QueryClientProvider>
  );
}

export default MyApp;
