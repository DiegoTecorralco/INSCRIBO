import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const RfidScannerScreen = () => {
  const [scannedId, setScannedId] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);

    // Simular escaneo de tarjeta RFID (esto debería reemplazarse con lógica real de escaneo)
    setTimeout(() => {
      const fakeRfidId = '123456'; // Este sería el ID obtenido del escaneo
      setScannedId(fakeRfidId);
      setIsScanning(false);
    }, 2000); // Simula un retraso de 2 segundos en el escaneo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escanear Tarjeta RFID</Text>

      {/* Botón de escanear */}
      <TouchableOpacity style={styles.button} onPress={handleScan} disabled={isScanning}>
        <Text style={styles.buttonText}>{isScanning ? 'Escaneando...' : 'Escanear Tarjeta'}</Text>
      </TouchableOpacity>

      {/* Indicador de carga mientras escanea */}
      {isScanning && <ActivityIndicator size="large" color="#2563EB" style={styles.loader} />}

      {/* Mostrar el ID escaneado si existe */}
      {scannedId && !isScanning && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Tarjeta escaneada:</Text>
          <Text style={styles.scannedId}>{scannedId}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    width: '100%',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scannedId: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563EB',
    marginTop: 10,
  },
});

export default RfidScannerScreen;
