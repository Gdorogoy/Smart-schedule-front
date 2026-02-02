import React, { Component, useContext, useState } from 'react'
import { Box, Button, Card, IconButton, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import EventFormDialog from './EventFormDialog'
import EditIcon from "@mui/icons-material/Edit";
import { deleteTask, updateTask } from '../../Services/TaskService.js';
import { AuthContext } from '../../AuthProvider.jsx';


const TaskComponent = (props ) => {

  
  const { ev,setEvents,events,isTeam} = props
  const {user,setUser,loading,logout,auth}=useContext(AuthContext);

  const [openForm,setOpenForm]=useState(false);
  const [selectedRange, setSelectedRange] = useState({
    start:ev.start,
    end:ev.end
  });

  const colors={
    red:'#E0370E',
    yellow:'#F2E75A',
    green:'#71FA6C'
  }

  const initialData={...ev,selectedRange};
  


  const handleOpenForm=()=>{
    setOpenForm(true);
  }
  const handleCloseForm=()=>{
    setOpenForm(false);
  }
  const handleSubmitForm=async(event)=>{
    try{
      const res=await updateTask(auth.token,auth.userId,event.id,event);
      if(res==="logout"){
        logout();
        return;
      }
      if(res.newToken){
        updateAccessToken(res.newToken);
      }
      const updated=res.data.content;
      const upEvents=events.map(
        ev=>
          ev.id===updated.id?
            updated 
            :
            ev
        );
        setEvents(upEvents);
      setOpenForm(false);
    }catch(err){
      console.error("Update error:", err);
    }
    
  }

  const handleDelete = async () => {
    try {
      const res = await deleteTask(auth.token,auth.userId,ev.id);
      if(res==="logout"){
        logout();
        return;
      }
      if(res.newToken){
        updateAccessToken(res.newToken);
      }
      setEvents(prev =>
          prev.filter(ee => ee.id !== ev.id)
      );
      setOpenForm(false);

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const getTaskTime=()=>{
    const end=new Date(ev.end).getTime();
    const start=new Date(ev.start).getTime();
    const now=new Date();
    const curr=now.getTime();

    const total=end-start;
    const left=curr-start;

    if(left<0){
      return {state:"not started",progress:0};
    }

    const progress=left/total;

    if(progress>=1){
      return {state:"overdue",progress:1}
    }
    else {
      return {state:"in progress",progress}
    }

  }

   const handleFindColor = () => {
      if(isTeam){
        const { progress } = getTaskTime();
        console.log(progress)
        if (progress < 0.5) return colors.green;
        if (progress < 0.75) return colors.yellow;
        return colors.red;
      }
    };



  return (
    <ListItem sx={{width:'100%',}}>
        <Card sx={{
          width:"100%",
          p:2,
          borderRadius:2,
          border:'2px solid blue',
          backgroundColor:handleFindColor()
        }}>
          <Box sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
            <Typography sx={{
              fontWeight:'bold',
              ml:2
            }}>  
                {ev.title}
            </Typography>
            <IconButton onClick={handleOpenForm} size='medium'>
              <EditIcon/>
            </IconButton>
          </Box>
          <Typography color='text.secondery' sx={{ml:2}}>
              {ev.description}
          </Typography>
          <Typography variant="body2" sx={{ml:2}}> 
              {ev.importance}
          </Typography>

        </Card>
      <EventFormDialog
        open={openForm}
        onDelete={handleDelete}
        isOne={true}
        onClose={handleCloseForm}
        initialData={initialData}
        onSubmit={handleSubmitForm}
      />

    </ListItem>
  )
}

export default TaskComponent
