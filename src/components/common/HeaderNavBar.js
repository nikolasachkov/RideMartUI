import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import LogoSection from "./LogoSection";
import UserActions from "./UserActions";

const HeaderNavBar = ({ isLoggedIn, anchorEl, handleMenu, handleClose, handleProfile, handleLogout, navigate, handleCreateAd, handleFilter }) => {
    return (
        <AppBar position="sticky" color="default" elevation={1}>
            <Toolbar sx={{ justifyContent: "space-between", minHeight: { xs: "48px", sm: "80px" }, py: 0.5 }}>
                <LogoSection handleFilter={handleFilter} handleCreateAd={handleCreateAd} />
                <UserActions
                    isLoggedIn={isLoggedIn}
                    anchorEl={anchorEl}
                    handleMenu={handleMenu}
                    handleClose={handleClose}
                    handleProfile={handleProfile}
                    handleLogout={handleLogout}
                    navigate={navigate}
                />
            </Toolbar>
        </AppBar>
    );
};

export default HeaderNavBar;
