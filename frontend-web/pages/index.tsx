import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "../components/common/button.component";
import { useCurrentUser } from "../services/account-service";

const Dashboard: React.FC = () => {
  const { user, error, isLoading } = useUser();
  const { login, logout } = useCurrentUser();

  if (isLoading) return <>Loading</>;
  if (error) return <div>{error.message}</div>;
  if (user)
    return (
      <div>
        Willkommen, {user.name}
        <img src={user.picture} alt={user.name} />
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
