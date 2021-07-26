import React, { useEffect, useState } from "react";
import { WithChildren } from "../../../globals/types";
import { useCurrentUser } from "../../../services/account-service";

type Props = WithChildren<{
  roles?: string[];
  role?: string;
}>;

export function RequireRoles({ children, roles, role }: Props): JSX.Element {
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
}
