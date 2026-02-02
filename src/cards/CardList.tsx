import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  FunctionField,
  Link,
  SearchInput,
  BooleanInput,
} from "react-admin";
import {
  balanceFormat,
  cardNumFormat,
  getFormatedDate,
} from "../utils/main.ts";
import FieldSwitch from "../components/cards/FieldSwitch.tsx";

const filters = [
  <SearchInput source="q" placeholder="Поиск..." key="q" alwaysOn />,
  <BooleanInput
    key="hasUsers"
    label="Есть пользователи"
    source="hasUsers"
    defaultValue={false}
  />,
];

const CardList = () => {
  return (
    <List filters={filters} sort={{ field: "cardNum", order: "ASC" }}>
      <Datagrid>
        <FunctionField
          label="Номер карты"
          sortBy="cardNum"
          render={(record) => cardNumFormat(record.cardNum)}
        />
        <FunctionField
          label="Баланс"
          sortBy="cardBalance"
          render={(record) => balanceFormat(record.cardBalance)}
        />
        <TextField source="phone" label="Телефон" />
        <FunctionField
          label="Телефон истекает"
          sortBy="phoneExp"
          render={(record) => getFormatedDate(record.phoneExp)}
        />
        <TextField source="fullName" label="ФИО" />
        <FunctionField
          label="Пользователи"
          render={(record) => {
            const users = record?.UserToCards || [];
            if (!users.length) return "—";

            interface User {
              User: {
                id: number;
                name: string;
              };
            }

            const shown = users.slice(0, 2);
            const rest = users.length - shown.length;

            return (
              <>
                {shown.map((item: User, index: number) => (
                  <span key={item.User.id}>
                    <Link
                      to={`/users/${item.User.id}`}
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                      {item.User.id} ({item.User.name})
                    </Link>
                    {index < shown.length - 1 && ", "}
                  </span>
                ))}
                {rest > 0 && ` +${rest}`}
              </>
            );
          }}
        />
        <FunctionField
          label="Статус"
          render={(record) => <FieldSwitch record={record} field="status" />}
        />
        <FunctionField
          label="Активно"
          render={(record) => <FieldSwitch record={record} field="active" />}
        />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default CardList;
