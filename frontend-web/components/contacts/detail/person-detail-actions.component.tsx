import React from "react";
import { ActionType, PersonDetails } from "../../../globals/interfaces";
import {
  ArchiveIcon,
  BellIcon,
  MinusIcon,
  PencilAltIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/solid";
import {
  DropDownButton,
  DropDownGroup,
  DropDownItem,
} from "../../common/drop-down-button.component";
import { BellIcon as BellIconOutline } from "@heroicons/react/outline";

interface Props {
  person: PersonDetails;
}

export const PersonDetailActions: React.FC<Props> = ({ person }) => {
  return (
    <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
      <button
        type="button"
        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        Anrufen
      </button>
      <DropDownButton
        title={<BellIcon className={"w-5 h-5"} />}
        className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
      >
        <DropDownGroup>
          <DropDownItem title={"erstellen"} icon={{ active: PlusIcon }} />
        </DropDownGroup>
        <DropDownGroup>
          <DropDownItem
            title={"Geburtstag"}
            icon={{ active: XIcon, inactive: BellIcon }}
          />
          <DropDownItem
            title={"Jahrestag"}
            icon={{ active: XIcon, inactive: BellIcon }}
          />
          <DropDownItem
            title={"Geschenk"}
            icon={{ active: PlusIcon, inactive: BellIconOutline }}
          />
          <DropDownItem
            title={"Kontakt halten"}
            icon={{ active: PlusIcon, inactive: BellIconOutline }}
          />
        </DropDownGroup>
      </DropDownButton>
      <DropDownButton
        title={<PencilIcon className={"h-5 w-5"} />}
        type={ActionType.PRIMARY}
        className="relative mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
      >
        <DropDownGroup>
          <DropDownItem title={"Eintrag hinzufügen"} />
          <DropDownItem title={"Notiz schreiben"} />
          <DropDownItem title={"Erinnerung erstellen"} />
        </DropDownGroup>
        <DropDownGroup>
          <DropDownItem
            title={"Bearbeiten"}
            icon={{ active: PencilIcon, inactive: PencilAltIcon }}
          />
          <DropDownItem
            title={"Archivieren"}
            type={ActionType.ARCHIVE}
            icon={{ active: ArchiveIcon }}
          />
          <DropDownItem
            title={"Löschen"}
            type={ActionType.DANGER}
            icon={{ active: TrashIcon }}
          />
        </DropDownGroup>
      </DropDownButton>
    </div>
  );
};
