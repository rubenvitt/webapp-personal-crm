import { QueryClient } from "react-query";

export const reactQuery = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 10000,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});
