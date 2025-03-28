import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getAsistencia } from '../services/apiInscribo';

const AttendanceTableScreen = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAsistencia = async () => {
            try {
                const data = await getAsistencia();
                setStudents(data);
            } catch (error) {
                setError(error.message || 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchAsistencia();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Pase de lista</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#2563EB" />
            ) : error ? (
                <Text style={styles.error}>Error: {error}</Text>
            ) : (
                <ScrollView style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Matrícula</Text>
                        <Text style={styles.tableHeaderText}>Nombre</Text>
                        <Text style={styles.tableHeaderText}>Asistencia</Text>
                    </View>
                    {students.map((student) => (
                        <View key={student.idProgramado} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{student.idProgramado}</Text>
                            <Text style={styles.tableCell}>{student.nombre}</Text>
                            <Text style={styles.tableCell}>{student.tipoAsistencia}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    error: { color: 'red', textAlign: 'center', marginBottom: 10 },
    tableContainer: { backgroundColor: '#e5e7eb', padding: 10, borderRadius: 10 },
    tableHeader: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#2563EB', padding: 10 },
    tableHeaderText: { fontWeight: 'bold', color: 'white', flex: 1, textAlign: 'center' },
    tableRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f0f0f0', padding: 10, marginBottom: 5, borderRadius: 5 },
    tableCell: { flex: 1, textAlign: 'center' },
});

export default AttendanceTableScreen;