import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from "@mui/material";
import { dogCard, dogImage, dogName, favoriteButton, favoriteMessage } from "./DogCard.styles";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}

interface DogProps {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
    location: Location;
    isFavorited: boolean;
    toggleFavorite: (id: string) => void;
}

const DogCard: React.FC<DogProps> = ({
    id, img, name, age, zip_code, breed, location, isFavorited, toggleFavorite
}) => {
    return (
        <Card
            sx={dogCard}
            role="region"
            aria-labelledby={`dog-name-${name}`}
        >
            <CardMedia
                component="img"
                height="200"
                image={img}
                alt={`A photo of ${name}, a ${age}-year-old ${breed}`}
                sx={dogImage}
            />

            <CardContent>
                <Typography id={`dog-name-${name}`} variant="h4" sx={dogName}>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Breed: <b>{breed}</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Age: <b>{age} years</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    City: <b>{location.city}</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ZIP: <b>{zip_code}</b>
                </Typography>
            </CardContent>

            <Box display="flex" alignItems="center" justifyContent="space-between" px={2} pb={2}>
                <IconButton
                    onClick={() => toggleFavorite(id)}
                    sx={favoriteButton}
                    aria-label={isFavorited ? "Unfavorite" : "Favorite"}
                >
                    {isFavorited ? <Favorite /> : <FavoriteBorder />}
                </IconButton>

                {isFavorited && (
                    <Typography variant="body2" sx={favoriteMessage}>
                        <b>{`${name} says "Thank you!"`}</b>
                    </Typography>
                )}
            </Box>
        </Card>
    );
};

export default DogCard;
