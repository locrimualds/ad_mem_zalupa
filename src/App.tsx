import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider.ts";
import CardList from "./cards/CardList.tsx";
import CardCreate from "./cards/CardCreate.tsx";
import CardEdit from "./cards/CardEdit.tsx";
import UserList from "./users/UserList.tsx";
import UserCreate from "./users/UserCreate.tsx";
import UserEdit from "./users/UserEdit.tsx";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import GroupIcon from "@mui/icons-material/Group";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource
      name="cards"
      list={CardList}
      create={CardCreate}
      edit={CardEdit}
      icon={CreditCardIcon}
    />
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
      icon={GroupIcon}
    />
  </Admin>
);
