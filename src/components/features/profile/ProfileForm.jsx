import { TextField, Button, Stack, Box, CircularProgress } from "@mui/material";

const ProfileForm = ({ formData, handleChange, handleSubmit, validationErrors, submitting, isEditing }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!validationErrors.username}
                    helperText={validationErrors.username}
                    disabled={submitting || !isEditing}
                />

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                    disabled={submitting || !isEditing}
                />

                <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={!!validationErrors.phoneNumber}
                    helperText={validationErrors.phoneNumber}
                    disabled={submitting || !isEditing}
                />

                {isEditing && (
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                        <Button type="button" variant="outlined" onClick={() => window.history.back()} disabled={submitting} sx={{ minWidth: 120 }}>
                            Cancel
                        </Button>

                        <Button type="submit" variant="contained" disabled={submitting} sx={{ minWidth: 120 }}>
                            {submitting ? <CircularProgress size={24} /> : "Save Changes"}
                        </Button>
                    </Box>
                )}
            </Stack>
        </form>
    );
};

export default ProfileForm;
