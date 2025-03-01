import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { sortContainer, formControlStyles, selectStyles, menuItemStyles } from "./Sort.styles";

interface SortProps {
  selectedSortField: string;
  setSelectedSortField: (field: string) => void;
  selectedSortOrder: string;
  setSelectedSortOrder: (order: string) => void;
}

const Sort: React.FC<SortProps> = ({
  selectedSortField,
  setSelectedSortField,
  selectedSortOrder,
  setSelectedSortOrder,
}) => {
  const isAlphabetical = selectedSortField === "breed" || selectedSortField === "name";

  return (
    <Box sx={sortContainer}>
      <FormControl sx={formControlStyles}>
        <InputLabel id="sort-field-label">Sort By</InputLabel>
        <Select
          labelId="sort-field-label"
          aria-label="Sort by field"
          value={selectedSortField}
          onChange={(e) => setSelectedSortField(e.target.value)}
          sx={selectStyles}
        >
          <MenuItem value="breed" sx={menuItemStyles}>Breed</MenuItem>
          <MenuItem value="name" sx={menuItemStyles}>Name</MenuItem>
          <MenuItem value="age" sx={menuItemStyles}>Age</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="sort-order-label">Order</InputLabel>
        <Select
          labelId="sort-order-label"
          aria-label="Sort by order"
          value={selectedSortOrder}
          onChange={(e) => setSelectedSortOrder(e.target.value)}
          sx={selectStyles}
        >
          <MenuItem value="asc" sx={menuItemStyles}>{isAlphabetical ? "A - Z" : "Ascending"}</MenuItem>
          <MenuItem value="desc" sx={menuItemStyles}>{isAlphabetical ? "Z - A" : "Descending"}</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
};

export default Sort;
