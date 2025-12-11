import React from 'react';
import { render, screen } from '@testing-library/react';
import ReportCard from '../components/ReportCard';

test('renders report details', () => {
    const mockReport = {
        title: "Test Report",
        description: "This is a test description",
        location: "Test Location",
        status: "pending" as const,
        createdAt: new Date().toISOString()
    };

    render(<ReportCard {...mockReport} />);

    expect(screen.getByText(/Test Report/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test description/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Location/i)).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
});
