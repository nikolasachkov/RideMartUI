import { Paper, Typography, Box, IconButton, Tooltip } from "@mui/material";
import { Phone, Bookmark as BookmarkIcon, BookmarkBorder } from "@mui/icons-material";

const AdBasicInfo = ({ title, location, price, phoneNumber, isSaved, onToggleSave, adId }) => {
    return (
        <Paper elevation={1} sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                    <Typography variant="h5" component="h1" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Location: {location}
                    </Typography>
                    <Typography
                        variant="h4"
                        color="primary"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            fontSize: "2rem",
                        }}
                    >
                        {price} лв.
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 2,
                        }}
                    >
                        <Phone color="primary" />
                        <Typography variant="h6">{phoneNumber}</Typography>
                    </Box>
                </Box>
                <Tooltip title={isSaved ? "Unsave advertisement" : "Save advertisement"}>
                    <IconButton onClick={() => onToggleSave(adId)} color="primary">
                        {isSaved ? <BookmarkIcon fontSize="large" /> : <BookmarkBorder fontSize="large" />}
                    </IconButton>
                </Tooltip>
            </Box>
        </Paper>
    );
};

export default AdBasicInfo;
