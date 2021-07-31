import {
  faComments,
  faPhone,
  faUsers,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/dist/client/link";
import React from "react";
import { LogEntry, LogEntryType } from "../../../global/interfaces";
import { classNames } from "../../../global/utils";

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
      return "bg-primary-500";
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

export function DiaryList({ logEntries }: Props): JSX.Element {
  return (
    <>
      <ul className="-mb-8">
        {logEntries?.map((entry, index) => (
          <DiaryListItem
            key={entry._id}
            entry={entry}
            isLast={logEntries.length - 1 === index}
          />
        ))}
      </ul>
    </>
  );
}

function DiaryListItem({ entry, isLast }: EntryProps): JSX.Element {
  return (
    <li key={entry._id}>
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
                // TODO: use real data
                return (
                  <>
                    <Link href={"/contacts/" + personId} key={personId}>
                      <a className="font-medium text-gray-900">{"UNKNOWN"}</a>
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
}
