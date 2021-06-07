import { ItemProps } from "./person-list.component";
import React from "react";
import { PersonListItem } from "./person-list-item.component";

export const PersonListItemFavorite: React.FC<ItemProps> = ({ person }) => {
  return <PersonListItem person={person} />;
};
