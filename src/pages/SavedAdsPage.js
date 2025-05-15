import { useState, useEffect } from "react";
import { Container, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { getSavedAdvertisements } from "../utils/api";
import AdList from "../components/features/advertisements/list/AdList";
import axios from "axios";

const SavedAdsPage = () => {
    const [savedAds, setSavedAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSavedAds = async () => {
            try {
                const savedAdsResponse = await getSavedAdvertisements();

                const fullAdsPromises = savedAdsResponse.map((savedAd) => axios.get(`/api/advertisements/${savedAd.id}`));

                const fullAdsResponses = await Promise.all(fullAdsPromises);
                const fullAds = fullAdsResponses.map((response) => response.data);

                setSavedAds(fullAds);
            } catch (err) {
                setError("Failed to fetch saved advertisements. Please try again later.");
                console.error("Error fetching saved ads:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedAds();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Box>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Saved Advertisements
                </Typography>

                {savedAds.length === 0 ? (
                    <Alert severity="info">You don't have any saved advertisements yet. Browse ads and click the bookmark icon to save them.</Alert>
                ) : (
                    <AdList ads={savedAds} />
                )}
            </Container>
        </Box>
    );
};

export default SavedAdsPage;
