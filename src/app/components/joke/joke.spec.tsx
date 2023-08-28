import {render, screen} from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import {Joke} from "./joke";

global.fetch = jest.fn() as any;

describe('Joke', () => {
    it('should render successfully', () => {
        const {baseElement} = render(<Joke/>)
        expect(baseElement).toBeTruthy();
    });

    it('should display a header', () => {
        render(<Joke/>)
        const header = screen.getByText(/chuck norris jokes/i);
    });

    it('should give me a button to display a new joke', () => {
        render(<Joke/>)
        const button = screen.getByRole('button');
        expect(button).toBeTruthy();
    });

    it('should display new joke when button is clicked', async () => {
        render(<Joke/>)
        const button = screen.getByText(/fetch new joke/i);
        const expectedJoke = 'my-cool-chuck-norris-joke'
        mockFetch({value: expectedJoke})
        await userEvents.click(button);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(screen.getByText(expectedJoke, {exact: false})).toBeTruthy()
    });
})

const mockFetch = (data: object) => {
    (global.fetch as jest.Mock).mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        })
    );
};

const response = {
    value: 'my joke'
}