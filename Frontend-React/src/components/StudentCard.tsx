// StudentCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Componente para mostrar la imagen del estudiante y su información
const StudentCard = ({ student }: { student: any }) => {
  return (
    <View style={styles.card}>
      {/* Imagen del estudiante */}
      <Image source={{ uri: student.image }} style={styles.image} />
      
      {/* Información del estudiante */}
      <View style={styles.info}>
        <Text style={styles.cardTitle}>{student.name}</Text>
        <Text>Acceso a las: {student.accessTime}</Text>
      </View>
    </View>
  );
};

// Estilos para el componente
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // Coloca la imagen a la izquierda y la información a la derecha
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center', // Alinea todo al centro
  },
  image: {
    width: 50,  // Tamaño de la imagen
    height: 50, // Tamaño de la imagen
    borderRadius: 25, // Hace la imagen circular
    marginRight: 15, // Espacio entre la imagen y el texto
  },
  info: {
    flex: 1, // Toma el resto del espacio disponible
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StudentCard;
