import React, { useState, useEffect } from "react";
import { Container, Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import DogCard from "../DogCard/DogCard";

const API_URL = "https://frontend-take-home-service.fetch.com/dogs/search";
const API_URL_Dogs = "https://frontend-take-home-service.fetch.com/dogs";

interface Item {
  next: string;
  resultIds: string[];
  total: number;
}
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const HomePage: React.FC = () => {
  const [items, setItems] = useState<Item | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data: Item = await response.json();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    

    

    fetchList();
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
        try {
          const dogIds = items?.resultIds
          const response = await fetch(API_URL_Dogs, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify(dogIds),
          });
  
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
  
          const data = await response.json();
          setDogs(data);
          console.log(data)
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred.");
        } finally {
          setLoading(false);
        }
      };
      fetchDogs()
  },[items])

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h3" gutterBottom>
        Homepage
      </Typography>

      {loading && <CircularProgress />}

      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && dogs.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 4,
            marginTop: 4,
          }}
        >
          {dogs.map((dog) => (
            <DogCard key={dog.id} img={dog.img} name={dog.name} age={dog.age} zip_code={dog.zip_code} breed={dog.breed} />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
