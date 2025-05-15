import { useState, useEffect } from "react";
import { Container, Typography, Paper, Box, Button, CircularProgress, Alert } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useNavigate, useParams } from "react-router";
import { getMotorcycleMakesAndModels, getAdvertisementById, updateAdvertisement, deleteAdvertisement } from "../utils/api";

import AdFormBasicInfo from "../components/features/advertisements/form/AdFormBasicInfo";
import AdFormMotorbikeDetails from "../components/features/advertisements/form/AdFormMotorbikeDetails";
import AdFormDescription from "../components/features/advertisements/form/AdFormDescription";
import AdFormPhoto from "../components/features/advertisements/form/AdFormPhoto";

const EditAdvertisementPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
    const [photoUrls, setPhotoUrls] = useState([]);
    const [makesAndModels, setMakesAndModels] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [makesAndModelsData, advertisementData] = await Promise.all([getMotorcycleMakesAndModels(), getAdvertisementById(id)]);
                setMakesAndModels(makesAndModelsData);
                setFormData({
                    title: advertisementData.title,
                    city: advertisementData.city,
                    street: advertisementData.street,
                    streetNumber: advertisementData.streetNumber,
                    description: advertisementData.description,
                    price: advertisementData.motorbikeDetails.price,
                    make: advertisementData.motorbikeDetails.make,
                    model: advertisementData.motorbikeDetails.model,
                    year: advertisementData.motorbikeDetails.year,
                    mileage: advertisementData.motorbikeDetails.mileage,
                    engineSize: advertisementData.motorbikeDetails.engineSize,
                    engineType: advertisementData.motorbikeDetails.engineType,
                    motorbikeType: advertisementData.motorbikeDetails.motorbikeType,
                    fuelSystemType: advertisementData.motorbikeDetails.fuelSystemType,
                });
                setPhotoUrls(advertisementData.photos.map((photo) => photo.photoUrl));
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load advertisement data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

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
                    price: Number.parseFloat(formData.price),
                    make: formData.make,
                    model: formData.model,
                    year: Number.parseInt(formData.year),
                    mileage: Number.parseInt(formData.mileage),
                    engineSize: Number.parseInt(formData.engineSize),
                    engineType: formData.engineType,
                    motorbikeType: formData.motorbikeType,
                    fuelSystemType: formData.fuelSystemType,
                },
                photoUrls: photoUrls.filter((url) => url.trim() !== ""),
            };

            const response = await updateAdvertisement(id, advertisementData);
            console.log("Advertisement updated:", response);
            navigate(`/advertisements/${id}`);
        } catch (error) {
            console.error("Error updating advertisement:", error);
            setError("Failed to update advertisement. Please try again.");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this advertisement?")) {
            try {
                await deleteAdvertisement(id);
                navigate("/my-ads");
            } catch (error) {
                console.error("Error deleting advertisement:", error);
                setError("Failed to delete advertisement. Please try again.");
            }
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Edit Advertisement
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Grid2 container spacing={3}>
                            <Grid2 size={12}>
                                <AdFormBasicInfo formData={formData} handleChange={handleChange} />
                            </Grid2>
                            <Grid2 size={12}>
                                <AdFormMotorbikeDetails formData={formData} handleChange={handleChange} makesAndModels={makesAndModels} />
                            </Grid2>
                            <Grid2 size={12}>
                                <AdFormDescription formData={formData} handleChange={handleChange} />
                            </Grid2>
                            <Grid2 size={12}>
                                <AdFormPhoto photoUrls={photoUrls} setPhotoUrls={setPhotoUrls} />
                            </Grid2>
                            <Grid2 size={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Update Advertisement
                                </Button>
                            </Grid2>
                        </Grid2>
                    </form>
                    <Box sx={{ mt: 3 }}>
                        <Button variant="contained" color="error" fullWidth onClick={handleDelete}>
                            Delete Advertisement
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default EditAdvertisementPage;
