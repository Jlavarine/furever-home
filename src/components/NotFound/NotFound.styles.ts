import { SxProps, Theme } from "@mui/material";

export const notFoundContainer: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    gap: 2,
};

export const errorNumber: SxProps<Theme> = {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#1976d2',
};

export const errorMessage: SxProps<Theme> = {
    fontSize: '1.5rem',
    color: '#333',
};

export const buttonBox: SxProps<Theme> = {
    marginTop: 2,
};

export const buttonStyles: SxProps<Theme> = {
    textTransform: "none",
    fontSize: "1rem",
    px: 3,
    backgroundColor: "#add8e6",
    color: "#fff",
    "&:hover": {
        backgroundColor: "#6cc4e0"
    },
    "&:disabled": {
        backgroundColor: "#ddd",
        color: "#888"
    },
};

export const dogGif: React.CSSProperties = {
    width: '200px',
    height: 'auto',
    borderRadius: '8px',
    marginTop: '16px',
};
