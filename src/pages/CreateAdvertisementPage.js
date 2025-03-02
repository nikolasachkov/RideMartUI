import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Box, Button, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { getMotorcycleMakesAndModels, createAdvertisement } from "../utils/api";

import AdBasicInfo from "../components/advertisements/create-advertisement/AdBasicInfo";
import AdMotorbikeDetails from "../components/advertisements/create-advertisement/AdMotorbikeDetails";
import AdDescription from "../components/advertisements/create-advertisement/AdDescription";
import AdPhotoUpload from "../components/advertisements/create-advertisement/AdPhotoUpload";

const CreateAdvertisementPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        city: "",
        street: "",
        streetNumber: "",
        description: "",
        price: "",
        make: "",
        model: "",
        year: "",
        mileage: "",
        engineSize: "",
        engineType: "",
        motorbikeType: "",
        fuelSystemType: "",
    });
    const [photoUrls, setPhotoUrls] = useState([""]);
    const [makesAndModels, setMakesAndModels] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMakesAndModels = async () => {
            try {
                const data = await getMotorcycleMakesAndModels();
                setMakesAndModels(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching motorcycle makes and models:", error);
                setLoading(false);
            }
        };

        fetchMakesAndModels();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const advertisementData = {
                title: formData.title,
                description: formData.description,
                city: formData.city,
                street: formData.street,
                streetNumber: formData.streetNumber,
                motorbikeDetails: {
                    price: parseFloat(formData.price),
                    make: formData.make,
                    model: formData.model,
                    year: parseInt(formData.year),
                    mileage: parseInt(formData.mileage),
                    engineSize: parseInt(formData.engineSize),
                    engineType: formData.engineType,
                    motorbikeType: formData.motorbikeType,
                    fuelSystemType: formData.fuelSystemType,
                },
                photoUrls: photoUrls.filter((url) => url.trim() !== ""),
            };

            const response = await createAdvertisement(advertisementData);
            console.log("Advertisement created:", response);
            navigate(`/advertisements/${response.id}`);
        } catch (error) {
            console.error("Error creating advertisement:", error);
            // Handle error (e.g., show error message to user)
        }
    };

    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );


    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create New Advertisement
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid2 container spacing={3}>
                            <Grid2 size={12}>
                                <AdBasicInfo formData={formData} handleChange={handleChange} />
                            </Grid2>
                            <Grid2 size={12}>
                                <AdMotorbikeDetails formData={formData} handleChange={handleChange} makesAndModels={makesAndModels} />
                            </Grid2>
                            <Grid2 size={12}>
                                <AdDescription formData={formData} handleChange={handleChange} />
                            </Grid2>
                            <Grid2 size={12}>
                                <AdPhotoUpload photoUrls={photoUrls} setPhotoUrls={setPhotoUrls} />
                            </Grid2>
                            <Grid2 size={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Create Advertisement
                                </Button>
                            </Grid2>
                        </Grid2>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default CreateAdvertisementPage;
