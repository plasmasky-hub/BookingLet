import * as React from "react";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";

export default function StoreInfFilter({
  citystate,Form,setForm
}) {
  const [state, setState] = React.useState(citystate);

  const handleChange = (event) => {
    setState(event.target.value);
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
    margin-bottom: 13px;
    margin-left: 15px;
  `;

  const Wrapper = styled.div`
    margin-top: 5px;
    margin-left: -15px;
  `;

  const StoreInfFilter = styled(Select)`
    width: 138px;
    height: 56px;
    background: #d9d9d9;
    border-radius: 5px;
    padding: 0;
    margin-left: 15px;
  `;

  return (
    <div className="wrapper_filter">
      <Wrapper
        variant="standard"
        sx={{ m: 1, minWidth: 108, marginLeft: -1, marginTop: -0.0001 }}
      >
        <StoreName>State</StoreName>
        <StoreInfFilter
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          // value={state}
          // defaultValue={citystate}
          // state={citystate}
          // value={state}
          // onChange={handleChange}
          onChange={(e) =>
            setForm({
              ...Form,
              postcode: e.target.value,
            })
          }
          label="state"
        >
          <MenuItem value="NSW">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>NSW</MenuItem>
          <MenuItem value={2}>VIC</MenuItem>
          <MenuItem value={3}>SA</MenuItem>
          <MenuItem value={4}>TAS</MenuItem>
          <MenuItem value={5}>WA</MenuItem>
          <MenuItem value={6}>NT</MenuItem>
          <MenuItem value={7}>ACT</MenuItem>
          <MenuItem value={8}>QSL</MenuItem>
        </StoreInfFilter>
      </Wrapper>
    </div>
  );
}
