import * as Location from "expo-location";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Requests permission to access the device's location.
 * @returns A promise that resolves to true if permission is granted, false otherwise.
 */
export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
}

/**
 * Gets the current location of the device.
 * @returns A promise that resolves to the current coordinates (latitude and longitude).
 * @throws An error if location permission is not granted or if the location cannot be retrieved.
 */
export async function getCurrentLocation(): Promise<Coordinates> {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    throw new Error("Location permission not granted");
  }

  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}

/**
 * Watches the device's location and calls the provided callback with updated coordinates.
 * @param callback - A function to call with the updated coordinates.
 * @returns A function to stop watching the location.
 */
export function watchLocation(
  callback: (coords: Coordinates) => void,
): () => void {
  const subscription = Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 1000,
      distanceInterval: 1,
    },
    (location: Location.LocationObject) => {
      callback({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    },
  );

  return () => {
    subscription.then((sub) => sub.remove());
  };
}
