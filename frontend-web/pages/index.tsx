import { Button } from "../components/common/button.component";
import { useCurrentUser } from "../services/account-service";
import Avatar from "react-avatar";
import React from "react";
import { withPageAuthRequired } from "../globals/auth0";
import { ActionType } from "../globals/interfaces";
import axios from "../axios";

export const getServerSideProps = withPageAuthRequired();

const Dashboard: React.FC = () => {
  const { login, logout, currentUser, isLoading, error } = useCurrentUser();

  if (isLoading) return <>Loading</>;
  if (error) return <div>{error.message}</div>;
  if (currentUser)
    return (
      <div>
        Willkommen, {currentUser.name}.
        <Button
          type={ActionType.INFO}
          asyncAction={() =>
            axios.post("/dav/user/create", {
              secret: "Hallo junger Mann. :D",
            })
          }
        >
          Run setup
        </Button>
        <p>
          <Avatar
            className="block rounded-full m-2 mb-8"
            size="96"
            round
            maxInitials={2}
            src={currentUser?.picture}
            name={currentUser?.name}
            alt={"Your profile picture"}
          />
        </p>
        <Button asyncAction={logout}>Logout</Button>
      </div>
    );

  return (
    <div>
      <Button asyncAction={login}>Login</Button>
    </div>
  );
};
export default Dashboard;
