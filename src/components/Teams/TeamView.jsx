import React, { useContext, useEffect, useState } from 'react'
import { getTeam } from '../../Services/TeamService';
import { AuthContext } from '../../AuthProvider';
import { replace, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, List, Stack, Typography } from '@mui/material';
import Sidebar from '../Sidebar';
import TaskComponent from '../Task/TaskComponent';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import GroupsIcon from '@mui/icons-material/Groups';
import { TaskModalTeams } from '../Task/TaskModalTeams';
import DisplayTeamMember from '../Teams/DisplayTeamMember'
import EventFormDialog from '../Task/EventFormDialog';

const TeamView = () => {
  const [team, setTeam] = useState(null);
  const { user, updateAccessToken, logout ,auth} = useContext(AuthContext);
  const { state } = useLocation();
  const [openSidebar, setOpenSideBar] = useState(false);
  const [openTasks,setOpenTask]=useState(false);
  const [teamTasks, setTeamTasks] = useState([]);
  const navigate= useNavigate();


  useEffect(() => {
    if (!state?.team?.id) {
      navigate('/teams');
      return;
    }
    const getTeamInfo = async () => {
      try {
        const res = await getTeam(auth.token, auth.refreshToken, state.team.id);
        if (res.logout) {
          logout();
          return;
        }
        if (res.newToken) {
          updateAccessToken(res.newToken);
        }
        setTeam(res.data.content);
        setTeamTasks(res.data.content.tasks);
      } catch (err) {
        console.error(err);
      }
    }
    getTeamInfo();
  }, [state?.team?.id, user.token, user.refreshToken]);

  if (!team) {
    return <Box sx={{ p: 3 }}>Loading...</Box>;
  }

  const toggleDrawer = () => {
    setOpenSideBar(prev => !prev);
  };

  const toggleTask=()=>{
    setOpenTask(prev => !prev);
  }

  const handleGoBack=()=>{
    navigate('/teams');
  }

  const getMembersAutoInfo = () => {
    const teamMembers = [
      ...team.teamLeads.map(t => ({ id: t.userId, firstname: t.firstname, lastname: t.lastname })),
      ...team.members.map(m => ({ id: m.userId, firstname: m.firstname, lastname: m.lastname }))
    ];
    return teamMembers;
  };

  const members = getMembersAutoInfo();



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

    const handleCloseForm=()=>{
      setOpenTask(false);
    }




  return (
    <>
      <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      p: 3,
      boxSizing: 'border-box'
    }}>
      {/* Header with buttons */}
      {/* <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>

      </Box> */}
      <Box sx={{display:'flex' , flexDirection:'row' }}> 


      <Button sx={{mb:4}} variant='contained' onClick={toggleDrawer}>
        <FormatAlignJustifyIcon size='large'></FormatAlignJustifyIcon>
      </Button>

      <Button sx={{mb:4 , ml:2}} variant='contained' onClick={handleGoBack}>
        <GroupsIcon size='large'></GroupsIcon>
      </Button>

      <Button
        sx={{
          ml: 7,mb:4,textTransform: "none",   padding: 0,color:'black'}} >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold" }}
        >
          {team.name}
        </Typography>
      </Button>




      </Box>

      <Box sx={{ 
        display: 'flex', 
        gap: 3,
        width: '100%',
        alignItems: 'flex-start'
      }}>

        <Box sx={{ 
          width: '30%',
          flexShrink: 0
        }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Team Members
          </Typography>
          
          <Stack spacing={2}>
              <Box sx={{
                overflow:'auto',
                maxHeight:'75'
              }}>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  sx={{ mb: 1, fontWeight: 600 }}
                >
                  Team Leads
                </Typography>
                <List sx={{ width: '100%', p: 0 }}>
                  {team.teamLeads.map(t => (
                    <DisplayTeamMember member={t} key={t.userId} />
                  ))}
                </List>
              </Box>

              <Box sx={{
                overflow:'auto',
                maxHeight:'75'
              }}>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  sx={{ mb: 1, fontWeight: 600 }}
                >
                  Members
                </Typography>
                <List sx={{ width: '100%', p: 0 }}>
                  {team.members.map(t => (
                    <DisplayTeamMember member={t} key={t.userId} />
                  ))}
                </List>
              </Box>
          </Stack>
        </Box>

        <Box sx={{ 
          width: '70%',
          flexShrink: 0,
          display:'flex',
          flexDirection:'column',

        }}>
          <Box sx={{
            display:'flex',
            flexDirection:'row'
            
          }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
            Tasks
          </Typography>
          <Button variant="contained" sx={{ fontWeight: "bold", mb: 3, ml: 4 ,whiteSpace: "nowrap"}} onClick={toggleTask}>
            Assign Task
          </Button>
          </Box>
          

          <Box sx={{
            width:'100%',
            maxHeight:'80vh',
            overflow:'auto'
          }}>
            <List sx={{ width: '100%', p: 0 }}>
            {teamTasks.map(t => (
              <TaskComponent 
                key={t.id} 
                ev={t} 
                user={user} 
                events={teamTasks}
                setEvents={setTeamTasks} 
                isTeam={true}
              />
            ))}
          </List>
          </Box>
        </Box>
      </Box>

      <Sidebar open={openSidebar} setOpen={setOpenSideBar} />
    </Box>

    {/* <EventFormDialog open={openTasks} onClose={handleCloseForm} onSubmit={handleSubmit}/> */}
    <TaskModalTeams 
    open={openTasks} 
    onClose={handleCloseForm} 
    members={members} 
    user={user} 
    updateAccessToken={updateAccessToken} 
    auth={auth}
    teamId={team.id}/>

    </>
  );
}

export default TeamView;




//        <Button onClick={toggleDrawer} sx={{padding:2, margin:5,fontWeight:500 ,width:'8%',height:'5vh'}} variant='contained'> button</Button>


//todo :
/*
  1: add time line (50< green 50> yellow 20>red) (show per member and show who else got this task)
    1.1:memebers can see other member and how busy they are
    1.2 : show what task they currently work on (option to choose)

  2:  team lead has the option to see his own tasks or to see overall teams 
    2.1 : team leads can see how many task each member have(in the team scope)
    2.2: 



    ======
    add condiditonal rendering (pass from backend what allowed and whats not )

*/
