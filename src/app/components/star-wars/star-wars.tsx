import {FC, PropsWithChildren} from 'react';
import {usePlanets} from 'src/app/swapi/hooks';
import {Planet} from '../planet';

const StarWarsContainer: FC<PropsWithChildren> = ({children}) => (
    <>
        <h1>Star Wars</h1>
        {children}
    </>
);

export const StarWars: FC = () => {
    const {loading, error, planets, previous, next} = usePlanets();

    if (loading) {
        return <StarWarsContainer>Loading...</StarWarsContainer>;
    }

    if (error) {
        return <StarWarsContainer>Something went wrong</StarWarsContainer>;
    }

    return (
        <StarWarsContainer>
            <ul>
                {planets?.map((planet, idx) => {
                    return (
                        <li key={planet.name}>
                            <Planet name={planet.name}/>
                        </li>
                    );
                })}
            </ul>
            <div>
                {previous && (
                    <button onClick={previous}>
                        Previous
                    </button>
                )}
                {next && (
                    <button onClick={next}>
                        Next
                    </button>
                )}
            </div>
        </StarWarsContainer>
    );
};
