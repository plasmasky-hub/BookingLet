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

export const ServiceDropdown = ({ data }) => {
  const [service, setService] = React.useState("");
  const handleChange = (event) => {
    setService(event.target.value);
  };

  if (!data) return <>no services</>;
  if (data === "") return <>no services</>;

  return (
    <>
      {data && (
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
                value={service}
                label="Service"
                onChange={handleChange}
              >
                {data.serviceInfos.map((service) => (
                  <MenuItem value={service.name} key={service.id}>
                    {service.name}
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
