import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const SettingsScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSaveSettings = () => {
    // Validación básica para la nueva contraseña
    if (newPassword.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsLoading(true);

    // Simular un retraso en la actualización de la contraseña
    setTimeout(() => {
      console.log('Contraseña cambiada a:', newPassword);
      setIsLoading(false);
      alert('Configuración guardada');
      setNewPassword(''); // Limpiar el campo de la contraseña
    }, 2000); // Simula un retraso de 2 segundos en el proceso
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones</Text>

      {/* Mensaje de error si la validación falla */}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Nueva Contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      {/* Indicador de carga */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#2563EB" style={styles.loader} />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleSaveSettings}>
            <Text style={styles.buttonText}>Guardar Configuración</Text>
          </TouchableOpacity>

          {/* Botón para regresar al Dashboard */}
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
    marginBottom:10,
    fontSize:14,
  }
})


export default SettingsScreen;

