import Head from "next/head";
import { useQuery } from "react-query";
import { findAllPersons } from "../services/user-service";

export default function Dashboard() {
  const { data: persons, isLoading } = useQuery("persons", findAllPersons);

  return (
    <>
      <ul>
        <li>Overview last contacts</li>
        <li>Overview appointments</li>
        <li>Search?</li>
      </ul>

      <dl>{persons && <dt>Du hast {persons.length} Kontakte</dt>}</dl>
    </>
  );
}
