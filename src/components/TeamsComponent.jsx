import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthProvider';
import { Stack } from '@mui/material';
import { TeamComponent } from './TeamComponent';
import { getTeams } from '../Services/TeamService';

const TeamsComponent = () => {
    const {user}=useContext(AuthContext);
    const [teams,setTeams]=useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
        // const res = await getTeams(user.userId, user.token,user.refreshToken);
        // console.log(res);
        // setTeams(res.content); // now setTeams is actually using the fetched data
        return 1;
        } catch (err) {
        console.error("Error fetching teams:", err);
        }
    };

    fetchData();
    }, [user.userId, user.token]); // run only when userId or token changes

    console.log(teams);
    /*
    1) build a list of teams -- done
    2) add fetch teams for user  
    3) add search team by name
    4) add join team 
    5) add filter teams

    */



    return (
        <Stack spacing={2}>
            {/* {teams.map(team=>{
                <Item>
                    <TeamComponent data={team}/>
                </Item>
            })} */}
        </Stack>
    );
}

export default TeamsComponent;