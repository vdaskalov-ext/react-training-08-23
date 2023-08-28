import {useState} from "react";

export const Joke = () => {
    const jokeUrl = 'https://api.chucknorris.io/jokes/random?category=dev';
    const [currentJoke, setCurrentJoke] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    return <div>
        <h1>Chuck Norris Jokes</h1>
        <p>Loading: {isLoading ? 'Loading' : 'Not loading'}</p>
        <button type="button" onClick={() => {
            setIsLoading(true);
            fetch(jokeUrl)
                .then(response => response.json())
                .then(data => setCurrentJoke(data.value))
                .finally(() => setIsLoading(false));
        }
        }>Fetch new joke
        </button>
        <span>Joke of the day: {currentJoke}</span>
    </div>;
}