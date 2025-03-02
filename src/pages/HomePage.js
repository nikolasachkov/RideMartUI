import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, CircularProgress, Alert } from "@mui/material";
import AdList from "../components/advertisements/AdList";

const HomePage = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likedAds] = useState({});

    useEffect(() => {
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
    }, []);

    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    if (error) return <Alert severity="error">{error}</Alert>;

    return <AdList ads={ads} likedAds={likedAds} handleLike={() => {}} />;
};

export default HomePage;
