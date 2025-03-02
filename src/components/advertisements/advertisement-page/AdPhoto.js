import React from "react";
import { Box } from "@mui/material";

const AdPhoto = ({ imageUrl, title }) => {
    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
                overflow: "hidden",
                "& img": {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                },
            }}
        >
            <img src={imageUrl || "/placeholder.svg"} alt={title} />
        </Box>
    );
};

export default AdPhoto;
