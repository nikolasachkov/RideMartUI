import React, { useState, useEffect } from "react";
import { Container, Box, CircularProgress, Alert, Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/common/Header";
import AdImage from "../components/advertisements/AdImage";
import AdDetails from "../components/advertisements/AdDetails";
import AdContact from "../components/advertisements/AdContact";

const AdvertisementPage = () => {
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const response = await axios.get(`/api/advertisements/${id}`);
                setAd(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch advertisement details");
                setLoading(false);
            }
        };

        fetchAd();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid2 container spacing={4}>
                    <Grid2 xs={12} md={6}>
                        <AdImage imageUrl={ad.imageUrl} title={ad.title} />
                    </Grid2>
                    <Grid2 xs={12} md={6}>
                        <AdDetails ad={ad} />
                        <AdContact contactPhone={ad.contactPhone} contactEmail={ad.contactEmail} />
                    </Grid2>
                    <Grid2 xs={12}>
                        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Description
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                                {ad.description}
                            </Typography>
                        </Paper>
                    </Grid2>
                </Grid2>
            </Container>
        </>
    );
};

export default AdvertisementPage;
