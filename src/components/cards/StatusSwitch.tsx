import React from "react";
import { Switch } from "@mui/material";
import { useDataProvider, useNotify, useRefresh } from "react-admin";

const StatusSwitch = ({ record }: { record?: any }) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  if (!record) return null;

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    try {
      await dataProvider.updateStatus("cards", record.id, event.target.checked);

      notify("Статус обновлён", { type: "success" });
      refresh();
    } catch (_e) {
      notify("Ошибка при обновлении статуса", { type: "error" });
    }
  };

  return (
    <Switch
      checked={Boolean(record.status)}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default StatusSwitch;
