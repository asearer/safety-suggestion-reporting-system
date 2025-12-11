import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

test('renders button with label', () => {
    render(<Button label="Click me" onClick={() => { }} />);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button');
});

test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText(/Click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
});
