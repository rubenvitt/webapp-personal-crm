import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen, faPhone } from "@fortawesome/pro-solid-svg-icons";
import Avatar from "react-avatar";
import { ItemProps } from "./person-list.component";
import { usePersonNavigate } from "../../../globals/person-utils";

export const PersonListItem: React.FC<ItemProps> = ({ person }) => {
  const { navigateTo } = usePersonNavigate();

  const showProfile = async () => {
    await navigateTo(person);
  };

  return (
    <li className="col-span-1 cursor-pointer flex flex-col text-center rounded-lg shadow divide-y divide-gray-200 hover:bg-lightgray-300 bg-white hover:bg-gray-50">
      {person.notification && (
        <div
          onClick={showProfile}
          className="bg-red-500 text-white rounded-t-lg"
        >
          {person.notification}
        </div>
      )}
      <div
        className="flex-1 flex flex-col p-8 justify-end"
        onClick={showProfile}
      >
        <div className="w-32 h-32 relative flex-shrink-0 mx-auto">
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
        <h3 className="mt-6 text-gray-900 text-sm font-medium">
          {person.displayName}
        </h3>
        <dl className="mt-1 flex flex-col align-bottom">
          <dt className="mt-3 text-gray-500 text-sm">Letzter Kontakt:</dt>
          <dd className="pt-1">
            <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
              vor 3 Tagen
            </span>
          </dd>
        </dl>
      </div>
      <div>
        {(person.primaryPhone || person.primaryMail) && (
          <div className="-mt-px flex divide-x divide-gray-200">
            {person.primaryMail && (
              <div className="w-0 flex-1 flex">
                <Link href={`mailto:${person.primaryMail?.value}`}>
                  <a className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                    <FontAwesomeIcon
                      icon={faEnvelopeOpen}
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Email</span>
                  </a>
                </Link>
              </div>
            )}
            {person.primaryPhone && (
              <div className="-ml-px w-0 flex-1 flex">
                <Link href={`tel:${person.primaryPhone?.value}`}>
                  <a className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Call</span>
                  </a>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
};
