import { TextInput } from "../../components/common/input.component";
import { useMutation } from "react-query";
import { reactQuery } from "../../globals/react-query.config";
import { createPerson } from "../../services/person-service";
import React, { SyntheticEvent, useReducer } from "react";
import { useRouter } from "next/router";
import { IdOnly } from "../../globals/interfaces";
import { GenderInput } from "../../components/common/form/gender.input.component";

interface FormType {
  gender: string;
  anrede: string;
  givenName: string;
  familyName: string;
  nickName: string;
}

const EMPTY_FORM_VALUE: FormType = {
  gender: "",
  anrede: "",
  givenName: "",
  familyName: "",
  nickName: "",
};

export default function NewContactPage() {
  const reducer = (
    state: FormType,
    action: {
      name:
        | "gender"
        | "givenName"
        | "reset"
        | "familyName"
        | "nickName"
        | "anrede";
      value?: string;
    }
  ) => {
    if (action.name === "reset") {
      return EMPTY_FORM_VALUE;
    }
    return {
      ...state,
      [action.name]: action.value,
    };
  };

  const { push } = useRouter();

  const [formData, dispatch] = useReducer(reducer, EMPTY_FORM_VALUE);

  const { isLoading, mutate } = useMutation<IdOnly, unknown, FormType>(
    "create-contacts",
    (element) => {
      console.log("going to create person", element);
      return createPerson({
        firstName: element.givenName,
        displayName: element.givenName + " " + element.familyName,
        lastName: element.familyName,
        gender: element.gender,
        anrede: element.anrede,
      });
    },
    {
      onSuccess: async (value) => {
        await reactQuery.invalidateQueries("persons").then(() => {
          push("/contacts/" + value.id);
        });
      },
    }
  );

  const createContact = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isLoading) {
      mutate(formData);
    }
  };

  return (
    <form className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
      <section aria-labelledby="payment_details_heading">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 sm:p-6">
            <div>
              <h2
                id="payment_details_heading"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Nutzer anlegen
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Grundlegende Informationen werden benötigt, um den Nutzer
                anzulegen. Weitere Angaben sind freiwillig.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-4 lg:grid-cols-6 gap-6">
              <TextInput
                disabled={isLoading}
                onChange={(aValue) => {
                  dispatch({
                    value: aValue,
                    name: "givenName",
                  });
                }}
                className="col-span-6 sm:col-span-2"
                title={"Vorname"}
                autocomplete={"given-name"}
              />
              <TextInput
                disabled={isLoading}
                onChange={(aValue) => {
                  dispatch({
                    value: aValue,
                    name: "familyName",
                  });
                }}
                className="col-span-6 sm:col-span-2"
                title={"Nachname"}
                autocomplete={"family-name"}
              />
              <TextInput
                disabled={isLoading}
                onChange={(aValue) => {
                  dispatch({
                    value: aValue,
                    name: "nickName",
                  });
                }}
                className="col-span-6 sm:col-span-2"
                title={"Spitzname"}
                autocomplete={"nickname"}
              />
              <GenderInput
                className={"col-span-6 sm:col-span-4"}
                disabled={isLoading}
                onChange={(aValue) => {
                  dispatch({
                    value: aValue.gender,
                    name: "gender",
                  });
                  dispatch({
                    value: aValue.anrede,
                    name: "anrede",
                  });
                }}
              />
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              disabled={isLoading}
              onClick={createContact}
              type="submit"
              className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Speichern
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}
