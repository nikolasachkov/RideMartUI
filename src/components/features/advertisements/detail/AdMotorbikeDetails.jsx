import React from "react";
import { Paper, Typography } from "@mui/material";
import { formatDisplayText, formatModelName } from "../../../../utils/stringFormatters";

const AdMotorbikeDetails = ({ details }) => {
    return (
        <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Motorbike Details
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
                Make: <strong>{formatDisplayText(details?.make)}</strong>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
                Model: <strong>{formatModelName(details?.model)}</strong>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
                Year: <strong>{details?.year}</strong>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
                Mileage: <strong>{details?.mileage} km</strong>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
                Engine Size: <strong>{details?.engineSize} cc</strong>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
                Engine Type: <strong>{formatDisplayText(details?.engineType)}</strong>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
                Motorbike Type: <strong>{formatDisplayText(details?.motorbikeType)}</strong>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
                Fuel System: <strong>{formatDisplayText(details?.fuelSystemType)}</strong>
            </Typography>
        </Paper>
    );
};

export default AdMotorbikeDetails;
