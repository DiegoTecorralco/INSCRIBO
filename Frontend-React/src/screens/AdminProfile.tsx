import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';

const AdminProfile = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animación de fade in

  useEffect(() => {
    // Animación de entrada al cargar
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.profileCard}>
        {/* Imagen de perfil con borde */}
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.title}>Perfil del Administrador</Text>
        <Text style={styles.info}>Nombre: Juan Pérez</Text>
        <Text style={styles.info}>Correo: admin@ejemplo.com</Text>
        <Text style={styles.info}> Administrador</Text>

        {/* Información adicional */}
        <View style={styles.additionalInfo}>
          <Text style={styles.info}>Fecha de creación: 2025-01-01</Text>
          <Text style={styles.info}>Última conexión: 2025-03-18</Text>
        </View>
      </View>

      {/* Botón flotante de editar perfil */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '100%',
    maxWidth: 350,
    padding: 25,
    alignItems: 'center',
    elevation: 10, // Sombra intensa
    shadowColor: '#000', 
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#2563EB', // Borde azul para resaltar la imagen
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 15,
    color: '#2D3748', // Gris oscuro para el título
  },
  info: {
    fontSize: 16,
    color: '#4A5568', // Gris intermedio para texto
    marginBottom: 10,
  },
  additionalInfo: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  editButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#2563EB', // Azul principal
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AdminProfile;
