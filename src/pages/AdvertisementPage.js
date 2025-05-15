"use client";

import { useState, useEffect } from "react";
import { Container, CircularProgress, Alert, Box, Snackbar, Button } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { Edit as EditIcon } from "@mui/icons-material";

import AdBasicInfo from "../components/features/advertisements/detail/AdBasicInfo";
import AdDescription from "../components/features/advertisements/detail/AdDescription";
import AdMotorbikeDetails from "../components/features/advertisements/detail/AdMotorbikeDetails";
import AdContacts from "../components/features/advertisements/detail/AdContacts";
import PhotoSlider from "../components/ui/PhotoSlider";
import { getUserProfile, getSavedAdvertisements, saveAdvertisement, unsaveAdvertisement, getAuthenticatedUser } from "../utils/api";

const AdvertisementPage = () => {
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });
    const [savedAds, setSavedAds] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adResponse = await axios.get(`/api/advertisements/${id}`);
                setAd(adResponse.data);

                const userProfile = await getUserProfile(adResponse.data.userId);
                setUserProfile(userProfile);

                if (token) {
                    const savedAdsResponse = await getSavedAdvertisements();
                    setSavedAds(savedAdsResponse);

                    const isCurrentAdSaved = savedAdsResponse.some((savedAd) => savedAd.id === Number.parseInt(id));
                    setIsSaved(isCurrentAdSaved);

                    const authenticatedUser = await getAuthenticatedUser();
                    setLoggedInUserId(authenticatedUser.id);
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch advertisement details");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, token]);

    const handleToggleSave = async (adId) => {
        if (!token) {
            setSnackbar({
                open: true,
                message: "Please log in to save advertisements",
            });
            return;
        }

        try {
            if (isSaved) {
                await unsaveAdvertisement(adId);
                setSnackbar({ open: true, message: "Advertisement unsaved successfully" });
            } else {
                await saveAdvertisement(adId);
                setSnackbar({ open: true, message: "Advertisement saved successfully" });
            }
            setIsSaved(!isSaved);
        } catch (err) {
            setSnackbar({
                open: true,
                message: "Error saving/unsaving advertisement",
            });
            console.error("Error toggling save:", err);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleEditAd = () => {
        navigate(`/edit-advertisement/${id}`);
    };

    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );

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
                    <Grid2 size={8}>
                        <PhotoSlider photos={ad.photos} title={ad.title}></PhotoSlider>
                    </Grid2>
                    <Grid2 size={4}>
                        <AdBasicInfo
                            title={ad.title}
                            location={`${ad.city}, ${ad.street} St, No. ${ad.streetNumber}`}
                            price={ad.motorbikeDetails.price}
                            phoneNumber={userProfile.phoneNumber}
                            isSaved={isSaved}
                            onToggleSave={handleToggleSave}
                            adId={ad.id}
                        />
                        {loggedInUserId === ad.userId && (
                            <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleEditAd} fullWidth sx={{ mt: 2 }}>
                                Edit Ad
                            </Button>
                        )}
                    </Grid2>

                    <Grid2 size={8}>
                        <AdDescription description={ad.description} />
                    </Grid2>

                    <Grid2 size={8}>
                        <AdMotorbikeDetails details={ad.motorbikeDetails} />
                    </Grid2>

                    <Grid2 size={8}>
                        <AdContacts phoneNumber={userProfile.phoneNumber} email={userProfile.email} />
                    </Grid2>
                </Grid2>
            </Container>

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} message={snackbar.message} />
        </Box>
    );
};

export default AdvertisementPage;
