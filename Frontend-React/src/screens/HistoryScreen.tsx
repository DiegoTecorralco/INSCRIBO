// AccessHistoryScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const AccessHistoryScreen = () => {
  const accessLogs = [
    { id: 1, name: 'Juan Pérez', time: '2025-03-18 08:00' },
    { id: 2, name: 'Ana García', time: '2025-03-18 08:30' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Accesos</Text>
      <ScrollView>
        {accessLogs.map((log) => (
          <View key={log.id} style={styles.logItem}>
            <Text>{log.name} - {log.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logItem: {
    padding: 10,
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AccessHistoryScreen;
