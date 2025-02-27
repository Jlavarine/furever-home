import React from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { buttonGroupStyles, buttonStyles } from "./Pagination.styles";

interface PaginationProps {
  prevPage: string;
  nextPage: string;
  getToPage: (page: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({ prevPage, nextPage, getToPage }) => {
  return (
    <Box sx={buttonGroupStyles}>
      <ButtonGroup variant="contained" color="primary">
        <Button onClick={() => getToPage(prevPage)} disabled={!prevPage} startIcon={<ArrowBack />} sx={buttonStyles}>
          Previous
        </Button>
        <Button onClick={() => getToPage(nextPage)} disabled={!nextPage} endIcon={<ArrowForward />} sx={buttonStyles}>
          Next
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Pagination;
