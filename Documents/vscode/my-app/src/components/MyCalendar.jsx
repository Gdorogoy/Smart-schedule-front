import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";
import timeGridPlugin from "@fullcalendar/timegrid/index.js";
import interactionPlugin from "@fullcalendar/interaction/index.js";
import EventFormDialog from "./EventFormDialog";
import { create, updateTask } from "../taskService";
import { refreshToken } from "../auth";
import Sidebar from "./Sidebar";

const MyCalendar = ({events,setEvents,user}) => {

  useEffect(() => {
    const checkIfValid = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        const newToken = await refreshToken();
        if (!newToken) {
          window.location.href = "/auth";
        } else {
          localStorage.setItem("token", newToken);
        }
      }
    };
    checkIfValid();
  }, []);


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

      const res=await create(user,newEv);


      setEvents([...events,res.content]);
      handleCloseForm();
    }
      
  }
  


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
      const res=await updateTask(user,updatedEvent);
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
      const res=await updateTask(user,updatedEvent);

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
      title:info.event.title,
      description:info.event.extendedProps.description,
      importance:info.event.extendedProps.importance
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
      />

      <Sidebar open={openSidebar} setOpen={setOpenSideBar} />
    </>
  );
};

export default MyCalendar;
