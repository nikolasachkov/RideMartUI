import React from "react";
import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Header = ({ showFullHeader }) => {
    return (
        <Box
            sx={{
                textAlign: "center",
                py: showFullHeader ? 4 : 0,
                transition: "all 0.3s ease-in-out",
                height: showFullHeader ? "auto" : 0,
                overflow: "hidden",
            }}
        >
            <Typography
                variant="h1"
                component={RouterLink}
                to="/"
                sx={{
                    color: "primary.main",
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    fontWeight: "bold",
                    textDecoration: "none",
                    lineHeight: 1,
                }}
            >
                RideMart
            </Typography>
        </Box>
    );
};

export default Header;
