import React, { use, useContext, useEffect, useState } from 'react'
import { getTeam } from '../Services/TeamService';
import { AuthContext } from '../AuthProvider';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

const TeamView = () => {

  const [team, setTeam] = useState(null);
  const { user,updateAccessToken } = useContext(AuthContext);
  const { state } = useLocation();

  useEffect(()=>{
    if(!state?.team?.id){
      return;
    }
    const getTeamInfo=async()=>{
      try{
        const res=await getTeam(user.token,user.refreshToken,state.team.id);
        if(res.logout){
          logout();
          return;
        }
        if(res.newToken){
          updateAccessToken(res.newToken);
        }
        setTeam(res.data.content);
      }catch(err){
        console.error(err);
      }
    }
    getTeamInfo();
  },[state?.team?.id, user.token, user.refreshToken]);

  if (!team) return <div>Loading...</div>;

  return (
    <div className='team'>
      <Box>



      </Box>
    </div>
  );
}

export default TeamView