import { Button, Stack } from '@mui/material'
import { useNavigate } from "react-router-dom";

import React from 'react'

export const TeamComponent = ({data}) => {
    const navigate= useNavigate();
    const handleOnClick=()=>{
        navigate(`/team/${team.id}`, { state: { team } });
    }

  return (
    <div>
        {/* <Button onClick={handleOnClick}>
            <h1>{data.teamName}</h1>
            <h2>{data.teamInfo}</h2>
        </Button> */}
    </div>
  )
}
