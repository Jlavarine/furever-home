import { SxProps, Theme } from "@mui/material";

export const matchContainer: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    gap: 3,
    background: "linear-gradient(to bottom, #f0f8ff, #d1ecf1)"
};

export const matchCard: SxProps<Theme> = {
    width: "100%",
    maxWidth: 500,
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
};

export const matchImage: SxProps<Theme> = {
    height: 300,
    objectFit: "cover",
};

export const matchDetails: SxProps<Theme> = {
    padding: 2,
    textAlign: "center",
};

export const matchTitle: SxProps<Theme> = {
    fontWeight: "bold",
    color: "#1976d2",
    textAlign: "center",
};

export const backButton: SxProps<Theme> = {
    backgroundColor: "#6cc4e0",
    color: "black",
    fontSize: "1rem",
    textTransform: "none",
    paddingX: 4,
    paddingY: 1,
    "&:hover": {
        backgroundColor: "#6cc4e0",
    },
};
export const celebrationIcon: SxProps<Theme> = {
    fontSize: 40, 
    color: "#1976d2", 
    marginRight: 1
};
