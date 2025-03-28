import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen'; // Importa tu SplashScreen
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ScanScreen from './src/screens/ScanScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AttendanceTableScreen from './src/screens/AttendanceTableScreen';
import AdminProfile from './src/screens/AdminProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} // Oculta el encabezado si es necesario
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="AttendanceTable" component={AttendanceTableScreen} />
        <Stack.Screen name="AdminProfile" component={AdminProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
