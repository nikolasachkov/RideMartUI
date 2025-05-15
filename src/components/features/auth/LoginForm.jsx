import React, { useState } from "react";
import { Box, TextField, Button, Alert, Link } from "@mui/material";
import { useNavigate } from "react-router";

const LoginForm = ({ onSubmit }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        onSubmit({ username, password }, setError);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
            {error && (
                <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
                    {error}
                </Alert>
            )}

            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!error}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Log In
            </Button>
            <Box sx={{ textAlign: "center" }}>
                <Link
                    href="#"
                    variant="body2"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/register");
                    }}
                >
                    {"Don't have an account? Register"}
                </Link>
            </Box>
        </Box>
    );
};

export default LoginForm;
