import { React, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { useGetServiceInfoQuery } from '../../../store/api/serviceInfoApi';
import { useAddCalendarTimeByIdMutation, useDeleteCalendarTimeByIdMutation, useUpdateCalendarTimeByIdMutation, useSyncStoreCalendarToServiceMutation } from '../../../store/api/calendarApi';


const CalendarWrapper = styled(Paper)`
  width: 613px;
  font-size: 30px !important;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  margin-left: 20px;
  
`;

const WeekBar = styled.div`
  background-color: lightgray;
  width: 489.16px;
  height: 30px;
  margin-left: 69.88px;
  margin-top: 30px;
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
  margin-left: ${props => props.rowIndex * 70 - 280}px;
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
  margin-top: 15px;

  &:hover {
    color: black;
  }
`;
const DeleteButton = styled.a`
  display:inline-block; 
  text-decoration: none;
  letter-spacing: 0.5px;
  padding: 5px 10px;
  cursor: pointer;
  color: white;
  background-color: #E27777;
  border-radius: 5px;
  margin-left: 173px;
  margin-top: -4px;

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
  font-size: ${props => props.head.intervalQty < 19 ? '11px' : '13px'};
  color: white;
  width : 67px;
  height: ${props => props.head.intervalQty * 2.25}px;
  border-radius: 3px;
  background-color: ${props => props.head.date % 4 < 1 ? '#D69636' :
        props => props.head.date % 4 < 2 ? '#9AA88F' : props => props.head.date % 4 < 3 ? '#D18888' : '#DF75C8'};
  box-shadow: 0px 4px 5px rgba(0,0,0,0.35);
  margin-left: ${props => props.head.date * 69.88 + 1}px;
  margin-top: ${props => props.head.startTimePx}px;

  ${props => props.isAnimation ? `
    animation-duration: 2s;
    animation-name: slideleft;
    @keyframes slideleft {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    ` : ''
    }


  &:hover {
    background-color: rgba(57, 124,	194, 0.7);
  };
`;

const TimeInputZone = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const DeleteInfoZone = styled.div`
  font-weight: bold;
  padding: 5px;
`;

const SyncButton = styled.a`
  position: absolute;
  display:inline-block; 
  text-decoration: none;
  padding: 0px 14px;
  box-shadow: 0px 2px 2px rgba(0,0,0,0.35);
  cursor: pointer;
  color: white;
  background-color: rgba(57, 124,	194, 0.8);
  border-radius: 20px;
  margin-left: 330px;
  margin-top: -25px;
  font-size: 14px;

  &:hover {
    color: white;
    background-color: #D18888;
  }
`;


const Excel = (props) => {
    const { id, storeId } = props;

    const { data: serviceData, isSuccess } = useGetServiceInfoQuery(id);  // id试用62d5579230f835c4513d6c52
    let dbCalendarTemplate = isSuccess && serviceData.calendarTemplate;
    const [AddStoreBusinessTime] = useAddCalendarTimeByIdMutation();
    const [DeleteCalendarTime] = useDeleteCalendarTimeByIdMutation();
    const [SyncStoreCalendarToService] = useSyncStoreCalendarToServiceMutation();
    const [UpdateCalendarTime] = useUpdateCalendarTimeByIdMutation();

    let calendarTimeSliceObj = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [] };
    Object.keys(dbCalendarTemplate).forEach((key) => {
        let dayTimeSliceArr = dbCalendarTemplate[key].map(element => {
            return element.timeSlice
        })
        calendarTimeSliceObj[key].push(...dayTimeSliceArr)
    })

    const [currentFocusRow, setCurrentFocusRow] = useState(0);
    const [currentOperation, setCurrentOperation] = useState(null);
    const [createTime, setCreateTime] = useState({ startTimeHour: '', startTimeMinute: '', endTimeHour: '', endTimeMinute: '' });
    const [timeDelete, setTimeDelete] = useState(false);
    const [timeTagIndex, setTimeTagIndex] = useState(-1);
    const [openHourBefore, setOpenHourBefore] = useState(null);
    const [closingHourBefore, setClosingHourBefore] = useState(null);
    const [animationEnable, setAnimationEnable] = useState(false);


    const selectColumn = (index) => {
        setCurrentFocusRow(index);
        setCurrentOperation(0);
    }

    const selectedOperation = (index) => {
        if (currentOperation === 0) { setCurrentOperation(0) };
        if ((currentOperation === 1 || currentOperation === 2) && index !== 0) { setCurrentOperation(index) };
    }

    const closePopup = () => {
        setCurrentFocusRow(0);
        setCreateTime({ startTimeHour: '', startTimeMinute: '', endTimeHour: '', endTimeMinute: '' });
        setTimeDelete(false);
        setTimeTagIndex(-1);
    }

    const openPopup = (head, index) => {
        setCurrentFocusRow(head.date);
        setCurrentOperation(1);
        setTimeTagIndex(index);
        setOpenHourBefore(head.startTime);
        setClosingHourBefore(head.endTime);

        head.timeTagIndex = index;
        head.endTime = (head.endTime + 5) % 100 === 60 ? head.endTime + 45 : head.endTime + 5;

        setCreateTime({
            ...createTime,
            startTimeHour: (Math.floor(head.startTime / 100) + ''),
            startTimeMinute: (head.startTime % 100 < 10 ? '0' + head.startTime % 100 : head.startTime % 100 + ''),
            endTimeHour: (Math.floor(head.endTime / 100) + ''),
            endTimeMinute: (head.endTime % 100 < 10 ? '0' + head.endTime % 100 : head.endTime % 100 + '')
        });
    }

    const submitTime = async () => {
        const regHour = /^[012]?\d$/;
        const regMinute = /^[012345][05]$/;
        if (!regHour.test(createTime.startTimeHour) || !regHour.test(createTime.endTimeHour)) {
            return toast.error('Please input correct hours (6:00 - 22:55)!');
        }

        if (!regMinute.test(createTime.startTimeMinute) || !regMinute.test(createTime.endTimeMinute)) {
            return toast.error('Please input correct minutes. Minimum resolution must be 5 minutes!');
        }

        let startTimeHourNum = parseInt(createTime.startTimeHour);
        let endTimeHourNum = parseInt(createTime.endTimeHour);
        let startTimeMinuteNum = parseInt(createTime.startTimeMinute);
        let endTimeMinuteNum = parseInt(createTime.endTimeMinute);

        if (startTimeHourNum > 22 || startTimeHourNum < 6 || endTimeHourNum < 6 || endTimeHourNum > 22
            || startTimeMinuteNum > 59 || startTimeMinuteNum < 0 || endTimeMinuteNum > 59 || endTimeMinuteNum < 0) {
            return toast.error('Business Time must in [6:00 AM - 9:55 PM (22:55)] !');
        }

        const startTime = createTime.startTimeHour + createTime.startTimeMinute;
        const endTime = createTime.endTimeHour + createTime.endTimeMinute;

        let startTimeNum = parseInt(startTime);
        let endTimeNum = parseInt(endTime);
        if (!(startTimeNum < endTimeNum)) {
            return toast.error('End time must be later than start time !');
        }

        let dayInWeek = null;
        switch (currentFocusRow) {
            case 1: dayInWeek = "Monday"; break;
            case 2: dayInWeek = "Tuesday"; break;
            case 3: dayInWeek = "Wednesday"; break;
            case 4: dayInWeek = "Thursday"; break;
            case 5: dayInWeek = "Friday"; break;
            case 6: dayInWeek = "Saturday"; break;
            case 7: dayInWeek = "Sunday"; break;
            default: dayInWeek = "mistake";
        }

        const bodyObj = {
            id: id,
            dayOfWeek: dayInWeek,
            openHour: startTime,
            closingHour: endTime
        }

        if (currentOperation === 1) {
            editTime(id, dayInWeek, startTime, endTime);
            return;
        }

        const resultOfAdd = await AddStoreBusinessTime(bodyObj);
        setCreateTime({ startTimeHour: '', startTimeMinute: '', endTimeHour: '', endTimeMinute: '' });
        if (resultOfAdd.data.Error !== undefined) {
            toast.error(resultOfAdd.data.Error)
        } else if (resultOfAdd.data.synchronizationUpdate > 0) {
            toast.success(`Synchronization: booking records in ${resultOfAdd.data.synchronizationUpdate} weeks updated.`)
        };
        setCurrentFocusRow(0);
        setTimeTagIndex(-1);
        setTimeDelete(false);
    }

    //logic
    const timePairArr = []
    Object.keys(calendarTimeSliceObj).forEach((key) => {
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

        calendarTimeSliceObj[key].map((element) => {
            if (calendarTimeSliceObj[key].indexOf(element % 100 === 0 ? element - 45 : element - 5) === -1) {
                let endTime = null;
                let intervalTime = element;
                let intervalQty = 0;
                while (endTime === null) {
                    if (calendarTimeSliceObj[key].indexOf(intervalTime % 100 === 55 ? intervalTime + 45 : intervalTime + 5) === -1) {
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
                    startTimePx: (-621 + Math.floor(element / 100) * 27 + (element % 100) * 0.45)
                })
            }
            return element;
        })

    })


    const editTime = async (id, dayInWeek, startTime, endTime) => {
        const bodyObj = {
            id: id,
            dayOfWeek: dayInWeek,
            openHourBefore: openHourBefore.toString(),
            closingHourBefore: (closingHourBefore % 100 === 55 ? closingHourBefore + 45 : closingHourBefore + 5).toString(),
            openHourAfter: startTime,
            closingHourAfter: endTime
        }

        let resultOfEdit = await UpdateCalendarTime(bodyObj);
        if (resultOfEdit.data.Error !== undefined) {
            toast.error(resultOfEdit.data.Error);
        } else if (resultOfEdit.data.synchronizationUpdate > 0) {
            toast.success(`Synchronization: booking records in ${resultOfEdit.data.synchronizationUpdate} weeks updated.`)
        };
        setCreateTime({ startTimeHour: '', startTimeMinute: '', endTimeHour: '', endTimeMinute: '' });
        setCurrentFocusRow(0);
        setTimeTagIndex(-1);
        setTimeDelete(false);
    }


    const deleteTime = async () => {
        const regHour = /^[012]?\d$/;
        const regMinute = /^[012345][05]$/;
        if (!regHour.test(createTime.startTimeHour) || !regHour.test(createTime.endTimeHour)) {
            return toast.error('Please input correct hours (6:00 - 22:55)!');
        }

        if (!regMinute.test(createTime.startTimeMinute) || !regMinute.test(createTime.endTimeMinute)) {
            return toast.error('Please input correct minutes. Minimum resolution must be 5 minutes!');
        }

        let startTimeHourNum = parseInt(createTime.startTimeHour);
        let endTimeHourNum = parseInt(createTime.endTimeHour);
        let startTimeMinuteNum = parseInt(createTime.startTimeMinute);
        let endTimeMinuteNum = parseInt(createTime.endTimeMinute);

        if (startTimeHourNum > 22 || startTimeHourNum < 6 || endTimeHourNum < 6 || endTimeHourNum > 22
            || startTimeMinuteNum > 59 || startTimeMinuteNum < 0 || endTimeMinuteNum > 59 || endTimeMinuteNum < 0) {
            return toast.error('Business Time must in [6:00 AM - 9:55 PM (22:55)] !');
        }

        if (!timeDelete) {
            return toast.error('Please select "YES" in radio!');
        }

        //DeleteCalendarTime
        let currentDayOfWeek = null;
        switch (currentFocusRow) {
            case 1: currentDayOfWeek = 'Monday'; break;
            case 2: currentDayOfWeek = 'Tuesday'; break;
            case 3: currentDayOfWeek = 'Wednesday'; break;
            case 4: currentDayOfWeek = 'Thursday'; break;
            case 5: currentDayOfWeek = 'Friday'; break;
            case 6: currentDayOfWeek = 'Saturday'; break;
            case 7: currentDayOfWeek = 'Sunday'; break;
            default: currentDayOfWeek = null;
        };

        const bodyObj = {
            id: id,
            dayOfWeek: currentDayOfWeek,
            openHour: createTime.startTimeHour + createTime.startTimeMinute,
            closingHour: createTime.endTimeHour + createTime.endTimeMinute
        }

        let startTimeNum = parseInt(bodyObj.openHour);
        let endTimeNum = parseInt(bodyObj.closingHour);
        if (!(startTimeNum < endTimeNum)) {
            return toast.error('End time must be later than start time !');
        }

        let resultOfDelete = await DeleteCalendarTime(bodyObj);
        setCreateTime({ startTimeHour: '', startTimeMinute: '', endTimeHour: '', endTimeMinute: '' });
        if (resultOfDelete.data.Error !== undefined) {
            toast.error(resultOfDelete.data.Error);
        } else if (resultOfDelete.data.matchedBookingRecordQty > 0) {
            toast.success(`Synchronization: booking records in ${resultOfDelete.data.synchronizationUpdate} of ${resultOfDelete.data.matchedBookingRecordQty} weeks deleted.`)
            toast.info(`Weeks cannot synchronize (since booking already exists ): ${resultOfDelete.data.unsynchronizedWeeks.length > 0 ? resultOfDelete.data.unsynchronizedWeeks : 'null'}`)
        };
        setCurrentFocusRow(0);
        setTimeTagIndex(-1);
        setTimeDelete(false);
    }


    const synchronizeTime = async (timePairArr) => {
        if (timePairArr.length === 0) { setAnimationEnable(true) };

        let bodyObj = {
            storeId: storeId,
            serviceInfoId: id
        }
        let resultOfSync = await SyncStoreCalendarToService(bodyObj);
        setCreateTime({ startTimeHour: '', startTimeMinute: '', endTimeHour: '', endTimeMinute: '' });
        if (resultOfSync.data.Error !== undefined) {
            toast.error(resultOfSync.data.Error);
        }

        //////////////////////////////Temporary plan, to be revised later///////////////////////////////////////
        bodyObj = {
            id: id,
            dayOfWeek: 'Sunday',
            openHour: 2100,
            closingHour: 2100
        }
        await AddStoreBusinessTime(bodyObj);
        setCreateTime({ startTimeHour: '', startTimeMinute: '', endTimeHour: '', endTimeMinute: '' });

        setTimeout(() => {
            setAnimationEnable(false);
        }, 2200);

    }


    return (
        <div style={{ position: 'relative' }}>
            <Title>Weekly Calendar</Title>
            <SyncButton onClick={() => synchronizeTime(timePairArr)}>Sync business time to calendar</SyncButton>

            <WeekBar>
                {
                    props.headers.map((head, index) =>
                        <DayOfWeek style={{
                            backgroundColor: (currentFocusRow === index + 1) ? '#397CC2' : '',
                            color: (currentFocusRow === index + 1) ? 'white' : ''
                        }} key={index}>{head}</DayOfWeek>)
                }
            </WeekBar>
            <Table>
                <TBody>
                    {
                        props.formStructure.map((row, index) => {
                            return (<TR key={index}>
                                {
                                    row.map((cell, index) => {
                                        return <TD onClick={() => selectColumn(index)}>{cell}</TD>
                                    })
                                }
                            </TR>
                            )
                        })
                    }
                </TBody>
            </Table>
            <Popup rowIndex={currentFocusRow}>
                <TopBar><PopupCloseButton onClick={closePopup}>x</PopupCloseButton></TopBar>
                <BodyContent>
                    <H4>Edit business hour</H4>
                    <Nav>
                        {
                            ['Create', 'Edit', 'Delete'].map((head, index) =>
                                <Operation style={{
                                    backgroundColor: (currentOperation === index) ? '#F6EDE0' : '',
                                    color: (currentOperation === index) ? '#D69636' : ''
                                }} onClick={() => selectedOperation(index)} key={index}>{head}</Operation>)
                        }
                    </Nav>
                    <TimeInputZone className='TimeInputZone' style={{ 'display': currentOperation === 2 ? 'none' : '' }}>
                        <div>
                            <span style={{ 'font-weight': '900', 'font-size': '12px', 'margin-right': '15px' }}>Start from</span>
                            <TimeInput type="string" onChange={(e) => setCreateTime({ ...createTime, startTimeHour: e.target.value })} value={createTime.startTimeHour}></TimeInput>
                            <span style={{ 'font-weight': '600', 'font-size': '12px' }}>:</span>
                            <TimeInput type="string" onChange={(e) => setCreateTime({ ...createTime, startTimeMinute: e.target.value })} value={createTime.startTimeMinute}></TimeInput>
                        </div>
                        <div>
                            <span style={{ 'font-weight': '900', 'font-size': '12px', 'margin-right': '15px' }}>To</span>
                            <TimeInput type="string" onChange={(e) => setCreateTime({ ...createTime, endTimeHour: e.target.value })} value={createTime.endTimeHour}></TimeInput>
                            <span style={{ 'font-weight': '600', 'font-size': '12px' }}>:</span>
                            <TimeInput type="string" onChange={(e) => setCreateTime({ ...createTime, endTimeMinute: e.target.value })} value={createTime.endTimeMinute}></TimeInput>
                        </div>
                        <div>
                            <SaveButton onClick={submitTime}>Save</SaveButton>
                        </div>
                    </TimeInputZone>
                    <DeleteInfoZone style={{ 'display': currentOperation === 2 ? '' : 'none' }}>
                        <p style={{ 'margin-bottom': '0px' }}>Do you want to <span style={{ 'color': '#E27777' }}>DELETE</span> this business hour from
                            <TimeInput type="string" style={{ 'color': '#E27777' }} onChange={(e) => setCreateTime({ ...createTime, startTimeHour: e.target.value })} value={createTime.startTimeHour}></TimeInput>:
                            <TimeInput type="string" style={{ 'color': '#E27777' }} onChange={(e) => setCreateTime({ ...createTime, startTimeMinute: e.target.value })} value={createTime.startTimeMinute}></TimeInput> to
                            <TimeInput type="string" style={{ 'color': '#E27777' }} onChange={(e) => setCreateTime({ ...createTime, endTimeHour: e.target.value })} value={createTime.endTimeHour}></TimeInput>:
                            <TimeInput type="string" style={{ 'color': '#E27777' }} onChange={(e) => setCreateTime({ ...createTime, endTimeMinute: e.target.value })} value={createTime.endTimeMinute}></TimeInput>?</p>
                        <div style={{ 'display': 'flex', 'justify-content': 'space-around', "padding": "0px 85px", 'margin-left': '-20px', 'margin-top': '10px' }}>
                            <input type="radio" id="yes" name="confirmation" onClick={() => setTimeDelete(true)} checked={timeDelete} /><span>Yes</span>
                            <input type="radio" id="no" name="confirmation" onClick={() => setTimeDelete(false)} checked={!timeDelete} /><span>No</span>
                        </div>
                        <div>
                            <DeleteButton onClick={deleteTime}>Delete</DeleteButton>
                        </div>
                    </DeleteInfoZone>
                </BodyContent>
            </Popup>
            <div>
                {
                    timePairArr.map((head, index) =>
                        <TimeTag head={head} isAnimation={animationEnable} key={head.date * 10000 * 10000 + head.startTime * 10000 + head.endTime} onClick={() => openPopup(head, index)} style={{
                            'background-color': timeTagIndex === index ? '#397CC2' : '',
                            'box-shadow': timeTagIndex === index ? '5px 10px 10px rgba(0,0,0,0.65) ' : '',
                            'font-weight': timeTagIndex === index ? 'bold' : '',
                            'padding': timeTagIndex === index ? '2px' : ''
                        }}>
                            {`${head.startTime >= 1300 ? Math.floor(head.startTime / 100) - 12 + ':' +
                                (head.startTime % (100) < 10 ? '0' + head.startTime % (100) : head.startTime % (100))
                                + ' PM' : Math.floor(head.startTime / 100) + ':' + (head.startTime % (100) < 10 ? '0'
                                    + head.startTime % (100) : head.startTime % (100)) + ' AM'} 
                                - ${head.endTime >= 1300 ? Math.floor(head.endTime / 100) - 12 + ':'
                                    + (head.endTime % (100) < 10 ? '0' + head.endTime % (100) : head.endTime % (100))
                                    + ' PM' : Math.floor(head.endTime / 100) + ':' + (head.endTime % (100) < 10 ? '0'
                                        + head.endTime % (100) : head.endTime % (100)) + ' AM'}`}
                        </TimeTag>
                    )
                }
            </div>
            <ToastContainer
                style={{ fontSize: "16px" }}
                theme="dark"
                position="top-center"
                autoClose={7000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}


const ServiceCalendar = (props) => {
    return <CalendarWrapper><Excel headers={headers} formStructure={formStructure} id={props.id} storeId={props.storeId} /></CalendarWrapper>;

};

export default ServiceCalendar;
