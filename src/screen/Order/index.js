import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';
import Seat from '../../components/Seat';
import axios from '../../utils/axios';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../../components/Footer';

function Order(props) {
  const render = [0];
  const {dataOrder} = props.route.params;
  const date = `${dataOrder.dateBooking.getFullYear()}-${dataOrder.dateBooking.getMonth()}-${dataOrder.dateBooking.getDate()}`;
  const listSeat = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState([]);

  const handlePay = () => {
    props.navigation.navigate('Payment', {
      dataOrder: {
        ...dataOrder,
        seat: selectedSeat,
        totalPayment: selectedSeat.length * dataOrder.price,
      },
    });
  };

  const handleSelectedSeat = data => {
    if (selectedSeat.includes(data)) {
      const deleteSeat = selectedSeat.filter(el => {
        return el !== data;
      });
      setSelectedSeat(deleteSeat);
    } else {
      setSelectedSeat([...selectedSeat, data]);
    }
  };

  const handleResetSeat = () => {
    setSelectedSeat([]);
  };

  const handleBookingSeat = () => {
    console.log(selectedSeat);
  };

  const getSeat = async () => {
    try {
      const result = await axios.get(
        `booking/seat?scheduleId=${dataOrder.scheduleId}&dateBooking=${date}&timeBooking=${dataOrder.timeBooking}`,
      );
      console.log(result.data);
      setReservedSeat(result.data.data);
    } catch (error) {
      console.log(error.response.data);
      console.log('error get seat');
    }
  };

  useEffect(() => {
    if (!dataOrder) {
      return;
    }
    getSeat();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={render}
        renderItem={({item}) => (
          <>
            <View style={styles.container}>
              <Text style={styles.title}>Choose Your Seat</Text>
              <View style={styles.containerSeat}>
                <FlatList
                  data={listSeat}
                  keyExtractor={item => item}
                  renderItem={({item}) => (
                    <Seat
                      seatAlphabhet={item}
                      reserved={reservedSeat}
                      selected={selectedSeat}
                      selectSeat={handleSelectedSeat}
                    />
                  )}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: 'black',
                    padding: 20,
                  }}>
                  Seating key
                </Text>
                <View
                  style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  <View style={styles.infoContainer}>
                    <Icon size={20} name="arrow-down" color={'black'} />
                    <Text style={styles.infoText}>A - G</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Icon size={20} name="arrow-right" color={'black'} />
                    <Text style={styles.infoText}>1 - 14</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <View
                      style={{
                        backgroundColor: '#D6D8E7',
                        width: 20,
                        borderRadius: 4,
                      }}
                    />
                    <Text style={styles.infoText}>Available</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <View
                      style={{
                        backgroundColor: '#5F2EEA',
                        width: 20,
                        borderRadius: 4,
                      }}
                    />
                    <Text style={styles.infoText}>Selected</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <View
                      style={{
                        backgroundColor: '#6E7191',
                        width: 20,
                        borderRadius: 4,
                      }}
                    />
                    <Text style={styles.infoText}>Sold</Text>
                  </View>
                </View>
              </View>
              <Text style={[styles.title, {marginTop: 40}]}>Order Info</Text>
              <View style={styles.formContainerTop}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={
                      dataOrder.premiere == 'hiflix'
                        ? require('../../assets/hiflix.png')
                        : dataOrder.premiere == 'ebv.id'
                        ? require('../../assets/ebv.id.png')
                        : require('../../assets/CineOne21.png')
                    }
                  />
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '600',
                      color: '#14142B',
                      marginVertical: 10,
                    }}>
                    {dataOrder.premiere} Cinema
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#14142B',
                      marginBottom: 10,
                    }}>
                    {dataOrder.name}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 20,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{fontSize: 14, fontWeight: '400', color: '#6B6B6B'}}>
                    {dataOrder.dateBooking.toString().slice(0, 10)}
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', color: '#14142B'}}>
                    {dataOrder.timeBooking}WIB
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{fontSize: 14, fontWeight: '400', color: '#6B6B6B'}}>
                    One ticket price
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', color: '#14142B'}}>
                    Rp {dataOrder.price}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginBottom: 30,
                  }}>
                  <Text
                    style={{fontSize: 14, fontWeight: '400', color: '#6B6B6B'}}>
                    Seat choosed
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', color: '#14142B'}}>
                    {selectedSeat.map(item => `${item}, `)}
                  </Text>
                </View>
              </View>
              <View style={styles.formContainerBottom}>
                <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
                  Total Payment
                </Text>
                <Text
                  style={{color: '#5F2EEA', fontSize: 18, fontWeight: '700'}}>
                  Rp {dataOrder.price * selectedSeat.length}
                </Text>
              </View>
              <TouchableOpacity onPress={handlePay} style={styles.button}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '700',
                  }}>
                  Checkout now
                </Text>
              </TouchableOpacity>
            </View>
            <Footer {...props} />
          </>
        )}
      />
    </SafeAreaView>
  );
}

export default Order;

const styles = StyleSheet.create({
  infoText: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#4E4B66',
  },
  infoContainer: {
    flexDirection: 'row',
    marginRight: 40,
    width: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5F2EEA',
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 50,
    paddingVertical: 15,
  },
  formContainerTop: {
    marginTop: 20,
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: 'white',
    paddingTop: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#D6D8E7',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  formContainerBottom: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  formContainer: {
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  title: {color: '#14142B', fontSize: 18, fontWeight: '600'},
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  containerSeat: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 20,
  },
});
