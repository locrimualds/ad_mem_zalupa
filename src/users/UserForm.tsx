import {
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  ArrayInput,
  SimpleFormIterator,
  FormDataConsumer,
  ReferenceInput,
  AutocompleteInput,
  SelectInput,
} from "react-admin";
import { Divider } from "@mui/material";

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
    <ArrayInput source="cards" label="Карты">
      <SimpleFormIterator>
        <FormDataConsumer>
          {({ formData, scopedFormData }) => {
            interface Card {
              cardNum: number;
            }

            const currentIndex = (formData?.cards || []).indexOf(
              scopedFormData,
            );

            const usedCardIds = (formData?.cards || [])
              .filter((_entry: never, i: number) => i !== currentIndex)
              .map((entry: Card) => entry.cardNum)
              .filter(Boolean);

            return (
              <ReferenceInput
                source="cardNum"
                key={usedCardIds.join(",")}
                reference="cards"
                sort={{ field: "cardNum", order: "ASC" }}
                filter={{ id: { notIn: usedCardIds } }}
              >
                <AutocompleteInput
                  optionText={(record) =>
                    `${record.cardNum} - ${record.fullName}`
                  }
                  label="Карта"
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

export default UserForm;
