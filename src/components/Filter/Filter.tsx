import React from "react";
import { Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl } from "@mui/material";
import { formControlStyles, selectStyles, menuItemStyles } from "./Filter.styles";
interface FilterProps {
  label: string; 
  options: string[];
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ label, options, selectedValues, setSelectedValues }) => {
  const handleChange = (event: any) => {
    const { value } = event.target;
    setSelectedValues(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={formControlStyles}>
      <InputLabel id={`${label}-filter-label`}>{`Filter by ${label}`}</InputLabel>
      <Select
        labelId={`${label}-filter-label`}
        multiple
        value={selectedValues}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        sx={selectStyles}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} sx={menuItemStyles}>
            <Checkbox checked={selectedValues.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;
