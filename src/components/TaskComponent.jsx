import React, { Component, useContext, useState } from 'react'
import '../index.css'
import { Box, Button, Card, IconButton, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import EventFormDialog from './EventFormDialog'
import { deleteTask,updateTask } from '../Services/TaskService.js'
import { AuthContext } from '../AuthProvider.jsx'
import EditIcon from "@mui/icons-material/Edit";


const TaskComponent = (props) => {

  
  const { ev,setEvents,events} = props
  const {user,setUser,loading,logout}=useContext(AuthContext);

  const [openForm,setOpenForm]=useState(false);
  const [selectedRange, setSelectedRange] = useState({
    start:ev.start,
    end:ev.end
  });

  const initialData={...ev,selectedRange};
  


  const handleOpenForm=()=>{
    setOpenForm(true);
  }
  const handleCloseForm=()=>{
    setOpenForm(false);
  }
  const handleSubmitForm=async(event)=>{
    try{
      const res=await updateTask(user.token,user.userId,event.id,event);
      if(res.logout){
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
      console.log(ev.id);
      const res = await deleteTask(user.token,user.userId,ev.id);
      if(res.logout){
        logout();
        return;
      }
      if(res.newToken){
        updateAccessToken(res.newToken);
      }
      setOpenForm(false);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <ListItem sx={{width:'100%'}}>
        <Card sx={{
          width:"100%",
          p:2,
          borderRadius:2,
          border:'2px solid blue',
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
