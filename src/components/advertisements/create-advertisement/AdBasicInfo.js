// src/components/advertisements/create-advertisement/AdBasicInfo.js
import React from "react";
import { TextField, Typography, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";

const AdBasicInfo = ({ formData, handleChange }) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Basic Information
            </Typography>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} required />
                </Grid2>
                <Grid2 size={4}>
                    <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} required />
                </Grid2>
                <Grid2 size={4}>
                    <TextField fullWidth label="Street" name="street" value={formData.street} onChange={handleChange} required />
                </Grid2>
                <Grid2 size={4}>
                    <TextField fullWidth label="Street Number" name="streetNumber" value={formData.streetNumber} onChange={handleChange} required />
                </Grid2>
                <Grid2 size={4}>
                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        InputProps={{
                            endAdornment: <span style={{ marginLeft: 8 }}>лв.</span>,
                        }}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default AdBasicInfo;
