import React from "react";
import {
  ArrayInput,
  SimpleFormIterator,
  FormDataConsumer,
  ReferenceInput,
  AutocompleteInput,
  required,
  IconButtonWithTooltip,
  SortPayload,
  OptionText,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import clsx from "clsx";
import { Box } from "@mui/material";

interface CustomArrayInputProps {
  source: string;
  label?: string;
  reference: string;
  referenceSource: string;
  optionText: OptionText;
  sort?: SortPayload;
}

const CustomArrayInput: React.FC<CustomArrayInputProps> = ({
  source,
  label,
  reference,
  referenceSource,
  optionText,
  sort,
  ...props
}) => {
  const { getValues, setValue } = useFormContext();

  const handleAddTop = () => {
    const currentArray = getValues(source) || [];
    setValue(source, [{ id: null }, ...currentArray]);
  };

  return (
    <ArrayInput source={source} label={label} {...props}>
      <Box display="flex" justifyContent="flex-start" my={1}>
        <IconButtonWithTooltip
          label="ra.action.add"
          size="small"
          onClick={handleAddTop}
          color="primary"
          className={clsx(`button-add button-add-${source}`)}
          sx={{ width: "auto" }}
        >
          <AddIcon fontSize="small" />
        </IconButtonWithTooltip>
      </Box>

      <SimpleFormIterator>
        <FormDataConsumer>
          {({ formData, scopedFormData }) => {
            const currentIndex = (formData?.[source] || []).indexOf(
              scopedFormData,
            );
            const usedIds = (formData?.[source] || [])
              .filter((_entry: never, i: number) => i !== currentIndex)
              .map((entry: never) => entry[referenceSource])
              .filter(Boolean);

            return (
              <ReferenceInput
                source={referenceSource}
                key={usedIds.join(",")}
                reference={reference}
                sort={sort}
                filter={{ id: { notIn: usedIds } }}
              >
                <AutocompleteInput
                  optionText={optionText}
                  label={label}
                  validate={[required()]}
                />
              </ReferenceInput>
            );
          }}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  );
};

export default CustomArrayInput;
