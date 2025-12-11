import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import QRScannerModal from "../components/QRScannerModal";

const ReportForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [isScannerVisible, setIsScannerVisible] = useState(false);

    const handleScan = (data: string) => {
        try {
            const parsedData = JSON.parse(data);
            if (parsedData.name) {
                setLocation(parsedData.name);
            } else {
                Alert.alert("Invalid QR Code", "The scanned code does not contain valid location data.");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to parse QR code data.");
        }
    };

    const handleSubmit = () => {
        if (!title || !description || !location) {
            Alert.alert("Error", "All fields are required.");
            return;
        }
        console.log("Report Submitted:", { title, description, location });
        Alert.alert("Success", "Your report has been submitted.");
        // TODO: Replace with API call to submit the report
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Submit a Safety Report</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <View style={styles.row}>
                <TextInput
                    style={[styles.input, styles.locationInput]}
                    placeholder="Location"
                    value={location}
                    onChangeText={setLocation}
                />
                <Button title="Scan" onPress={() => setIsScannerVisible(true)} />
            </View>
            <QRScannerModal
                visible={isScannerVisible}
                onClose={() => setIsScannerVisible(false)}
                onScan={handleScan}
            />
            <Button title="Submit Report" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    locationInput: {
        flex: 1,
        marginBottom: 0,
        marginRight: 10,
    },
});

export default ReportForm;
