import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import axios from '../../utils/axios';
import Footer from '../../components/Footer';

function DetailMovie(props) {
  const [date, setDate] = useState(new Date());
  const [dateBooking, setDateBooking] = useState(new Date());
  const [dateShow, setDateShow] = useState('Set a date');
  const [open, setOpen] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const cities = [
    'All city',
    'bandung',
    'jakarta',
    'yogyakarta',
    'surabaya',
    'balikpapan',
    'bali',
  ];
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTime, setSelectedTime] = useState({time: '', index: ''});
  const {id} = props.route.params;
  const [data, setData] = useState({});
  const [releaseDate, setReleaseDate] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [dataOrder, setDataOrder] = useState({});

  const getMoviesById = async () => {
    try {
      const result = await axios.get(`movie/${id}`);
      setData(result.data.data);
      setReleaseDate(result.data.data[0].releaseDate);
    } catch (error) {
      console.log(error);
    }
  };

  const selectTime = (time, index) => {
    setDataOrder({...dataOrder, timeBooking: time});
    setSelectedTime({time, index});
    console.log(index);
    console.log(selectedTime);
    console.log(dataOrder);
  };

  const getSchedule = async selectedCity => {
    try {
      const result = await axios.get(
        `schedule?sort=id&searchLocation=${selectedCity}&searchMovieId=${id}&page=1&limit=10`,
      );
      setSchedule(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = item => {
    if (dataOrder.dateBooking) {
      props.navigation.navigate('Order', {
        dataOrder: {
          ...dataOrder,
          price: item.price,
          location: item.location,
          movieId: item.movieId,
          premiere: item.premiere,
          name: item.name,
          scheduleId: item.id,
        },
      });
    } else {
      props.navigation.navigate('Order', {
        dataOrder: {
          ...dataOrder,
          price: item.price,
          location: item.location,
          movieId: item.movieId,
          premiere: item.premiere,
          name: item.name,
          dateBooking: dateBooking,
          scheduleId: item.id,
        },
      });
    }
  };

  useEffect(() => {
    // default temporary
    getMoviesById();
    getSchedule(selectedCity);
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <>
            <View style={styles.container}>
              <View
                style={{
                  paddingTop: 20,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    padding: 20,
                    borderWidth: 1,
                    borderColor: '#DEDEDE',
                    borderRadius: 8,
                  }}>
                  <Image
                    style={{
                      width: windowWidth / 2,
                      height: 244,
                      resizeMode: 'cover',
                      borderRadius: 8,
                    }}
                    source={{
                      uri: `https://res.cloudinary.com/dusoicuhh/image/upload/v1652761552/${item.image}`,
                    }}
                  />
                </View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.genre}>{item.category}</Text>
              </View>
              <View style={{flexDirection: 'row', paddingTop: 30}}>
                <View style={{flex: 1}}>
                  <Text style={styles.subtitle}>Release date</Text>
                  <Text style={styles.content}>{releaseDate.slice(0, 10)}</Text>
                  <Text style={styles.subtitle}>Duration</Text>
                  <Text style={styles.content}>{item.duration}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.subtitle}>Directed by</Text>
                  <Text style={styles.content}>{item.director}</Text>
                  <Text style={styles.subtitle}>Cast</Text>
                  <Text style={styles.content}>{item.cast}</Text>
                </View>
              </View>
              <View
                style={{borderBottomColor: '#D6D8E7', borderBottomWidth: 1}}
              />
              <View style={{paddingTop: 30, paddingBottom: 30}}>
                <Text
                  style={{
                    paddingBottom: 20,
                    fontWeight: '600',
                    fontSize: 16,
                    color: '#14142B',
                  }}>
                  Synopsis
                </Text>
                <Text
                  style={{fontWeight: '400', fontSize: 13, color: '#4E4B66'}}>
                  {item.synopsis}
                </Text>
              </View>
            </View>
            <View style={styles.containerSchedule}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: 'black',
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                Showtime and Tickets
              </Text>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={styles.dropdown}>
                <Icon name="calendar" size={20} color="#4E4B66" />
                <Text
                  style={{
                    color: '#4E4B66',
                    fontSize: 14,
                    fontWeight: '600',
                    flex: 2,
                    marginStart: 10,
                  }}>
                  {dateShow}
                </Text>
                <Icon name="chevron-down" size={20} color="#4E4B66" />
              </TouchableOpacity>
              <DatePicker
                modal
                mode={'date'}
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                  setDataOrder({...dataOrder, dateBooking: date});
                  setDateShow(
                    `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
                  );
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <SelectDropdown
                buttonStyle={styles.dropdown}
                rowTextStyle={{color: '#4E4B66'}}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="map-pin" color={'#4E4B66'} size={20} />
                      <Text
                        style={{
                          color: '#4E4B66',
                          fontSize: 14,
                          fontWeight: '600',
                          textAlign: 'left',
                          marginStart: 10,
                          flex: 2,
                        }}>
                        {selectedItem ? selectedItem : 'All city'}
                      </Text>
                      <Icon name={'chevron-down'} color={'#4E4B66'} size={20} />
                    </View>
                  );
                }}
                data={cities}
                onSelect={(selectedItem, index) => {
                  setDataOrder({...dataOrder, location: selectedItem});
                  setSelectedCity(selectedItem);
                  if (index != 0) {
                    getSchedule(selectedItem);
                  } else {
                    getSchedule('');
                  }
                  console.log(selectedItem, index);
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
              <FlatList
                data={schedule}
                keyExtractor={item => item.id}
                style={{paddingBottom: 20}}
                renderItem={({item, index}) => (
                  <View style={styles.card}>
                    <View
                      style={{
                        alignItems: 'center',
                        borderBottomColor: '#DEDEDE',
                        borderBottomWidth: 1,
                        paddingBottom: 20,
                      }}>
                      <Image
                        source={
                          item.premiere == 'hiflix'
                            ? require('../../assets/hiflix.png')
                            : item.premiere == 'ebv.id'
                            ? require('../../assets/ebv.id.png')
                            : require('../../assets/CineOne21.png')
                        }
                      />
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '300',
                          color: '#AAAAAA',
                          marginTop: 10,
                        }}>
                        {item.location}
                      </Text>
                    </View>
                    <View style={{marginVertical: 10, alignItems: 'center'}}>
                      <FlatList
                        columnWrapperStyle={{
                          flexWrap: 'wrap',
                          flexDirection: 'row',
                        }}
                        numColumns={6}
                        data={item.time.split(',')}
                        extraData={index}
                        renderItem={({item}) => (
                          <View>
                            <TouchableOpacity
                              onPress={() => selectTime(item, index)}>
                              <Text
                                style={
                                  selectedTime.time == item &&
                                  selectedTime.index == index
                                    ? [styles.time, {color: 'blue'}]
                                    : styles.time
                                }>
                                {item}WIB
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </View>
                    <View
                      style={{
                        marginVertical: 20,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '400',
                          color: '#6B6B6B',
                        }}>
                        Price
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: 'black',
                        }}>
                        Rp {item.price}/seat
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#5F2EEA',
                        alignItems: 'center',
                        borderRadius: 4,
                        padding: 10,
                      }}
                      onPress={() => handleOrder(item)}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#F7F7FC',
                        }}>
                        Book Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            <Footer {...props} />
          </>
        )}
      />
    </SafeAreaView>
  );
}

export default DetailMovie;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 20,
    padding: 30,
  },
  containerSchedule: {
    padding: 20,
    backgroundColor: '#F5F6F8',
  },
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
  },
  title: {
    paddingTop: 20,
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
  },
  genre: {
    paddingTop: 20,
    color: '#4E4B66',
    fontWeight: '400',
    fontSize: 16,
  },
  subtitle: {
    color: '#8692A6',
    fontWeight: '400',
    fontSize: 13,
  },
  content: {
    color: '#121212',
    fontWeight: '400',
    fontSize: 16,
    paddingBottom: 30,
  },
  commonText: {
    color: '#6E7191',
    fontSize: 12,
    fontWeight: '400',
  },
  dropdown: {
    padding: 10,
    paddingTop: 13,
    marginTop: 20,
    backgroundColor: '#EFF0F6',
    width: '80%',
    height: 48,
    borderRadius: 4,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  time: {
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '400',
    color: '#4E4B66',
    paddingEnd: 10,
    paddingBottom: 10,
  },
});
