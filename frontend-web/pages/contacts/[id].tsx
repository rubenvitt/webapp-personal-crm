import { CheckIcon, ThumbUpIcon, UserIcon } from "@heroicons/react/solid";
import { QueryClient, useQuery } from "react-query";
import { findAllPersons, findDetailsFor } from "../../services/user-service";
import { dehydrate } from "react-query/hydration";
import { PersonBox } from "../../components/contacts/detail/person-detail-box.component";

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
  const { data: personDetail } = useQuery(["persons", props.id], () =>
    findDetailsFor(props.id)
  );
  return <>{personDetail && <PersonBox person={personDetail} />}</>;
}
