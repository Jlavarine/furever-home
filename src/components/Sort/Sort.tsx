import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

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
    <Box display="flex" flexDirection="column" gap={2} sx={{ width: 200 }}>
      <FormControl>
        <InputLabel id="sort-field-label">Sort By</InputLabel>
        <Select
          labelId="sort-field-label"
          value={selectedSortField}
          onChange={(e) => setSelectedSortField(e.target.value)}
        >
          <MenuItem value="breed">Breed</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="age">Age</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="sort-order-label">Order</InputLabel>
        <Select
          labelId="sort-order-label"
          value={selectedSortOrder}
          onChange={(e) => setSelectedSortOrder(e.target.value)}
        >
          <MenuItem value="asc">{isAlphabetical ? "A - Z" : "Ascending"}</MenuItem>
          <MenuItem value="desc">{isAlphabetical ? "Z - A" : "Descending"}</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
};

export default Sort;
