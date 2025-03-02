import React from "react";
import { Box, Avatar, Menu, MenuItem, Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const UserActions = ({ isLoggedIn, anchorEl, handleMenu, handleClose, handleProfile, handleLogout, navigate }) => {
    return (
        <Box>
            {isLoggedIn ? (
                <div>
                    <Avatar onClick={handleMenu} sx={{ cursor: "pointer" }}>
                        <AccountCircle />
                    </Avatar>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    </Menu>
                </div>
            ) : (
                <>
                    <Button variant="outlined" color="primary" onClick={() => navigate("/login")} sx={{ mr: 1 }}>
                        Log In
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => navigate("/register")}>
                        Register
                    </Button>
                </>
            )}
        </Box>
    );
};

export default UserActions;
