// noinspection DuplicatedCode

import { QueryClient, useQuery } from "react-query";
import {
  findAllPersons,
  findDetailsFor,
} from "../../../services/person-service";
import { dehydrate } from "react-query/hydration";
import { EditPersonForm } from "../../../components/contacts/detail/edit/edit-form.component";

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

const EditPersonPage: React.ReactNode = ({ id }) => {
  const { data, isLoading } = useQuery(["persons", id], () =>
    findDetailsFor(id)
  );
  return <>{isLoading ? <>Loading</> : <EditPersonForm person={data} />}</>;
};

export default EditPersonPage;
