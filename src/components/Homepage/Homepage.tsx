import React, { useState, useEffect } from "react";
import { Container, Box, Card, CardContent, Typography, CircularProgress, Button } from "@mui/material";
import DogCard from "../DogCard/DogCard";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";


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
  const [filters, setfilters] = useState(['Breed']);
  const [selectedSort, setSelectedSort] = useState<string>("asc");



  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch(API_URL_Breeds, {
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

        const data: string[] = await response.json();
        setBreeds(data.sort());
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    

    

    fetchBreeds();
  }, []);

  useEffect(() => {
    const fetchList = async () => {
    const queryParams = new URLSearchParams();
    const urlWithDefaultSort = `${API_URL}?sort=breed:asc`;

      try {
        const response = await fetch(urlWithDefaultSort, {
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
        if(data.next) {
            setNextPage(data.next)
        }
        if(data.prev){
            setPrevPage(data.prev)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    

    

    fetchList();
  }, [breeds]);

  useEffect(() => {
    const fetchList = async () => {
    const queryParams = new URLSearchParams();
    if (selectedBreeds.length) {
          selectedBreeds.forEach((breed) => queryParams.append("breeds", breed));
        }
    
    const urlWithFilterParams = `${API_URL}?${queryParams.toString()}`;

      try {
        const response = await fetch(urlWithFilterParams, {
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
        if(data.next) {
            setNextPage(data.next)
        }
        if(data.prev){
            setPrevPage(data.prev)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    

    

    fetchList();
  }, [selectedBreeds]);

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
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred.");
        } finally {
          setLoading(false);
        }
      };
      fetchDogs()
  },[items])

  const getToPage = (page: string) => {
    const fetchList = async () => {
        try {
          const response = await fetch(`${BASE_API_URL}${page}`, {
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
          if(data.next) {
              setNextPage(data.next)
          }
          if(data.prev){
              setPrevPage(data.prev)
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred.");
        } finally {
          setLoading(false);
        }
      };
      fetchList();
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h3" gutterBottom>
        Homepage
      </Typography>

      {loading && <CircularProgress />}

      {error && <Typography color="error">{error}</Typography>}

      <Box display="flex" justifyContent="center" gap={3} mt={3}>
        <Filter label="Breed" options={breeds} selectedValues={selectedBreeds} setSelectedValues={setSelectedBreeds} />
        <Sort label={selectedSort} selectedSort={selectedSort} setSelectedSort={setSelectedSort}/>
      </Box>

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
        <Button onClick={() => getToPage(nextPage)}>Next Page</Button>
        <Button onClick={() => getToPage(prevPage)}>Prev Page</Button>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
