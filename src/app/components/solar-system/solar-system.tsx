import { FC } from 'react';

const planets = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
];

export const SolarSystem: FC = () => {
  return (
    <>
      <h1>Solar System</h1>
      <ul>
        {planets.map((planet) => {
          return <li key={planet}>{planet}</li>;
        })}
      </ul>
    </>
  );
};
