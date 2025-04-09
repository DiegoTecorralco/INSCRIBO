import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Switch } from 'react-native';

const SettingsScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSaveSettings = () => {
    if (newPassword.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      console.log('Contraseña cambiada a:', newPassword);
      console.log('Correo electrónico cambiado a:', newEmail);
      console.log('Nombre de usuario cambiado a:', newUsername);
      console.log('Modo oscuro activado:', isDarkMode);
      setIsLoading(false);
      alert('Configuración guardada');
      setNewPassword('');
      setNewEmail('');
      setNewUsername('');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones</Text>

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Nueva Contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Nuevo Correo Electrónico"
        value={newEmail}
        onChangeText={setNewEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Nuevo Nombre de Usuario"
        value={newUsername}
        onChangeText={setNewUsername}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Modo Oscuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#767577', true: '#2563EB' }}
          thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#2563EB" style={styles.loader} />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleSaveSettings}>
            <Text style={styles.buttonText}>Guardar Configuración</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => console.log('Regresando al Dashboard')}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#374151', // Gris oscuro
  },
  input: {
    height: 40,
    borderColor: '#374151', // Gris oscuro
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff', // Blanco
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2563EB', // Azul Principal
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF4D4D', // Rojo para cancelar
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#374151',
    marginRight: 10,
  },
});

export default SettingsScreen;