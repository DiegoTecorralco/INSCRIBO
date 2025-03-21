import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const DashboardScreen = ({ navigation, route }) => {
  const { isAdmin } = route.params; // Recibiendo si es admin o no desde la navegación

  return (
    <View style={styles.container}>
      {/* Mostrar imagen de perfil dependiendo si es admin o estudiante */}
      <Image 
        source={isAdmin ? require('..') : require('..')} 
        style={styles.profileImage}
      />
      
      {/* Saludo personalizado */}
      <Text style={styles.greeting}>
        {isAdmin ? '¡Bienvenido, Administrador!' : '¡Bienvenido, Estudiante!'}
      </Text>

      {/* Menú de opciones */}
      <View style={styles.menu}>
        <Button title="Escanear RFID" onPress={() => navigation.navigate('Scan')} />
        {isAdmin && <Button title="Ver Historial" onPress={() => navigation.navigate('History')} />}
        {isAdmin && <Button title="Ver Registros de Estudiantes" onPress={() => navigation.navigate('StudentRecords')} />}
        <Button title="Configuraciones" onPress={() => navigation.navigate('Settings')} />
      </View>

      {/* Botón para cerrar sesión */}
      <Button 
        title="Cerrar sesión" 
        onPress={() => navigation.navigate('Login')}
        color="red" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menu: {
    width: '100%',
    marginBottom: 20,
  },
});

export default DashboardScreen;



