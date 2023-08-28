import { FC } from 'react';

interface PlanetProps {
  name?: string;
}

export const Planet: FC<PlanetProps> = ({ name }) => {
  return <li>{name}</li>;
};

Planet.defaultProps = {
  name: 'Earth',
};
