import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const TaskForm = ({ open, onClose, initialData, onSubmit ,isOne,onDelete,setTaskData,taskData}) => {


    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [importance, setImportance] = useState(initialData?.importance || 1);
    const [color,setColor]=useState(initialData?.color || "");


    useEffect(()=>{
        if(initialData?.importance!=null){
    setImportance(initialData.importance);
        }
        else{
    setImportance(1);
        }

    },[initialData]);

    const handleAdd=()=>{
        if(importance<10){
            setImportance(importance+1);
            if(taskData && setTaskData){
                setTaskData({...taskData,importance:importance});
            }
        }
    }
    const handleMinus=()=>{
        if(importance>1){
            setImportance(importance-1);
            if(taskData && setTaskData){
                setTaskData({...taskData,importance:importance});
            }
        }
    }
    
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const formData = {
    ...initialData,
    title: ev.target.title.value,
    description: ev.target.description.value,
    importance:importance
        };
        onSubmit(formData);
        
    };

    return (

    <Box component="form" onSubmit={handleSubmit} id="event-form">
        <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
            onChange={taskData && setTaskData? (e)=> {
                setTitle(e)
                setTaskData({...taskData,title:e.target.value});
            }:null}
            label="Title"
            name="title"
            fullWidth
            defaultValue={initialData?.title || ""}
            required
            />
            <TextField
            onChange={taskData && setTaskData? (e)=> {
                setDescription(e)
                setTaskData({...taskData,description:e.target.value});
            }:null}
            label="Description"
            name="description"
            fullWidth
            multiline
            defaultValue={initialData?.description || ""}
            required
            />
            <Stack direction={"row"} spacing={2}>
            <Button variant="contained" onClick={handleAdd}>
        <AddIcon/>
            </Button>
            <div label="">
        importance:{importance}
            </div>
            <Button variant="contained" onClick={handleMinus}>
        <RemoveIcon/>
            </Button>
            </Stack>
        </Stack>
    </Box>


    )
};

export default TaskForm;


/*
todo:

1) add task done (by force or logicaly)





2) add task color 
3) add notification (task assigned) new service
4) add task request to reassing or change task
5) add taks that the user currently working on 





*/