import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const AdCard = ({ ad, liked, handleLike }) => {
    return (
        <Card sx={{ display: "flex", cursor: "pointer", "&:hover": { boxShadow: 6 } }} onClick={() => (window.location.href = `/advertisements/${ad.id}`)}>
            <CardMedia component="img" sx={{ width: 280, height: 200, objectFit: "cover" }} image={ad.photos[0].photoUrl || "/placeholder.svg"} alt={ad.title} />
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography variant="h5">{ad.title}</Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                        {ad.motorbikeDetails.price} лв.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Location: {ad.city}
                    </Typography>
                </CardContent>
                <Box sx={{ display: "flex", alignItems: "center", pl: 2, pb: 2 }}>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLike(ad.id);
                        }}
                    >
                        {liked ? <Favorite color="error" /> : <FavoriteBorder />}
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};

export default AdCard;
