import { Button, Stack } from '@mui/material'
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
    <div>
        <Button onClick={handleOnClick}>
            <h1>{data.name}</h1>
            <h2>{data.description}</h2>
        </Button>
    </div>
  )
}
