import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { getUser, updateUser } from "../../Services/UserService";
import { AuthContext } from "../../AuthProvider";

const UserSetting = () => {
    const {user,setUser,logout,updateAccessToken,auth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: " ",
        lastName: " ",
        email: " ",
        timeZone: " ",
        ogPassword: " ",
        newPassword: " ",
        confirmPassword: " "
    });


    useEffect(() => {
        if(!auth.token){
            logout();
            return
        }
        const loadUserData=()=>{
            setLoading(true);
            const userData = user;
            setFormData(prev => ({
                ...prev,
                firstName: userData.firstname || "",
                lastName: userData.lastname || "",
                email: userData.email || "",
                timeZone: userData.timeZone || "",
                ogPassword: "",
                newPassword: "",
                confirmPassword: ""
            }));
            setLoading(false);  
        }

        loadUserData();
    }, [auth?.userId]);



    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        const { newPassword, confirmPassword, ogPassword } = formData;

        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                alert("New passwords do not match");
                return;
        }
            if (!ogPassword) {
                alert("Please enter your current password");
                return;
            }
        }

        try {
            const res=await updateUser(auth.userId, auth.token, formData,auth.refreshToken);
            if(res.logout){
                logout();
                return;
            }
            if(res.newToken){
                updateAccessToken(res.newToken);
            }
            alert("Profile updated successfully!");
            setEdit(false);

            setFormData(prev => ({
            ...prev,
            ogPassword: "",
            newPassword: "",
            confirmPassword: ""
            }));
        } catch (error) {
            console.error(error);
            alert("Failed to update profile");
        }
    };


    const handleCancel = () => {
        setEdit(false);
        setFormData(prev => ({
            ...prev,
            ogPassword: "",
            newPass: "",
            confirmPassword: ""
        }));
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper
            elevation={1}
            sx={{
                p: 4,
                maxWidth: 600,
                mx: "auto",
                mt: 5,
                borderRadius: 3,
                backgroundColor: "#fff",
            }}
        >
            <Button 
                variant="contained" 
                onClick={() => navigate('/calendar')}
                sx={{ mb: 2 }}
            >
                Back
            </Button>

            <Stack alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                <Avatar
                    alt={formData.firstName || "User"}
                    src="/"
                    sx={{
                        width: 64,
                        height: 64,
                        fontSize: 24,
                        fontWeight: "bold",
                        bgcolor: "primary.main"
                    }}
                >
                    {formData.firstName?.[0]?.toUpperCase() || "U"}
                </Avatar>

                <Stack spacing={0.5} alignItems="center">
                    <Typography variant="h6">
                        {/*todo */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {/*todo */}
                    </Typography>
                </Stack>

            </Stack>

            <Stack spacing={2}>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}  
                    onChange={handleChange}
                    fullWidth
                    disabled={!edit}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    disabled={!edit}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    fullWidth
                    disabled={!edit}
                />
                <TextField
                    label="Time Zone"
                    name="timeZone"
                    value={formData.timeZone}
                    onChange={handleChange}
                    fullWidth
                    disabled={!edit}
                    placeholder="e.g., America/New_York"
                />

                {edit && (
                    <>
                        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                            Change Password (optional)
                        </Typography>
                        <TextField
                            label="Current Password"
                            name="ogPassword"
                            type="password"
                            value={formData.ogPassword}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="New Password"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Confirm New Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            fullWidth
                        />
                    </>
                )}

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    {!edit ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setEdit(true)}
                            fullWidth
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSave}
                                fullWidth
                            >
                                Save Changes
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleCancel}
                                fullWidth
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </Stack>
            </Stack>
        </Paper>
    );
};

export default UserSetting;