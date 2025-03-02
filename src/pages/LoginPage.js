import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = async (credentials, setError) => {
        try {
            const data = await login(credentials.username, credentials.password);

            if (data.token) {
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                setError("Login failed: No token received");
            }
        } catch (err) {
            console.error("Login error:", err);

            if (err.response) {
                const serverError = err.response.data.message || err.response.data.error || "Login failed";
                setError(serverError);
            } else if (err.request) {
                setError("No response from server. Please try again later.");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography component="h1" variant="h5">
                    Log in to RideMart
                </Typography>
                <LoginForm onSubmit={handleLogin} />
            </Paper>
        </Container>
    );
};

export default LoginPage;
