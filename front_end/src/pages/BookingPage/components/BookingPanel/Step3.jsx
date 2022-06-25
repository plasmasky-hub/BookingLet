import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import styled from '@emotion/styled';
import StyledTextField from './StyledTextField';
import FlexWrapper from './FlexWrapper';
import Checkbox from '@mui/material/Checkbox';

const Title = styled.h5`
  font-size: 14px;
  text-align: left;
  margin: ${(props) => (props.FirstLine ? '30px 0 0 0' : '14px 0 0 0')};
  margin-bottom: ${(props) => (props.Input ? '14px' : '0')};
`;

const CheckboxWrapper = styled(FlexWrapper)`
  text-align: left;
  p {
    padding-top: 15px;
  }
`;
const Step3 = ({ FormData, setFormData, FakeData }) => {
  const date = FormData.date.toDateString();

  console.log(FormData);

  return (
    <>
      <Title FirstLine>Order Information</Title>
      <FlexWrapper>
        <p>
          {date} - {FormData.people} people - {FormData.service}
        </p>
        <CheckIcon className="icon" />
      </FlexWrapper>

      <Title>Time</Title>
      <FlexWrapper>
        <p>14:00 - 15:00</p>
        <CheckIcon className="icon" />
      </FlexWrapper>

      <Title Input>Mobile</Title>
      <StyledTextField
        value={FormData.mobile}
        onChange={(event) => {
          setFormData({ ...FormData, mobile: event.target.checked });
        }}
        variant="outlined"
        size="small"
        InputProps={{ style: { fontSize: 14 } }}
      />

      <Title Input>Note</Title>
      <StyledTextField
        value={FormData.note}
        onChange={(event) => {
          setFormData({ ...FormData, note: event.target.value });
        }}
        variant="outlined"
        multiline
        rows={4}
        placeholder="Add any additional note for your order"
        size="small"
        InputProps={{ style: { fontSize: 14 } }}
      />
      <CheckboxWrapper>
        <Checkbox
          checked={FormData.send}
          size="small"
          onChange={() => {
            setFormData({ ...FormData, send: !FormData.send });
          }}
        />
        <p>Please send me the email once the order is confirmed.</p>
      </CheckboxWrapper>
    </>
  );
};

export default Step3;
