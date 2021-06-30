import React, { useState } from "react";
import { ActionType, IdOnly, PersonDetails } from "../../../globals/interfaces";
import {
  DropDownButton,
  DropDownGroup,
  DropDownItem,
} from "../../common/drop-down-button.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faBell as fasBell,
  faBells,
  faEdit,
  faPencil,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/pro-solid-svg-icons";
import { faBell as farBell } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { deletePerson } from "../../../services/person-service";
import { reactQuery } from "../../../globals/react-query.config";
import { ConfirmDialog } from "../../common/dialog/confirm-dialog.component";

interface Props {
  person: PersonDetails;
}

export const PersonDetailActions: React.FC<Props> = ({ person }) => {
  const { push, asPath } = useRouter();

  const { mutateAsync: mutatePersonDelete } = useMutation<
    void,
    unknown,
    IdOnly
  >(
    "update-contacts",
    async (element) => {
      return await deletePerson(element);
    },
    {
      onSuccess: async () => {
        await reactQuery.invalidateQueries("persons");
        await reactQuery.removeQueries(["persons", person._id]);
        await push("/contacts");
      },
    }
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>();

  return (
    <>
      <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
        <button
          type="button"
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        >
          Anrufen
        </button>
        <DropDownButton
          titleText={"Benachrichtigungen"}
          title={<FontAwesomeIcon icon={faBells} />}
          className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
        >
          <DropDownGroup>
            <DropDownItem title={"erstellen"} icon={{ active: faPlus }} />
          </DropDownGroup>
          <DropDownGroup>
            <DropDownItem
              title={"Geburtstag"}
              icon={{ active: faTimes, inactive: fasBell }}
            />
            <DropDownItem
              title={"Jahrestag"}
              icon={{ active: faTimes, inactive: fasBell }}
            />
            <DropDownItem
              title={"Geschenk"}
              icon={{ active: faPlus, inactive: farBell }}
            />
            <DropDownItem
              title={"Kontakt halten"}
              icon={{ active: faPlus, inactive: farBell }}
            />
          </DropDownGroup>
        </DropDownButton>
        <DropDownButton
          titleText={"Bearbeiten"}
          title={<FontAwesomeIcon icon={faPencil} />}
          type={ActionType.PRIMARY}
          className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
        >
          <DropDownGroup>
            <DropDownItem title={"Eintrag hinzufügen"} />
            <DropDownItem title={"Notiz schreiben"} />
            <DropDownItem title={"Erinnerung erstellen"} />
          </DropDownGroup>
          <DropDownGroup>
            <DropDownItem
              title={"Bearbeiten"}
              icon={{ active: faEdit }}
              onClick={() => push(asPath + "/edit")}
            />
            <DropDownItem
              title={"Archivieren"}
              type={ActionType.ARCHIVE}
              icon={{ active: faArchive }}
            />
            <DropDownItem
              title={"Löschen"}
              onClick={() => {
                setShowDeleteDialog(true);
              }}
              type={ActionType.DANGER}
              icon={{ active: faTrash }}
            />
          </DropDownGroup>
        </DropDownButton>
      </div>
      <ConfirmDialog
        title={"Kontakt löschen"}
        onClose={() => setShowDeleteDialog(false)}
        open={showDeleteDialog}
        success={{
          label: "Löschen",
          type: ActionType.DANGER,
          action: () => mutatePersonDelete(person),
        }}
      >
        Soll <b className="text-red-500">{person.displayName}</b> wirklich
        unwiderruflich entfernt werden?
      </ConfirmDialog>
    </>
  );
};
