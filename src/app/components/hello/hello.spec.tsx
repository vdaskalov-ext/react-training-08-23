import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Hello } from './hello';

describe('Hello', () => {
  beforeAll(() => {
    // setup test bed
  });

  afterAll(() => {
    // tear down test bed
  });

  beforeEach(() => {
    // setup test
  });

  afterEach(() => {
    // setup test
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Hello />);
    expect(baseElement).toBeTruthy();
    screen.getByText(/Hello/i); // throw if not found
    // screen.queryByText(/Hello/i); // return null if not found
  });

  it('should show name when clicked', async () => {
    const expectedName = 'test name';
    render(<Hello name={expectedName} />);
    const button = screen.getByRole('button', { name: /toggle name/i });
    await userEvent.click(button);
    screen.getByText(`Hello ${expectedName}!`);
  });
});
