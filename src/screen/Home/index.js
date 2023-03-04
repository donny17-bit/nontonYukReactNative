import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';
import styles from './style';
import axios from '../../utils/axios';
import {useSelector, useDispatch} from 'react-redux';
import {getUserId} from '../../stores/action/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../../components/Footer';
import {CLOUDINARY} from '@env';

function HomeScreen(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const windowWidth = Dimensions.get('window').width;

  const [data, setData] = useState([]);
  const [nowShowing, setNowShowing] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const month = [
    {name: 'January', id: 1},
    {name: 'February', id: 2},
    {name: 'March', id: 3},
    {name: 'April', id: 4},
    {name: 'May', id: 5},
    {name: 'June', id: 6},
    {name: 'July', id: 7},
    {name: 'August', id: 8},
    {name: 'September', id: 9},
    {name: 'October', id: 10},
    {name: 'November', id: 11},
    {name: 'December', id: 12},
  ];

  const [text, onChangeText] = React.useState(null);

  const getMovies = async () => {
    try {
      const result = await axios.get('movie?limit=10&page=1');
      // setData(result.data.data);
      setNowShowing(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const result = await dispatch(getUserId(id));
    // console.log(result.value.data.data[0]);
  };

  const getMoviesByMonth = async bulan => {
    try {
      const result = await axios.get(
        `movie?searchRelease=${bulan}&limit=10&page=1`,
      );
      setUpcoming(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonth = bulan => {
    getMoviesByMonth(bulan);
  };

  const handleDetail = id => {
    props.navigation.navigate('DetailMovie', {id: id});
  };

  const handleViewAll = () => {
    props.navigation.navigate('ListMovie');
  };

  useEffect(() => {
    getMovies();
    getUser();
    // default temporary
    getMoviesByMonth('3');
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{color: '#A0A3BD', paddingTop: 30, fontSize: 14}}>
          Nearest Cinema, Newest Movie,
        </Text>
        <Text style={styles.title}>Find out now!</Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingTop: 50,
          paddingBottom: 100,
        }}>
        <Image
          style={{
            height: 400,
            width: windowWidth,
            resizeMode: 'contain',
          }}
          source={require('../../assets/Group-13.png')}
        />
      </View>
      <View style={styles.showing}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text
            style={{
              color: '#752EEA',
              fontSize: 18,
              fontWeight: '700',
            }}>
            Now Showing
          </Text>
          <TouchableOpacity onPress={handleViewAll}>
            <Text
              style={{
                color: '#752EEA',
                fontSize: 14,
                fontWeight: '600',
              }}>
              view all
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={nowShowing}
          horizontal={true}
          keyExtractor={item => item.id}
          style={{paddingBottom: 20}}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 20,
                flex: 1,
              }}>
              <View style={[styles.imageCard, {backgroundColor: 'white'}]}>
                <Image
                  source={{
                    uri: CLOUDINARY + item.image,
                  }}
                  style={styles.image}
                />
                <Text style={styles.titleText}>{item.name}</Text>
                <Text style={styles.genreText}>{item.category}</Text>
                <View style={{paddingTop: 20}}>
                  <TouchableOpacity
                    onPress={e => handleDetail(item.id)}
                    style={styles.detailBtn}>
                    <Text style={styles.details}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.container}>
        <View
          style={{
            paddingTop: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: '700', color: 'black'}}>
            Upcoming Movies
          </Text>
          <TouchableOpacity onPress={handleViewAll}>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#5F2EEA'}}>
              view all
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={month}
          horizontal={true}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                paddingTop: 20,
                flexDirection: 'row',
                marginEnd: 10,
              }}>
              <TouchableOpacity
                style={[styles.detailBtn, {backgroundColor: '#5F2EEA'}]}
                onPress={e => handleMonth(`${item.id}`)}>
                <Text
                  style={[
                    styles.detailsPress,
                    {fontSize: 15, fontWeight: '500'},
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={{flexDirection: 'row', top: 60, paddingBottom: 100}}>
          <FlatList
            data={upcoming}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.imageCard}>
                <Image
                  source={{
                    uri: CLOUDINARY + item.image,
                  }}
                  style={styles.image}
                />
                <Text style={styles.titleText}>{item.name}</Text>
                <Text style={styles.genreText}>{item.category}</Text>
                <View style={{paddingTop: 20}}>
                  <TouchableOpacity
                    onPress={e => handleDetail(item.id)}
                    style={styles.detailBtn}>
                    <Text style={styles.details}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
        <View style={{paddingTop: 100}}>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <Text style={{color: '#4E4B66', fontSize: 14, fontWeight: '400'}}>
              Be the vanguard of the
            </Text>
          </View>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <Text style={{color: '#5F2EEA', fontSize: 32, fontWeight: '700'}}>
              Moviegoers
            </Text>
          </View>
          <SafeAreaView style={{paddingTop: 30}}>
            <TextInput
              style={styles.input}
              // onChangeText={onChangeText}
              value={text}
            />
          </SafeAreaView>
          <View style={{paddingTop: 20}}>
            <Button title="Join now" color="#5F2EEA" style={{flex: 1}} />
          </View>
          <View style={{alignItems: 'center', padding: 40}}>
            <Text style={styles.commonText}>
              By joining you as a Tickitz member,
            </Text>
            <Text style={styles.commonText}>we will always send you the</Text>
            <Text style={styles.commonText}>latest updates via email .</Text>
          </View>
        </View>
      </View>
      <Footer {...props} />
    </ScrollView>
  );
}

export default HomeScreen;
