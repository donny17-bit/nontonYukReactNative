import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StyleSheet} from 'react-native';
import axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../../components/Footer';

function Payment(props) {
  const [data, setData] = useState({});
  const {dataOrder} = props.route.params;
  const [dataBooking, setDataBooking] = useState(dataOrder);
  const date = `${dataOrder.dateBooking.getFullYear()}-${dataOrder.dateBooking.getMonth()}-${dataOrder.dateBooking.getDate()}`;
  console.log(dataOrder);

  const getUser = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const result = await axios.get(`user/${id}`);
      setData(result.data.data[0]);
      setDataBooking({
        ...dataBooking,
        userId: id,
        paymentMethod: 'midtrans',
        dateBooking: date,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePay = async () => {
    try {
      delete dataBooking.location;
      delete dataBooking.movieId;
      delete dataBooking.name;
      delete dataBooking.premiere;
      delete dataBooking.price;

      console.log(dataBooking);

      const result = await axios.post('booking', dataBooking);
      console.log(result.data.data.redirectUrl);
      props.navigation.navigate('Midtrans', {
        redirectUrl: result.data.data.redirectUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text
          style={{
            color: '#AAAAAA',
            fontSize: 16,
            fontWeight: '400',
          }}>
          Total Payment
        </Text>
        <Text
          style={{
            color: '#14142B',
            fontWeight: '600',
            fontSize: 20,
          }}>
          Rp {dataOrder.totalPayment}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={[styles.title]}>Personal Info</Text>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={`${data.firstName} ${data.lastName}`}
            editable={false}
          />
          <Text style={styles.formTitle}>Email</Text>
          <TextInput style={styles.input} value={data.email} editable={false} />
          <Text style={styles.formTitle}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={data.noTelp}
            editable={false}
          />
        </View>
        <TouchableOpacity onPress={handlePay} style={styles.button}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '700',
            }}>
            Pay your order
          </Text>
        </TouchableOpacity>
      </View>
      <Footer {...props} />
    </ScrollView>
  );
}

export default Payment;

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
  button: {
    backgroundColor: '#5F2EEA',
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 50,
    paddingVertical: 15,
  },
  formContainer: {
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
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
  title: {color: '#14142B', fontSize: 18, fontWeight: '600'},
  formTitle: {color: '#696F79', fontWeight: '400', fontSize: 14},
  header: {
    backgroundColor: '#ffff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
