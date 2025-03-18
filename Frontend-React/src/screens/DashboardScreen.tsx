// DashboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StudentCard from '../components/StudentCard'; // Ajusta la ruta según tu estructura de carpetas
// Asegúrate de importar el componente StudentCard

const DashboardScreen = () => {
  // Datos simulados de estudiantes
  const students = [
    { 
      id: 1, 
      name: 'Juan Pérez', 
      accessTime: '2025-03-18 08:00', 
      image: 'https://www.example.com/images/juan.jpg' // URL de la imagen
    },
    { 
      id: 2, 
      name: 'Ana García', 
      accessTime: '2025-03-18 08:30', 
      image: 'https://www.example.com/images/ana.jpg'
    },
    { 
      id: 3, 
      name: 'Pedro Sánchez', 
      accessTime: '2025-03-18 09:00', 
      image: 'https://www.example.com/images/pedro.jpg'
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registros de Estudiantes</Text>
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DashboardScreen;

