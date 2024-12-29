import React from "react";
import {Box, IconButton} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
    return(
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex" backgroundColor="rgba(255, 170, 0, 0.2)" borderRadius="2px">
            <InputBase sx={{ml:2, flex:1}} placeholder="Search"/>
            <IconButton type="button" sx={{p:1}}>
                <SearchIcon/>
            </IconButton>
            </Box>
            <Box display="flex">
                <IconButton type="button" sx={{p:1}}>
                    <NotificationsOutlinedIcon/>
                </IconButton>
                <IconButton type="button" sx={{p:1}}>
                    <PersonOutlinedIcon/>
                </IconButton>
            </Box>
        </Box>
    )
}
export default Navbar