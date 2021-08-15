import React from "react";
import Avatar from "react-avatar";
import { apiAxios } from "../../axios";
import { Button } from "../../components/elements/common/button.component";
import { RequireRoles } from "../../components/modules/common/require-roles.component";
import { withPageAuthRequired } from "../../config/auth0";
import { ActionType } from "../../global/interfaces";
import { useCurrentUser } from "../../services/account-service";

export const getServerSideProps = withPageAuthRequired();

export default function Dashboard(): JSX.Element {
  const { login, logout, currentUser, isLoading, error } = useCurrentUser();

  if (isLoading) return <>Loading</>;
  if (error) return <div>{error.message}</div>;
  if (currentUser)
    return (
      <div>
        Willkommen, {currentUser.name}!
        <RequireRoles role="full-admin">
          <Button
            actionType={ActionType.INFO}
            action={() =>
              apiAxios.post("/dav/user/create", {
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
