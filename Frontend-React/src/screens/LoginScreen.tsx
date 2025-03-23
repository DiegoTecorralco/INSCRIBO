import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de tener esta librería instalada

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Animación de entrada

  // Animación de fade in al cargar la pantalla
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogin = () => {
    // Validación básica
    if (!username || !password) {
      setErrorMessage('Por favor, ingresa usuario y contraseña.');
      return;
    }

    // Lógica de autenticación (simulada)
    if (username === 'admin' && password === 'admin123') {
      navigation.navigate('Dashboard', { isAdmin: true });
    } else if (username === 'student' && password === '123456') {
      navigation.navigate('Dashboard', { isAdmin: false });
    } else {
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.formContainer}>
        {/* Aquí puedes agregar un logo si lo deseas */}
        <Text style={styles.title}>Iniciar Sesión</Text>

        {/* Campo de usuario */}
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />

        {/* Campo de contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Mostrar mensaje de error si existe */}
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        {/* Botón de Iniciar sesión */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        
        {/* Botón de Registro */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5, // Sombra para darle más profundidad
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 8,
    width: '100%',
    backgroundColor: '#fff',
  },
  error: {
    color: '#FF0000', // Rojo para los mensajes de error
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2563EB', // Azul Principal
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 15,
  },
  registerText: {
    color: '#2563EB', // Azul Principal
    fontSize: 14,
  },
});

export default LoginScreen;
