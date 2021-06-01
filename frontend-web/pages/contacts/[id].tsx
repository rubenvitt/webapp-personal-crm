import { QueryClient, useQuery } from "react-query";
import { findAllPersons, findDetailsFor } from "../../services/user-service";
import { dehydrate } from "react-query/hydration";
import { PersonBox } from "../../components/contacts/detail/person-detail-box.component";
import { PersonTagList } from "../../components/contacts/detail/person-tag-list.component";
import { ContentBox } from "../../components/common/content-box.component";
import React from "react";
import { PersonDetailGeneralBox } from "../../components/contacts/detail/boxes/general.box.component";
import { PersonDetailNotesBox } from "../../components/contacts/detail/boxes/notes.box.component";

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

export async function getStaticPaths() {
  const queryClient = new QueryClient();
  const people = await queryClient.fetchQuery(["persons"], findAllPersons);
  return {
    paths: people.map((value) => ({
      params: {
        id: value.id,
      },
    })),
    fallback: true,
  };
}

export default ContactDetailPage;

function ContactDetailPage(props: { id; dehydratedState }) {
  const { data: person } = useQuery(["persons", props.id], () =>
    findDetailsFor(props.id)
  );

  return (
    <>
      {person && (
        <PersonBox
          person={person}
          aside={
            <ContentBox
              title="Box 2"
              footer={{ content: "Klick mich hier", action: () => undefined }}
            />
          }
        >
          <PersonTagList
            withCreation
            onClick={(personTag) => alert(`clicked ${personTag.title}`)}
            className="flex-wrap"
            tagList={person.groups}
          />
          <PersonDetailGeneralBox person={person} />
          <PersonDetailNotesBox person={person} />
        </PersonBox>
      )}
    </>
  );
}
