import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { formatDisplayText } from "../../../../utils/stringFormatters";

const AdCard = ({ ad }) => {
    return (
        <Card sx={{ display: "flex", cursor: "pointer", "&:hover": { boxShadow: 6 } }} onClick={() => (window.location.href = `/advertisements/${ad.id}`)}>
            <CardMedia component="img" sx={{ width: 280, height: 200, objectFit: "cover" }} image={ad.photos?.[0]?.photoUrl ?? "/placeholder.svg"} alt={ad.title} />
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography variant="h5">{ad.title}</Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                        {ad.motorbikeDetails.price} лв.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDisplayText(ad.city)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDisplayText(ad.motorbikeDetails.make)} {formatDisplayText(ad.motorbikeDetails.model)}, {ad.motorbikeDetails.year}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {ad.motorbikeDetails.engineSize}cc
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {ad.motorbikeDetails.mileage} km
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default AdCard;
