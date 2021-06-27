import { PersonDetails } from "../../../../globals/interfaces";
import { TextInput } from "../../../common/input.component";
import { GenderInput } from "../../../common/form/gender.input.component";
import React, { useState } from "react";
import { BirthdayInput } from "../../../common/form/birthday.input.component";
import { FormSection } from "../../../common/form/section.component";
import { SelectInput } from "../../../common/form/select.input.component";

interface Props {
  person: PersonDetails;
}

enum DisplayNameType {
  FIRSTNAME_ONLY,
  LASTNAME_ONLY,
  FIRSTNAME_LASTNAME,
  NICKNAME,
}

function descriptionFor(aDisplayNameType: DisplayNameType) {
  switch (aDisplayNameType) {
    case DisplayNameType.FIRSTNAME_ONLY:
      return "Vorname";
    case DisplayNameType.LASTNAME_ONLY:
      return "Nachname";
    case DisplayNameType.FIRSTNAME_LASTNAME:
      return "Vorname Nachname";
    case DisplayNameType.NICKNAME:
      return "Spitzname";
  }
}

export const EditPersonForm: React.FC<Props> = ({ person }) => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [nickName, setNickName] = useState<string>();
  const [displayName, setDisplayName] = useState<string>();

  return (
    <>
      <form className="space-y-6">
        <FormSection
          title={"Generelle Informationen"}
          description={"Allgemeine Informationen über den Kontakt"}
        >
          <TextInput
            onChange={setFirstName}
            value={firstName}
            title={"Vorname"}
            className={"col-span-4 sm:col-span-2"}
          />
          <TextInput
            onChange={setLastName}
            value={lastName}
            title={"Nachname"}
            className={"col-span-4 sm:col-span-2"}
          />
          <TextInput
            onChange={setNickName}
            value={nickName}
            title={"Spitzname"}
            className={"col-span-4 sm:col-span-2"}
          />
          <SelectInput
            title="Anzeigename"
            id="displayName"
            className="col-span-4 sm:col-span-2"
            buttonClassName="mt-1"
            onChange={(value) => {
              setDisplayName(value);
            }}
          >
            {[
              {
                condition: firstName && lastName,
                value: firstName + " " + lastName,
                form: DisplayNameType.FIRSTNAME_LASTNAME,
              },
              {
                condition: firstName,
                value: firstName,
                form: DisplayNameType.FIRSTNAME_ONLY,
              },
              {
                condition: lastName,
                value: lastName,
                form: DisplayNameType.LASTNAME_ONLY,
              },
              {
                condition: nickName,
                value: nickName,
                form: DisplayNameType.NICKNAME,
              },
            ]
              .filter((it) => it.condition)
              .map((it) => {
                return (
                  <option key={it.form} value={it.value}>
                    {it.value} ({descriptionFor(it.form)})
                  </option>
                );
              })}
          </SelectInput>
          <GenderInput
            disabled={false}
            onChange={() => undefined}
            className={"col-span-4 sm:col-span-4"}
          />
          <BirthdayInput
            className={"col-span-4 sm:col-span-2"}
            onChange={(e) => {}}
          />
        </FormSection>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      autoComplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      autoComplete="family-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="email_address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email_address"
                      id="email_address"
                      autoComplete="email"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country / Region
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="street_address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street address
                    </label>
                    <input
                      type="text"
                      name="street_address"
                      id="street_address"
                      autoComplete="street-address"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="postal_code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ZIP / Postal
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      autoComplete="postal-code"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Notifications
              </h3>
              <p className="mt-1 text-sm text-gray-500">lala</p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form className="space-y-6" action="#" method="POST">
                <fieldset>
                  <legend className="text-base font-medium text-gray-900">
                    By Email
                  </legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="h-5 flex items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-700"
                        >
                          Comments
                        </label>
                        <p className="text-gray-500">
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="candidates"
                          className="font-medium text-gray-700"
                        >
                          Candidates
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="offers"
                          className="font-medium text-gray-700"
                        >
                          Offers
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <div>
                    <legend className="text-base font-medium text-gray-900">
                      Push Notifications
                    </legend>
                    <p className="text-sm text-gray-500">
                      These are delivered via SMS to your mobile phone.
                    </p>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="push_everything"
                        name="push_notifications"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor="push_everything"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Everything
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push_email"
                        name="push_notifications"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor="push_email"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Same as email
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push_nothing"
                        name="push_notifications"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor="push_nothing"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        No push notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};
