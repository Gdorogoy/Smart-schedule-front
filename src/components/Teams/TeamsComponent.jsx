import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../AuthProvider';
import { Autocomplete, Box, Button, List, Stack, TextField } from '@mui/material';
import { TeamComponent } from './TeamComponent';
import { getTeams } from '../../Services/TeamService';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import GroupsIcon from '@mui/icons-material/Groups';
import Sidebar from '../Sidebar';

const TeamsComponent = () => {
    const {user,logout,updateAccessToken,auth}=useContext(AuthContext);
    const [teams,setTeams]=useState([]);
    const [openSidebar, setOpenSideBar] = useState(false);
    

    useEffect(() => {
    const fetchData = async () => {
        try {
        const res = await getTeams(auth.token,auth.refreshToken);

        if(res==="logout"){
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
        console.log("res:")
        console.log(err)
        console.error("Error fetching teams:", err);
        }
    };
    fetchData();
    }, [user.userId]);

    const toggleDrawer = () => {
        setOpenSideBar(prev => !prev);
    };


    /*
    1) build a list of teams -- done
    2) add fetch teams for user  --done
    3) add search team by name --done 
    4) add join team 
    5) add filter teams

    */



    return (
        <>
            <Box sx={{display:'flex' , flexDirection:'row-start' , m:4}}> 


                <Button sx={{mb:4}} variant='contained' onClick={toggleDrawer} >
                    <FormatAlignJustifyIcon size='large'></FormatAlignJustifyIcon>
                </Button>

                <Autocomplete sx={{ mb:4,ml:2 ,width:'45%'}}
                options={teams.map((t)=>t.name)}
                freeSolo
                renderInput={(params=> <TextField {...params} label='searchTeams'/>)}
                >
                </Autocomplete>

            </Box>
            <Stack spacing={2} alignItems="center" margin="20px">
            <List>
                 {teams.map(t=>{
                    return  <TeamComponent key={t.id} data={t}/>
                })}
            </List>
            </Stack>
            <Sidebar open={openSidebar} setOpen={setOpenSideBar} />

        
                
        </>
    );
}

export default TeamsComponent;