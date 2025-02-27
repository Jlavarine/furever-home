import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { dogCard, dogImage, dogName } from "./DogCard.styles";

interface DogProps {
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const DogCard: React.FC<DogProps> = ({ img, name, age, zip_code, breed }) => {
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
        <Typography id={`dog-name-${name}`} variant="h5" sx={dogName}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Breed: <b>{breed}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: <b>{age} years</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ZIP: <b>{zip_code}</b>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DogCard;
