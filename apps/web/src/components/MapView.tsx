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
            // In a real map, we'd calculate lat/long from click coordinates.
            // For this mock, we just use the center or slightly offset it to simulate "picking" a spot near the click,
            // or just rely on the prop update.
            // Let's just randomly offset slightly to show the "pin" moved effectively if it were dynamic.
            const newLatitude = latitude + (Math.random() - 0.5) * 0.01;
            const newLongitude = longitude + (Math.random() - 0.5) * 0.01;
            onLocationSelect(newLatitude, newLongitude);
        }
    };

    return (
        <div
            className="card center"
            style={{
                height: "400px",
                background: "#e0e0e0",
                cursor: onLocationSelect ? "crosshair" : "default",
                position: "relative",
                overflow: "hidden"
            }}
            onClick={handleMapClick}
        >
            <p>
                Map centered at ({latitude.toFixed(4)}, {longitude.toFixed(4)})<br />
                <small className="muted">Zoom: {zoom}</small>
            </p>
            {/* Mock Pin */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -100%)",
                fontSize: "2rem",
                pointerEvents: "none",
                color: "var(--color-danger)"
            }}>
                📍
            </div>
            {onLocationSelect && (
                <div style={{
                    position: "absolute",
                    bottom: "10px",
                    background: "rgba(255,255,255,0.8)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "0.8rem"
                }}>
                    Click to move pin
                </div>
            )}
        </div>
    );
};

export default MapView;
