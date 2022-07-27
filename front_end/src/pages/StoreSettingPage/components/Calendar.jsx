import React from 'react';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';
// import {useGetStoreQuery} from '../../../store/api/storeApi'


const CalendarWrapper = styled(Paper)`
  width: 613px;
  font-size: 30px !important;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeekBar = styled.div`
  background-color: lightgray;
  width: 489.16px;
  height: 30px;
  margin-left: 69.88px;
  margin-top: 60px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const DayOfWeek = styled.th`
  height: 30px;
  font-size: 14px;
  color: black;
  width: 69.88px;
  line-height: 30px;

  &:hover {
    background-color: #397CC2;
    color: white;
  }
`;



const Table = styled.table`
  border: 1px solid lightgray;
  border-collapse: collapse;
  text-align: center;
  font-size: 22px;
  width: 560px;
  table-layout: fixed;
`;


const TBody = styled.tbody`
`;

const TR = styled.tr`
  color: gray;
  font-size: 14px ;
  height: 27px;
`;

const TD = styled.td`
  border: 1px solid lightgray;

  &:hover {
    background-color: #397CC2;
    color: white;
  }
`;

const Popup = styled.div`
  display: ${props => props.rowIndex === 0 ? 'none' : ''};
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 5px rgba(0,0,0,0.35);

  font-size: 12px;
  width: 270px;
  height: 200px;
  position: absolute;
  margin-top: -350px;
  margin-left: ${props => props.rowIndex * 70 + 80}px;
  z-index: 9;
`;

const TopBar = styled.div`
  background-color: #EDEDED;
  height: 20px;
`;

const BodyContent = styled.div`
  margin-top: 5px;
  margin-left: 15px;
`;

const H4 = styled.h4`
  color: #D69636;
  font-size: 15px;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  margin-left: -20px;
`;

const Operation = styled.div`
  color: gray;
  font-size: 14px;
  padding: 3px 10px 2px 10px;
`;

const TimeInput = styled.input`
  width: 25px;
  margin-left: 2px;
  margin-right: 2px;
  border: 0.5px solid rgba(211,211,211, 0.5);
  border-radius: 4px;
`;

const SaveButton = styled.a`
  display:inline-block; 
  text-decoration: none;
  letter-spacing: 0.5px;
  padding: 5px 15px;
  cursor: pointer;
  color: white;
  background-color: #D69636;
  border-radius: 5px;
  margin-left: 178px;
  margin-top: 20px;

  &:hover {
    color: black;
  }
`;

const PopupCloseButton = styled.a`
  display:inline-block; 
  text-decoration: none;
  padding: 0px 6px;
  cursor: pointer;
  color: black;
  background-color: white;
  border-radius: 20px;
  margin-left: 240px;
  margin-top: 1px;
  font-weight: bold;

  &:hover {
    color: #D69636;
  }
`;

const headers = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const dbBusinessHours = {
  "Monday": [],
  "Tuesday": [
    1000,
    1005,
    1010,
    1015,
    1020,
    1025,
    1030,
    1035,
    1040,
    1045,
    1050,
    1055
  ],
  "Wednesday": [],
  "Thursday": [],
  "Friday": [],
  "Saturday": [
    1700,
    1705,
    1710,
    1715,
    1720,
    1725,
    1730,
    1735,
    1740,
    1745,
    1750,
    1755,
    1800,
    1805,
    1810,
    1815,
    1820,
    1825,
    1830,
    1835,
    1840,
    1845,
    1850,
    1855,
    1900,
    1905,
    1910,
    1915,
    1920,
    1925,
    1930,
    1935,
    1940,
    1945,
    1950,
    1955,
    2000,
    2005,
    2010,
    2015,
    2020,
    2025,
    2030,
    2035,
    2040,
    2045,
    2050,
    2055
  ],
  "Sunday": [
    1700,
    1705,
    1710,
    1715,
    1720,
    1725,
    1730,
    1735,
    1740,
    1745,
    1750,
    1755,
    1800,
    1805,
    1810,
    1815,
    1820,
    1825,
    1830,
    1835,
    1840,
    1845,
    1850,
    1855,
    1900,
    1905,
    1910,
    1915,
    1920,
    1925,
    1930,
    1935,
    1940,
    1945,
    1950,
    1955,
    2000,
    2005,
    2010,
    2015,
    2020,
    2025,
    2030,
    2035,
    2040,
    2045,
    2050,
    2055,
    1000,
    1005,
    1010,
    1015,
    1020,
    1025,
    1030,
    1035,
    1040,
    1045,
    1050,
    1055
  ]
}

const timePairArr = []
Object.keys(dbBusinessHours).forEach((key) => {
  let dateIndex = 0;
  switch (key) {
    case 'Monday': dateIndex = 1; break;
    case 'Tuesday': dateIndex = 2; break;
    case 'Wednesday': dateIndex = 3; break;
    case 'Thursday': dateIndex = 4; break;
    case 'Friday': dateIndex = 5; break;
    case 'Saturday': dateIndex = 6; break;
    case 'Sunday': dateIndex = 7; break;
    default: dateIndex = 0;
  };

  dbBusinessHours[key].map((element) => {
    if (dbBusinessHours[key].indexOf(element % 100 === 0 ? element - 45 : element - 5) === -1) {
      let endTime = null;
      let intervalTime = element;
      let intervalQty = 0;
      while (endTime === null) {
        if (dbBusinessHours[key].indexOf(intervalTime % 100 === 55 ? intervalTime + 45 : intervalTime + 5) === -1) {
          endTime = intervalTime;
        }
        intervalTime = intervalTime % 100 === 55 ? intervalTime + 45 : intervalTime + 5;
        intervalQty++;
      }

      timePairArr.push({
        date: dateIndex,
        startTime: element,
        endTime: endTime,
        intervalQty: intervalQty,
        startTimePx: (-621 + (element / 100) * 27 + (element % 100) * 0.45)
      })
    }
    return null;
  })
})



