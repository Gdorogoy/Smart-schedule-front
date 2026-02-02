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
import TaskForm from "./TaskForm";


const EventFormDialog = ({ open, onClose, initialData, onSubmit ,isOne,onDelete}) => {


    const [importance,setImportance]=useState(1);
    const [color,setColor]=useState("");

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
        }
    }
    const handleMinus=()=>{
        if(importance>1){
            setImportance(importance-1);
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
        setImportance(1);
        onSubmit(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
            {"Task details"}
        </DialogTitle>
        <DialogContent>
            <TaskForm 
                onDelete={onDelete}
                initialData={initialData}
                onSubmit={onSubmit}
            
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} variant="outlined">
                Cancel
            </Button>
            <Button type="submit" form="event-form" variant="contained">
                Save
            </Button>
            {isOne &&(
                <Button
                color="error"
                variant="contained"
                onClick={()=>onDelete(initialData)}
                >
                Delete
                </Button>
            )}
            </DialogActions>
        </Dialog>
    );
};

export default EventFormDialog;
