import React from "react";
import { Switch } from "@mui/material";
import { useDataProvider, useNotify, useRefresh } from "react-admin";

const FieldSwitch = ({ record, field }: { record?: any, field: string }) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  if (!record) return null;

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    try {
      await dataProvider.updateField(
        "cards",
        record.id,
        field,
        event.target.checked,
      );

      notify("Поле обновлёно", { type: "success" });
      refresh();
    } catch (_e) {
      notify("Ошибка при обновлении поля", { type: "error" });
    }
  };

  return (
    <Switch
      checked={Boolean(record[field])}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default FieldSwitch;
