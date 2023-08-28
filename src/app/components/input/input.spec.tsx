import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './input';

describe('Hello', () => {
  let onInputChange: jest.Mock;

  beforeAll(() => {
    onInputChange = jest.fn();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Input onInputChange={onInputChange} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully', async () => {
    render(<Input onInputChange={onInputChange} />);
    const input = screen.getByTestId('input-element');
    const expectedInput = 'expected input';
    await userEvent.type(input, expectedInput);
    expect(onInputChange).toHaveBeenCalledWith(expectedInput);
  });
});
