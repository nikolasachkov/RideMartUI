import { useState, useEffect } from "react";
import { Container, Typography, Box, Avatar, Button, Paper, CircularProgress, Alert, Stack } from "@mui/material";
import { AccountCircle, Email, Phone, Edit as EditIcon, Bookmark, PostAdd } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { getAuthenticatedUser } from "../utils/api";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getAuthenticatedUser();
                setUser(userData);
            } catch (err) {
                setError("Failed to load profile data. Please try again later.");
                console.error("Error fetching user data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
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
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                {/* Profile Header */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            mb: 2,
                            bgcolor: "primary.main",
                        }}
                    >
                        <AccountCircle sx={{ fontSize: 80 }} />
                    </Avatar>
                    <Typography variant="h4" gutterBottom>
                        {user?.username}
                    </Typography>
                </Box>

                {/* User Information */}
                <Box sx={{ mb: 4 }}>
                    <Stack spacing={2}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Email color="action" />
                            <Typography variant="body1">{user?.email}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Phone color="action" />
                            <Typography variant="body1">{user?.phoneNumber}</Typography>
                        </Box>
                    </Stack>
                </Box>

                {/* Action Buttons */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                    <Button variant="contained" startIcon={<PostAdd />} onClick={() => navigate("/my-ads")} sx={{ minWidth: 200 }}>
                        My Ads
                    </Button>
                    <Button variant="contained" startIcon={<Bookmark />} onClick={() => navigate("/saved-ads")} sx={{ minWidth: 200 }}>
                        Saved Ads
                    </Button>
                    <Button variant="contained" startIcon={<EditIcon />} onClick={() => navigate("/edit-profile")} sx={{ minWidth: 200 }}>
                        Edit Profile
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};

export default ProfilePage;
