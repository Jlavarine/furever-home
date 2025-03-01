import { SxProps, Theme } from "@mui/material/styles";

const primaryColor = "#1976d2";
const accentColor = "#ff9800";
const backgroundGradient = "linear-gradient(to bottom, #f0f4f8, #d9e2ec)";

export const loginContainer: SxProps<Theme> = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: backgroundGradient,
};

export const loginPaper: SxProps<Theme> = {
    padding: 4,
    width: "100%",
    maxWidth: 420,
    textAlign: "center",
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    borderRadius: "16px",
};

export const headerBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#1976d2",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};

export const titleText: SxProps<Theme> = {
  fontWeight: "bold",
  fontSize: "1.8rem"
};

export const formStyles: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
};

export const inputField: SxProps<Theme> = {
    "& label.Mui-focused": {
        color: primaryColor,
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#ccc",
        },
        "&:hover fieldset": {
            borderColor: primaryColor,
        },
        "&.Mui-focused fieldset": {
            borderColor: primaryColor,
        },
    },
};

export const buttonStyle: SxProps<Theme> = {
    marginTop: "12px",
    padding: "12px 0",
    fontWeight: "bold",
    backgroundColor: primaryColor,
    color: "white",
    textTransform: "uppercase",
    borderRadius: "8px",
    "&:hover": {
        backgroundColor: "#0056b3",
    },
    "&:focus": {
        outline: `3px solid ${accentColor}`,
        outlineOffset: "2px",
    },
};
