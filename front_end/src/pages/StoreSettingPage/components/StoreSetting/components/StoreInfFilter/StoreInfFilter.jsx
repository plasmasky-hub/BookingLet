import * as React from "react";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";

export default function StoreInfFilter() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const StoreName = styled.div`
    width: 84px;
    height: 20px;
    left: 184px;
    top: 250px;
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 5px;
  `;

  const StoreInfFilter = styled(Select)`
    width: 108px;
    height: 56px;
    background: #d9d9d9;
    border-radius: 5px;
    padding: 0;
  `;

  return (
    <div className="wrapper_filter">
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 108, marginLeft: -1, marginTop:-0.0001 }}
      >
        <StoreName>State</StoreName>
        <StoreInfFilter
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>NSW</MenuItem>
          <MenuItem value={20}>VIC</MenuItem>
          <MenuItem value={30}>SA</MenuItem>
          <MenuItem value={40}>TAS</MenuItem>
          <MenuItem value={50}>WA</MenuItem>
        </StoreInfFilter>
      </FormControl>
    </div>
  );
}
