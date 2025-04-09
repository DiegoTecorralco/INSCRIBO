import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AccessHistoryScreen = () => {
  const accessLogs = [
    { id: 1, name: 'Juan Pérez', time: '2025-03-18 08:00', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Ana García', time: '2025-03-18 08:30', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Carlos López', time: '2025-03-18 09:00', photo: 'https://randomuser.me/api/portraits/men/68.jpg' },
  ];

  const fadeAnim = useRef(new Animated.Value(0)).current; // Animación de entrada

  // Animación de fade in al cargar la pantalla
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Historial de Accesos</Text>
      <ScrollView>
        {accessLogs.map((log) => (
          <TouchableOpacity key={log.id} style={styles.logItem}>
            <View style={styles.logContent}>
              {/* Imagen de usuario o iniciales */}
              <Image source={{ uri: log.photo }} style={styles.userPhoto} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{log.name}</Text>
                <Text style={styles.time}>{log.time}</Text>
              </View>
              <TouchableOpacity style={styles.detailButton}>
                <Icon name="ios-arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#374151', // Gris oscuro
  },
  logItem: {
    padding: 15,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    borderRadius: 12,
    elevation: 5, // Sombra más pronunciada
    shadowColor: '#000', // Sombra más intensa
    shadowOpacity: 0.1, 
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 }, // Sombra sutil
  },
  logContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
  },
  time: {
    fontSize: 14,
    color: '#6B7280', // Gris claro
  },
  detailButton: {
    backgroundColor: '#2563EB', // Azul brillante
    borderRadius: 50,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccessHistoryScreen;
