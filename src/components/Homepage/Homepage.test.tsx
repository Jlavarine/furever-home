import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './Homepage';
import { BrowserRouter } from 'react-router-dom';

const mockSetMatchedDog = jest.fn();

describe('HomePage', () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <HomePage setMatchedDog={mockSetMatchedDog} />
            </BrowserRouter>
        );

        expect(screen.getByText('Furever Home')).toBeInTheDocument();
        expect(screen.getByText('Generate a Perfect Match')).toBeInTheDocument();
    });

    it('disables "Generate a Perfect Match" when no favorites are selected', () => {
        render(
            <BrowserRouter>
                <HomePage setMatchedDog={mockSetMatchedDog} />
            </BrowserRouter>
        );

        const matchButton = screen.getByRole('button', { name: /Generate a Perfect Match/i });
        expect(matchButton).toBeDisabled();
    });

    it('shows loading spinner initially', () => {
        render(
            <BrowserRouter>
                <HomePage setMatchedDog={mockSetMatchedDog} />
            </BrowserRouter>
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders breed and zip filters', () => {
        render(
            <BrowserRouter>
                <HomePage setMatchedDog={mockSetMatchedDog} />
            </BrowserRouter>
        );

        expect(screen.getByLabelText(/Filter by Breed/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Filter by ZipCode/i)).toBeInTheDocument();
    });

    it('renders sorting dropdowns', () => {
        render(
            <BrowserRouter>
                <HomePage setMatchedDog={mockSetMatchedDog} />
            </BrowserRouter>
        );

        expect(screen.getByLabelText('Sort By')).toBeInTheDocument();
        expect(screen.getByLabelText('Order')).toBeInTheDocument();
    });
});
