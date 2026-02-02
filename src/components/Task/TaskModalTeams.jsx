import {Autocomplete, Dialog, DialogContent, Stack, TextField, Typography, Checkbox, Box, DialogActions, Button} from '@mui/material'
import React from 'react'
import TaskForm from './TaskForm';
import { assignTaskToTeam } from '../../Services/TeamService';

export const TaskModalTeams = ({ open, onClose, members, user,auth,updateAccessToken,teamId }) => {
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState(null);


  const createTeamTask=async()=>{
    const data=selectedUsers.map(u=>u.id);
    const res=await assignTaskToTeam(auth.token,auth.refreshToken,teamId, { users: data });
    console.log(res);
    onClose()
  }

  const filteredMembers = React.useMemo(() => {
    if (!searchValue) return members;

    const query =
      typeof searchValue === "string"
        ? searchValue.toLowerCase()
        : `${searchValue.firstname} ${searchValue.lastname}`.toLowerCase();

    return members.filter(m =>
      `${m.firstname} ${m.lastname}`.toLowerCase().includes(query)
    );
  }, [members, searchValue]);

  const toggleUser = (user) => {
    setSelectedUsers(prev => {
      const exists = prev.some(u => u.id === user.id);
      return exists
        ? prev.filter(u => u.id !== user.id)
        : [...prev, user];
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>

        <TaskForm />

        <Typography mt={2} mb={1}>
          Assign Task To
        </Typography>

        <Autocomplete
          options={members}
          freeSolo
          getOptionLabel={(option) => {
            if (typeof option === "string") return option;
            return `${option.firstname} ${option.lastname}`;
          }}
          
          onInputChange={(e, value) => setSearchValue(value)}
          renderInput={(params) => (
            <TextField {...params} label="Search Members" />
          )}

          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option.firstname} {option.lastname}
            </li>
          )}

        />

        <Box
          mt={2}
          sx={{
            maxHeight: 250,
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 1
          }}
        >
          <Stack spacing={1}>
            {filteredMembers.map(user => {
              const checked = selectedUsers.some(u => u.id === user.id);

              return (
                <Stack
                  key={user.id}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Checkbox
                    checked={checked}
                    onChange={() => toggleUser(user)}
                  />
                  <Typography>
                    {user.firstname} {user.lastname}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Box>

      </DialogContent>
      <DialogActions>

        <Button variant='contained' onClick={createTeamTask}>
          Assign
        </Button>
        <Button color='error' variant='contained' onClick={onClose}>
          Cancel
        </Button>

      </DialogActions>
    </Dialog>
  );
};
