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

export const ServiceDropdown = (props) => {
  const options = props.options;
  const currentOption = props.currentOption;
  const onChangeEvent = props.onChangeEvent;
  if (!options) return <>no services</>;
  if (options === "") return <>no services</>;

  return (
    <>
      {options && (
        <>
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
                value={currentOption}
                label="Service"
                onChange={(e) => onChangeEvent(e)}
              >
                {options.map((option) => (
                  <MenuItem value={option.id} key={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </BookingManageDropdown>
        </>
      )}
    </>
  );
};
