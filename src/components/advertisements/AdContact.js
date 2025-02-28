import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { Phone, Email } from "@mui/icons-material";

const AdContact = ({ contactPhone, contactEmail }) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Contact Seller
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button variant="contained" startIcon={<Phone />} fullWidth>
                    {contactPhone}
                </Button>
                <Button variant="outlined" startIcon={<Email />} fullWidth>
                    {contactEmail}
                </Button>
            </Box>
            <Divider sx={{ my: 3 }} />
        </Box>
    );
};

export default AdContact;
