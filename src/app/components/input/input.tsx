import { FC } from 'react';

interface Props {
  onInputChange: (value: string) => void;
}

export const Input: FC<Props> = ({ onInputChange }) => (
  <input
    type="text"
    onChange={(event) => {
      //   console.log('Input changed');
      //   console.log(event.target.value);
      onInputChange(event.target.value);
    }}
    data-testid="input-element"
  />
);
