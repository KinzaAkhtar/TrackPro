import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Tabs, Tab, Modal } from "@mui/material";
import { AccountCircle, Lock } from '@mui/icons-material'; 

const AccountSettings = () => {
    const [tabValue, setTabValue] = useState(0);
    const [profilePic, setProfilePic] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email] = useState("cgadev@mailinator.com"); // Email is not editable
    const [phoneNumber, setPhoneNumber] = useState("+92 342-2760791");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleProfilePicChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfilePic(URL.createObjectURL(event.target.files[0]));
            setOpenModal(false); // Close modal after selecting an image
        }
    };

    const handleSaveGeneralSettings = () => {
        console.log("General settings saved:", { firstName, lastName, phoneNumber });
    };

    const handleSavePassword = () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Password updated:", { currentPassword, newPassword });
    };

    return (
        <Box className="p-4" style={{ backgroundColor: "white", minHeight: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box style={{ width: '100%', maxWidth: '700px', paddingLeft: '14px', paddingRight: '14px' }}>
                <Typography variant="h4" component="h1" className="mb-4" align="center">Account Settings</Typography>

                <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange} 
                    aria-label="account settings tabs"
                    indicatorColor="primary"
                    textColor="primary" 
                    TabIndicatorProps={{
                        style: {
                          backgroundColor: '#f44336', 
                        }
                    }}
                    style={{ marginBottom: '16px' }} 
                >
                    <Tab 
                        label="General" 
                        icon={<AccountCircle />} 
                        iconPosition="start"
                        style={{
                            color: tabValue === 0 ? '#f44336' : 'inherit',
                        }} 
                    />
                    <Tab 
                        label="Change Password" 
                        icon={<Lock />} 
                        iconPosition="start"
                        style={{
                            color: tabValue === 1 ? '#f44336' : 'inherit',
                        }} 
                    />
                </Tabs>

                {tabValue === 0 && (
                    <Card className="mb-4">
                        <CardContent>
                            <Typography variant="h5" component="h2" className="mb-2">General Settings</Typography>
                            
                            {/* Profile Picture Preview */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
                                <div 
                                    onClick={() => setOpenModal(true)} 
                                    style={{
                                        width: '90px',
                                        height: '90px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        border: '2px solid #ccc',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#f0f0f0',
                                        cursor: 'pointer' // Change cursor to pointer
                                    }}
                                >
                                    {profilePic ? (
                                        <img src={profilePic} alt="Profile Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <Typography variant="caption" color="textSecondary">Upload photo</Typography>
                                    )}
                                </div>
                            </div>

                            <TextField
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email Address"
                                value={email}
                                disabled
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <Button 
                                variant="contained" 
                                style={{ backgroundColor: '#f44336', color: 'white' }} 
                                onClick={handleSaveGeneralSettings} 
                                className="px-4 py-1 hover:bg-red-700 rounded"
                            >
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {tabValue === 1 && (
                    <Card className="mb-4">
                        <CardContent>
                            <Typography variant="h5" component="h2" className="mb-2">Change Password</Typography>
                            <TextField
                                label="Current Password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="New Password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Confirm New Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <Button 
                                variant="contained" 
                                style={{ backgroundColor: '#f44336', color: 'white' }} 
                                onClick={handleSavePassword} 
                                className="px-4 py-1 hover:bg-red-700 rounded"
                            >
                                Save Password
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Modal for Profile Picture Upload */}
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box 
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" component="h2" className="mb-2">Upload Profile Picture</Typography>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleProfilePicChange} 
                            style={{ width: "100%" }} 
                        />
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default AccountSettings;
