import React, { useReducer, useRef } from "react";
import { PersonDetails, TimespanType } from "../../../globals/interfaces";
import {
  CakeIcon,
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import {
  calculateTimespanSince,
  classNames,
  getPronounFor,
} from "../../../globals/utils";
import { PersonDetailActions } from "./person-detail-actions.component";
import { ContentBox } from "../../common/content-box.component";
import { Button } from "../../common/button.component";
import { PersonTagList } from "./person-tag-list.component";

interface Props {
  person: PersonDetails;
  aside?: JSX.Element;
}

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Applied to",
    target: "Front End Developer",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: "Completed interview with",
    target: "Katherine Snyder",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
];

export const PersonBox: React.FC<Props> = ({ person, children, aside }) => {
  const generateDescriptionFor = (person: PersonDetails) => {
    return person
      ? getPronounFor(person.anrede) +
          " ist " +
          calculateTimespanSince({ duration: { start: person.birthday } }) +
          " alt und euer letzter Kontakt liegt etwa " +
          calculateTimespanSince({ duration: { start: person.lastContact } }) +
          " zurück."
      : "Lade Details...";
  };

  return (
    <div className="min-h-screen">
      <main className="py-10">
        {/* Page header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt={person.name + " profile picture"}
                />
                <span
                  className="absolute inset-0 shadow-inner rounded-full"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {person?.name}
              </h1>
              <p className="text-sm font-medium text-gray-500">
                {generateDescriptionFor(person)}
              </p>
            </div>
          </div>
          <PersonDetailActions person={person} />
        </div>

        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div
            className={classNames(
              aside ? "lg:col-span-2" : "lg:col-span-3",
              "space-y-6 lg:col-start-1"
            )}
          >
            {children}
          </div>

          {aside && (
            <div className="lg:col-start-3 lg:col-span-1 space-y-6">
              {aside}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
