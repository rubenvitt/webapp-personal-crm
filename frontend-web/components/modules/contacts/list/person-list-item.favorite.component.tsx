import React from "react";
import Avatar from "react-avatar";
import { usePersonNavigate } from "../../../../global/person-utils";
import { ItemProps } from "./person-list.component";

export const PersonListItemFavorite: React.FC<ItemProps> = ({ person }) => {
  const { navigateTo } = usePersonNavigate();

  return (
    <div
      onClick={async () => {
        await navigateTo(person);
      }}
      className="shadow-md cursor-pointer relative hover:border-gray-500 border-2 border-transparent rounded-full"
    >
      <Avatar
        className="rounded-full"
        round
        alt="Profile Picture"
        name={person.displayName}
        maxInitials={2}
        title={person.displayName}
        src={person.imageUrl}
      />
    </div>
  );
};
