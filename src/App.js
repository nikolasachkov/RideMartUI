import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdvertisementPage from "./pages/AdvertisementPage";
import MainLayout from "./layouts/MainLayout";
import CreateAdvertisementPage from "./pages/CreateAdvertisementPage";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "white",
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route element={<MainLayout hasFilter />}>
                        <Route path="/" element={<HomePage />} />
                    </Route>
                    <Route element={<MainLayout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/advertisements/:id" element={<AdvertisementPage />} />
                        <Route path="/create-advertisement" element={<CreateAdvertisementPage />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
