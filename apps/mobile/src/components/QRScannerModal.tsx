import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';

interface QRScannerModalProps {
    visible: boolean;
    onClose: () => void;
    onScan: (data: string) => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ visible, onClose, onScan }) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        if (visible) {
            getBarCodeScannerPermissions();
            setScanned(false);
        }
    }, [visible]);

    const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
        if (scanned) return;
        setScanned(true);
        onScan(data);
        onClose();
    };

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return (
            <Modal visible={visible} animationType="slide">
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                    <Button title="Close" onPress={onClose} />
                </View>
            </Modal>
        );
    }

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                <View style={styles.overlay}>
                    <Button title="Cancel" onPress={onClose} color="#FF0000" />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    overlay: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});

export default QRScannerModal;
