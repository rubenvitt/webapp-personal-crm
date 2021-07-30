import { useTranslation } from "next-i18next";
import React from "react";
import Avatar from "react-avatar";
import { withAuthenticatedTranslatedServerSideProps } from "../../api-functions/defaults";
import axios from "../../axios";
import { Button } from "../../components/elements/common/button.component";
import { RequireRoles } from "../../components/modules/common/require-roles.component";
import { ActionType } from "../../globals/interfaces";
import { useCurrentUser } from "../../services/account-service";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps({
  translations: ["pages.dashboard"],
});

export default function Dashboard(): JSX.Element {
  const { login, logout, currentUser, isLoading, error } = useCurrentUser();
  const { t } = useTranslation("pages.dashboard");

  if (isLoading) return <>Loading</>;
  if (error) return <div>{error.message}</div>;
  if (currentUser)
    return (
      <div>
        {t("welcome-message", { displayname: currentUser.name })}
        <RequireRoles role="full-admin">
          <Button
            actionType={ActionType.INFO}
            action={() =>
              axios.post("/dav/user/create", {
                secret: "Hallo junger Mann. :D",
              })
            }
          >
            Run setup
          </Button>
        </RequireRoles>
        <div>
          <Avatar
            className="block rounded-full m-2 mb-8"
            size="96"
            round
            maxInitials={2}
            src={currentUser?.picture}
            name={currentUser?.name}
            alt={"Your profile picture"}
          />
        </div>
        <Button action={logout}>Logout</Button>
      </div>
    );

  return (
    <div>
      <Button action={login}>Login</Button>
    </div>
  );
}
