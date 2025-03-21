// SettingsScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  const [newPassword, setNewPassword] = useState('');

  const handleSaveSettings = () => {
    // Simular el cambio de contraseña
    console.log('Contraseña cambiada a:', newPassword);
    alert('Configuración guardada');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva Contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button title="Guardar Configuración" onPress={handleSaveSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default SettingsScreen;
