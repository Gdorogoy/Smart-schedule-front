import { Box, Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import dayjs from 'dayjs';
import React, { useState } from 'react'

const Calendar = () => {
    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [endDate, setEndDate] = useState(dayjs(new Date()));
    const [startTime,setStartTime]=useState(dayjs(new Date()));
    const [endTime,setEndTime]=useState(dayjs(startDate).add(1,'hour'));

    const combineDates=(date,time)=>{
        return date.hour(time.hour()).minute(time.minute());
    }

    const start=combineDates(startDate,startTime);
    let end=combineDates(endDate,endTime);

    if(end<start){
        setEndDate(startDate);
        setEndTime(dayjs(startDate).add(1,'hour'));
        end=combineDates(startDate,dayjs(startTime).add(1,'h'));
    }


    return (
        <Box sx={{width:"75%"}}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={2} width="100%"  alignItems="center" >

            <Typography variant="h6">Select Date Range</Typography>

            <Box display="flex" width="100%">
                {/* start date picker */}
                <Box display="flex" flexDirection="column"  alignItems="center" width="100%">
                    <Typography>Start date</Typography>

                    <DateCalendar
                        value={startDate}
                        onChange={(date)=>setStartDate(date)}

                    />
                    <TimePicker
                        ampm={false}
                        value={startTime}
                        onChange={(date)=>setStartTime(date)}
                    />


                </Box>


            {/* end date picker */}
                <Box  display="flex" flexDirection="column" alignItems="center" width="100%">
                    <Typography>End date</Typography>

                    <DateCalendar
                        value={endDate}
                        onChange={(date)=>setEndDate(date)}                        
                    />
                    <TimePicker
                        ampm={false}
                        value={endTime}
                        onChange={(date)=>setEndTime(date)}

                    />


                </Box>
            </Box>
        
        </Stack>
        </LocalizationProvider>
        </Box>
    );
    }

export default Calendar