import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "../components/elements/common/button.component";
import { PublicLayout } from "../components/layouts/public-layout";
import { useCurrentUser } from "../services/account-service";

export async function getStaticProps({
  locale,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<unknown>> {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "public"])),
      // Will be passed to the page component as props
    },
  };
}

export default function PublicHomepage(): React.ReactNode {
  const { isLoggedIn } = useCurrentUser();
  const { push } = useRouter();
  return (
    <PublicLayout>
      Public homepage
      {isLoggedIn ? (
        <div>
          You are logged in.{" "}
          <Button action={() => push("/app")}>Visit app</Button>
        </div>
      ) : (
        <Button action={() => push("/api/auth/login")}>Login now</Button>
      )}
    </PublicLayout>
  );
}
