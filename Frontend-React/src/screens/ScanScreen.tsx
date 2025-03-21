// RfidScannerScreen.tsx
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const RfidScannerScreen = () => {
  const [scannedId, setScannedId] = useState(null);

  const handleScan = () => {
    // Simular escaneo de tarjeta RFID
    const fakeRfidId = '123456'; // Este sería el ID obtenido del escaneo
    setScannedId(fakeRfidId);
  };

  return (
    <View style={styles.container}>
      <Button title="Escanear Tarjeta RFID" onPress={handleScan} />
      {scannedId && <Text>Tarjeta escaneada: {scannedId}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RfidScannerScreen;
