import { faBell as farBell } from "@fortawesome/pro-regular-svg-icons";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ActionType, PersonDetails } from "../../../../global/interfaces";
import { Logger } from "../../../../global/logging";
import { useAppRouter } from "../../../../global/router";
import { usePersonMutation } from "../../../../services/person-service";
import {
  DropDownButton,
  DropDownGroup,
  DropDownItem,
} from "../../../elements/common/drop-down-button.component";
import { ConfirmDialog } from "../../dialog/confirm-dialog.component";

interface Props {
  person: PersonDetails;
}

export const PersonDetailActions: React.FC<Props> = ({ person }) => {
  const { push, asPath } = useRouter();
  const { push: appPush } = useAppRouter();
  const { deletePerson } = usePersonMutation(person);

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
            <DropDownItem action={() => undefined} icon={{ active: faPlus }}>
              erstellen
            </DropDownItem>
          </DropDownGroup>
          <DropDownGroup>
            <DropDownItem
              action={() => undefined}
              icon={{ active: faTimes, inactive: fasBell }}
            >
              Geburtstag
            </DropDownItem>
            <DropDownItem
              action={() => undefined}
              icon={{ active: faTimes, inactive: fasBell }}
            >
              Jahrestag
            </DropDownItem>
            <DropDownItem
              action={() => undefined}
              icon={{ active: faPlus, inactive: farBell }}
            >
              Geschenk
            </DropDownItem>
            <DropDownItem
              action={() => undefined}
              icon={{ active: faPlus, inactive: farBell }}
            >
              Kontakt halten
            </DropDownItem>
          </DropDownGroup>
        </DropDownButton>
        <DropDownButton
          titleText={"Bearbeiten"}
          title={<FontAwesomeIcon icon={faPencil} />}
          type={ActionType.PRIMARY}
          className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
        >
          <DropDownGroup>
            <DropDownItem action={() => undefined}>
              Eintrag hinzufügen
            </DropDownItem>
            <DropDownItem action={() => undefined}>
              Notiz schreiben
            </DropDownItem>
            <DropDownItem action={() => undefined}>
              Erinnerung erstellen
            </DropDownItem>
          </DropDownGroup>
          <DropDownGroup>
            <DropDownItem
              icon={{ active: faEdit }}
              action={() => push(asPath + "/edit")}
            >
              Bearbeiten
            </DropDownItem>
            <DropDownItem
              type={ActionType.ARCHIVE}
              icon={{ active: faArchive }}
              action={() => undefined}
            >
              Archivieren
            </DropDownItem>
            <DropDownItem
              type={ActionType.DANGER}
              icon={{ active: faTrash }}
              action={() => {
                setShowDeleteDialog(true);
              }}
            >
              Löschen
            </DropDownItem>
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
          action: () =>
            deletePerson()
              .catch((e: AxiosError) => {
                Logger.error("My error", e.response);
                throw e;
              })
              .then(() => appPush("/contacts")),
        }}
      >
        <>
          Soll <b className="text-red-500">{person.displayName}</b> wirklich
          unwiderruflich entfernt werden?
        </>
      </ConfirmDialog>
    </>
  );
};
