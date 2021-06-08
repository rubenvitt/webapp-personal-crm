import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/dist/client/link";
import React from "react";
import { LogEntry, LogEntryType } from "../../globals/interfaces";
import { classNames } from "../../globals/utils";
import {
  faComments,
  faPhone,
  faUsers,
} from "@fortawesome/pro-regular-svg-icons";
import { useQuery } from "react-query";
import { findDetailsFor } from "../../services/person-service";

interface Props {
  logEntries?: LogEntry[];
}

interface EntryProps {
  entry: LogEntry;
  isLast: boolean;
}

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

export const LogList: React.FC<Props> = ({ logEntries }) => {
  return (
    <>
      <ul className="-mb-8">
        {logEntries?.map((entry, index) => (
          <LogListItem entry={entry} isLast={logEntries.length - 1 === index} />
        ))}
      </ul>
    </>
  );
};

const LogListItem: React.FC<EntryProps> = ({ entry, isLast }) => {
  return (
    <li key={entry.id}>
      <div className="relative pb-8">
        {!isLast ? (
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
                {entry.people.length > 0 && " mit "}
              </p>
              {entry.people.map((personId, index) => {
                const { data: person } = useQuery(["persons", personId], () =>
                  findDetailsFor(personId)
                );
                return (
                  <>
                    <Link href={"/contacts/" + personId} key={personId}>
                      <a className="font-medium text-gray-900">
                        {person?.displayName}
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
                {new Date(entry.dateTimeBegin).toLocaleDateString()}
              </time>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
