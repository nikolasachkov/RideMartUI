import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import { Phone, BookmarkIcon, BookmarkBorder } from "@mui/icons-material";

const AdInfo = ({ title, location, price, phoneNumber, onSave }) => {
    return (
        <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h5" component="h1" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Location: {location}
            </Typography>
            <Typography
                variant="h4"
                color="primary"
                gutterBottom
                sx={{
                    fontWeight: "bold",
                    fontSize: "2rem",
                }}
            >
                {price} лв.
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                }}
            >
                <Phone color="primary" />
                <Typography variant="h6">{phoneNumber}</Typography>
            </Box>
            <BookmarkBorder color="primary" fontSize={"large"}></BookmarkBorder>
        </Paper>
    );
};

export default AdInfo;
