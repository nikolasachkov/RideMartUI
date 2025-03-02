import { useState } from "react";
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
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filter, setFilter] = useState({
        city: "",
        make: "",
        model: "",
        minYear: "",
        maxYear: "",
        minPrice: "",
        maxPrice: "",
        engineType: "",
        motorbikeType: "",
    });

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route element={<MainLayout hasFilter isFilterOpen={isFilterOpen} toggleFilter={toggleFilter} />}>
                        <Route
                            path="/"
                            element={<HomePage isFilterOpen={isFilterOpen} toggleFilter={toggleFilter} filter={filter} handleFilterChange={handleFilterChange} />}
                        />
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
