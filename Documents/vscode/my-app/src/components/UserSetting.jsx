import React, { useEffect, useState } from "react";
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
import { fetchUser, update } from "../userService";

const UserSetting = ({user}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        firstame: "",
        lastname: "",
        email: "",
        timeZone: "",
        password: "",
        newPass: "",
        confirmPassword: "",
        ogPassword: ""
    });

    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);
                const res = await fetchUser(user);
                const userData=res.content;

                setFormData({
                    firstName: userData.firstname || "",
                    lastName: userData.lastname || "",
                    email: userData.email || "",
                    timeZone: userData.timeZone || "",
                    password: "",
                    newPassword: "",
                    confirmPassword: "",
                    ogPassword: ""
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
                alert("Failed to load user data");
            }
        };

        getUserData();
    }, [user.userId]);


    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        if (formData.newPassword || formData.confirmPassword) {
            if (formData.newPassword !== formData.confirmPassword) {
                alert("New passwords do not match");
                return;
            }
            if (!formData.ogPassword) {
                alert("Please enter your current password");
                return;
            }
        }

        try {
            await update(user, formData);
            alert("Profile updated successfully!");
            setEdit(false);
            
            setFormData(prev => ({
                ...prev,
                ogPassword: "",
                newPassword: "",
                confirmPassword: ""
            }));
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update profile");
        }
    };

    const handleCancel = () => {
        setEdit(false);
        setFormData(prev => ({
            ...prev,
            ogPassword: "",
            newPassword: "",
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
                    name="timezone"
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