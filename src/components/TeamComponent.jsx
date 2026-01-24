import { Button, ListItem, Stack, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";

import React from 'react'

export const TeamComponent = ({data}) => {
    const navigate= useNavigate();

    const handleOnClick=()=>{
      navigate(`/team`, { 
        state: { team:data 
      }});
    };

  return (
    <ListItem>
      <Button onClick={handleOnClick}>  
        <Stack spacing={2}>
            <Typography variant='h5' sx={{fontWeight:'bold'}}>{data.name}</Typography>
            <Typography variant='h6' sx={{fontWeight: 550}}>{data.description}</Typography>
        </Stack>
          
      </Button>
    </ListItem>
  )
}

 {/* <Button onClick={handleOnClick}>
            <h1>{data.name}</h1>
            <h2>{data.description}</h2>
        </Button> */}
