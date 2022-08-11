import * as React from "react";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";

export default function CategoryFilter() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const StoreName = styled.div`
    width: 84px;
    height: 20px;
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 10px;
  `;

  const CategoryContainer = styled.div`
    margin-left: -5px;
  `;

  const SelectStoreInf = styled(Select)`
    width: 397px;
    height: 34px;
    background: #d9d9d9;
    border-radius: 5px;
  `;

  return (
    <CategoryContainer>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 108, marginLeft: -1, marginTop:2, /*marginLeft:11.5*/ }}
      >
        <StoreName>Category</StoreName>
        <SelectStoreInf
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Dining</MenuItem>
        </SelectStoreInf>
      </FormControl>
    </CategoryContainer>
  );
}
