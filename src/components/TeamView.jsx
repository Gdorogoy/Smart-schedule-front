import React, { useContext, useEffect, useState } from 'react'
import { getTeam } from '../Services/TeamService';
import { AuthContext } from '../AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, List, Stack, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import DisplayTeamMember from './DisplayTeamMember';
import TaskComponent from './TaskComponent';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import GroupsIcon from '@mui/icons-material/Groups';

const TeamView = () => {
  const [team, setTeam] = useState(null);
  const { user, updateAccessToken, logout } = useContext(AuthContext);
  const { state } = useLocation();
  const [openSidebar, setOpenSideBar] = useState(false);
  const [teamTasks, setTeamTasks] = useState([]);
  const navigate= useNavigate();


  useEffect(() => {
    if (!state?.team?.id) {
      return;
    }
    const getTeamInfo = async () => {
      try {
        const res = await getTeam(user.token, user.refreshToken, state.team.id);
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

  if (!team) return <Box sx={{ p: 3 }}>Loading...</Box>;

  const toggleDrawer = () => {
    setOpenSideBar(prev => !prev);
  };

  const handleGoBack=()=>{
    navigate('/teams');
  }

  return (
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


        <Typography variant="h5" sx={ { ml:5, fontWeight: 'bold' ,display:'flex' , justifyContent:'center'}}>
          {team.name}
        </Typography>

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
              <Box>
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

              <Box>
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
          flexShrink: 0
        }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Tasks
          </Typography>
          
          <List sx={{ width: '100%', p: 0 }}>
            {teamTasks.map(t => (
              <TaskComponent 
                key={t.id} 
                ev={t} 
                user={user} 
                events={teamTasks}
                setEvents={setTeamTasks} 
              />
            ))}
          </List>
        </Box>
      </Box>

      <Sidebar open={openSidebar} setOpen={setOpenSideBar} />
    </Box>
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


*/

