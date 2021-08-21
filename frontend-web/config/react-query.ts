import { InvalidateQueryFilters, QueryClient, QueryKey } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //
    },
    mutations: {
      //
    },
  },
});

export function invalidateQueries(filter: {
  queryKey?: QueryKey;
  filters?: InvalidateQueryFilters;
}): Promise<void> {
  return queryClient.invalidateQueries(filter.queryKey, filter.filters);
}
