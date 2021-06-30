import {
  IdOnly,
  PersonAddress,
  PersonDetails,
  PersonMail,
  PersonPhone,
  PhoneType,
} from "../../../../globals/interfaces";
import { ContentBox } from "../../../common/content-box.component";
import React, { useEffect, useState } from "react";
import { EditRadio } from "../edit/edit-input.component";
import { EditAddress } from "../edit/edit-address-input.component";
import { useMutation } from "react-query";
import {
  addPhoneNumber,
  deletePhoneNumber,
} from "../../../../services/person-service";
import { reactQuery } from "../../../../globals/react-query.config";

interface Props {
  person: PersonDetails;
}

export const PersonContactBox: React.FC<Props> = ({ person }) => {
  const { mutate: mutateAddPhoneNumber, isLoading: isLoadingAddPhoneNumber } =
    useMutation<
      void,
      unknown,
      { person: IdOnly; value: Omit<PersonPhone, "_id"> }
    >(
      ({ person, value }) => {
        return addPhoneNumber(person, value);
      },
      {
        onSuccess: async () => {
          await reactQuery.invalidateQueries(["persons", person._id]);
        },
      }
    );

  const {
    mutate: mutateDeletePhoneNumber,
    isLoading: isLoadingDeletePhoneNumber,
  } = useMutation<void, unknown, { person: IdOnly; value: IdOnly }>(
    ({ person, value }) => {
      return deletePhoneNumber(person, value);
    },
    {
      onSuccess: async () => {
        await reactQuery.invalidateQueries(["persons", person._id]);
      },
    }
  );

  const [isEdit, setIsEdit] = useState<boolean>();
  useEffect(() => {
    // reload edit form
  }, [isEdit]);

  return (
    <ContentBox
      title={"Kontaktdaten"}
      subTitle={`Kontaktdaten für ${person.displayName}`}
      edit={{
        onEditAction: () => setIsEdit(true),
        submitAction: () => {
          return Promise.resolve().then(() => setIsEdit(false));
        },
      }}
    >
      <dl className="flex space-y-4 flex-col">
        <dt className="border-b pb-4 border-gray-200">
          <EditRadio<PersonPhone>
            deleteItem={{
              action: (element) => {
                mutateDeletePhoneNumber({ person, value: element });
              },
              isLoading: isLoadingDeletePhoneNumber,
            }}
            addItem={{
              action: (value) => {
                mutateAddPhoneNumber({
                  person,
                  value: {
                    value: value,
                    type: PhoneType.MOBILE,
                  },
                });
              },
              isLoading: isLoadingAddPhoneNumber,
            }}
            isEdit={isEdit}
            label="Telefonnummern:"
            values={person.contact?.phone}
            inputOptions={{
              inputType: "tel",
              autocomplete: "tel",
              title: "Telefonnummer",
            }}
          />
        </dt>
        <dt className="border-b pb-4 border-gray-200">
          <EditRadio<PersonMail>
            isEdit={isEdit}
            values={person.contact?.mail}
            label={"E-Mail Adressen:"}
            inputOptions={{
              inputType: "email",
              autocomplete: "email",
              title: "E-Mail Adresse",
            }}
          />
        </dt>
        <dt>
          <EditRadio<PersonAddress>
            isEdit={isEdit}
            values={person.contact?.address}
            label={"Adressen:"}
            CustomEditInput={({ isEdit, initialElement }) => {
              return (
                <div className="flex flex-1 grid grid-cols-6 md:grid-cols-8">
                  {isEdit ? (
                    <EditAddress initialElement={initialElement} />
                  ) : (
                    <p className="col-span-4">{initialElement.value.city}</p>
                  )}
                </div>
              );
            }}
          />
        </dt>
      </dl>
    </ContentBox>
  );
};
