import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";
import timeGridPlugin from "@fullcalendar/timegrid/index.js";
import interactionPlugin from "@fullcalendar/interaction/index.js";
import EventFormDialog from "./EventFormDialog";
import { createTask, deleteTask, updateTask } from "../Services/TaskService.js";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider.jsx";
import { getUser } from "../Services/UserService.js";


const MyCalendar = ({events,setEvents}) => {
  const {user,setUser,loading,logout,auth}=useContext(AuthContext);
  useEffect(() => {
    if (loading) return;

    if (!auth?.token) {
      navigate("/auth", { replace: true });
      return;
    }
  }, [auth.userId, loading]);

  const [openForm, setOpenForm] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [openSidebar,setOpenSideBar]=useState(false);



  const handleSubmit=async(data)=>{
    if (selectedEvent) {

      const updatedEvents=
      events.map(ev =>
        ev.id === selectedEvent.id
          ? { ...ev, title: data.title, description: data.description ,importance:data.importance}
          : ev
      );
      setEvents(updatedEvents);
      handleCloseForm();

    } else {
      const newEv={
        title:data.title,
        description:data.description,
        start:data.start,
        end:data.end,
        importance:data.importance
      }

      const res=await createTask(auth.token,auth.userId,newEv);
      if(res==="logout"){
        logout();
        return;
      }
      if(res.newToken){
        updateAccessToken(res.newToken);
      }


      setEvents([...events,res.data.content]);
      handleCloseForm();
    }
      
  }

  const handleDelete = async () => {
    if (!selectedEvent?.id) return;
    
    try{
      const res = await deleteTask(auth.token,auth.userId,selectedEvent.id,auth.refreshToken);
      if(res==="logout"){
        logout();
        return;
      }
      if(res.newToken){
        updateAccessToken(res.newToken);
      }
      if(res.status==="good"){
        setEvents(prev =>
          prev.filter(ev => ev.id !== selectedEvent.id)
      );
      }
      
      handleCloseForm();
    }catch(err){
      console.error(err);
      return err;
    }
  };
  


  const handleEventDrop=async (info)=>{
    const updatedEvent={
      id:info.event.id,
      title:info.event.title,
      description:info.event.extendedProps.description,
      start:info.event.start,
      end:info.event.end,
      importance:info.event.extendedProps.importance
    }

    const updatedEvents=events.map(ev=>{
      return ev.id==updatedEvent.id?
      updatedEvent:
      ev
    });
    setEvents(updatedEvents);
    try{
      const res=await updateTask(auth.token,auth.userId,updatedEvent.id,updatedEvent);
      if(res.logout){
        logout();
        return;
      }
      if(res.newToken){
        updateAccessToken(res.newToken);
      }
    }catch(err){
      console.error(err);
    }

  }

  const handleEventResize=async (info)=>{
    const updatedEvent={
      id:info.event.id,
      title:info.event.title,
      description:info.event.extendedProps.description,
      start:info.event.start,
      end:info.event.end,
      importance:info.event.extendedProps.importance
    }
    const updatedEvents=events.map(ev=>{
      return ev.id==updatedEvent.id?
      updatedEvent:
      ev
    });

    setEvents(updatedEvents);

    try{
      const res=await updateTask(auth.token,auth.userId,updatedEvent.id,updatedEvent);
      if(res==="logout"){
        logout();
        return;
      }
      if(res.newToken){
        updateAccessToken(res.newToken);
      }

    }catch(err){
      console.error(err);
    }
  }



  const handleSelect = (info) => {
    setSelectedRange({ start: info.start, end: info.end });
    setSelectedEvent(null);
    setOpenForm(true);
  };

  const handleEventClick = (info) => {
    const event={
      id: info.event.id,
      title: info.event.title,
      description: info.event.extendedProps.description,
      importance: info.event.extendedProps.importance,
      start: info.event.start,
      end: info.event.end,
    }



    setSelectedEvent(event);
    setSelectedRange(null);
    setOpenForm(true);
  };


  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedEvent(null);
    setSelectedRange(null);
  };

  const deterimne=()=>{
    return (selectedEvent!=null? true:false);
  }

  const toggleDrawer = () => {
    setOpenSideBar(prev => !prev);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        editable={true}
        selectable={true}
        select={handleSelect}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        events={events}
        customButtons={{
          openSidebar: {
              text: '☰ Info',
              click: toggleDrawer,
            
          },
        }}
        headerToolbar={{
          left: "openSidebar prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="85vh"
        dayMaxEventRows={true}
        views={
          {timeGrid:{dayMaxEvents:6}}
        }
      />

      <EventFormDialog
        open={openForm}
        onClose={handleCloseForm}
        initialData={selectedEvent || selectedRange}
        onSubmit={handleSubmit}
        isOne={deterimne()}
        onDelete={handleDelete}
      />

      <Sidebar open={openSidebar} setOpen={setOpenSideBar} />
    </>
  );
};

export default MyCalendar;
