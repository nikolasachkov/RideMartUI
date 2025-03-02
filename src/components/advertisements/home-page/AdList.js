import React from "react";
import { Container, Stack } from "@mui/material";
import AdCard from "./AdCard";

const AdList = ({ ads, likedAds, handleLike }) => {
    return (
        <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
            <Stack spacing={3}>
                {ads.map((ad) => (
                    <AdCard key={ad.id} ad={ad} liked={likedAds[ad.id]} handleLike={handleLike} />
                ))}
            </Stack>
        </Container>
    );
};

export default AdList;
