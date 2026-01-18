import React, { Component, useContext, useState } from 'react'
import '../index.css'
import { Button } from '@mui/material'
import EventFormDialog from './EventFormDialog'
import { deleteTask,updateTask } from '../Services/TaskService.js'
import { AuthContext } from '../AuthProvider.jsx'

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
    <>
      <div className='task'>
        <div className='task-content'>
          <div className='task-title'>{ev.title}</div>
          <div className='task-desc'>{ev.description}</div>
          <div className='task-import'>Importance: {ev.importance}</div>
        </div>
        <Button variant='contained' onClick={handleOpenForm}>Edit</Button>
      </div>
      <EventFormDialog
        open={openForm}
        onDelete={handleDelete}
        isOne={true}
        onClose={handleCloseForm}
        initialData={initialData}
        onSubmit={handleSubmitForm}
      />

    </>
  )
}

export default TaskComponent
