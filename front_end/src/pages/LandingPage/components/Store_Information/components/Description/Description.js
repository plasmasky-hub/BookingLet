import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

export default function Description() {
  const [value, setValue] = React.useState("Controlled");

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  const DescriptionField = styled(TextField)`
    width: 397px;
    height: 152px;
    background: #d9d9d9;
    border-radius: 5px;
    margin-left: 300px;
    border: none;
  `;

  const Container = styled.div`
    margin-left: 90px;
  `;

  return (
    <Container>
      <DescriptionField
        id="filled-multiline-static"
        multiline
        rows={6}
        variant="filled"
        InputProps={{
          style: {
            width: "397px",
            height: "152px",
          },
          disableUnderline:true
        }}
      />
    </Container>
  );
}
