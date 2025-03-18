import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  // Estado para manejar el usuario, contraseña y mensajes de error
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Maneja la acción de login
  const handleLogin = () => {
    // Validación de los campos
    if (!username || !password) {
      setErrorMessage('Por favor, ingresa usuario y contraseña.');
      return;
    }

    // Lógica de autenticación (simulada)
    if (username === 'admin' && password === 'admin123') {
      // Si el login es exitoso, navega al Dashboard con isAdmin = true
      navigation.navigate('Dashboard', { isAdmin: true });
    } else if (username === 'test' && password === '123456') {
      // Usuario normal, acceso al Dashboard normal
      navigation.navigate('Dashboard', { isAdmin: false });
    } else {
      // Si las credenciales son incorrectas
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default LoginScreen;
;
