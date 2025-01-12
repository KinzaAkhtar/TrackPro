import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";



const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle opening the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" justifyContent="space-between" pl={4} pt={2}>
      {/* Search Box */}
      <Box display="flex" backgroundColor="rgba(255, 170, 0, 0.2)" borderRadius="20px">
        <InputBase sx={{ ml: 3, flex: 1, borderRadius: 8 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icon Buttons */}
      <Box display="flex" pr={2}>
        <IconButton type="button" sx={{ p: 1 }}>
          <NotificationsOutlinedIcon />
        </IconButton>
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
          <PersonOutlinedIcon sx={{ mr: 1 }} />
          <Typography>My Profile</Typography>

        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <SettingsOutlinedIcon sx={{ mr: 1 }} />
          <Typography>Settings</Typography>

        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <NavLink to="/login" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : " "} flex items-left  rounded-lg`} end>

            <LogoutIcon sx={{ mr: 1 }} />
            <Typography>Logout</Typography>
          </NavLink>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;
