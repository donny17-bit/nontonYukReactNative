import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';

export default function Footer(props) {
  const handleHome = () => {
    props.navigation.navigate('Home');
  };
  const handleListMovie = () => {
    props.navigation.navigate('ListMovie');
  };

  return (
    <>
      <View style={styles.footer}>
        <Image
          source={require('../assets/Tickitz-2.png')}
          style={{
            height: 80,
            width: 150,
            resizeMode: 'contain',
            alignSelf: 'flex-start',
          }}
        />
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 40,
          }}>
          <Text style={styles.commonText}>
            Stop waiting in line. Buy tickets
          </Text>
          <Text style={styles.commonText}>
            conveniently, watch movies quietly.
          </Text>
        </View>
        <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
          Explore
        </Text>
        <View style={{paddingTop: 20, flexDirection: 'row'}}>
          <TouchableOpacity onPress={handleHome} style={{flex: 1}}>
            <Text
              style={{
                color: '#6E7191',
                fontSize: 14,
                fontWeight: '400',
              }}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleListMovie} style={{flex: 2}}>
            <Text
              style={{
                color: '#6E7191',
                fontSize: 14,
                fontWeight: '400',
              }}>
              List Movie
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            paddingTop: 40,
            color: 'black',
            fontSize: 16,
            fontWeight: '600',
          }}>
          Our Sponsor
        </Text>
        <View style={{flexDirection: 'row', paddingTop: 20}}>
          <Image
            source={require('../assets/ebv.id.png')}
            style={{marginRight: 20}}
          />
          <Image
            source={require('../assets/CineOne21.png')}
            style={{marginRight: 20, marginTop: 10}}
          />
          <Image
            source={require('../assets/hiflix.png')}
            style={{marginRight: 20}}
          />
        </View>
        <Text
          style={{
            paddingTop: 50,
            color: 'black',
            fontSize: 16,
            fontWeight: '600',
          }}>
          Follow us
        </Text>
        <View style={{paddingTop: 20, flexDirection: 'row'}}>
          <Image
            source={require('../assets/facebook.png')}
            style={{marginRight: 20}}
          />
          <Image
            source={require('../assets/instagram.png')}
            style={{marginRight: 20}}
          />
          <Image
            source={require('../assets/twitter.png')}
            style={{marginRight: 20}}
          />
          <Image
            source={require('../assets/youtube.png')}
            style={{marginRight: 20}}
          />
        </View>
        <Text
          style={{
            color: '#6E7191',
            fontSize: 13,
            fontWeight: '400',
            paddingTop: 50,
          }}>
          © 2020 Tickitz. All Rights Reserved.
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
  },
  commonText: {
    color: '#6E7191',
    fontSize: 12,
    fontWeight: '400',
  },
});
