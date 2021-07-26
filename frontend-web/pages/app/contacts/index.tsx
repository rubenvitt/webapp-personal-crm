import React from "react";
import { withAuthenticatedTranslatedServerSideProps } from "../../../api-functions/defaults";
import { PersonListItem } from "../../../components-old/contacts/list/person-list-item.component";
import { PersonListItemFavorite } from "../../../components-old/contacts/list/person-list-item.favorite.component";
import { PersonList } from "../../../components-old/contacts/list/person-list.component";
import { usePersons } from "../../../services/person-service";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps();

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
