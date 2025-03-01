import React from "react";
import { useNavigate } from "react-router-dom";
import CelebrationIcon from '@mui/icons-material/Celebration';
import { Box, Typography, Card, CardMedia, CardContent, Container, Button } from "@mui/material";
import { matchContainer, matchCard, matchImage, matchDetails, matchTitle, backButton, celebrationIcon } from "./MatchPage.styles";

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

interface MatchPageProps {
    matchedDog: Dog | null;
}

const MatchPage: React.FC<MatchPageProps> = ({ matchedDog }) => {
    const navigate = useNavigate();

    if (!matchedDog) {
        return (
            <Container sx={matchContainer}>
                <Typography variant="body1" color="error">
                    No match found. Please go back and select favorites first.
                </Typography>
                <Button
                    onClick={() => navigate("/home")}
                    sx={backButton}
                >
                    Back to Home
                </Button>
            </Container>
        );
    }

    return (
        <Container component="main" sx={matchContainer}>
            <Typography variant="h1" sx={matchTitle}>
                <CelebrationIcon sx={celebrationIcon} />
                Meet Your Perfect Match!
                <CelebrationIcon sx={celebrationIcon} />
            </Typography>

            <Card sx={matchCard}>
                <CardMedia
                    component="img"
                    image={matchedDog.img}
                    alt={`Photo of ${matchedDog.name}`}
                    sx={matchImage}
                />
                <CardContent sx={matchDetails}>
                    <Typography variant="h2">{matchedDog.name}</Typography>
                    <Typography variant="body1"><b>Breed:</b> {matchedDog.breed}</Typography>
                    <Typography variant="body1"><b>Age:</b> {matchedDog.age} years</Typography>
                    <Typography variant="body1"><b>Zip Code:</b> {matchedDog.zip_code}</Typography>
                </CardContent>
            </Card>
            <Button
                onClick={() => navigate("/home")}
                sx={backButton}
            >
                Back to Home
            </Button>
        </Container>
    );
};

export default MatchPage;
