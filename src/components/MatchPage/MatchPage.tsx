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
    if (!matchedDog) {
        return <p>No match found. Please go back and select favorites first.</p>;
    }

    return (
        <div>
            <h1>Your Match!</h1>
            <p>Name: {matchedDog.name}</p>
            <p>Breed: {matchedDog.breed}</p>
            <p>Age: {matchedDog.age}</p>
            <p>Zip Code: {matchedDog.zip_code}</p>
            <img src={matchedDog.img} alt={`Photo of ${matchedDog.name}`} />
        </div>
    );
};

export default MatchPage;
