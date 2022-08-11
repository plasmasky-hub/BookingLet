import React from "react";
import styled from "@emotion/styled";
import { Pagination, Stack } from "@mui/material";

const StyledPagination = styled.div`
  min-width: 1000px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BasicPagination = (props) => {
  const pageQty = props.pageQty;
  const handlePageClick = props.handlePageClick;

  return (
    <StyledPagination>
      <Stack spacing={2}>
        <Pagination count={pageQty} onChange={handlePageClick} />
      </Stack>
    </StyledPagination>
  );
};
