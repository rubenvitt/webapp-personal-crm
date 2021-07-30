// noinspection DuplicatedCode

import React, { useEffect } from "react";
import { withAuthenticatedTranslatedServerSideProps } from "../../../../api-functions/defaults";
import { PersonContactBox } from "../../../../components/modules/contacts/detail-page/contact.box.component";
import { PersonDetailNotesBox } from "../../../../components/modules/contacts/detail-page/notes.box.component";
import { PersonBox } from "../../../../components-old/contacts/detail/person-detail-box.component";
import { PersonTagList } from "../../../../components/modules/contacts/person-tag-list.component";
import { LogList } from "../../../../components-old/log/log-list.component";
import { ContentBox } from "../../../../components/modules/common/content-box.component";
import { PersonDetailGeneralBox } from "../../../../components/modules/contacts/detail-page/general.box.component";
import { Logger } from "../../../../globals/logging";
import { usePersonNavigate } from "../../../../globals/person-utils";
import { useLogEntry } from "../../../../services/log-service";
import { usePerson } from "../../../../services/person-service";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps({
  additionalProps: (context) => {
    return {
      id: context.params.id,
    };
  },
});

const ContactDetailPage: React.ReactNode = ({ id }) => {
  const { person, isError } = usePerson(id);
  const { navigateTo } = usePersonNavigate();

  useEffect(() => {
    if (isError && isError.isAxiosError && isError.response?.status === 404) {
      Logger.error("Could not find contact by id", id, isError);
      navigateTo();
    }
  }, [isError]);

  const { logEntries } = useLogEntry(person);

  return (
    <>
      {person && (
        <PersonBox
          person={person}
          aside={
            <ContentBox
              title="Aktivitäten"
              footer={{
                content: `Alle Aktivitäten mit ${person.displayName} anzeigen`,
                action: () => undefined,
              }}
            >
              <LogList logEntries={logEntries} />
            </ContentBox>
          }
        >
          <PersonTagList
            onCreate={(personTag) => undefined}
            onClick={(personTag) => alert(`clicked ${personTag.title}`)}
            className="flex-wrap"
            tagList={person.groups}
          />
          <PersonDetailGeneralBox person={person} />
          <PersonContactBox person={person} />
          <PersonDetailNotesBox person={person} />
        </PersonBox>
      )}
    </>
  );
};

export default ContactDetailPage;
