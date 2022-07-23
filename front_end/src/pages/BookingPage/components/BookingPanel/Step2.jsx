import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import styled from '@emotion/styled';
import { MenuItem } from '@mui/material';
import StyledTextField from './StyledTextField';
import FlexWrapper from './FlexWrapper';
// import 'antd/dist/antd.css';
import { TimePicker } from 'antd';
import {
  useGetBusinessTimeQuery,
  useGetChartDateQuery,
} from '../../../../store/api/calendarApi';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

const Title = styled.p`
  font-size: 14px;
  text-align: left;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ColorIndication = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  div {
    display: flex;
    align-items: center;
    gap: 5px;
    span {
      font-size: 14px;
    }
  }
`;

const ColorBox = styled.div`
  width: 14px;
  height: 14px;
  background-color: ${(props) => props.color};
`;

const Step2 = ({ FormData, setFormData }) => {
  const bookDate = FormData.date.toDateString().substring(4);
  const durationInfo = FormData.service.duration;

  const date = `${FormData.date.getFullYear()}-${
    FormData.date.getMonth() + 1 < 10
      ? `0${FormData.date.getMonth() + 1}`
      : FormData.date.getMonth() + 1
  }-${FormData.date.getDate()}`;

  /*******************************************************/
  //Fetch Data
  /*******************************************************/

  const { data, isSuccess } = useGetBusinessTimeQuery(
    `date=${date}&serviceInfoId=${FormData.service.id}`
  );

  const { data: chartData, isSuccess: success } = useGetChartDateQuery();

  const dbBusinessTimeArr = isSuccess
    ? data.businessTimeArr
        .filter((e) => e.availability === true)
        .map((e) => e.timeSlice)
    : null;

  /*******************************************************/
  //Bar Chart
  /*******************************************************/

  let color, label, stateData;
  if (success) {
    color = chartData.colorArr.map((e) =>
      e === true
        ? 'rgba(75,192,192,1)'
        : e === false
        ? 'rgba(153, 39, 61, 0.8)'
        : 'rgba(229, 221, 221, 0.8)'
    );
    label = chartData.labelArr.map((el) => {
      return el < 10
        ? `00:0${el}`
        : el < 60
        ? `00:${el}`
        : el < 1000
        ? `0${Math.floor(el / 100)}:${el.toString().substring(1)}`
        : `${Math.floor(el / 100)}:${el.toString().substring(2)}`;
    });
    stateData = chartData.dataArr;
  }

  const chart = {
    labels: label,
    datasets: [
      {
        label: '',
        backgroundColor: color,
        data: stateData,
      },
    ],
  };
  const options = { plugins: { legend: { display: false } } };

  /*******************************************************/
  //End Time
  /*******************************************************/

  let startHour, startMinute;
  if (FormData.startTime) {
    startHour = FormData.startTime._d.getHours();
    startMinute = FormData.startTime._d.getMinutes();
  }

  const showEndTime = (hour, minute, duration) => {
    const m = minute + duration * 60;
    return m % 60 < 10
      ? `${hour + Math.floor(m / 60)}:0${m % 60}`
      : `${hour + Math.floor(m / 60)}:${m % 60}`;
  };

  const endTime = showEndTime(startHour, startMinute, FormData.duration);

  /*******************************************************/
  //Disabled Time
  /*******************************************************/

  const getDisabledTime = () => {
    let businessTimeArr;

    if (durationInfo.durationType === 'unlimited') {
      businessTimeArr = dbBusinessTimeArr;
    }

    if (durationInfo.durationType === 'changeable' || 'fixed') {
      const getEndTime = (start, duration) => {
        const m = (start % 100) + duration * 60;
        return (
          Math.floor(start / 100) * 100 + Math.floor(m / 60) * 100 + (m % 60)
        );
      };

      // need to improve or delete
      const duration =
        durationInfo.durationType === 'fixed'
          ? durationInfo.fixedDuration
          : FormData.duration;

      const notShowTimeArr = dbBusinessTimeArr.map((startTime) => {
        const endTime = getEndTime(startTime, duration);
        let a;
        for (let i = startTime; i < endTime; i += 5) {
          if (i % 100 < 60 && !dbBusinessTimeArr.includes(i)) {
            a = startTime;
            break;
          }
        }
        return a;
      });

      businessTimeArr = dbBusinessTimeArr.filter((e) => {
        return !notShowTimeArr.includes(e);
      });
    }

    let wholeDayTimeSliceArr = [];
    for (let i = 0; i <= 2355; i += 5) {
      if (i % 100 < 60) {
        wholeDayTimeSliceArr.push(i);
      }
    }

    let filteredDayTimeSliceArr = wholeDayTimeSliceArr.filter((el) => {
      return !businessTimeArr.includes(el);
    });

    filteredDayTimeSliceArr = filteredDayTimeSliceArr.map((element) => {
      let newElement = null;

      element < 10
        ? (newElement = `00:0${element}`)
        : element < 60
        ? (newElement = `00:${element}`)
        : element < 1000
        ? (newElement = `0${Math.floor(element / 100)}:${element
            .toString()
            .substring(1)}`)
        : (newElement = `${Math.floor(element / 100)}:${element
            .toString()
            .substring(2)}`);

      return newElement;
    });
    return filteredDayTimeSliceArr.map((el) => el.split(':').map(Number));
  };

  const getDisableHour = () => {
    const hourArr = getDisabledTime().map((el) => el[0]);
    const count = hourArr.reduce((accumulator, value) => {
      return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
    }, {});

    return Object.keys(count)
      .filter((e) => count[e] === 12)
      .map(Number);
  };

  const disabledTimeArr = isSuccess ? getDisabledTime() : null;
  const disabledHourArr = isSuccess ? getDisableHour() : null;

  const disabledTime = () => ({
    disabledHours: () => disabledHourArr,
    disabledMinutes: (hour) => {
      return disabledTimeArr.map((el) => (hour === el[0] ? el[1] : null));
    },
  });

  /*******************************************************/
  //Duration
  /*******************************************************/

  const getDurationArr = () => {
    let changeableArr = [];
    let minimum, maximum;
    if (durationInfo.durationType === 'changeable') {
      minimum = durationInfo.changeableDuration.minimum;
      maximum = durationInfo.changeableDuration.maximum;
      for (let i = minimum; i <= maximum; i += 0.25) changeableArr.push(i);

      if (FormData.startTime) {
        changeableArr = changeableArr.filter((el) => {
          const endTimeStr = showEndTime(startHour, startMinute, el);
          const endTimeNum = parseInt(endTimeStr.replace(':', ''));
          return dbBusinessTimeArr.includes(endTimeNum) || el === minimum;
        });
      }
    }

    return durationInfo.durationType === 'unlimited'
      ? ['unlimited']
      : durationInfo.durationType === 'fixed'
      ? [durationInfo.fixedDuration]
      : durationInfo.durationType === 'changeable'
      ? changeableArr
      : null;
  };

  console.log();

  return (
    <>
      <Title FirstLine>Order Information</Title>
      <FlexWrapper P2>
        <p>
          {bookDate} - {FormData.people} people - {FormData.service.name}
        </p>
        <CheckIcon className="icon" />
      </FlexWrapper>

      <TimePicker
        format="HH:mm"
        disabledTime={disabledTime}
        minuteStep={5}
        value={FormData.startTime}
        onChange={(time) => setFormData({ ...FormData, startTime: time })}
        hideDisabledOptions
      />

      <StyledTextField
        select
        label="Duration"
        variant="standard"
        value={FormData.duration}
        onChange={(event) => {
          setFormData({ ...FormData, duration: event.target.value });
        }}
      >
        {isSuccess
          ? getDurationArr().map((e) => (
              <MenuItem key={e} value={e} className="menuItem">
                {e !== 'unlimited'
                  ? `${Math.floor(e / 1)} hour ${
                      (e % 1) * 60 === 0 ? '' : (e % 1) * 60 + ' minutes'
                    }`
                  : e}
              </MenuItem>
            ))
          : null}
      </StyledTextField>

      <StyledTextField
        label="End Time"
        variant="standard"
        value={endTime}
        InputProps={{
          readOnly: true,
        }}
      />

      <ColorIndication>
        <div>
          <ColorBox color="rgba(75, 192, 192, 1)"></ColorBox>
          <span>Available</span>
        </div>
        <div>
          <ColorBox color="rgba(153, 39, 61, 0.8)"></ColorBox>
          <span>Full</span>
        </div>
        <div>
          <ColorBox color="rgba(229, 221, 221, 0.8)"></ColorBox>
          <span>Not Open</span>
        </div>
      </ColorIndication>

      <Bar data={chart} options={options} />
    </>
  );
};

export default Step2;
