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
  const {user,setUser,loading,setLoading}=useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log(user);
    if (!user?.userId) return;
    const getData = async () => {
      try {
        const data = await getTasks(user.token,user.userId);
        console.log(data);
        if (data.content) {
          setEvents(data.content);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setLoading(false);
        navigate("/auth", { replace: true });
      }
    };

    getData();
  }, [user.userId]);

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