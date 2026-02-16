import {Autocomplete, Dialog, DialogContent, Stack, TextField, Typography, Checkbox, Box, DialogActions, Button, Container} from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import TaskForm from './TaskForm';
import { assignTaskToTeam } from '../../Services/TeamService';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Calendar from '../calendar/calendar';

export const TaskModalTeams = ({ open, onClose, members, user, auth, updateAccessToken, teamId,initialData }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, 'hour'));
  const [dueDate, setDueDate] = useState(dayjs().add(1, 'day'));
  const [taskData, setTaskData] = useState({
    
  });


  useEffect(()=>{
    if(!open) return;
    if(initialData){
      setTaskData({
        title:initialData?.title  || "",
        description:initialData?.description  ||"",
        importance:initialData?.importance  ||1,
        color:initialData?.color  ||null,
        status:initialData?.status ||"pending",
        team:initialData?.team ||null,
        status:initialData?.status || "pending"
      });
      if (initialData.start) setStartDate(dayjs(initialData.start));
      if (initialData.end) setEndDate(dayjs(initialData.end));
      if (initialData.dueDate) setDueDate(dayjs(initialData.dueDate));
    }else {
      setTaskData({
        title: "",
        description: "",
        importance: 1,
        color: null,
        status: "pending",
        team: null,
      });
      setStartDate(dayjs());
      setEndDate(dayjs().add(1, 'hour'));
      setDueDate(dayjs().add(1, 'day'));
    }


  },[initialData,open]);


  const close = () => {
    onClose();
    setSelectedUsers([]);
    setStartDate(dayjs());
    setEndDate(dayjs().add(1, 'hour'));
    setDueDate(dayjs().add(1, 'day'));
  }

  const createTeamTask = async(taskData) => {
    const enrichedTaskData = {
      ...taskData,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      dueDate: dueDate.toISOString(),
      color: taskData?.color || '#FF5733',
      status: 'pending',
      team:teamId
    };

    const users = selectedUsers.map(u => (u.id ));
    const payload = {
      users,
      task: enrichedTaskData
    };

    const res = await assignTaskToTeam(
      auth.token,
      auth.refreshToken,
      teamId,
      payload
    );

    close();
  }

  const filteredMembers = useMemo(() => {
    if (!searchValue) return members;

    const query =
      typeof searchValue === "string"
        ? searchValue.toLowerCase()
        : `${searchValue.firstname} ${searchValue.lastname}`.toLowerCase();

    return members.filter(m =>
      `${m.firstname} ${m.lastname}`.toLowerCase().includes(query)
    );
  }, [members, searchValue]);

  const toggleUser = (user) => {
    setSelectedUsers(prev => {
      const exists = prev.some(u => u.id === user.id);
      return exists
        ? prev.filter(u => u.id !== user.id)
        : [...prev, user];
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false}>
      <DialogContent >
        <Calendar></Calendar>
        <TaskForm  onSubmit={setTaskData} setTaskData={setTaskData} taskData={taskData}></TaskForm>

        <Autocomplete
        multiple
        options={members}
        disableCloseOnSelect
        getOptionLabel={(option)=>`${option.firstname} ${option.lastname}`}
        value={selectedUsers}
        onChange={(event, newValue)=>setSelectedUsers(newValue)}
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option.id} >
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {option.firstname} {option.lastname}
          </li>
        )}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Select Team Members" 
            placeholder="Search by name..." 
          />
          )}
          sx={{ width: '100%', my:2 }}
        >

        </Autocomplete>

      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={()=>{
          createTeamTask(taskData)}}>Submit</Button>
        <Button variant='contained' color='error' onClick={close}>Cancel</Button>
      </DialogActions>

    </Dialog>
  );
};