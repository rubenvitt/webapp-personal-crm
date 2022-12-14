import { Person } from "../../../../global/interfaces";
import { classNames } from "../../../../global/utils";
import React from "react";

export interface ItemProps {
  person: Person;
}

interface Props {
  persons: Person[];
  loading?: boolean;
  title: string;
  className?: string;
  Item: (props: ItemProps) => JSX.Element;
  hideOnEmpty?: boolean;
  grid?: boolean;
}

export function PersonList({
  persons,
  loading,
  title,
  className,
  Item,
  hideOnEmpty,
  grid = true,
}: Props): JSX.Element {
  if (hideOnEmpty && !(persons?.length > 0)) {
    return <></>;
  }

  return (
    <div className={classNames(className, "pb-5 border-b border-gray-200")}>
      {(loading || !persons || persons.length > 0) && (
        <h3 className="text-lg leading-6 pb-2 font-medium text-gray-900">
          {title}
        </h3>
      )}
      <ul
        className={classNames(
          grid
            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "flex space-x-2 overflow-x-auto"
        )}
      >
        {loading && "Loading"}
        {persons &&
          persons.map((person) => <Item key={person._id} person={person} />)}
      </ul>
    </div>
  );
}
