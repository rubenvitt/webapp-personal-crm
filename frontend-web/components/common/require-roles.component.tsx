import { useCurrentUser } from "../../services/account-service";
import { useEffect, useState } from "react";

interface Props {
  roles?: string[];
  role?: string;
}

export const RequireRoles: React.FC<Props> = ({ children, roles, role }) => {
  const { currentUser } = useCurrentUser();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    let result = true;
    if (roles) {
      result = roles.every((required) => {
        currentUser?.roles?.find((value) => value.name === required);
      });
    }
    if (role) {
      result =
        result &&
        Boolean(currentUser?.roles?.find((value) => value.name === role));
    }
    setHasPermission(result);
  }, [roles, currentUser]);

  if (hasPermission) return <>{children}</>;

  return <></>;
};
