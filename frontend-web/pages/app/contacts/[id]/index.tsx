// noinspection DuplicatedCode

import React, { useEffect } from "react";
import { ContentBox } from "../../../../components/modules/common/content-box.component";
import { PersonContactBox } from "../../../../components/modules/contacts/detail-page/contact.box.component";
import { PersonDetailGeneralBox } from "../../../../components/modules/contacts/detail-page/general.box.component";
import { PersonDetailNotesBox } from "../../../../components/modules/contacts/detail-page/notes.box.component";
import { PersonBox } from "../../../../components/modules/contacts/detail-page/person-detail-box.component";
import { PersonTagList } from "../../../../components/modules/contacts/person-tag-list.component";
import { DiaryList } from "../../../../components/modules/diary/diary-list.component";
import { withPageAuthRequired } from "../../../../config/auth0";
import { Logger } from "../../../../global/logging";
import { usePersonNavigate } from "../../../../global/person-utils";
import { useLogEntry } from "../../../../services/log-service";
import { usePerson } from "../../../../services/person-service";

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
              <DiaryList logEntries={logEntries} />
            </ContentBox>
          }
        >
          <PersonTagList
            onCreate={(personTag) =>
              Logger.log("Creating personTag", personTag)
            }
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
