import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import modal
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {getUserId} from '../../stores/action/user';
import axios from '../../utils/axios';
import Footer from '../../components/Footer';
import {CLOUDINARY} from '@env';

function Profile(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [id, setId] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState('profile');
  const [data, setData] = useState();
  const [booking, setBooking] = useState();
  const [schedule, setSchedule] = useState();
  const [imgUser, setImgUser] = useState();
  const [movie, setMovie] = useState({});
  const [imgClicked, setImgClicked] = useState(false);
  const [formInfo, setFormInfo] = useState({
    firstName: '',
    lastName: '',
    noTelp: '',
  });
  const [formPass, setFormPass] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [image, setImage] = useState({
    uri: 'https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1655978291~hmac=238a0f3dd589e12f106cf1cf6f4a8b4d',
  });

  console.log(booking);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getId();
    getBooking();
  }, [refreshing]);

  const getId = async () => {
    const id1 = await AsyncStorage.getItem('id');
    console.log(id1);
    setId(id1);
    // setRefreshing(false);
  };

  const handleDetailInfo = (text, name) => {
    console.log(text);
    setFormInfo({...formInfo, [name]: text});
  };

  const handlePassword = (text, name) => {
    console.log(text);
    setFormPass({...formPass, [name]: text});
  };

  const handleUpdateInfo = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      await axios.patch(`user/profile/${id}`, formInfo);
      getUser();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePass = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      console.log(id);
      console.log(formPass);
      const result = await axios.patch(`user/password/${id}`, formPass);
      console.log(result.data);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setFormInfo({
      firstName: '',
      lastName: '',
      noTelp: '',
    });
    setFormPass({
      newPassword: '',
      confirmPassword: '',
    });
  };

  // const getUser = async () => {
  //   try {
  //     console.log('get user method jalan');
  //     const result = JSON.parse(await AsyncStorage.getItem('user'));
  //     console.log('user : ' + result);
  //     console.log(Object.keys(result));
  //     setData(result);
  //     if (result.image) {
  //       setImage({
  //         uri: CLOUDINARY + result.image,
  //       });
  //     }
  //   } catch (error) {
  //     console.log('error get user');
  //   }
  // };

  const getUser = async () => {
    try {
      console.log('get user');
      console.log(id);
      // const id = await AsyncStorage.getItem('id');
      const result = await axios.get(`user/${id}`);
      console.log(result.data.data);
      setData(result.data.data);
      if (result.data.data[0].image) {
        setImage({
          uri: CLOUDINARY + result.data.data[0].image,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      console.log('get user error');
    }
  };

  const getBooking = async () => {
    try {
      console.log('get booking jalan');
      // const id = await AsyncStorage.getItem('id');
      const result = await axios.get(`booking/user/${id}`);
      setBooking(result.data.data);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      await axios.post('auth/logout', {
        refreshToken: refreshToken,
      });
      // setData();
      setId();
      await AsyncStorage.clear();
      props.navigation.navigate('AuthScreen', {
        screen: 'Login',
      });
    } catch (error) {}
  };

  const handleTicket = (item, movie) => {
    console.log(item);
    props.navigation.navigate('Ticket', {
      data: {
        id: item.id,
        time: item.timeBooking,
        totalPayment: item.totalPayment,
        date: item.dateBooking,
        name: movie.name,
        category: movie.category,
        counts: item.totalTicket,
      },
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOpenCamera = async () => {
    const result = await launchCamera({mediaType: 'photo', saveToPhotos: true});
    setImgUser(result.assets);
    console.log(result.assets);
    toggleModal();
  };

  const handleOpenGalery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    setImgUser(result.assets);
    console.log(result.assets);
    toggleModal();
  };

  const updateImg = async () => {
    try {
      // const id = await AsyncStorage.getItem('id');
      console.log(id);
      console.log(imgUser[0]);
      const newImage = new FormData();
      newImage.append('image', {
        name: imgUser[0].fileName,
        type: imgUser[0].type,
        uri: imgUser[0].uri,
      });
      const result = await axios.patch(`user/image/${id}`, newImage);
      console.log(result.data.data);
      setImgUser();
      setImage({
        uri: CLOUDINARY + result.data.data.image,
      });
    } catch (error) {
      console.log(error.response.data);
      console.log('error upload');
    }
  };

  const getSchedule = () => {
    if (booking) {
      console.log('schedule jalan');
      let tempSchedule = {};
      let tempMovie = {};
      booking.map(async item => {
        try {
          const idSchedule = item.scheduleId;
          console.log(idSchedule);
          const result = await axios.get(`schedule/${idSchedule}`);
          tempMovie = {...tempMovie, [result.data.data[0].movieId]: ''};
          tempSchedule = {
            ...tempSchedule,
            [result.data.data[0].id]: result.data.data[0],
          };
          setMovie(tempMovie);
          setSchedule(tempSchedule);
        } catch (error) {
          console.log('get schedule error');
          this.getSchedule();
          console.log(error.response.data);
        }
      });
    } else {
      console.log('schedule tdk jalan');
    }
  };

  const getMovie = () => {
    if (schedule) {
      let tempMovie = {};
      Object.keys(movie).map(async (item, index) => {
        try {
          console.log(item);
          const result = await axios.get(`movie/${item}`);
          tempMovie = {...tempMovie, [item]: result.data.data[0]};
          setMovie(tempMovie);
          // console.log(result.data.data[0]);
        } catch (error) {
          console.log('get movie error');
        }
      });
    }
  };

  useEffect(() => {
    console.log('use effect get schedule jalan 1');
    if (booking) {
      console.log('use effect get schedule jalan 2 ');
      getSchedule();
    }
  }, [booking]);

  useEffect(() => {
    if (schedule) {
      console.log('get movie jalan');
      getMovie();
      return;
    }
  }, [schedule]);

  useEffect(() => {
    if (id) {
      console.log('get user data');
      getUser();
      getBooking();
      getSchedule();
      getMovie();
    }
  }, [id]);

  useEffect(() => {
    console.log('get id jalan');
    getId();
    getBooking();
  }, []);

  const profileActive = (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <View style={styles.container}>
          <View style={styles.infoContainerTop}>
            <TouchableOpacity onPress={() => setImgClicked(true)}>
              <Image
                source={imgUser ? imgUser : image}
                style={{
                  borderRadius: 136 / 2,
                  height: 136,
                  width: 136,
                  resizeMode: 'cover',
                  marginTop: 30,
                }}
              />
            </TouchableOpacity>
            {imgClicked ? (
              <View>
                {imgUser ? (
                  <TouchableOpacity
                    onPress={updateImg}
                    style={[
                      styles.button,
                      {marginTop: 15, backgroundColor: 'green'},
                    ]}>
                    <Text
                      style={{fontSize: 14, fontWeight: '600', color: 'white'}}>
                      Save Image
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
                <TouchableOpacity
                  onPress={toggleModal}
                  style={[styles.button, {marginVertical: 10}]}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', color: 'white'}}>
                    Change Image
                  </Text>
                </TouchableOpacity>
                <Modal isVisible={isModalVisible} style={styles.view}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      padding: 20,
                      alignItems: 'center',
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                    }}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleOpenGalery}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: 'white',
                        }}>
                        Open Galery
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, {marginVertical: 20}]}
                      onPress={handleOpenCamera}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: 'white',
                        }}>
                        Open Camera
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, {backgroundColor: 'red'}]}
                      onPress={toggleModal}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: 'white',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                <TouchableOpacity
                  onPress={() => {
                    setImgClicked(false);
                    setImgUser();
                  }}
                  style={[
                    styles.button,
                    {
                      marginBottom: 20,
                      backgroundColor: 'red',
                    },
                  ]}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', color: 'white'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )}
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#14142B',
                marginTop: 30,
              }}>
              {data ? `${data[0].firstName} ${data[0].lastName}` : ''}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#4E4B66',
                marginTop: 10,
                marginBottom: 30,
              }}>
              {data ? data[0].noTelp : ''}
            </Text>
          </View>
          <View style={styles.infoContainerBottom}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: '#14142B',
              fontSize: 18,
              fontWeight: '600',
              marginVertical: 30,
            }}>
            Account Settings
          </Text>
          <View style={styles.formContainer}>
            <Text style={styles.formHeader}>Details Information</Text>
            <Text style={styles.formTitle}>First Name</Text>
            <TextInput
              style={styles.input}
              value={formInfo.firstName}
              onChangeText={text => handleDetailInfo(text, 'firstName')}
            />
            <Text style={styles.formTitle}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={formInfo.lastName}
              onChangeText={text => handleDetailInfo(text, 'lastName')}
            />
            <Text style={styles.formTitle}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={formInfo.noTelp}
              onChangeText={text => handleDetailInfo(text, 'noTelp')}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonUpdate}
            onPress={handleUpdateInfo}>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: '700',
              }}>
              Update Changes
            </Text>
          </TouchableOpacity>
          <View style={styles.formContainer}>
            <Text style={styles.formHeader}>Account and Privacy</Text>
            <Text style={styles.formTitle}>New Password</Text>
            <TextInput
              style={styles.input}
              value={formPass.newPassword}
              secureTextEntry
              onChangeText={text => handlePassword(text, 'newPassword')}
            />
            <Text style={styles.formTitle}>Confirm</Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              value={formPass.confirmPassword}
              onChangeText={text => handlePassword(text, 'confirmPassword')}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonUpdate}
            onPress={handleUpdatePass}>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: '700',
              }}>
              Update Changes
            </Text>
          </TouchableOpacity>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );

  const historyActive = (
    <View style={styles.container}>
      <FlatList
        data={booking}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={{padding: 20}}>
              <Image
                source={
                  schedule
                    ? schedule[item.scheduleId].premiere === 'hiflix'
                      ? require('../../assets/hiflix.png')
                      : schedule[item.scheduleId].premiere === 'ebv.id'
                      ? require('../../assets/ebv.id.png')
                      : require('../../assets/CineOne21.png')
                    : ''
                }
              />
              <Text
                style={{
                  color: '#AAAAAA',
                  fontSize: 13,
                  fontWeight: '400',
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                {`${item.dateBooking.slice(0, 10)} at ${item.timeBooking.slice(
                  0,
                  5,
                )}WIB`}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '600',
                  marginBottom: 20,
                }}>
                {schedule ? movie[schedule[item.scheduleId].movieId].name : ''}
              </Text>
            </View>
            <View
              style={{
                padding: 20,
                borderTopColor: '#DEDEDE',
                borderTopWidth: 1,
              }}>
              {item.statusUsed === 'active' ? (
                <TouchableOpacity
                  style={styles.btnTicket}
                  onPress={() =>
                    handleTicket(item, movie[schedule[item.scheduleId].movieId])
                  }>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    Ticket in active
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled
                  style={[styles.btnTicket, {backgroundColor: 'gray'}]}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    Ticket used
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={['1']}
        renderItem={({item}) => (
          <>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setActiveMenu('profile')}>
                <Text
                  style={
                    activeMenu === 'profile'
                      ? styles.headerActive
                      : styles.headerNotActive
                  }>
                  Detail Account
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveMenu('history')}>
                <Text
                  style={
                    activeMenu === 'history'
                      ? styles.headerActive
                      : styles.headerNotActive
                  }>
                  Order History
                </Text>
              </TouchableOpacity>
            </View>
            {activeMenu === 'profile' ? profileActive : historyActive}
            <Footer {...props} />
          </>
        )}
      />
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  commonText: {
    color: '#6E7191',
    fontSize: 12,
    fontWeight: '400',
  },
  footer: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
  },
  formHeader: {
    color: '#14142B',
    fontSize: 16,
    fontWeight: '400',
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    marginBottom: 30,
    paddingBottom: 10,
  },
  input: {
    color: '#4E4B66',
    height: 48,
    borderColor: '#DEDEDE',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  formTitle: {color: '#696F79', fontWeight: '400', fontSize: 14},
  button: {
    backgroundColor: '#5F2EEA',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 10,
    width: 160,
  },
  buttonUpdate: {
    marginVertical: 30,
    backgroundColor: '#5F2EEA',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoContainerBottom: {
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  infoContainerTop: {
    marginTop: 20,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  formContainer: {
    borderRadius: 16,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#ffff',
    paddingTop: 20,
    paddingBottom: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerActive: {
    color: '#14142B',
    fontSize: 14,
    fontWeight: '400',
    borderBottomColor: '#5F2EEA',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  headerNotActive: {
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: '400',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
  },
  btnTicket: {
    backgroundColor: '#00BA88',
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
