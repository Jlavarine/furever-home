import { SxProps, Theme } from "@mui/material";

export const pageContainer: SxProps<Theme> = {
    marginTop: 4,
    padding: 2,
    backgroundColor: "#f5f5f5",
    minHeight: "100vh"
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

export const buttonGroup: SxProps<Theme> = {
    display: "flex",
    gap: 2
};

export const filterBar: SxProps<Theme> = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    mt: 3,
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

export const dogGrid: SxProps<Theme> = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 4,
    marginTop: 4,
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

export const errorText: SxProps<Theme> = {
    color: "error.main",
    fontWeight: "bold"
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
