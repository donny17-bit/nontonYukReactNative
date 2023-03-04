import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import styles from './style';
import axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RegisterScreen(props) {
  // const handleLogin = () => {
  //   props.navigation.navigate('AppScreen', {
  //     screen: 'Home',
  //   });
  // };

  const handleRegister = async () => {
    try {
      console.log(form);
      const result = await axios.post('auth/register', form);
      console.log(result.data);
      alert('Success register, please activate your email');
      props.navigation.navigate('Login', {
        screen: 'Login',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    noTelp: '',
  });

  const handleChangeForm = (text, name) => {
    setForm({...form, [name]: text});
  };

  const handleLogin = () => {
    props.navigation.navigate('Login', {
      screen: 'Login',
    });
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.title}>
          <Image source={require('../../assets/Vector.png')} />
        </View>
        <View style={styles.form}>
          <View
            style={{
              left: 20,
              paddingTop: 20,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 26,
                fontWeight: '600',
                // fontFamily: 'inter',
              }}>
              Sign Up
            </Text>
          </View>
          <View style={{left: 20, paddingBottom: 30}}>
            <Text
              style={{
                color: 'gray',
                fontSize: 15,
                fontWeight: '400',
              }}>
              Fill your additional details
            </Text>
          </View>
          <View style={{left: 20, top: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: '400',
              }}>
              First Name
            </Text>
          </View>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={text => handleChangeForm(text, 'firstName')}
              placeholder="Input your first name ..."
              placeholderTextColor={'grey'}
            />
          </SafeAreaView>
          <View style={{left: 20, top: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: '400',
              }}>
              Last Name
            </Text>
          </View>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={text => handleChangeForm(text, 'lastName')}
              placeholder="Input your last name ..."
              placeholderTextColor={'grey'}
            />
          </SafeAreaView>
          <View style={{left: 20, top: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: '400',
              }}>
              Phone Number
            </Text>
          </View>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={text => handleChangeForm(text, 'noTelp')}
              placeholder="Input your phone number ..."
              placeholderTextColor={'grey'}
            />
          </SafeAreaView>
          <View style={{left: 20, top: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: '400',
              }}>
              Email
            </Text>
          </View>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={text => handleChangeForm(text, 'email')}
              placeholder="Input your email ..."
              placeholderTextColor={'grey'}
            />
          </SafeAreaView>
          <View style={{left: 20, top: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: '400',
              }}>
              Password
            </Text>
          </View>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={text => handleChangeForm(text, 'password')}
              placeholder="Input your password ..."
              placeholderTextColor={'grey'}
            />
          </SafeAreaView>
        </View>
        <View style={{padding: 20}}>
          <Button title="Sign Up" color="#5F2EEA" onPress={handleRegister} />
        </View>
        <View
          style={{
            paddingBottom: 50,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{color: '#8692A6'}}>Already have account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={{color: 'blue'}}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default RegisterScreen;
