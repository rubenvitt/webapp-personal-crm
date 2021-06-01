import { CakeIcon, UserGroupIcon } from "@heroicons/react/solid";
import { calculateTimespanSince } from "../../../../globals/utils";
import { ContentBox } from "../../../common/content-box.component";
import React, { Fragment } from "react";
import { PersonDetails } from "../../../../globals/interfaces";
import { Menu, Transition } from "@headlessui/react";

interface Props {
  person: PersonDetails;
}

export const PersonDetailGeneralBox: React.FC<Props> = ({ person }) => {
  return (
    <ContentBox title="Allgemeines" subTitle={"Allgemeines zu " + person.name}>
      <dl>
        <dt>
          <CakeIcon className="w-5 h-5 inline pr-2" />
          {new Date(person.birthday).toLocaleDateString()} (
          {calculateTimespanSince({
            duration: { start: person.birthday },
            unit: "years",
          })}
          )
        </dt>
        <dt>
          <UserGroupIcon className="w-5 h-5 inline pr-2" />
          <span className="text-blue-400 cursor-pointer hover:text-blue-500">
            3 Beziehungen
          </span>
        </dt>
        <dt>
          <UserGroupIcon className="w-5 h-5 inline pr-2" />
          <span className="text-blue-400 cursor-pointer hover:text-blue-500">
            Letzter Kontakt{" "}
            {calculateTimespanSince({
              duration: { start: person.lastContact },
              prefix: "vor ",
            })}
          </span>
        </dt>
        <dl>
          <h3>Kontaktdaten</h3>
          <Menu className="relative inline-block text-left" as="div">
            <div>
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                05123123123
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        12345125123
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        12345125123
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        12345125123
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        12345125123
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </dl>
      </dl>
    </ContentBox>
  );
};
