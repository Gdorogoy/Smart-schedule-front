import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Typography, MenuItem, Select, FormControl,
   TextField,
  Autocomplete,
  Checkbox,
  Stack,
  Input
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const EventFormDialog = ({
  open,
  onClose,
  initialData,
  onSubmit,
  isOne,
  onDelete,
  onComplete,
  isTeam,
  members = [],       
  onAssignMember,     
  onReschedule,  
  onCreate      
}) => {
  const [importance, setImportance] = useState(initialData?.importance  ||1);
  const [start, setStart] = useState(initialData?.start  ||dayjs());
  const [end, setEnd] = useState(initialData?.end ||dayjs(start).add(1,'h'));
  const [dueDate,setDueDate]=useState(initialData?.dueDate ||end);
  const [selectedUsers,setSelectedUsers]=useState([]);
  const [description,setDescription]=useState(initialData?.description  ||" ");
  const [title,setTitle]=useState(initialData?.title  || " ");
  const [color,setColor]=useState(initialData?.color  ||'#ffffff');
  const [status,setStatus]=useState(initialData?.status || "pending");


  useEffect(() => {
    if (!open) return;
    setImportance(initialData?.importance ?? 1);
    setStart(initialData?.start ? toDateTimeLocal(initialData.start) : "");
    setEnd(initialData?.end   ? toDateTimeLocal(initialData.end)   : "");
    setImportance(initialData?.importance ?? 1);
    setStart(initialData?.start ? toDateTimeLocal(initialData.start) : "");
    setEnd(initialData?.end ? toDateTimeLocal(initialData.end) : "");
    setTitle(initialData?.title || "");
    setDescription(initialData?.description || "");
    setColor(initialData?.color || '#ffffff');
    setStatus(initialData?.status || "pending");
  }, [open, initialData]);
  const toDateTimeLocal = (iso) => new Date(iso).toISOString().slice(0, 16);

  const handleAssign = async () => {
    if (!selectedUsers) return;
    await onAssignMember?.(selectedUsers);
    setSelectedUsers([]);
  };

  const handleReschedule = async () => {
    if (!start || !end) return;
    await onReschedule?.(initialData.id, {
      start: new Date(start).toISOString(),
      end:   new Date(end).toISOString(),
    });
  };

  const handleSubmit=async()=>{
    const task={
      ...initialData,
      importance,
      start,
      end,
      description,
      title,
      color,
      status:"Pedning"
    }
    if(initialData.id===undefined){
      await onCreate(task);
      return;
    }else{
      await onSubmit(task);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Task details</DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>

          <Stack spacing={2} sx={{mt:1}}>
            <TextField
            value={title}
            placeholder="Title" 
            onChange={(e)=>setTitle(e.target.value)}>
                
            </TextField>
            <TextField 
            value={description}
            placeholder="Description"  
            onChange={(e)=>setDescription(e.target.value)}>
                
            </TextField>
          </Stack>

          {/* Importance */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>Importance:</Typography>
            <Button size="small" variant="outlined"
              onClick={() => importance > 1  && setImportance(i => i - 1)}>−</Button>
            <Typography sx={{ minWidth: 24, textAlign: "center" }}>{importance}</Typography>
            <Button size="small" variant="outlined"
              onClick={() => importance < 10 && setImportance(i => i + 1)}>+</Button>
          </Box>
          <Box display="flex" flexDirection="row" >
            <Typography variant="body2">Color</Typography>
            <Input
              placeholder="Color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              sx={{
                width:'30%',
              }}
            />
          </Box>


          {/* Reschedule — team tasks only */}
          {isTeam && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="subtitle2" fontWeight={600}>Reschedule</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                    <DateTimePicker 
                        value={dayjs(start)}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        value={dayjs(end)}
                    />
                </LocalizationProvider>
              </Box>
              <Button
                variant="contained"
                size="small"
                disabled={!start || !end}
                onClick={handleReschedule}
                sx={{ alignSelf: "flex-start" }}
              >
                Reschedule
              </Button>
            </Box>
          )}

          {/* Assign member — team tasks only */}
          {isTeam && members.length>0 && (
            <Box sx={{}}>
                <Autocomplete
                    multiple
                    options={members}
                    disableCloseOnSelect
                    getOptionLabel={(option)=>(`${option.firstname} ${option.lastname}`)}
                    value={selectedUsers}
                    onChange={(event,newValue)=>setSelectedUsers(newValue)}
                    renderOption={(props,option,{selected})=>(
                        <li {...props} key={option.id}>
                            <Checkbox sx={{ml:1}} checked={selected}/>
                            {option.firstname} {option.lastname}
                        </li>
                    )}
                    renderInput={(params)=>(
                        <TextField
                            {...params}
                            label="Select Team Members"
                            placeholder="Search by name..."
                        />
                    
                    )}
                    sx={{width:'100%'}}

                />
                <Button variant="contained" sx={{my:1}} onClick={()=>handleAssign()}>
                  Assign
                </Button>
            </Box>)}

        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        <Box>
          {isOne && (
            <Button onClick={() => onDelete(initialData)} color="error" variant="outlined" size="small">
              Delete
            </Button>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {isOne && (
            <Button
              onClick={() => onComplete(initialData)}
              variant="contained"
              sx={{ backgroundColor: "green", fontWeight: "bold" }}
              size="small"
            >
              Complete
            </Button>
          )}
          <Button onClick={onClose} size="small">Cancel</Button>
          <Button
            onClick={() =>handleSubmit()}
            variant="contained"
            size="small"
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EventFormDialog;