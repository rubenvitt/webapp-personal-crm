import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/pro-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/pro-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { classNames } from "../../globals/utils";

interface Props {
  mutate: (state: boolean) => Promise<void>;
  checked?: boolean;
}

export const StarSwitch: React.FC<Props> = ({ mutate, checked }) => {
  const [_checked, setChecked] = useState<boolean>(checked);

  const onClick = () => {
    mutate(!_checked).then(() => setChecked(!_checked));
  };

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  return (
    <button
      className="text-2xl p-2 group text-yellow-500 hover:text-yellow-700"
      onClick={() => onClick()}
    >
      <FontAwesomeIcon
        icon={farStar}
        className={classNames(_checked ? "hidden" : "block", "h-5 w-5")}
      />
      <FontAwesomeIcon
        icon={fasStar}
        className={classNames(_checked ? "block" : "hidden", "h-5 w-5")}
      />
    </button>
  );
};
