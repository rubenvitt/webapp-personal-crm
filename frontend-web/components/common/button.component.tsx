import React, { useCallback, useEffect, useState } from "react";
import { classNames } from "../../globals/utils";

interface Props {
  asyncAction?: () => Promise<void>;
  action?: () => void;
}

export const Button: React.FC<Props> = ({ children, asyncAction, action }) => {
  const [isLoading, setLoading] = useState(false);

  const onClick = useCallback(() => {
    if (asyncAction) {
      console.log("set on click");
      setLoading(true);
      asyncAction().then(() => {
        console.log("async fn finished");
        setLoading(false);
      });
    } else if (action) {
      action();
    }
  }, [asyncAction, action]);

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={classNames(
        isLoading
          ? "bg-blue-200 focus:ring-blue-300"
          : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
        "self-end inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
      )}
    >
      {children}
    </button>
  );
};
