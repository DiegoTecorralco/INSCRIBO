import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de tener esta librería instalada

const DashboardScreen = ({ navigation, route }) => {
  const { isAdmin } = route.params; // Recibiendo si es admin o no desde la navegación
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Animación de entrada
  const [menuVisible, setMenuVisible] = useState(false); // Estado para mostrar/ocultar el menú

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
      {/* Imagen de perfil dependiendo si es admin o estudiante */}
      <Image
        source={isAdmin ? require('../assets/admin.jpg') : require('../assets/student.jpg')}
        style={styles.profileImage}
      />

      {/* Saludo personalizado */}
      <Text style={styles.greeting}>
        {isAdmin ? '¡Bienvenido, Administrador!' : '¡Bienvenido, Estudiante!'}
      </Text>

      {/* Botón de menú hamburguesa */}
      <TouchableOpacity
        style={styles.hamburgerButton}
        onPress={() => setMenuVisible(!menuVisible)}
      >
        <Icon name={menuVisible ? "ios-close" : "ios-menu"} size={30} color="#fff" />
      </TouchableOpacity>

      {/* Menú lateral de opciones */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AdminProfile')} // Navegación al perfil del admin
          >
            <Icon name="ios-person" size={20} color="#fff" />
            <Text style={styles.buttonText}>Mi Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scan')}>
            <Icon name="ios-qr-code" size={20} color="#fff" />
            <Text style={styles.buttonText}>Escanear RFID</Text>
          </TouchableOpacity>

          {isAdmin && (
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('History')}>
              <Icon name="ios-time" size={20} color="#fff" />
              <Text style={styles.buttonText}>Ver Registros de Estudiantes</Text>
            </TouchableOpacity>
          )}
          
          {isAdmin && (
  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddStudent')}>
    <Icon name="ios-person-add" size={20} color="#fff" />
    <Text style={styles.buttonText}>Agregar Estudiante</Text>
  </TouchableOpacity>
)}

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
            <Icon name="ios-settings" size={20} color="#fff" />
            <Text style={styles.buttonText}>Configuración</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AttendanceTable')}
          >
            <Icon name="ios-list" size={20} color="#fff" />
            <Text style={styles.buttonText}>Ver Pase de Lista</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botón para cerrar sesión */}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => navigation.navigate('Login')}
      >
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
    backgroundColor: '#2563EB', // Fondo azul
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
    color: '#fff',
  },
  hamburgerButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#333', // Fondo oscuro del menú lateral
    paddingTop: 60, // Espacio para que el contenido no se superponga con la imagen de perfil
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 5, // Sombra
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2, // Sombra para los botones
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
