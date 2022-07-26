import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styled from '@emotion/styled';
import { useCreateOrderQuery } from '../../../../store/api/orderApi';
import ErrorIcon from '@mui/icons-material/Error';

const CheckIconWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CheckIcon = styled(CheckCircleIcon)`
  font-size: 70px;
  color: #7b8b6f;
  margin-top: 10px;
  display: flex;
`;

const FailedIcon = styled(ErrorIcon)`
  font-size: 70px;
  color: #d76d6d;
  margin-top: 10px;
  display: flex;
`;

const Title = styled.h5`
  font-size: 15px;
  text-align: left;
  margin: 5px 0 30px 0;
  text-align: center;
`;

const Text = styled.div`
  text-align: left;
  font-size: 14px;
  width: 90%;
  margin: 50px auto 90px auto;
  letter-spacing: 0.3px;
  line-height: 18px;
`;

const Link = styled.a`
  cursor: pointer;
  color: #7b8b6f;
  font-weight: 600;
`;
const Step5 = ({ FormData, setFormData }) => {
  const startTime = parseInt(FormData.startTimeStr.replace(':', ''));
  const endTime = parseInt(FormData.endTime.replace(':', ''));

  const date = `${FormData.date.getFullYear()}-${
    FormData.date.getMonth() + 1 < 10
      ? `0${FormData.date.getMonth() + 1}`
      : FormData.date.getMonth() + 1
  }-${FormData.date.getDate()}`;

  const order = {
    peopleNumber: FormData.people,
    orderTime: { date: date, startTime: startTime, endTime: endTime },
    userId: '62d6bb04a4675b9cb600f21b',
    serviceInfoId: FormData.service.id,
    tel: FormData.mobile,
    optionInfo: FormData.note,
  };

  const { data, isSuccess, error } = useCreateOrderQuery(order);
  const status = isSuccess ? data.decision.permission : error;
  const message = isSuccess && data.decision.message;

  return (
    <>
      <CheckIconWrapper>
        {status ? <CheckIcon /> : <FailedIcon />}
      </CheckIconWrapper>
      <Title>
        {status
          ? 'Your requset has been sent successfully'
          : 'Your requset failed'}
      </Title>

      {status ? (
        <Text>
          Congratulations. Your booking request has been sent to the business
          owner. The status of your booking could be checked in{' '}
          <Link href="#">My booking</Link>
        </Text>
      ) : (
        <Text>Sorry! {message}. Please try again.</Text>
      )}
    </>
  );
};

export default Step5;
