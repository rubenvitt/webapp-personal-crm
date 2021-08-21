import { JSX } from "@babel/types";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faStar as farStar } from "@fortawesome/pro-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { MaybeAsyncAction } from "../../../global/types";
import { classNames } from "../../../global/utils";

type Props = {
  change: MaybeAsyncAction<boolean>;
  checked?: boolean;
  customColor?: string;
  customIcon?: {
    checked: IconDefinition;
    unchecked: IconDefinition;
  };
  className?: string;
};

export function IconSwitch({
  change,
  checked,
  customColor,
  customIcon,
  className,
}: Props): JSX.Element {
  const [_checked, setChecked] = useState<boolean | undefined>(checked);
  const [lock, setLock] = useState<boolean | undefined>();
  const onClick = () => {
    setLock(true);
    Promise.resolve(change(!_checked))
      .then(() => setChecked(!_checked))
      .finally(() => setLock(false));
  };

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  return (
    <button
      className={classNames(
        className,
        "text-" + (customColor ?? "yellow") + "-500",
        "hover:text-" + (customColor ?? "yellow") + "-700",
        "text-2xl p-2 group"
      )}
      disabled={lock}
      onClick={() => onClick()}
    >
      <FontAwesomeIcon
        icon={customIcon?.unchecked ?? farStar}
        className={classNames(_checked ? "hidden" : "block", "h-5 w-5")}
      />
      <FontAwesomeIcon
        icon={customIcon?.checked ?? fasStar}
        className={classNames(_checked ? "block" : "hidden", "h-5 w-5")}
      />
    </button>
  );
}
