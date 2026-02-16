import { Box, Button, Dialog, DialogContent, DialogActions, Typography, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import {joinTeam} from '../../Services/TeamService'
import { AuthContext } from '../../AuthProvider';
const JoinTeam = ({ open, onClose}) => {
    const [code, setCode] = useState('');
    const {user,logout,updateAccessToken,auth}=useContext(AuthContext);
    
    const onJoin=async()=>{
        try{
            const res=joinTeam(auth.token,user.userId,code,auth.refreshToken);
            onClose()
        }catch(err){
            console.error(err.status);
        }
    }



    return (
        <Dialog open={open} onClose={onClose}>
        <DialogContent>
            <Typography variant="h6" mb={1}>
            Join a Team
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
            Enter the invite code from your team lead
            </Typography>
            <TextField
            fullWidth
            label="Team Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            size="small"
            />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
            <Button onClick={onClose} color="inherit">
            Cancel
            </Button>
            <Button
            variant="contained"
            onClick={() => onJoin(code)}

            >
            Join
            </Button>
        </DialogActions>
        </Dialog>
    );
};

export default JoinTeam;