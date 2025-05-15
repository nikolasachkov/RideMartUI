import React from "react";
import { TextField, Typography, Box } from "@mui/material";

const AdFormDescription = ({ formData, handleChange }) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Description
            </Typography>
            <TextField fullWidth multiline rows={4} label="Description" name="description" value={formData.description} onChange={handleChange} required />
        </Box>
    );
};

export default AdFormDescription;
