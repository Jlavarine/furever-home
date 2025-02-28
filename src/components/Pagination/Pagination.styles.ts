import { SxProps, Theme } from "@mui/material";

export const buttonGroupStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  mt: 4,
};

export const buttonStyles: SxProps<Theme> = {
  textTransform: "none",
  fontSize: "1rem",
  px: 3,
  backgroundColor: "#add8e6",
  color: 'black',
  "&:hover": {
      backgroundColor: "#6cc4e0"
  },
  "&:disabled": {
  backgroundColor: "#f0f0f0",
  color: "#555"
}
};
