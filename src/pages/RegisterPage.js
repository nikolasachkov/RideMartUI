import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/api";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = async (formData, setError) => {
        try {
            await register(formData.username, formData.email, formData.password, formData.phoneNumber);
            navigate("/login");
        } catch (err) {
            setError("Failed to register. Please try again.");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography component="h1" variant="h5">
                    Register for RideMart
                </Typography>
                <RegisterForm onSubmit={handleRegister} />
            </Paper>
        </Container>
    );
};

export default RegisterPage;
