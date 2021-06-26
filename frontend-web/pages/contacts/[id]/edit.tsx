import { QueryClient } from "react-query";
import {
  findAllPersons,
  findDetailsFor,
} from "../../../services/person-service";
import { dehydrate } from "react-query/hydration";

export default EditPersonPage;

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
    paths:
      people?.map((value) => ({
        params: {
          id: value._id,
        },
      })) ?? [],
    fallback: true,
  };
}

function EditPersonPage({ id }) {
  console.log(id);
  return <>Hey, {id}</>;
}
