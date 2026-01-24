import { Admin, ListGuesser, Resource } from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import CardList from "./cards/CardList.tsx";
import authProvider from "./authProvider.ts";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource name="users" list={ListGuesser} />
    <Resource name="cards" list={CardList} />
  </Admin>
);
