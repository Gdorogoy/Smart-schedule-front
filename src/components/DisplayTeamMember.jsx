import { AppBar, Avatar, Box, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react'

const DisplayTeamMember = ({member}) => {
  return (
    <ListItem sx={{width:'100%' , px:0}}>
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, flexGrow: 1 }}>
        <Typography fontWeight="bold">
          {member.firstname} {member.lastname}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {member.email}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Current task: TODO
        </Typography>
      </Box>
    </ListItem>
  )
}



/*
    {
  "users": [
    {
      "userId": "65a8e3c4b9f1e9a123456789",
      "role": "member"
    }
  ]
}


*/
export default DisplayTeamMember;