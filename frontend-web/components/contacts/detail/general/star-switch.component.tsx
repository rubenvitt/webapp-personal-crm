import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/pro-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/pro-solid-svg-icons";
import React, { useState } from "react";
import { classNames } from "../../../../globals/utils";

interface Props {
  mutate: () => Promise<void>;
}

export const StarSwitch: React.FC<Props> = ({ mutate }) => {
  const [checked, setChecked] = useState<boolean>();

  const onClick = () => {
    mutate().then(() => setChecked(!checked));
  };

  return (
    <button
      className="text-2xl p-2 group text-yellow-500 hover:text-yellow-700"
      onClick={() => onClick()}
    >
      <FontAwesomeIcon
        icon={farStar}
        className={classNames(checked ? "hidden" : "block", "h-5 w-5")}
      />
      <FontAwesomeIcon
        icon={fasStar}
        className={classNames(checked ? "block" : "hidden", "h-5 w-5")}
      />
    </button>
  );
};
