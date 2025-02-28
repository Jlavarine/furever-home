import { SxProps, Theme } from "@mui/material";

export const dogCard: SxProps<Theme> = {
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#f0f8ff",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.15)"
    },
};

export const dogImage: SxProps<Theme> = {
    objectFit: "cover",
    width: "100%",
    borderBottom: "4px solid #6cc4e0"
};

export const dogName: SxProps<Theme> = {
    fontWeight: "bold",
    color: "#1976d2",
    textAlign: "center",
    marginBottom: 1
};

export const favoriteButton: SxProps<Theme> = {
    backgroundColor: "#add8e6",
    color: "#fff",
    "&:hover": {
        backgroundColor: "#6cc4e0",
    },
};

export const favoriteMessage: SxProps<Theme> = {
    color: "#1976d2",
    fontStyle: "italic",
};

export const favoriteBox: SxProps<Theme> = {
  display: "flex", 
  alignItems: "center", 
  justifyContent: "space-between",
  px: 2, 
  pb: 2
};
