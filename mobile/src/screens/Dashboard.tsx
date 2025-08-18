import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import apiService from "../services/apiService";

interface Report {
    id: number;
    title: string;
    description: string;
    location: string;
    status: "pending" | "in_review" | "resolved";
    createdAt: string;
}

const Dashboard: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await apiService.getReports();
                setReports(data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Safety Reports</Text>
            <FlatList
                data={reports}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.reportCard}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.location}>Location: {item.location}</Text>
                        <Text style={styles.status}>Status: {item.status}</Text>
                        <Text style={styles.date}>Created At: {new Date(item.createdAt).toLocaleDateString()}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    loadingText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
    reportCard: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        marginVertical: 8,
    },
    location: {
        fontSize: 14,
        color: "#555",
    },
    status: {
        fontSize: 14,
        color: "#007BFF",
        marginTop: 4,
    },
    date: {
        fontSize: 12,
        color: "#999",
        marginTop: 4,
    },
});

export default Dashboard;
