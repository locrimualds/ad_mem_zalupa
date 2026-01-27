import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

const UserList = () => {
  return (
    <List sort={{ field: "id", order: "ASC" }}>
      <Datagrid>
        <TextField source="id" label="ID" />
        <TextField source="name" label="Имя" />
        <TextField source="role" label="Права" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default UserList;
