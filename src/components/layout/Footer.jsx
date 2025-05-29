import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Phone, Email } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: "auto",
                backgroundColor: "primary.main",
                color: "white",
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                    }}
                >
                    <Typography variant="body2">© {new Date().getFullYear()} RideMart. All rights reserved.</Typography>
                    <Box sx={{ display: "flex", gap: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Email fontSize="small" />
                            <Typography
                                variant="body2"
                                component="a"
                                href="mailto:support@ridemart.com"
                                sx={{ color: "inherit", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                            >
                                support@ridemart.com
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
