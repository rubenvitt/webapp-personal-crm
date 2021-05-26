import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import React from "react";
import { Person } from "../../globals/interfaces";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  person: Person;
}

export const PersonListItem: React.FC<Props> = ({ person }) => {
  const router = useRouter();
  const showProfile = () => {
    router.push(`${router.pathname}/${person.id}`);
  };

  const call = () => {
    router.push("tel:" + person.phone);
    return false;
  };

  const writeMail = () => {
    router.push("mailto:" + person.email);
    return false;
  };

  return (
    <li
      key={person.email}
      className="col-span-1 cursor-pointer flex flex-col text-center rounded-lg shadow divide-y divide-gray-200 hover:bg-lightgray-300 bg-white hover:bg-gray-50"
    >
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
          <Image
            className="rounded-full"
            src={person.imageUrl}
            layout="fill"
            alt="Profile picture"
          />
        </div>
        <h3 className="mt-6 text-gray-900 text-sm font-medium">
          {person.name}
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
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="w-0 flex-1 flex">
            <a
              onClick={writeMail}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
              <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">Email</span>
            </a>
          </div>
          <div className="-ml-px w-0 flex-1 flex">
            <a
              onClick={call}
              href={`tel:${person.phone}`}
              className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
            >
              <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">Call</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};