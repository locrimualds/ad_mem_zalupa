import {
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  SelectInput,
} from "react-admin";
import { Divider } from "@mui/material";
import CustomArrayInput from "../components/CustomIterator.tsx";

const UserForm = () => (
  <SimpleForm
    defaultValues={{
      id: null,
      name: "",
      role: "user",
      cards: [],
    }}
  >
    <NumberInput source="id" label="ID" validate={[required()]} />
    <TextInput source="name" label="Имя" />
    <SelectInput
      source="role"
      label="Права"
      choices={[
        { id: "admin", name: "Админ" },
        { id: "user", name: "Пользователь" },
      ]}
      validate={[required()]}
    />
    <Divider sx={{ my: 2, width: "100%" }} />
    <CustomArrayInput
      source="cards"
      label="Карты"
      reference="cards"
      referenceSource="cardNum"
      optionText={(record) => `${record.cardNum} - ${record.fullName}`}
      sort={{ field: "cardNum", order: "ASC" }}
    />
  </SimpleForm>
);

export default UserForm;
