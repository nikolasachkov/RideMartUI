import { useState, useEffect, useCallback } from "react";
import { Box, CircularProgress, Alert, Container, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router";
import AdList from "../components/features/advertisements/list/AdList";
import { getUserAdvertisements } from "../utils/api";

const MyAdsPage = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchUserAds = useCallback(async () => {
        setLoading(true);
        try {
            const userAds = await getUserAdvertisements();
            setAds(userAds);
        } catch (err) {
            setError("Failed to fetch your advertisements.");
            console.error("Error fetching user ads:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserAds();
    }, [fetchUserAds]);

    const handleCreateAd = () => {
        navigate("/create-advertisement");
    };

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
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <Typography variant="h4" component="h1">
                        My Advertisements
                    </Typography>
                </Box>

                {ads.length === 0 ? (
                    <Alert
                        severity="info"
                        action={
                            <Button color="inherit" size="small" onClick={handleCreateAd}>
                                Create Now
                            </Button>
                        }
                    >
                        You haven't created any advertisements yet. Create your first ad to get started!
                    </Alert>
                ) : (
                    <AdList ads={ads} />
                )}
            </Container>
        </Box>
    );
};

export default MyAdsPage;
