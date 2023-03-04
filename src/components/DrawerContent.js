import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../utils/axios';
import {CLOUDINARY, DEFAULT_IMG} from '@env';

function DrawerContent(props) {
  const [id, setId] = useState();
  console.log(id);
  const [data, setData] = useState();
  const [image, setImage] = useState({
    uri: DEFAULT_IMG,
  });

  const getUser = async () => {
    try {
      const idUser = await AsyncStorage.getItem('id');
      console.log(idUser);
      const result = await axios.get(`user/${idUser}`);
      setData(result.data.data[0]);
      console.log(result.data.data[0]);
      if (result.data.data[0].image) {
        setImage({
          uri: CLOUDINARY + result.data.data[0].image,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      console.log('get data error');
    }
  };

  const getId = async () => {
    const id1 = await AsyncStorage.getItem('id');
    setId(id1);
  };

  const handleLogout = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      await axios.post('auth/logout', {
        refreshToken: refreshToken,
      });
      setData();
      setId();
      await AsyncStorage.clear();
      props.navigation.navigate('AuthScreen', {
        screen: 'Login',
      });
    } catch (error) {
      console.log(error.response.data);
      console.log('logout error');
    }
  };

  useEffect(() => {
    if (id) {
      console.log('get user data');
      getUser();
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      getId();
    }
  });

  // useEffect(() => {
  //   // if (!id) {
  //   console.log('get id jalan');
  //   const id2 = AsyncStorage.getItem('id').then(value => {
  //     console.log(value);
  //     return value;
  //   });
  //   setId(id2);
  //   getUser();
  //   // return;
  //   // } else
  //   if (id == data.id) {
  //     console.log('get user ke 2');
  //     getUser();
  //   }
  //   // }
  // }, [id]);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.containerProfile}>
          <View style={styles.avatar}>
            <Image
              style={{
                height: 40,
                width: 40,
                resizeMode: 'cover',
                borderRadius: 20,
              }}
              source={image}
            />
          </View>
          <View style={styles.biodata}>
            <Text style={styles.title}>{data ? data.firstName : ''}</Text>
            <Text style={styles.caption}>{data ? data.lastName : ''}</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.containerSection}>
        <DrawerItem
          label="Logout"
          icon={({color, size}) => (
            <Icon color={color} size={size} name="log-out" />
          )}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerProfile: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'gray',
  },
  biodata: {
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 3,
    fontWeight: 'bold',
    color: 'black',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: 'black',
  },
  containerSection: {
    marginBottom: 5,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 2,
  },
});

export default DrawerContent;
