import React from "react";
import { Switch } from "@mui/material";
import { useDataProvider, useNotify, useRefresh } from "react-admin";

const ActiveSwitch = ({ record }: { record?: any }) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  if (!record) return null;

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    try {
      await dataProvider.updateActive("cards", record.id, event.target.checked);

      notify("Поле Активно обновлён", { type: "success" });
      refresh();
    } catch (_e) {
      notify("Ошибка при обновлении поля Активно", { type: "error" });
    }
  };

  return (
    <Switch
      checked={Boolean(record.active)}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default ActiveSwitch;
