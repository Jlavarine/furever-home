import React from "react";
import { Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl } from "@mui/material";

interface MultiSelectFilterProps {
  label: string; 
  options: string[];
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({ label, options, selectedValues, setSelectedValues }) => {
  const handleChange = (event: any) => {
    const { value } = event.target;
    setSelectedValues(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel id={`${label}-filter-label`}>{`Filter by ${label}`}</InputLabel>
      <Select
        labelId={`${label}-filter-label`}
        multiple
        value={selectedValues}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedValues.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectFilter;
