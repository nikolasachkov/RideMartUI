import { useState, useEffect } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import AdList from "../components/features/advertisements/list/AdList";
import AdFilter from "../components/features/advertisements/list/AdFilter";
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

    const isFiltered = Object.values(filter).some((v) => v);

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
            {ads.length === 0 ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Alert severity="info" sx={{ backgroundColor: "#e6f4fd" }}>
                        {isFiltered
                            ? "No advertisements match your filters. Try adjusting the filters and search again."
                            : "There are no advertisements posted yet. Be the first to create one!"}
                    </Alert>
                </Box>
            ) : (
                <AdList ads={ads} likedAds={likedAds} handleLike={() => {}} />
            )}
        </Box>
    );
};

export default HomePage;
