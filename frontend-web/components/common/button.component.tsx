import React, { useCallback, useState } from "react";
import { classNames, getColorForType } from "../../globals/utils";
import { ActionType } from "../../globals/interfaces";

interface Props {
  asyncAction?: () => Promise<void>;
  action?: () => void;
  className?: string;
  type?: ActionType;
}

export const Button: React.FC<Props> = ({
  children,
  asyncAction,
  action,
  className,
  type = ActionType.PRIMARY,
}) => {
  const [isLoading, setLoading] = useState(false);

  const getItemColorForType = (aType: ActionType) => {
    const color = getColorForType(aType);
    if (aType === ActionType.DEFAULT) {
      return "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500";
    }
    return classNames(
      isLoading
        ? `bg-${color}-200 focus:ring-${color}-300`
        : `bg-${color}-600 hover:bg-${color}-700 focus:ring-${color}-500`,
      `text-white border-transparent`
    );
  };

  const color = getItemColorForType(type);

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
        color,
        className,
        "self-end inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
      )}
    >
      {children}
    </button>
  );
};
