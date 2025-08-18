import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface MapViewProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  onLocationSelect?: (latitude: number, longitude: number) => void;
}

const CustomMapView: React.FC<MapViewProps> = ({
  latitude,
  longitude,
  zoom = 10,
  onLocationSelect,
}) => {
  const handlePress = (event: any) => {
    if (onLocationSelect) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      onLocationSelect(latitude, longitude);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 1 / zoom,
          longitudeDelta: 1 / zoom,
        }}
        onPress={handlePress}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("Map interaction logged")}
      >
        <Text style={styles.buttonText}>Log Interaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CustomMapView;
