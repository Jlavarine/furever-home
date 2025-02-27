import React, { useState, useEffect } from "react";
import { Container, Box, Card, CardContent, Typography, CircularProgress, Button } from "@mui/material";
import DogCard from "../DogCard/DogCard";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import Pagination from "../Pagination/Pagination";


const BASE_API_URL = "https://frontend-take-home-service.fetch.com";
const API_URL = "https://frontend-take-home-service.fetch.com/dogs/search";
const API_URL_Breeds = "https://frontend-take-home-service.fetch.com/dogs/breeds";
const API_URL_Dogs = "https://frontend-take-home-service.fetch.com/dogs";

interface Item {
    next: string;
    prev: string;
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
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [nextPage, setNextPage] = useState("");
    const [prevPage, setPrevPage] = useState("");
    const [selectedSort, setSelectedSort] = useState<string>("asc");



    const fetchData = async (pageUrl?: string) => {
        try {
            setLoading(true);
            setError("");

            const queryParams = new URLSearchParams();

            
            if (breeds.length === 0) {
                const breedResponse = await fetch(API_URL_Breeds, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    credentials: "include",
                });

                if (!breedResponse.ok) {
                    throw new Error(`Error: ${breedResponse.statusText}`);
                }

                const breedData: string[] = await breedResponse.json();
                setBreeds(breedData.sort());
            }

            
            selectedBreeds.forEach((breed) => queryParams.append("breeds", breed));

            
            const apiUrl = pageUrl ? `${BASE_API_URL}${pageUrl}` : `${API_URL}?${queryParams.toString()}${selectedSort ? '&': '?'}sort=breed:${selectedSort}`;
            
            const listResponse = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                credentials: "include",
            });

            if (!listResponse.ok) {
                throw new Error(`Error: ${listResponse.statusText}`);
            }

            const itemData: Item = await listResponse.json();
            setItems(itemData);
            setNextPage(itemData.next || ""); 
            setPrevPage(itemData.prev || ""); 

            
            if (itemData.resultIds.length > 0) {
                const dogResponse = await fetch(API_URL_Dogs, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(itemData.resultIds),
                });

                if (!dogResponse.ok) {
                    throw new Error(`Error: ${dogResponse.statusText}`);
                }

                const dogData = await dogResponse.json();
                setDogs(dogData);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedBreeds, selectedSort]);



    const getToPage = (page: string) => {
        if (page) {
            fetchData(page);
        }
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h3" gutterBottom>
                Homepage
            </Typography>


            {error && <Typography color="error">{error}</Typography>}

            <Box display="flex" justifyContent="center" gap={3} mt={3}>
                <Filter label="Breed" options={breeds} selectedValues={selectedBreeds} setSelectedValues={setSelectedBreeds} />
                {selectedBreeds.length !== 1 ? <Sort label={selectedSort} selectedSort={selectedSort} setSelectedSort={setSelectedSort} /> : null}
            </Box>
            {loading && <CircularProgress />}
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
            
            <Pagination prevPage={prevPage} nextPage={nextPage} getToPage={getToPage} />
        </Container>
    );
};

export default HomePage;
