import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MapView from "../src/components/MapView";

describe("MapView Component", () => {
    it("renders the map with the correct initial center and zoom level", () => {
        render(<MapView latitude={37.7749} longitude={-122.4194} zoom={12} />);

        expect(screen.getByText(/Map centered at \(37.77, -122.42\) with zoom level 12/i)).toBeInTheDocument();
    });

    it("calls onLocationSelect when the map is clicked", () => {
        const mockOnLocationSelect = jest.fn();
        render(<MapView latitude={37.7749} longitude={-122.4194} zoom={12} onLocationSelect={mockOnLocationSelect} />);

        const mapElement = screen.getByText(/Map centered at \(37.77, -122.42\) with zoom level 12/i);
        fireEvent.click(mapElement);

        expect(mockOnLocationSelect).toHaveBeenCalledWith(37.7759, -122.4184); // Mocked adjusted coordinates
    });

    it("does not call onLocationSelect if the prop is not provided", () => {
        render(<MapView latitude={37.7749} longitude={-122.4194} zoom={12} />);

        const mapElement = screen.getByText(/Map centered at \(37.77, -122.42\) with zoom level 12/i);
        fireEvent.click(mapElement);

        // No errors should occur, and no function should be called
    });
});
