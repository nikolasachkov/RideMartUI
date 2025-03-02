import { Box, Avatar, Menu, MenuItem, Button, ListItemIcon } from "@mui/material";
import { AccountCircle, Bookmark } from "@mui/icons-material";

const UserActions = ({ isLoggedIn, anchorEl, handleMenu, handleClose, handleProfile, handleLogout, handleSavedAds, navigate }) => {
    return (
        <Box>
            {isLoggedIn ? (
                <div>
                    <Avatar onClick={handleMenu} sx={{ cursor: "pointer" }}>
                        <AccountCircle />
                    </Avatar>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        <MenuItem onClick={handleProfile}>
                            <ListItemIcon>
                                <AccountCircle fontSize="small" />
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleSavedAds}>
                            <ListItemIcon>
                                <Bookmark fontSize="small" />
                            </ListItemIcon>
                            Saved Ads
                        </MenuItem>
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
