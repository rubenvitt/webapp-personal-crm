import { NextRouter, useRouter } from "next/router";
import { UrlObject } from "url";

export function useAppRouter(): NextRouter {
  const router = useRouter();

  function push(
    url: UrlObject | string,
    as?: UrlObject | string,
    options?: { shallow?: boolean; locale?: string | false; scroll?: boolean }
  ): Promise<boolean> {
    return router.push("/app" + url, as, options);
  }

  return {
    ...router,
    push,
  };
}
