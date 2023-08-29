import { FC, PropsWithChildren } from 'react';
import { usePlanets } from 'src/app/swapi/hooks';
import { Planet } from '../planet';
import { Link } from 'react-router-dom';

const StarWarsContainer: FC<PropsWithChildren> = ({ children }) => (
  <>
    <h1>Star Wars</h1>
    {children}
  </>
);

export const StarWars: FC = () => {
  const { loading, error, planets, previous, next } = usePlanets();

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
            <Link
              key={planet.name}
              to={`/planets/${idx + 1}`}
              state={{ foo: 'bar', answer: 42 }}
            >
              <Planet name={planet.name} />
            </Link>
          );
        })}
      </ul>
      <div>
        {previous && <button onClick={previous}>Previous</button>}
        {next && <button onClick={next}>Next</button>}
      </div>
    </StarWarsContainer>
  );
};
