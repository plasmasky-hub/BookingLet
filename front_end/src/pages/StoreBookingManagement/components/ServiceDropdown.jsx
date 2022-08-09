import React from "react";
import styled from "@emotion/styled";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const BookingManageCategory = styled.h3`
  font-size: 0.8rem;
  font-weight: 600;
  padding-right: 20px;
`;

const BookingManageDropdown = styled.div`
  min-width: 250px;
  width: 100%;
  height: 50px;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: baseline;
`;

export const ServiceDropdown = ({ resultOfOrders, orders1 }) => {
  const [service, setService] = React.useState("");
  const handleChange = (event) => {
    setService(event.target.value);
  };

  return (
    <BookingManageDropdown>
      <BookingManageCategory>Service</BookingManageCategory>
      {/* dropdown & content      */}
      <FormControl
        sx={{ minWidth: 200, background: "#fff", color: "#8E8E8E" }}
        size="small"
      >
        <InputLabel id="demo-simple-select-label">All</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={service}
          label="Service"
          onChange={handleChange}
        >
          {resultOfOrders.serviceInfoArr.map((e) => (
            <MenuItem value={e[0]}>{e[0]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </BookingManageDropdown>
  );
};
