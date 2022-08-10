import React from "react";
import styled from "@emotion/styled";
import { Pagination, Stack } from "@mui/material";

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
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
