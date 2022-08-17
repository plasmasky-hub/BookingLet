import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MenuItem } from '@mui/material';
import StyledTextField from './StyledTextField';
import { useGetAllServiceInfosQuery } from '../../../../store/api/serviceInfoApi';
import styled from '@emotion/styled';

const Title = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Step1 = ({ FormData, setFormData, id }) => {
  const {
    data: services,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllServiceInfosQuery(id);

  const week = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const weekDay = week[FormData.date.getDay()];
  const filteredService = isSuccess
    ? services.filter((el) => {
        let c;
        const a = Object.entries(el.calendarTemplate);
        a.map((b) => {
          if (b[0] === weekDay && b[1].length > 0) c = true;
          return c;
        });
        return c === true;
      })
    : null;

  const peopleOption = () => {
    if (FormData.service) {
      const max = FormData.service.maxPersonPerSection;
      const option = [];
      for (let i = 1; i <= max; i++) {
        option.push(
          <MenuItem key={i} value={i} className="menuItem">
            {i} person
          </MenuItem>
        );
      }
      return option;
    }
  };

  return (
    <>
      <Title>Date</Title>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={FormData.date}
          onChange={(newValue) => {
            setFormData({ ...FormData, date: newValue });
          }}
          renderInput={(params) => (
            <StyledTextField {...params} variant="standard" />
          )}
        />
      </LocalizationProvider>

      {isError && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <>
          {filteredService.length > 0 || (
            <p style={{ color: '#d76d6d' }}>Please choose another day!</p>
          )}
          <Title>Service</Title>
          <StyledTextField
            select
            value={FormData.service || ''}
            onChange={(event) => {
              setFormData({ ...FormData, service: event.target.value });
            }}
            variant="standard"
            p1="true"
          >
            {filteredService.length > 0 ? (
              filteredService.map((service) => (
                <MenuItem key={service.id} value={service} className="menuItem">
                  {`${service.name}(max ${service.maxPersonPerSection} ppl)`}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" className="menuItem"></MenuItem>
            )}
          </StyledTextField>
          <Title>Number Of People</Title>
          <StyledTextField
            select
            value={FormData.people}
            onChange={(event) => {
              setFormData({
                ...FormData,
                people: event.target.value,
              });
            }}
            variant="standard"
            p1="true"
          >
            {peopleOption() || (
              <MenuItem value="" className="menuItem"></MenuItem>
            )}
          </StyledTextField>
        </>
      )}
    </>
  );
};

export default Step1;
