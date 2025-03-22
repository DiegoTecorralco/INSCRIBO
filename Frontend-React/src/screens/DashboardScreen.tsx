import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de tener esta librería instalada

const DashboardScreen = ({ navigation, route }) => {
  const { isAdmin } = route.params; // Recibiendo si es admin o no desde la navegación
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Animación de entrada

  // Animación de fade in al cargar la pantalla
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Mostrar imagen de perfil dependiendo si es admin o estudiante 
      <Image 
        source={isAdmin ? require('../../src/assets/admin.jpg') : require('../../assets/student.jpg')} 
        style={styles.profileImage}
      /> */ }

      {/* Saludo personalizado */}
      <Text style={styles.greeting}>
        {isAdmin ? '¡Bienvenido, Administrador!' : '¡Bienvenido, Estudiante!'}
      </Text>

      {/* Menú de opciones */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scan')}>
          <Icon name="ios-qr-code" size={20} color="#fff" />
          <Text style={styles.buttonText}>Escanear RFID</Text>
        </TouchableOpacity>
        
        {isAdmin && (
          <>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('History')}>
              <Icon name="ios-time" size={20} color="#fff" />
              <Text style={styles.buttonText}>Ver Historial</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StudentRecords')}>
              <Icon name="ios-people" size={20} color="#fff" />
              <Text style={styles.buttonText}>Ver Registros de Estudiantes</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <Icon name="ios-settings" size={20} color="#fff" />
          <Text style={styles.buttonText}>Configuraciones</Text>
        </TouchableOpacity>
      </View>

      {/* Botón para cerrar sesión */}
      <TouchableOpacity 
        style={[styles.button, styles.logoutButton]} 
        onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.buttonText, styles.logoutText]}>Cerrar sesión</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Fondo más suave
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  menu: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2, // Para darle sombra
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
