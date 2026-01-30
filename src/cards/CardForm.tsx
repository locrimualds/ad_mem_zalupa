import {
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  BooleanInput,
} from "react-admin";
import JsonEditorInput from "../components/JsonEditorInput.tsx";
import { Divider } from "@mui/material";
import CustomArrayInput from "../components/CustomIterator.tsx";

const CardForm = () => (
  <SimpleForm
    defaultValues={{
      cardNum: null,
      cardBalance: 0,
      cardExp: "",
      cardCvv: "",
      fullName: "",
      address: "",
      phone: null,
      data: {},
      status: false,
      active: false,
      users: [],
    }}
  >
    <NumberInput source="cardNum" label="Номер карты" validate={[required()]} />
    <BooleanInput
      source={"status"}
      label={"Статус"}
      helperText={"Полностью включает/отключает карту для пользователей."}
      sx={{ mt: 2 }}
    />
    <BooleanInput
      source={"active"}
      label={"Активна"}
      helperText={
        "Используется для фильтрации карт с 0 балансом или рабачая/нерабочая."
      }
    />
    <Divider sx={{ my: 2, width: "100%" }} />
    <CustomArrayInput
      source="users"
      label="Пользователи"
      reference="users"
      referenceSource="id"
      optionText={(record) => `${record.id} - ${record.name}`}
    />
    <Divider sx={{ my: 2, width: "100%" }} />
    <NumberInput source="cardBalance" label="Баланс" />
    <TextInput source="cardExp" label="EXP" />
    <TextInput source="cardCvv" label="CVV" />
    <TextInput source="fullName" label="ФИО" />
    <TextInput source="address" label="Адрес" />
    <TextInput source="email" label="Email" />
    <NumberInput source="phone" label="Телефон" validate={[required()]} />
    <TextInput
      source="phoneExp"
      label="Срок действия телефона"
      validate={[required()]}
    />
    <JsonEditorInput source="data" />
  </SimpleForm>
);

export default CardForm;
