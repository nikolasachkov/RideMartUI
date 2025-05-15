import React from "react";
import { Paper, Typography } from "@mui/material";

const AdDescription = ({ description }) => {
    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Description
            </Typography>
            <Typography variant="body1">{description}</Typography>
        </Paper>
    );
};

export default AdDescription;
