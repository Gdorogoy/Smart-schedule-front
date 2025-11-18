import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import DailyTasks from './components/DailyTasks.jsx'
import './index.css'
import MyCalendar from './components/MyCalendar.jsx'
import { fetchAll } from './taskService.js'

const Home = ({user}) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchAll(user);
        if (data.content) {
          setEvents(data.content);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setLoading(false);
        localStorage.clear();
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