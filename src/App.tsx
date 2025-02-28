import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import HomePage from "./components/Homepage/Homepage";
import MatchPage from "./components/MatchPage/MatchPage";

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

const App: React.FC = () => {
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<HomePage setMatchedDog={setMatchedDog} />} />
                <Route path="/match" element={<MatchPage matchedDog={matchedDog} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
