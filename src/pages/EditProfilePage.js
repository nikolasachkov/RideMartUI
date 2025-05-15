import { useState, useEffect } from "react";
import { Container, Typography, Box, Paper, CircularProgress, Alert, Avatar, Button } from "@mui/material";
import { AccountCircle, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { getAuthenticatedUser, updateUserProfile } from "../utils/api";
import ProfileForm from "../components/features/profile/ProfileForm";

const EditProfilePage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getAuthenticatedUser();
                setFormData({
                    username: userData.username || "",
                    email: userData.email || "",
                    phoneNumber: userData.phoneNumber || "",
                });
            } catch (err) {
                setError("Failed to load profile data. Please try again later.");
                console.error("Error fetching user data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (validationErrors[name]) {
            setValidationErrors((prev) => ({
                ...prev,
                [name]: null,
            }));
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.username.trim()) {
            errors.username = "Username is required";
        } else if (formData.username.length < 3) {
            errors.username = "Username must be at least 3 characters";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            errors.email = "Please enter a valid email address";
        }

        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = "Phone number is required";
        } else if (!phoneRegex.test(formData.phoneNumber)) {
            errors.phoneNumber = "Please enter a valid phone number";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setSuccess(false);

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            await updateUserProfile(formData);
            setSuccess(true);

            setTimeout(() => {
                navigate("/profile");
            }, 1500);
        } catch (err) {
            console.error("Error updating profile:", err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to update profile. Please try again later.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
                    <Button startIcon={<ArrowBack />} onClick={() => navigate("/profile")} sx={{ mr: 2 }}>
                        Back
                    </Button>
                    <Typography variant="h4">Edit Profile</Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Profile updated successfully!
                    </Alert>
                )}

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
                </Box>

                <ProfileForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    validationErrors={validationErrors}
                    submitting={submitting}
                    isEditing={true}
                />
            </Paper>
        </Container>
    );
};

export default EditProfilePage;
