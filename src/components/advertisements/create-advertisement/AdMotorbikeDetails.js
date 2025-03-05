import React from "react";
import { TextField, Typography, Box, MenuItem } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { formatModelName } from "../../../utils/stringFormatters";

const AdMotorbikeDetails = ({ formData, handleChange, makesAndModels }) => {
    const currentYear = new Date().getFullYear();

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Motorbike Details
            </Typography>
            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <TextField fullWidth select label="Make" name="make" value={formData.make} onChange={handleChange} required>
                        {Object.keys(makesAndModels).map((make) => (
                            <MenuItem key={make} value={make}>
                                {make}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid2>
                <Grid2 size={6}>
                    <TextField fullWidth select label="Model" name="model" value={formData.model} onChange={handleChange} required disabled={!formData.make}>
                        {formData.make &&
                            makesAndModels[formData.make].map((model) => (
                                <MenuItem key={model} value={model}>
                                    {formatModelName(model)}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        fullWidth
                        label="Year"
                        name="year"
                        type="number"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        inputProps={{
                            min: 1901,
                            max: currentYear + 1,
                        }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        fullWidth
                        label="Mileage"
                        name="mileage"
                        type="number"
                        value={formData.mileage}
                        onChange={handleChange}
                        required
                        InputProps={{
                            endAdornment: <span style={{ marginLeft: 8 }}>km</span>,
                        }}
                        inputProps={{ min: 0 }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        fullWidth
                        label="Engine Size"
                        name="engineSize"
                        type="number"
                        value={formData.engineSize}
                        onChange={handleChange}
                        required
                        InputProps={{
                            endAdornment: <span style={{ marginLeft: 8 }}>cc</span>,
                        }}
                        inputProps={{ min: 0 }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField fullWidth select label="Engine Type" name="engineType" value={formData.engineType} onChange={handleChange} required>
                        <MenuItem value="TWO_STROKE">Two Stroke</MenuItem>
                        <MenuItem value="FOUR_STROKE">Four Stroke</MenuItem>
                    </TextField>
                </Grid2>
                <Grid2 size={6}>
                    <TextField fullWidth select label="Motorbike Type" name="motorbikeType" value={formData.motorbikeType} onChange={handleChange} required>
                        <MenuItem value="ENDURO">Enduro</MenuItem>
                        <MenuItem value="MOTOCROSS">Motocross</MenuItem>
                        <MenuItem value="TRIAL">Trial</MenuItem>
                        <MenuItem value="SUPERMOTO">Supermoto</MenuItem>
                        <MenuItem value="ADVENTURE">Adventure</MenuItem>
                    </TextField>
                </Grid2>
                <Grid2 size={6}>
                    <TextField fullWidth select label="Fuel System" name="fuelSystemType" value={formData.fuelSystemType} onChange={handleChange} required>
                        <MenuItem value="CARBURETED">Carbureted</MenuItem>
                        <MenuItem value="FUEL_INJECTION">Fuel Injection</MenuItem>
                        <MenuItem value="TPI">TPI</MenuItem>
                        <MenuItem value="TBI">TBI</MenuItem>
                    </TextField>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default AdMotorbikeDetails;
