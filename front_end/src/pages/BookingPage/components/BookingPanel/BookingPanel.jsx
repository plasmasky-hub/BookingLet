import { Paper } from '@mui/material';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import ForwardButton from './ForwardButton';
import BackButton from './BackButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

const PanelWrapper = styled(Paper)`
  width: 392px;
  text-align: left;
  box-sizing: border-box;
  padding: 25px 40px 25px 40px;
  h2 {
    font-size: 20px;
    text-align: center;
  }
`;

const Forms = [Step1, Step2, Step3, Step4, Step5];

const FlexWrapper = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
`;

const BookingPanel = ({ id }) => {
  const [step, setStep] = useState(0);

  const Display = Forms[step];

  const [FormData, setFormData] = useState({
    date: new Date(),
    people: 1,
    service: '',
    duration: 1,
    mobile: '',
    note: '',
    name: 'Seven',
    email: 'helloworld@gmail.com',
    send: false,
    startTime: '',
    endTime: '',
  });

  const IconWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 9px;
    .first {
      color: #7b8b6f;
    }
    .second {
      color: ${step > 0 ? '#7b8b6f' : '#a4a4a4'};
    }
    .third {
      color: ${step > 1 ? '#7b8b6f' : '#a4a4a4'};
    }
    .fourth {
      color: ${step > 2 ? '#7b8b6f' : '#a4a4a4'};
    }
  `;

  const StepBar = styled.div`
    height: 2px;
    background-color: #7b8b6f;
    margin-bottom: 18px;
    width: ${step === 0
      ? '25%'
      : step === 1
      ? '50%'
      : step === 2
      ? '75%'
      : '100%'};
    border-bottom: 1px solid #a4a4a4;
  `;

  return (
    <PanelWrapper>
      <h2>Book Your Experience</h2>
      {step === 4 ? null : (
        <header>
          <IconWrapper>
            <EditOutlinedIcon className="first" />
            <AccessTimeOutlinedIcon className="second" />
            <PersonOutlineOutlinedIcon className="third" />
            <CheckCircleOutlinedIcon className="fourth" />
          </IconWrapper>
          <StepBar></StepBar>
        </header>
      )}

      <form style={{ marginBottom: '25px' }}>
        <Display FormData={FormData} setFormData={setFormData} id={id} />
      </form>
      <FlexWrapper>
        <BackButton step={step} setStep={setStep} Forms={Forms} />
        <ForwardButton step={step} setStep={setStep} Forms={Forms} />
      </FlexWrapper>
    </PanelWrapper>
  );
};

export default BookingPanel;
