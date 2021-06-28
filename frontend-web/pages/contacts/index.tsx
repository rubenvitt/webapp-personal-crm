import { PersonListItem } from "../../components/contacts/list/person-list-item.component";
import { useQuery } from "react-query";
import {
  findAllFavoritePersons,
  findAllPersons,
} from "../../services/person-service";
import { PersonList } from "../../components/contacts/list/person-list.component";
import { PersonListItemFavorite } from "../../components/contacts/list/person-list-item.favorite.component";

const Index: React.FC = () => {
  const { data: persons, isLoading: loadingPersons } = useQuery(
    "persons",
    findAllPersons
  );
  const { data: favoritePersons, isLoading: loadingFavorites } = useQuery(
    "persons.favorite",
    findAllFavoritePersons
  );
  return (
    <div className="">
      <PersonList
        persons={favoritePersons}
        loading={loadingFavorites}
        title="Favoriten"
        className={"mb-5"}
        Item={PersonListItemFavorite}
      />
      <PersonList
        persons={persons}
        loading={loadingPersons}
        title={"Alle Kontakte"}
        className={"border-none"}
        Item={PersonListItem}
      />
    </div>
  );
};

export default Index;
