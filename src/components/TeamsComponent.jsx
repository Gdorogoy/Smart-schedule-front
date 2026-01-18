import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthProvider';
import { Stack, TextField } from '@mui/material';
import { TeamComponent } from './TeamComponent';
import { getTeams } from '../Services/TeamService';

const TeamsComponent = () => {
    const {user,logout,updateAccessToken}=useContext(AuthContext);
    const [teams,setTeams]=useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const res = await getTeams(user.token,user.refreshToken);
        
        if(res.logout){
            logout();
            return;
        }
        if(res.newToken){
            updateAccessToken(res.newToken);
        }
        setTeams([
        ...res.data.content.lead,
        ...res.data.content.member,
        ]);

        } catch (err) {
        console.error("Error fetching teams:", err);
        }
    };
    fetchData();
    }, [user.userId]);

    /*
    1) build a list of teams -- done
    2) add fetch teams for user  
    3) add search team by name
    4) add join team 
    5) add filter teams

    */



    return (
        <Stack spacing={2} alignItems="center" margin="20px">
            <TextField variant="outlined" sx={{width:200 }}></TextField>
            {teams.map(t=>{
                return  <TeamComponent key={t.id} data={t}/>
            })}
        </Stack>
    );
}

export default TeamsComponent;