import { FC, useReducer } from 'react';
import { Stack, Button } from '@mui/material';

enum CounterAction {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}

const reducer = (state: number, action: CounterAction) => {
  switch (action) {
    case CounterAction.INCREASE:
      return state + 1;
    case CounterAction.DECREASE:
      return state - 1;
    default:
      return state;
  }
};
const initialState = 0;

export const Counter: FC = () => {
  const [value, dispatch] = useReducer(reducer, initialState);
  return (
    <Stack>
      <p>Counter: {value}</p>
      <Button
        onClick={() => {
          dispatch(CounterAction.INCREASE);
        }}
      >
        Increase
      </Button>
      <Button
        onClick={() => {
          dispatch(CounterAction.DECREASE);
        }}
      >
        Decrease
      </Button>
    </Stack>
  );
};
