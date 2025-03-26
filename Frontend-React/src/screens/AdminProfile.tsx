import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Administrador</Text>
      <Text style={styles.info}>Nombre: Juan Pérez</Text>
      <Text style={styles.info}>Correo: admin@ejemplo.com</Text>
      <Text style={styles.info}>Rol: Administrador</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: '#666',
  },
});

export default AdminProfile;
