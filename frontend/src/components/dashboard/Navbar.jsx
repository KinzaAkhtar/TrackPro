import React from "react";
import {Box, IconButton} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
    return(
        <Box display="flex" justifyContent="space-between" pl={4} pt={2} >
            <Box display="flex" backgroundColor="rgba(255, 170, 0, 0.2)" borderRadius="20px" >
            <InputBase sx={{ml:3, flex:1, borderRadius:8}} placeholder="Search"/>
            <IconButton type="button" sx={{p:1}}>
                <SearchIcon/>
            </IconButton>
            </Box>
            <Box display="flex" pr={2}>
                <IconButton type="button" sx={{p:1} }>
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