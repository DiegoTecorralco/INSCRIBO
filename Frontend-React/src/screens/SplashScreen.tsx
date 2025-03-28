import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login'); // Redirige a Login después de 3 segundos
    }, 4000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/garrita.jpg')} // Asegúrate de tener la imagen en los assets
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;