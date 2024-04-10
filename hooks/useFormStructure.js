import { useEffect, useState } from "react";
import { useToaster } from "@/config/Toaster";

const useFormStructure = (arr) => {
  const { showToaster } = useToaster();
  const [fields, setField] = useState([]);

  useEffect(() => {
    const generatedFormStructure = async (fields) => {
      return await Promise.all(
        fields.map(async (field) => {
          if (!field.label) {
            throw new Error("Label is required for each field.");
          }
          if (!field.id) {
            throw new Error("id is required for each field.");
          }

          const { label, id, api, optionLabel = "" } = field;

          // Define default values
          const defaultValues = {
            type: "text",
            Icon: () => null,
          };

          let fetchedList = [];

          if (typeof api === "function") {
            try {
              const response = await api();
              fetchedList = response?.map((e) => ({
                value: e.id,
                label: `${e.name}${optionLabel ? ` (${e[optionLabel]})` : ""}`,
              }));
            } catch (error) {
              showToaster("error", "Failed to fetch Select data");
            }
          }

          // Merge provided field properties with default values
          const mergedField = { ...defaultValues, ...field };

          // Validate size to be between 1 and 12
          const validatedSize = Math.max(1, Math.min(12, mergedField.size));

          // Include list property only if type is "select" or "multiselect"
          const fieldWithList = ["select", "multiselect"].includes(
            mergedField.type
          )
            ? { list: fetchedList.length ? fetchedList : mergedField.list }
            : {};
          // Include Boolean property only if type is "switch"
          // const fieldWithSwitch = ["switch"].includes(mergedField.type)
          //   ? { boolean: mergedField.boolean ?? true }
          //   : {};

          return {
            id,
            label,
            size: validatedSize,
            type: mergedField.type,
            multiline: mergedField.multiline,
            ...fieldWithList,
            // ...fieldWithSwitch,
            Icon: mergedField.Icon,
          };
        })
      );
    };

    generatedFormStructure(arr)
      .then((formFields) => {
        setField(formFields);
      })
      .catch((error) => {
        console.error("Error generating form structure", error);
      });
  }, []);

  return {
    fields,
  };
};

export default useFormStructure;
