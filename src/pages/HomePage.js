import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import NavBar from "../components/common/NavBar";
import AdList from "../components/advertisements/AdList";

const HomePage = () => {
    const navigate = useNavigate();
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likedAds, setLikedAds] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showFullHeader, setShowFullHeader] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        axios
            .get("/api/advertisements")
            .then((res) => {
                setAds(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch advertisements.");
                setLoading(false);
            });

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
            navigate("/create-ad");
        } else {
            navigate("/login");
        }
    };

    const handleFilter = () => {
        // Implement filter functionality
        console.log("Filter button clicked");
    };

    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header showFullHeader={showFullHeader} />
            <NavBar
                isLoggedIn={isLoggedIn}
                anchorEl={anchorEl}
                handleMenu={handleMenu}
                handleClose={handleClose}
                handleProfile={handleProfile}
                handleLogout={handleLogout}
                navigate={navigate}
                handleCreateAd={handleCreateAd}
                handleFilter={handleFilter}
                showLogo={!showFullHeader}
            />
            <AdList ads={ads} likedAds={likedAds} handleLike={() => {}} />
            <Footer />
        </Box>
    );
};

export default HomePage;
