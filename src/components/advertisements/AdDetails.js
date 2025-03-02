import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Speed, CalendarToday, LocalGasStation, ColorLens, Build } from "@mui/icons-material";

const AdDetails = ({ ad }) => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                {ad.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
                ${ad.price}
            </Typography>

            <Box sx={{ my: 3 }}>
                <Grid2 container spacing={2}>
                    <Grid2 xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Speed color="action" />
                            <Typography>{ad.mileage} km</Typography>
                        </Box>
                    </Grid2>
                    <Grid2 xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CalendarToday color="action" />
                            <Typography>{ad.year}</Typography>
                        </Box>
                    </Grid2>
                    <Grid2 xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LocalGasStation color="action" />
                            <Typography>{ad.fuelType}</Typography>
                        </Box>
                    </Grid2>
                    <Grid2 xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <ColorLens color="action" />
                            <Typography>{ad.color}</Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>

            <Box sx={{ my: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Technical Specifications
                </Typography>
                <Grid2 container spacing={2}>
                    <Grid2 xs={6}>
                        <Chip icon={<Build />} label={`Engine: ${ad.engineSize}cc`} />
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
};

export default AdDetails;
