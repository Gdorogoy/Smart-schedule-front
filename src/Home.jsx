import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import DailyTasks from './components/DailyTasks.jsx'
import './index.css'
import MyCalendar from './components/MyCalendar.jsx'
import { getTasks } from './Services/TaskService.js'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider.jsx'

const Home = () => {
  const navigate = useNavigate();
  const {user,logout,loading,setLoading,auth}=useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getTasks(auth.token,auth.userId);
        if (res.data.content) {
          setEvents(res.data.content);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setLoading(false);
        navigate("/auth", { replace: true });
      }
    };

    getData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='parent'>
      <div className='div2'>
        <MyCalendar events={events} setEvents={setEvents} user={user}/>
      </div>
      <div className='div4'>
        <DailyTasks
          events={events}
          setEvents={setEvents}
          user={user}
        />
      </div>
    </div>
  )
}

export default Home;