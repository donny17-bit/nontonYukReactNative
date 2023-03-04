import React, {useEffect} from 'react';
import {View, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SplashScreen(props) {
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    setTimeout(() => {
      if (token) {
        props.navigation.navigate('AppScreen');
      } else {
        props.navigation.navigate('AuthScreen');
      }
    }, 1000);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#a134eb', alignItems: 'center'}}>
      <Image
        source={require('../../assets/Tickitz-2.png')}
        style={{
          top: windowHeight / 2,
          height: 50,
          resizeMode: 'contain',
          backgroundColor: '#a134eb',
        }}
      />
    </View>
  );
}

export default SplashScreen;
