import React from "react";
import { TextField, Typography, Box, Button, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const AdPhotoUpload = ({ photoUrls, setPhotoUrls }) => {
    const handleAddPhoto = () => {
        setPhotoUrls([...photoUrls, ""]);
    };

    const handleRemovePhoto = (index) => {
        const newPhotoUrls = photoUrls.filter((_, i) => i !== index);
        setPhotoUrls(newPhotoUrls);
    };

    const handlePhotoUrlChange = (index, value) => {
        const newPhotoUrls = [...photoUrls];
        newPhotoUrls[index] = value;
        setPhotoUrls(newPhotoUrls);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Photo URLs
            </Typography>
            {photoUrls.map((url, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <TextField
                        fullWidth
                        label={`Photo URL ${index + 1}`}
                        value={url}
                        onChange={(e) => handlePhotoUrlChange(index, e.target.value)}
                        placeholder="Enter the URL of the photo"
                    />
                    {photoUrls.length > 1 && (
                        <IconButton onClick={() => handleRemovePhoto(index)} color="error" sx={{ ml: 1 }}>
                            <Remove />
                        </IconButton>
                    )}
                </Box>
            ))}
            <Button
                startIcon={<Add />}
                onClick={handleAddPhoto}
                variant="contained"
                color={photoUrls[photoUrls.length - 1] ? "primary" : "default"}
                disabled={!photoUrls[photoUrls.length - 1]}
            >
                Add Photo
            </Button>
        </Box>
    );
};

export default AdPhotoUpload;
