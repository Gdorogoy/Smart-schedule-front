import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react'

const JoinTeam = ({open,setOpen}) => {
  return (
    <Modal open={open} onClose={setOpen}>
        <Box>
            <TextField variant='h4'>
                Enter Code
            </TextField>
            <Button>
                Join Team
            </Button>
        </Box>


    </Modal>
  )
}

export default JoinTeam;