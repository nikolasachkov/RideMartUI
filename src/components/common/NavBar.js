import React from "react";
import { AppBar, Toolbar, Box, Button, Menu, MenuItem, Avatar, IconButton, Typography } from "@mui/material";
import { AccountCircle, FilterList } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const NavBar = ({ isLoggedIn, anchorEl, handleMenu, handleClose, handleProfile, handleLogout, navigate, handleCreateAd, handleFilter, showLogo }) => {
    return (
        <AppBar position="sticky" color="default" elevation={1}>
            <Toolbar sx={{ justifyContent: "space-between", minHeight: { xs: "48px", sm: "56px" }, py: 0.5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={handleFilter} sx={{ mr: 2 }}>
                        <FilterList />
                    </IconButton>
                    <Button variant="contained" color="primary" onClick={handleCreateAd} sx={{ mr: 2 }}>
                        Create an Ad
                    </Button>
                    {showLogo && (
                        <Typography
                            variant="h6"
                            component={RouterLink}
                            to="/"
                            sx={{
                                color: "primary.main",
                                fontWeight: "bold",
                                textDecoration: "none",
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            RideMart
                        </Typography>
                    )}
                </Box>
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
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
