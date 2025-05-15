import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { Mail, Phone } from "@mui/icons-material";

const AdContacts = ({ phoneNumber, email }) => {
    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Contact Seller
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                    }}
                >
                    <Phone color="action" />
                    <Typography>{phoneNumber}</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                    }}
                >
                    <Mail color="action" />
                    <Typography>{email}</Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default AdContacts;
