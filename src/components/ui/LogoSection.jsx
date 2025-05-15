import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { Link as RouterLink } from "react-router";

const LogoSection = ({ handleFilter, handleCreateAd, hasFilter }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            {hasFilter && (
                <IconButton onClick={handleFilter} sx={{ mr: 2 }}>
                    <FilterList />
                </IconButton>
            )}
            <Button variant="contained" color="primary" onClick={handleCreateAd} sx={{ mr: 2 }}>
                Create an Ad
            </Button>
            <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                    color: "primary.main",
                    fontWeight: "bold",
                    textDecoration: "none",
                }}
            >
                RideMart
            </Typography>
        </Box>
    );
};

export default LogoSection;
