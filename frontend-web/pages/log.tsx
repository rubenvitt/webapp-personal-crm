import Link from "next/dist/client/link";
import React from "react";
import { LogEntry, LogEntryType } from "../globals/interfaces";
import {
  faComments,
  faPhone,
  faUsers,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const entries: LogEntry[] = [
  {
    id: "0",
    type: LogEntryType.meet,
    label: "Essengehen",
    description: "Ich bin mit denen Essen gegangen",
    dateTimeBegin: "2021-05-26T11:00:00",
    dateTimeEnd: "2021-05-26T11:00:00",
    people: ["3", "4", "8"],
  },
  {
    id: "1",
    type: LogEntryType.meet,
    label: "Essengehen",
    description: "Ich bin mit denen Essen gegangen",
    dateTimeBegin: "2021-05-26T11:00:00",
    dateTimeEnd: "2021-05-26T11:00:00",
    people: ["3", "4", "8"],
  },
];

function getBackgroundForType(type: LogEntryType) {
  switch (type) {
    case LogEntryType.phone:
      return "bg-blue-500";
    case LogEntryType.meet:
      return "bg-orange-500";
    case LogEntryType.chat:
      return "bg-green-500";
  }
}

function getIconForType(type: LogEntryType) {
  switch (type) {
    case LogEntryType.phone:
      return faPhone;
    case LogEntryType.meet:
      return faUsers;
    case LogEntryType.chat:
      return faComments;
  }
}

export default function Log() {
  return (
    <div className="flow-root m-12">
      <ul className="-mb-8">
        {entries.map((entry, eventIdx) => (
          <li key={entry.id}>
            <div className="relative pb-8">
              {eventIdx !== entries.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      getBackgroundForType(entry.type),
                      "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                    )}
                  >
                    <FontAwesomeIcon
                      icon={getIconForType(entry.type)}
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500 inline-block pr-2">
                      {entry.label}
                      {" mit "}
                    </p>
                    {entry.people.map((person, index) => {
                      return (
                        <>
                          <Link href={person} key={person}>
                            <a className="font-medium text-gray-900">
                              {person}
                            </a>
                          </Link>
                          {entry.people.length - 3 !== index
                            ? entry.people.length - 2 === index && " und "
                            : ", "}
                        </>
                      );
                    })}
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={entry.dateTimeBegin}>
                      {new Date(entry.dateTimeBegin).toLocaleString()}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
