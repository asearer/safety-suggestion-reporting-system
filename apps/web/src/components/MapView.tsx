import React from "react";

interface MapViewProps {
    latitude: number;
    longitude: number;
    zoom?: number;
    onLocationSelect?: (latitude: number, longitude: number) => void;
}

const MapView: React.FC<MapViewProps> = ({ latitude, longitude, zoom = 10, onLocationSelect }) => {
    const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (onLocationSelect) {
            const newLatitude = latitude + 0.001; // Mock adjustment for demonstration
            const newLongitude = longitude + 0.001;
            onLocationSelect(newLatitude, newLongitude);
        }
    };

    return (
        <div
            style={{
                width: "100%",
                height: "400px",
                backgroundColor: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ccc",
            }}
            onClick={handleMapClick}
        >
            <p>
                Map centered at ({latitude.toFixed(2)}, {longitude.toFixed(2)}) with zoom level {zoom}
            </p>
        </div>
    );
};

export default MapView;
