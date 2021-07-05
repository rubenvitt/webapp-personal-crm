// noinspection DuplicatedCode

import { PersonBox } from "../../../components/contacts/detail/person-detail-box.component";
import { PersonTagList } from "../../../components/contacts/detail/person-tag-list.component";
import { ContentBox } from "../../../components/common/content-box.component";
import React, { useEffect } from "react";
import { PersonDetailGeneralBox } from "../../../components/contacts/detail/boxes/general.box.component";
import { PersonDetailNotesBox } from "../../../components/contacts/detail/boxes/notes.box.component";
import { PersonContactBox } from "../../../components/contacts/detail/boxes/contact.box.component";
import { LogList } from "../../../components/log/log-list.component";
import { useLogEntry } from "../../../services/log-service";
import { usePerson } from "../../../services/person-service";
import { usePersonNavigate } from "../../../globals/person-utils";
import { withPageAuthRequired } from "../../../globals/auth0";
import { Logger } from "../../../globals/logging";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    return {
      props: {
        id: context.params.id,
      },
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
            withCreation
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
