import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Alert, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import axios from "axios";

import AdInfo from "../components/advertisements/advertisement-page/AdInfo";
import AdDescription from "../components/advertisements/advertisement-page/AdDescription";
import AdSpecifications from "../components/advertisements/advertisement-page/AdSpecifications";
import AdContacts from "../components/advertisements/advertisement-page/AdContacts";
import PhotoSlider from "../components/advertisements/advertisement-page/PhotoSlider";
import { getUserProfile } from "../utils/api";

const AdvertisementPage = () => {
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const adResponse = await axios.get(`/api/advertisements/${id}`);
                setAd(adResponse.data);

                const userProfile = await getUserProfile(adResponse.data.userId);
                setUserProfile(userProfile);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch advertisement details");
            } finally {
                setLoading(false);
            }
        };

        fetchAd();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!ad) return <Alert severity="info">Advertisement not found</Alert>;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    py: 4,
                    flex: 1,
                    "& .MuiPaper-root": {
                        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                    },
                }}
            >
                <Grid2 container spacing={3}>
                    {/* Top row */}
                    <Grid2 size={8}>
                        <PhotoSlider photos={ad.photos} title={ad.title}></PhotoSlider>
                    </Grid2>
                    <Grid2 size={4}>
                        <AdInfo title={ad.title} location={ad.city} price={ad.motorbikeDetails.price} phoneNumber={userProfile.phoneNumber} />
                    </Grid2>

                    {/* Description row */}
                    <Grid2 size={8}>
                        <AdDescription description={ad.description} />
                    </Grid2>

                    {/* Specifications row */}
                    <Grid2 size={8}>
                        <AdSpecifications details={ad.motorbikeDetails} />
                    </Grid2>

                    {/* Contact form row */}
                    <Grid2 size={8}>
                        <AdContacts phoneNumber={userProfile.phoneNumber} email={userProfile.email} />
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    );
};

export default AdvertisementPage;
