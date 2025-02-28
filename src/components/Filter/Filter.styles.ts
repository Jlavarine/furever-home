import { SxProps, Theme } from "@mui/material";

export const formControlStyles: SxProps<Theme> = {
    width: 300,
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
