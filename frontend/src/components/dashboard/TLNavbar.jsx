import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography, Button } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const TLNavbar = ({ mode, toggleMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Handle opening the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle mode toggle and navigation
  const handleModeToggle = () => {
    toggleMode(); // Flip the mode in parent
    const newRoute = mode === "teamLead" ? "/employee-dashboard" : "/tl-dashboard";
    navigate(newRoute); // Navigate to the corresponding dashboard
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" pl={4} pr={4} pt={2} pb={2}>
      {/* Search Box */}
      <Box display="flex" backgroundColor="rgba(255, 170, 0, 0.2)" borderRadius="20px" alignItems="center">
        <InputBase sx={{ ml: 3, flex: 1, borderRadius: 8 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icon Buttons */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Mode Toggle Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleModeToggle}
          sx={{
            textTransform: "capitalize",
            backgroundColor: "#007BFF",
            ":hover": { backgroundColor: "#0056b3" },
          }}
        >
          Switch to {mode === "teamLead" ? "Employee" : "Team Lead"} Mode
        </Button>

        {/* Notification Icon */}
        <IconButton type="button" sx={{ p: 1 }}>
          <NotificationsOutlinedIcon />
        </IconButton>

        {/* Profile Icon */}
        <IconButton type="button" sx={{ p: 1 }} onClick={handleMenuOpen}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      {/* Popup Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <AccountCircleIcon sx={{ mr: 1 }} />
          <Typography>My Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <SettingsOutlinedIcon sx={{ mr: 1 }} />
          <Typography>Settings</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <LogoutIcon sx={{ mr: 1 }} />
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TLNavbar;
