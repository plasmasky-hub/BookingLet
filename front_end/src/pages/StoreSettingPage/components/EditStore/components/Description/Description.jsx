import * as React from "react";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

export default function Description(
  {descrip,Form,setForm}
) {
  // const [value, setValue] = React.useState("Controlled");

  const DescriptionField = styled(TextField)`
    width: 397px;
    height: 152px;
    background: #d9d9d9;
    border-radius: 5px;
    margin-left: 300px;
    border: none;
  `;

  const DescriptionContainer = styled.div`
    margin-left: 90px;
  `;

  return (
    <DescriptionContainer>
      <DescriptionField
        id="filled-multiline-static"
        multiline
        rows={6}
        variant="filled"
        defaultValue={descrip}
        onChange={(e) =>
          setForm({
            ...Form,
            descrip: e.target.value,
          })
        }
        InputProps={{
          style: {
            width: "397px",
            height: "152px",
          },
          disableUnderline:true
        }}
      />
    </DescriptionContainer>
  );
}
