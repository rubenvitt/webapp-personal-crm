import { PersonListItem } from "../../components/contacts/list/person-list-item.component";
import { usePersons } from "../../services/person-service";
import { PersonList } from "../../components/contacts/list/person-list.component";
import { PersonListItemFavorite } from "../../components/contacts/list/person-list-item.favorite.component";
import { withPageAuthRequired } from "../../globals/auth0";

export const getServerSideProps = withPageAuthRequired();

const Index: React.FC = () => {
  const { persons } = usePersons();
  const { persons: favoritePersons } = usePersons("favorites");

  return (
    <div className="">
      <PersonList
        hideOnEmpty
        grid={false}
        persons={favoritePersons}
        loading={!favoritePersons}
        title="Favoriten"
        className={"mb-5"}
        Item={PersonListItemFavorite}
      />
      <PersonList
        persons={persons}
        loading={!persons}
        title={"Alle Kontakte"}
        className={"border-none"}
        Item={PersonListItem}
      />
    </div>
  );
};

export default Index;
