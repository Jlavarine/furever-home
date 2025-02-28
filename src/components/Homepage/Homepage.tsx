import React, { useState, useEffect } from "react";
import { Container, Box, Card, CardContent, Typography, CircularProgress, Button, ButtonGroup } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import DogCard from "../DogCard/DogCard";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import Pagination from "../Pagination/Pagination";
import { buttonStyles } from "./Homepage.styles";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL, API_URL, API_URL_Breeds, API_URL_Dogs, API_URL_Match }  from '../../constants'

interface HomePageProps {
    setMatchedDog: (dog: Dog | null) => void;
}

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

interface Match {
    match: string
}

const HomePage: React.FC<HomePageProps> = ({ setMatchedDog }) => {
    const [items, setItems] = useState<Item | null>(null);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [nextPage, setNextPage] = useState("");
    const [prevPage, setPrevPage] = useState("");
    const [selectedSort, setSelectedSort] = useState<string>("asc");
    const [favorites, setFavorites] = useState<string[]>([]);
    const [matchId, setMatchId] = useState<string>('');
    const navigate = useNavigate();


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


            const apiUrl = pageUrl ? `${BASE_API_URL}${pageUrl}` : `${API_URL}?${queryParams.toString()}${selectedSort ? '&' : '?'}sort=breed:${selectedSort}`;

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
    useEffect(() => {

    }, [favorites]);



    const getToPage = (page: string) => {
        if (page) {
            fetchData(page);
        }
    };

    const toggleFavorite = (dogId: string) => {
        setFavorites((favorites) =>
            favorites.includes(dogId)
                ? favorites.filter((id) => id !== dogId)
                : [...favorites, dogId]
        );
    };

    const getMatch = async () => {
        try {
            const matchResponse = await fetch(API_URL_Match, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                credentials: "include",
                body: JSON.stringify(favorites)
            });
    
            if (!matchResponse.ok) {
                throw new Error(`Error: ${matchResponse.statusText}`);
            }
    
            const match: Match = await matchResponse.json();
            setMatchId(match.match);
    
            console.log("Matched ID:", match.match);
    
            if (match.match) {
                const dogResponse = await fetch(API_URL_Dogs, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify([match.match]), 
                });
    
                if (!dogResponse.ok) {
                    throw new Error(`Error: ${dogResponse.statusText}`);
                }
    
                const dogData = await dogResponse.json();
    
                setMatchedDog(dogData[0]); 
                navigate("/match");
            }
        } catch (error) {
            console.error("Error fetching match and dog profile:", error);
        }
    };

    const logOut = async () => {
        try {
            const response = await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              credentials: "include",
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || "Logout failed. Please try again.");
            }
      
            setError("");
          } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An error occurred.");
          } finally {
            navigate('/')
          }
    }
    

    return (
        <Container sx={{ marginTop: 4 }}>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Furever Home
                </Typography>
                <ButtonGroup variant="contained" color="primary">
                    <Button onClick={() => logOut()}sx={buttonStyles} endIcon={<LogoutIcon/>}>Log Out</Button>
                </ButtonGroup>           
            </Box>


            {error && <Typography color="error">{error}</Typography>}

            <Box display="flex" justifyContent="center" gap={3} mt={3}>
                <Filter label="Breed" options={breeds} selectedValues={selectedBreeds} setSelectedValues={setSelectedBreeds} />
                {selectedBreeds.length !== 1 ? <Sort label={selectedSort} selectedSort={selectedSort} setSelectedSort={setSelectedSort} /> : null}
                <ButtonGroup variant="contained" color="primary">
                    <Button disabled={!!!favorites.length}  onClick={() => getMatch()}sx={buttonStyles}>Generate a Perfect Match</Button>
                </ButtonGroup>
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
                        <DogCard
                            key={dog.id}
                            id={dog.id}
                            img={dog.img}
                            name={dog.name}
                            age={dog.age}
                            zip_code={dog.zip_code}
                            breed={dog.breed}
                            isFavorited={favorites.includes(dog.id)}
                            toggleFavorite={toggleFavorite}
                        />
                    ))}
                </Box>
            )}
            <Pagination prevPage={prevPage} nextPage={nextPage} getToPage={getToPage} />
        </Container>
    );
};

export default HomePage;