const formTimeSliceArr = [];
for (let i = 600; i <= 2200; i += 100) {
  formTimeSliceArr.push(i);
}

const formStructure = [
  ...formTimeSliceArr.map((element) => {
    return [`${element / 100 > 12 ? element / 100 - 12 : element / 100} ${element / (100) > 12 ? 'PM' : 'AM'}`, '', '', '', '', '', '', ''];
  })
]

const TimeTag = styled.div`
  position: absolute;
  font-size: ${props => props.head.intervalQty < 19 ? '11px' : '14px'};
  color: white;
  width : 67px;
  height: ${props => props.head.intervalQty * 2.25}px;
  border-radius: 3px;
  background-color: #D69636;
  box-shadow: 0px 4px 5px rgba(0,0,0,0.35);
  margin-left: ${props => props.head.date * 69.88 + 1}px;
  margin-top: ${props => props.head.startTimePx}px;

`;

const TimeInputZone = styled.div`
  
`;



class Excel extends React.Component {
  state = {
    currentFocusRow: 0,
    currentOperation: null
  }

  selectColumn = (index) => {
    this.setState({
      currentFocusRow: index,
      currentOperation: 0
    })
  }

  selectedOperation = (index) => {
    this.setState({
      currentOperation: index
    })
  }

  closePopup = () => {
    this.setState({
      currentFocusRow: 0
    })
    console.log(this.props.id)
  }

  openPopup = (head) => {
    this.setState({
      currentFocusRow: head.date,
      currentOperation: 1
    })
  }


  render() {
    //const {id} = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <WeekBar>
          {
            this.props.headers.map((head, index) =>
              <DayOfWeek style={{
                backgroundColor: (this.state.currentFocusRow === index + 1) ? '#397CC2' : '',
                color: (this.state.currentFocusRow === index + 1) ? 'white' : ''
              }} key={index}>{head}</DayOfWeek>)
          }
        </WeekBar>
        <Table>
          <TBody>
            {
              this.props.formStructure.map((row, index) => {
                return (<TR key={index}>
                  {
                    row.map((cell, index) => {
                      return <TD onClick={() => this.selectColumn(index)}>{cell}</TD>
                    })
                  }
                </TR>
                )
              })
            }
          </TBody>
        </Table>
        <Popup rowIndex={this.state.currentFocusRow}>
          <TopBar><PopupCloseButton onClick={this.closePopup}>x</PopupCloseButton></TopBar>
          <BodyContent>
            <H4>Edit business hour</H4>
            <Nav>
              {
                ['Create', 'Edit', 'Delete'].map((head, index) =>
                  <Operation style={{
                    backgroundColor: (this.state.currentOperation === index) ? '#F6EDE0' : '',
                    color: (this.state.currentOperation === index) ? '#D69636' : ''
                  }} onClick={() => this.selectedOperation(index)} key={index}>{head}</Operation>)
              }
            </Nav>
            <TimeInputZone className='TimeInputZone' style={{ 'margin-top': '10px' }}>
              <div>
                <span style={{ 'font-weight': '900', 'font-size': '12px', 'margin-right': '15px' }}>Start from</span>
                <TimeInput type="string"></TimeInput>
                <span style={{ 'font-weight': '600', 'font-size': '12px' }}>:</span>
                <TimeInput type="string"></TimeInput>
              </div>
              <div>
                <span style={{ 'font-weight': '900', 'font-size': '12px', 'margin-right': '15px' }}>To</span>
                <TimeInput type="string"></TimeInput>
                <span style={{ 'font-weight': '600', 'font-size': '12px' }}>:</span>
                <TimeInput type="string"></TimeInput>
              </div>
            </TimeInputZone>
            <div>
              <SaveButton>Save</SaveButton>
            </div>
          </BodyContent>
        </Popup>
        <div>
          {
            timePairArr.map((head, index) =>
              <TimeTag head={head} onClick={() => this.openPopup(head)}>{`${head.startTime >= 1300 ? Math.floor(head.startTime / 100) - 12 + ':' +
                (head.startTime % (100) < 10 ? '0' + head.startTime % (100) : head.startTime % (100))
                + ' PM' : Math.floor(head.startTime / 100) + ':' + (head.startTime % (100) < 10 ? '0'
                  + head.startTime % (100) : head.startTime % (100)) + ' AM'} 
              - ${head.endTime >= 1300 ? Math.floor(head.endTime / 100) - 12 + ':'
                  + (head.endTime % (100) < 10 ? '0' + head.endTime % (100) : head.endTime % (100))
                  + ' PM' : Math.floor(head.endTime / 100) + ':' + (head.endTime % (100) < 10 ? '0'
                    + head.endTime % (100) : head.endTime % (100)) + ' AM'}`}</TimeTag>
            )
          }
        </div>
      </div>
    );
  }
}

const Calendar = () => {
  //const {id} = this.props;
  return <CalendarWrapper><Excel headers={headers} formStructure={formStructure} /></CalendarWrapper>;
};

export default Calendar;
