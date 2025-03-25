
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Especifica el paquete de íconos


const AccessHistoryScreen = () => {
  const accessLogs = [
    { id: 1, name: 'Juan Pérez', time: '2025-03-18 08:00' },
    { id: 2, name: 'Ana García', time: '2025-03-18 08:30' },
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

              {/* Aquí puedes agregar las fotos de los usuarios si las tienes */}
              {/* <Image source={log.photo} style={styles.userPhoto} /> */}

              <View style={styles.textContainer}>
                <Text style={styles.name}>{log.name}</Text>
                <Text style={styles.time}>{log.time}</Text>
              </View>
              <Icon name="ios-information-circle-outline" size={24} color="#007BFF" />
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
    color: '#333',
  },
  logItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3, // Sombra sutil
  },
  logContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: 14,
    color: '#777',
  },
});

export default AccessHistoryScreen;
