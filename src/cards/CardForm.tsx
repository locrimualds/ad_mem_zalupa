import {
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  BooleanInput,
  ArrayInput,
  SimpleFormIterator,
  FormDataConsumer,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import JsonEditorInput from "../components/JsonEditorInput.tsx";
import { Divider } from "@mui/material";

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
    <ArrayInput source="users" label="Пользователи">
      <SimpleFormIterator>
        <FormDataConsumer>
          {({ formData, scopedFormData }) => {
            interface User {
              id: number;
              name: string;
            }

            const currentIndex = (formData?.users || []).indexOf(
              scopedFormData,
            );

            const usedUserIds = (formData?.users || [])
              .filter((_entry: never, i: number) => i !== currentIndex)
              .map((entry: User) => entry.id)
              .filter(Boolean);

            return (
              <ReferenceInput
                source="id"
                key={usedUserIds.join(",")}
                reference="users"
                filter={{ id: { notIn: usedUserIds } }}
              >
                <AutocompleteInput
                  optionText={(record) => `${record.id} - ${record.name}`}
                  label="Пользователь"
                  validate={[required()]}
                />
              </ReferenceInput>
            );
          }}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  </SimpleForm>
);

export default CardForm;
