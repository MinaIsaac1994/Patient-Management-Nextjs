"use client";
import { useSnackbar } from "notistack";
export const useToaster = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToaster = (variant = "default", text = "message") => {
    enqueueSnackbar(text, {
      variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      autoHideDuration: 2000,
    });
  };
  return { showToaster };
};
