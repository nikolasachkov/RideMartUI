import React from "react";
import { Paper, Typography } from "@mui/material";

const AdSpecifications = ({ details }) => {
    return (
        <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Motorbike Details
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
                <p>
                    Make: <strong>{details?.make}</strong>
                </p>
                <p>
                    Model: <strong>{details?.model}</strong>
                </p>
                <p>
                    Year: <strong>{details?.year}</strong>
                </p>
                <p>
                    Mileage: <strong>{details?.mileage} km</strong>
                </p>
                <p>
                    Engine Size: <strong>{details?.engineSize} cc</strong>
                </p>
                <p>
                    Engine Type: <strong>{details?.engineType}</strong>
                </p>
                <p>
                    Motorbike Type: <strong>{details?.motorbikeType}</strong>
                </p>
                <p>
                    Fuel System: <strong>{details?.fuelSystemType}</strong>
                </p>
            </Typography>
        </Paper>
    );
};

export default AdSpecifications;
