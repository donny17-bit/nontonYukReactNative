import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Footer from '../../components/Footer';

export default function Ticket(props) {
  console.log(props.route.params.data);
  const {data} = props.route.params;
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=https://project-nontonyuk.herokuapp.com/${data.id}`;
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.card}>
            <Image source={{uri: qr}} style={styles.image} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1.5}}>
                <Text style={styles.subtitle}>Movie</Text>
                <Text style={styles.content}>{data.name}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.subtitle}>Category</Text>
                <Text style={styles.content}>{data.category}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1.5}}>
                <Text style={styles.subtitle}>Date</Text>
                <Text style={styles.content}>{data.date.slice(0, 10)}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.subtitle}>Time</Text>
                <Text style={styles.content}>{data.time.slice(0, 5)}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1.5}}>
                <Text style={styles.subtitle}>Count</Text>
                <Text style={styles.content}>{data.counts}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.subtitle}>Seats</Text>
                <Text style={styles.content}>{data.counts}</Text>
              </View>
            </View>
            <View style={styles.price}>
              <Text style={{fontSize: 16, fontWeight: '400', color: 'black'}}>
                Total
              </Text>
              <Text style={{fontSize: 16, fontWeight: '400', color: 'black'}}>
                Rp {data.totalPayment}
              </Text>
            </View>
          </View>
        </View>
        <Footer {...props} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  price: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#F5F6F8',
  },
  commonText: {
    color: '#6E7191',
    fontSize: 12,
    fontWeight: '400',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 30,
  },
  subtitle: {color: '#AAAAAA', fontWeight: '600', fontSize: 12},
  content: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 20,
  },
  footer: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
  },
  image: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 60,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
