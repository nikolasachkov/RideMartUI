import { useEffect } from "react";
import { TextField, Button, MenuItem, Typography, Box, Drawer, FormControl, InputLabel, Select } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { formatModelName } from "../../utils/stringFormatters";

const AdFilter = ({ isOpen, onClose, filter, handleChange, onFilter, makesAndModels }) => {
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (filter.make === "") {
            handleChange({ target: { name: "model", value: "" } });
        }
    }, [filter.make]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filter);
        onClose();
    };

    return (
        <Drawer anchor="left" open={isOpen} onClose={onClose}>
            <Box sx={{ width: 300, padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Filter Advertisements
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <TextField fullWidth label="City" name="city" value={filter.city} onChange={handleChange} />
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField fullWidth select label="Make" name="make" value={filter.make} onChange={handleChange}>
                                <MenuItem value="">Any</MenuItem>
                                {Object.keys(makesAndModels).map((make) => (
                                    <MenuItem key={make} value={make}>
                                        {make}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField fullWidth select label="Model" name="model" value={filter.model} onChange={handleChange} disabled={!filter.make}>
                                <MenuItem value="">Any</MenuItem>
                                {filter.make &&
                                    makesAndModels[filter.make].map((model) => (
                                        <MenuItem key={model} value={model}>
                                            {formatModelName(model)}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                fullWidth
                                label="Min Year"
                                name="minYear"
                                type="number"
                                value={filter.minYear}
                                onChange={handleChange}
                                inputProps={{
                                    min: 1901,
                                    max: currentYear + 1,
                                }}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                fullWidth
                                label="Max Year"
                                name="maxYear"
                                type="number"
                                value={filter.maxYear}
                                onChange={handleChange}
                                inputProps={{
                                    min: 1901,
                                    max: currentYear + 1,
                                }}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField fullWidth label="Min Price" name="minPrice" type="number" value={filter.minPrice} onChange={handleChange} />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField fullWidth label="Max Price" name="maxPrice" type="number" value={filter.maxPrice} onChange={handleChange} />
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField fullWidth select label="Engine Type" name="engineType" value={filter.engineType} onChange={handleChange}>
                                <MenuItem value="">Any</MenuItem>
                                <MenuItem value="TWO_STROKE">Two Stroke</MenuItem>
                                <MenuItem value="FOUR_STROKE">Four Stroke</MenuItem>
                            </TextField>
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField fullWidth select label="Motorbike Type" name="motorbikeType" value={filter.motorbikeType} onChange={handleChange}>
                                <MenuItem value="">Any</MenuItem>
                                <MenuItem value="ENDURO">Enduro</MenuItem>
                                <MenuItem value="MOTOCROSS">Motocross</MenuItem>
                                <MenuItem value="TRIAL">Trial</MenuItem>
                                <MenuItem value="SUPERMOTO">Supermoto</MenuItem>
                                <MenuItem value="ADVENTURE">Adventure</MenuItem>
                            </TextField>
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField fullWidth select label="Fuel System" name="fuelSystemType" value={filter.fuelSystemType} onChange={handleChange}>
                                <MenuItem value="">Any</MenuItem>
                                <MenuItem value="CARBURETED">Carbureted</MenuItem>
                                <MenuItem value="FUEL_INJECTION">Fuel Injection</MenuItem>
                                <MenuItem value="TPI">TPI</MenuItem>
                                <MenuItem value="TBI">TBI</MenuItem>
                            </TextField>
                        </Grid2>
                        <Grid2 size={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Apply Filters
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            </Box>
        </Drawer>
    );
};

export default AdFilter;
