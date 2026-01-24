import { List } from '@mui/material'
import '../index.css'
import TaskComponent from './TaskComponent'

const DailyTasks = ({ events, user,setEvents }) => {
  return (
    <List>
      {events.map(ev=>{
        return <TaskComponent key={ev.id}ev={ev} user={user} setEvents={setEvents} events={events}/>
      })}
    </List>
  )
}

export default DailyTasks
