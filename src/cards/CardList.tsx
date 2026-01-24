import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

const CardList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="cardNum" label="ID" />
        {/*<TextField source="name" label="Имя" />*/}
        {/*<TextField source="level" label="Уровень" />*/}
        {/*<TextField source="health" label="Очки здоровья" />*/}
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default CardList;
