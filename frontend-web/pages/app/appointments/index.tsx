import {
  faCalendarDay,
  faMapMarker,
  faUsers,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { withAuthenticatedTranslatedServerSideProps } from "../../../api-functions/defaults";
import { LogEntry, LogEntryType } from "../../../globals/interfaces";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps();

const appointments: LogEntry[] = [
  {
    _id: "0",
    type: LogEntryType.meet,
    label: "Essengehen",
    description: "Ich bin mit denen Essen gegangen",
    dateTimeBegin: "2021-05-26T11:00:00",
    dateTimeEnd: "2021-05-26T11:00:00",
    people: ["001-test", "002-test"],
  },
];

function AppointmentsIndex(): JSX.Element {
  return (
    <div className="m-10 bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            <Link href="#">
              <a className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary-600 truncate">
                      {appointment.label}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {appointment.type}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <FontAwesomeIcon
                          icon={faUsers}
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {appointment.description}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <FontAwesomeIcon
                          icon={faMapMarker}
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {appointment.description}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <FontAwesomeIcon
                        icon={faCalendarDay}
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <p>
                        <time dateTime={appointment.dateTimeBegin}>
                          {new Date(appointment.dateTimeBegin).toLocaleString()}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentsIndex;
