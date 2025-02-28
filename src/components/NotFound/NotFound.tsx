import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { notFoundContainer, errorNumber, errorMessage, buttonBox, buttonStyles, dogGif } from "./NotFound.styles"

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={notFoundContainer}>
            <Typography variant="h2" sx={errorNumber}>
                404
            </Typography>
            <img 
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnhqNGxiNXJhbDV3d2ZvdXVncWthbjdxaGYydThkaXlpYnh2Z2U5MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8lgqAbycBjosxjfi9k/giphy.gif" 
                alt="Black lab staring at camera confusingly"
                style={dogGif}
            />
            <Typography variant="h5" sx={errorMessage}>
                Oops! The page you are looking for does not exist.
            </Typography>
            <Box sx={buttonBox}>
                <Button variant="contained" onClick={() => navigate("/")} sx={buttonStyles}>
                    Go to Login
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;
