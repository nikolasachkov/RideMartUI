import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { Link as RouterLink } from "react-router";

const LogoSection = ({ handleFilter, handleCreateAd, hasFilter }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
                variant="h5"
                onClick={() => {
                    if (window.location.pathname === "/") {
                        window.location.reload();
                    } else {
                        window.location.href = "/";
                    }
                }}
                sx={{
                    color: "primary.main",
                    fontWeight: "bold",
                    textDecoration: "none",
                    mr: 2,
                    cursor: "pointer",
                }}
            >
                RideMart
            </Typography>
            {hasFilter && (
                <IconButton onClick={handleFilter} sx={{ mr: 2 }}>
                    <FilterList />
                </IconButton>
            )}
            <Button variant="contained" color="primary" onClick={handleCreateAd}>
                Create an Ad
            </Button>
        </Box>
    );
};

export default LogoSection;
