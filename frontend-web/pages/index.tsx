import { useRouter } from "next/router";
import React from "react";
import { Button } from "../components/elements/common/button.component";
import { PublicLayout } from "../components/layouts/public-layout";
import { URL_APP } from "../global/urls";
import { useCurrentUser } from "../services/account-service";

export default function PublicHomepage(): React.ReactNode {
  const { isLoggedIn } = useCurrentUser();
  const { push } = useRouter();
  return (
    <PublicLayout>
      Public homepage
      {isLoggedIn ? (
        <div>
          You are logged in.
          <p>Running on url {URL_APP}</p>
          <Button action={() => push("/app")}>Visit app</Button>
        </div>
      ) : (
        <Button action={() => push("/api/auth/login")}>Login now</Button>
      )}
    </PublicLayout>
  );
}
