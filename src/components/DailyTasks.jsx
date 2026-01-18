import '../index.css'
import TaskComponent from './TaskComponent'

const DailyTasks = ({ events, user,setEvents }) => {
  return (
    <ul className='dailyTask'>
      {events.map(ev=>{
        return <TaskComponent key={ev.id}ev={ev} user={user} setEvents={setEvents} events={events}/>
      })}
    </ul>
  )
}

export default DailyTasks
