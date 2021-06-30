// noinspection DuplicatedCode

import { QueryClient, useQuery } from "react-query";
import {
  findAllPersons,
  findDetailsFor,
} from "../../../services/person-service";
import { dehydrate } from "react-query/hydration";
import { PersonBox } from "../../../components/contacts/detail/person-detail-box.component";
import { PersonTagList } from "../../../components/contacts/detail/person-tag-list.component";
import { ContentBox } from "../../../components/common/content-box.component";
import React from "react";
import { PersonDetailGeneralBox } from "../../../components/contacts/detail/boxes/general.box.component";
import { PersonDetailNotesBox } from "../../../components/contacts/detail/boxes/notes.box.component";
import { PersonContactBox } from "../../../components/contacts/detail/boxes/contact.box.component";
import { LogList } from "../../../components/log/log-list.component";
import { findLogItemsFor } from "../../../services/log-service";
import { AxiosError } from "axios";
import { usePersonNavigate } from "../../../globals/person-utils";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticProps({ params }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["persons", params.id], () =>
    findDetailsFor(params.id)
  );

  return {
    props: {
      id: params.id,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticPaths() {
  const queryClient = new QueryClient();
  const people = await queryClient.fetchQuery(["persons"], findAllPersons);

  return {
    paths:
      people?.map((value) => ({
        params: {
          id: value._id,
        },
      })) ?? [],
    fallback: true,
  };
}

const ContactDetailPage: React.ReactNode = (props: { id; dehydratedState }) => {
  const { navigateTo } = usePersonNavigate();

  const { data: person } = useQuery(
    ["persons", props.id],
    () => findDetailsFor(props.id),
    {
      onError: async (err: AxiosError) => {
        if (err.isAxiosError && err.response?.status === 404) {
          await navigateTo();
        }
      },
    }
  );
  const { data: logEntries } = useQuery(["persons.log", props.id], () =>
    findLogItemsFor(props.id)
  );
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
