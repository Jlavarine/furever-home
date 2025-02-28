import { SxProps, Theme } from "@mui/material";

export const sortContainer: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: 200,
};

export const formControlStyles: SxProps<Theme> = {
    width: "100%",
};

export const selectStyles: SxProps<Theme> = {
    backgroundColor: "#e6f7ff",  
    "&:hover": {
        backgroundColor: "#d4efff",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#1976d2",   
    },
};

export const menuItemStyles: SxProps<Theme> = {
    "&.Mui-selected": {
        backgroundColor: "#add8e6",
        "&:hover": {
            backgroundColor: "#6cc4e0",
        },
    },
};
