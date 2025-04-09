import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddStudentScreen = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [matricula, setMatricula] = useState('');

  const handleSubmit = async () => {
    if (!nombre || !correo || !matricula) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    try {
      const response = await fetch('http://TU_API:PUERTO/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, matricula }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Estudiante registrado correctamente');
        setNombre('');
        setCorreo('');
        setMatricula('');
      } else {
        Alert.alert('Error', data.error || 'Algo salió mal');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Agregar Estudiante</Text>

        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="#374151" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={nombre}
            onChangeText={setNombre}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="#374151" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="barcode-outline" size={20} color="#374151" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Matrícula"
            value={matricula}
            onChangeText={setMatricula}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar Estudiante</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    padding: 24,
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#111827',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#111827',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default AddStudentScreen;
