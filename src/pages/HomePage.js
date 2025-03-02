import { useState, useEffect } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import AdList from "../components/advertisements/home-page/AdList";
import AdFilter from "../components/advertisements/home-page/AdFilter";
import { getFilteredAdvertisements, getMotorcycleMakesAndModels } from "../utils/api";

const HomePage = ({ isFilterOpen, toggleFilter, filter, handleFilterChange }) => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likedAds] = useState({});
    const [makesAndModels, setMakesAndModels] = useState({});

    const fetchAds = async (filterParams = {}) => {
        setLoading(true);
        try {
            const filteredAds = await getFilteredAdvertisements(filterParams);
            setAds(filteredAds);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch advertisements.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAds();
        getMotorcycleMakesAndModels().then(setMakesAndModels);
    }, []);

    const handleFilter = (filterParams) => {
        fetchAds(filterParams);
        toggleFilter();
    };

    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <AdFilter isOpen={isFilterOpen} onClose={toggleFilter} filter={filter} handleChange={handleFilterChange} onFilter={handleFilter} makesAndModels={makesAndModels} />
            <AdList ads={ads} likedAds={likedAds} handleLike={() => {}} />
        </Box>
    );
};

export default HomePage;
