// LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    <View style={styles.container}>
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
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;


