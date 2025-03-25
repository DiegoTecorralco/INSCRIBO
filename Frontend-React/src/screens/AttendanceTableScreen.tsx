import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const AttendanceTableScreen = () => {
  const students = [
    { id: 1, matricula: '220773', nombre: 'Artiaga Quiroga Ailton', status: 'Activo', puntual: true, retardo: false, falta: false },
    { id: 2, matricula: '230365', nombre: 'Jimenez Castillo Jose Agustin', status: 'Activo', puntual: false, retardo: true, falta: false },
    { id: 3, matricula: '230315', nombre: 'Fosado Escudero Carlos Isaac', status: 'Inactivo', puntual: false, retardo: false, falta: true },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pase de lista</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoButton}>Nombre profesor: </Text>
        <Text style={styles.infoButton}>Materia: </Text>
        <Text style={styles.infoButton}>Grupo: </Text>
      </View>

      <ScrollView style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Matrícula</Text>
          <Text style={styles.tableHeaderText}>Nombre</Text>
          <Text style={styles.tableHeaderText}>Status</Text>
          <Text style={styles.tableHeaderText}>Asistecia</Text>
          
        </View>
        {students.map((student) => (
          <View key={student.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{student.matricula}</Text>
            <Text style={styles.tableCell}>{student.nombre}</Text>
            <Text style={styles.tableCell}>{student.status}</Text>
            <View style={[styles.statusCell, student.puntual && styles.puntual]} />
            <View style={[styles.statusCell, student.retardo && styles.retardo]} />
            <View style={[styles.statusCell, student.falta && styles.falta]} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2563EB', textAlign: 'center' },
  infoContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  infoButton: { backgroundColor: '#2563EB', color: 'white', padding: 10, borderRadius: 10, fontWeight: 'bold' },
  tableContainer: { backgroundColor: '#E5E7EB', borderRadius: 10, padding: 10 },
  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#2563EB', padding: 10, borderRadius: 5 },
  tableHeaderText: { fontWeight: 'bold', color: 'white', flex: 1, textAlign: 'center' },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f0f0f0', marginBottom: 5, padding: 10, borderRadius: 5 },
  tableCell: { flex: 1, textAlign: 'center' },
  statusCell: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#d1d5db' },
  puntual: { backgroundColor: '#22c55e' },
  retardo: { backgroundColor: '#facc15' },
  falta: { backgroundColor: '#ef4444' },
});

export default AttendanceTableScreen;
