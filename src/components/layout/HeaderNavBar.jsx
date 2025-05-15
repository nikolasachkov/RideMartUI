import { AppBar, Toolbar } from "@mui/material";
import LogoSection from "../ui/LogoSection";
import UserActions from "../features/auth/UserActions";

const HeaderNavBar = ({ isLoggedIn, anchorEl, handleMenu, handleClose, handleProfile, handleLogout, navigate, handleCreateAd, handleFilter, hasFilter }) => {
    const handleSavedAds = () => {
        navigate("/saved-ads");
        handleClose();
    };

    return (
        <AppBar position="sticky" color="default" elevation={1}>
            <Toolbar sx={{ justifyContent: "space-between", minHeight: { xs: "48px", sm: "80px" }, py: 0.5 }}>
                <LogoSection hasFilter={hasFilter} handleFilter={handleFilter} handleCreateAd={handleCreateAd} navigate={navigate} />
                <UserActions
                    isLoggedIn={isLoggedIn}
                    anchorEl={anchorEl}
                    handleMenu={handleMenu}
                    handleClose={handleClose}
                    handleProfile={handleProfile}
                    handleLogout={handleLogout}
                    handleSavedAds={handleSavedAds}
                    navigate={navigate}
                />
            </Toolbar>
        </AppBar>
    );
};

export default HeaderNavBar;
