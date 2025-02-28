import React from "react";
import { Paper } from "@mui/material";

const AdImage = ({ imageUrl, title }) => {
    return (
        <Paper elevation={3} sx={{ height: 400, overflow: "hidden" }}>
            <img src={imageUrl || "/placeholder.svg"} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Paper>
    );
};

export default AdImage;
