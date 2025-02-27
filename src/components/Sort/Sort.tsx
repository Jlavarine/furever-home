import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface SortProps {
  label: string;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
}

const Sort: React.FC<SortProps> = ({ label, selectedSort, setSelectedSort }) => {
  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id={`${label}-sort-label`}>{`Sort by ${label === 'asc' ? 'Ascending' : 'Descending'}`}</InputLabel>
      <Select
        labelId={`${label}-sort-label`}
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
      >
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
