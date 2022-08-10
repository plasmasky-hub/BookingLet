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

export const BasicPagination = () => {
  return (
    <StyledPagination>
      <Stack spacing={2}>
        <Pagination count={10} />
      </Stack>
    </StyledPagination>
  );
};
