import React, { useState, useEffect } from "react";
import { Container, Box, Card, CardContent, Typography, CircularProgress, Button, ButtonGroup } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import DogCard from "../DogCard/DogCard";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import Pagination from "../Pagination/Pagination";
import { pageContainer, headerBox, titleText, buttonGroup, filterBar, dogGrid, buttonStyles, errorText, srOnly } from "./Homepage.styles";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL, API_URL, API_URL_Breeds, API_URL_Dogs, API_URL_Match, API_URL_Logout, API_URL_Locations } from '../../constants'

interface HomePageProps {
    setMatchedDog: (dog: Dog | null) => void;
}

interface Item {
    next: string;
    prev: string;
    resultIds: string[];
    total: number;
}
interface Location {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
    location: Location
}

interface Match {
    match: string
}

const HomePage: React.FC<HomePageProps> = ({ setMatchedDog }) => {
    const [items, setItems] = useState<Item | null>(null);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [zipCodesAll, setZipCodesAll] = useState<string[]>([]);
    const [zipCodesFiltered, setZipCodesFiltered] = useState<string[]>([]);
    const [selectedZipCodes, setSelectedZipCodes] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [nextPage, setNextPage] = useState("");
    const [prevPage, setPrevPage] = useState("");
    const [selectedSortField, setSelectedSortField] = useState<string>("breed");
    const [selectedSortOrder, setSelectedSortOrder] = useState<string>("asc");
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
            selectedZipCodes.forEach((zip_code) => queryParams.append("zipCodes", zip_code));


            const apiUrl = pageUrl ? `${BASE_API_URL}${pageUrl}` : `${API_URL}?${queryParams.toString()}${selectedSortField ? '&' : '?'}sort=${selectedSortField}:${selectedSortOrder}`;

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
                const dogZipCodes = dogData.map((e: Dog) => e.zip_code)

                const locationResponse = await fetch(API_URL_Locations, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(dogZipCodes),
                });

                if (!locationResponse.ok) {
                    throw new Error(`Error: ${locationResponse.statusText}`);
                }

                const locationData: Location[] = await locationResponse.json();
                // I had to use this function this way because I believe there is a bug in the BE
                // Issue Summary:
                // When the frontend requests a list of dogs via /dogs/search, followed by fetching profiles via /dogs, 
                // and then locations via /locations, there is a consistent mismatch when the search is sorted by:

                // name:desc
                // age:desc

                // The resultIds returned from /dogs/search do not fully match the profiles returned by /dogs, 
                // or the locations returned by /locations. This results in missing dogs or misaligned location data, 
                // ultimately causing the UI to crash when trying to access zip_code.
                const dogDataWithLocation = dogData.map((dog: Dog, index: number) => {
                    if (!dog || !locationData[index]) {
                        console.warn(`Data mismatch at index ${index}`, { dog, location: locationData[index] });
                        return null;
                    }
                    return {
                        ...dog,
                        location: locationData[index]
                    };
                }).filter(Boolean);
                setDogs(dogDataWithLocation);

                if (!selectedZipCodes.length) {
                    const zipCodes = dogData.map((e: Dog) => e.zip_code)
                    setZipCodesAll(zipCodes)
                }
                const zipCodes = dogData.map((e: Dog) => e.zip_code)
                setZipCodesFiltered(zipCodes)

            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred.");
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchData();
    }, [selectedBreeds, selectedSortField, selectedSortOrder, selectedZipCodes]);

    useEffect(() => {

    }, [favorites, zipCodesAll, zipCodesFiltered]);

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
            const response = await fetch(API_URL_Logout, {
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

    useEffect(() => {
        if (!loading && dogs.length > 0) {
            document.getElementById('results-heading')?.focus();
        }
    }, [dogs]);


    return (
        <Container component="main" sx={pageContainer}>
            <Box component="header" sx={headerBox}>
                <Typography  variant="h1" sx={titleText}>
                    Furever Home
                </Typography>
                <ButtonGroup sx={buttonGroup}>
                    <Button onClick={() => logOut()} sx={buttonStyles} endIcon={<LogoutIcon />}>
                        Log Out
                    </Button>
                </ButtonGroup>
            </Box>

            {error && <Typography role="alert" sx={errorText}>{error}</Typography>}

            <section aria-labelledby="filters-heading">
                <Typography variant="h2" id="filters-heading" sx={srOnly}>
                    Filter and Sort Options
                </Typography>
                <Box sx={filterBar}>
                    <Filter label="Breed" options={breeds} selectedValues={selectedBreeds} setSelectedValues={setSelectedBreeds} />
                    <Filter label="ZipCode" options={zipCodesAll} selectedValues={selectedZipCodes} setSelectedValues={setSelectedZipCodes} />
                    <Sort
                        selectedSortField={selectedSortField}
                        setSelectedSortField={setSelectedSortField}
                        selectedSortOrder={selectedSortOrder}
                        setSelectedSortOrder={setSelectedSortOrder}
                    />
                    <Box id="favorites-helper-text" sx={srOnly}>
                        Select at least one dog as a favorite before generating a match.
                    </Box>
                    <ButtonGroup>
                        <Button aria-describedby="favorites-helper-text" disabled={!!!favorites.length} onClick={() => getMatch()} sx={buttonStyles}>
                            Generate a Perfect Match
                        </Button>
                    </ButtonGroup>
                </Box>
            </section>


            {loading && (
                <Box role="status" aria-live="polite">
                    <CircularProgress />
                    <Typography sx={srOnly}>Loading results...</Typography>
                </Box>
            )}

            {!loading && !error && dogs.length > 0 && (
                <section aria-labelledby="results-heading">
                    <Typography variant="h3" id="results-heading" sx={srOnly}>
                        Search Results
                    </Typography>
                    <Box sx={dogGrid}>
                        {dogs.map((dog) => (
                            <DogCard
                                key={dog.id}
                                {...dog}
                                isFavorited={favorites.includes(dog.id)}
                                toggleFavorite={toggleFavorite}
                            />
                        ))}
                    </Box>
                </section>
            )}

            <Box component="nav" aria-label="Pagination">
                <Pagination prevPage={prevPage} nextPage={nextPage} getToPage={getToPage} />
            </Box>
        </Container>
    )
};

export default HomePage;
