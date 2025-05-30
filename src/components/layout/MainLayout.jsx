import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import HeaderNavBar from "./HeaderNavBar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const MainLayout = ({ hasFilter, toggleFilter }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showFullHeader, setShowFullHeader] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        const handleScroll = () => {
            const show = window.scrollY < 100;
            setShowFullHeader(show);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        handleClose();
        navigate("/profile");
    };

    const handleLogout = () => {
        handleClose();
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    const handleCreateAd = () => {
        if (isLoggedIn) {
            navigate("/create-advertisement");
        } else {
            navigate("/login");
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <HeaderNavBar
                isLoggedIn={isLoggedIn}
                anchorEl={anchorEl}
                handleMenu={handleMenu}
                handleClose={handleClose}
                handleProfile={handleProfile}
                handleLogout={handleLogout}
                navigate={navigate}
                handleCreateAd={handleCreateAd}
                hasFilter={hasFilter}
                handleFilter={toggleFilter}
                showLogo={!showFullHeader}
            />
            <Outlet />
            <Footer />
        </Box>
    );
};

export default MainLayout;
