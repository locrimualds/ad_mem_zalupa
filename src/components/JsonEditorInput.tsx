import { useState, useEffect } from "react";
import { useInput, useRecordContext } from "react-admin";
import { useTheme } from "@mui/material/styles";
import { JsonEditor, githubLightTheme, githubDarkTheme } from "json-edit-react";

const JsonEditorInput = ({ source }: { source: string }) => {
  const theme = useTheme();
  const themeToMerge =
    theme.palette.mode === "dark" ? githubDarkTheme : githubLightTheme;
  const mergedTheme = {
    ...themeToMerge,
    styles: {
      ...themeToMerge.styles,
      input: {
        color: theme.palette.text.primary,
      },
    },
  };

  const record = useRecordContext();
  const {
    field: { onChange },
  } = useInput({ source });

  const initialData = record?.[source] ?? {};
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(record?.[source] ?? {});
  }, [record, source]);

  const handleUpdate = (newData: unknown) => {
    setData(newData);
    onChange(newData);
  };

  return (
    <JsonEditor
      data={data}
      setData={handleUpdate}
      rootName={source}
      collapse={1}
      theme={mergedTheme}
    />
  );
};

export default JsonEditorInput;
