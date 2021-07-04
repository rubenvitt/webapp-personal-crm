import { Button } from "../components/common/button.component";
import { useCurrentUser } from "../services/account-service";
import Avatar from "react-avatar";
import React from "react";
import { withPageAuthRequired } from "../globals/auth0";

export const getServerSideProps = withPageAuthRequired();

const Dashboard: React.FC = () => {
  const { login, logout, currentUser, isLoading, error } = useCurrentUser();

  if (isLoading) return <>Loading</>;
  if (error) return <div>{error.message}</div>;
  if (currentUser)
    return (
      <div>
        Willkommen, {currentUser.name}
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

  /*return (
                    <>
                      <p>Hallo {currentUser?.name}!</p>
                      <ul>
                        <li>Overview last contacts</li>
                        <li>Overview appointments</li>
                        <li>Search?</li>
                      </ul>
                
                      <dl>{persons && <dt>Du hast {persons.length} Kontakte</dt>}</dl>
                    </>
                  );*/
};
export default Dashboard;
