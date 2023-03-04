import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

function Seat(props) {
  const [leftSideSeat, setLeftSideSeat] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [rightSideSeat, setRightSideSeat] = useState([
    8, 9, 10, 11, 12, 13, 14,
  ]);

  useEffect(() => {
    seatAlphabet();
  }, []);

  const seatAlphabet = () => {
    const {seatAlphabhet} = props;
    const leftSide = leftSideSeat.map(item => `${seatAlphabhet}${item}`);
    const rightSide = rightSideSeat.map(item => `${seatAlphabhet}${item}`);
    setLeftSideSeat(leftSide);
    setRightSideSeat(rightSide);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <FlatList
          horizontal
          data={leftSideSeat}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.seat,
                props.reserved.includes(item)
                  ? styles.seatSold
                  : props.selected.includes(item)
                  ? styles.seatSelected
                  : styles.seatAvailable,
              ]}
              onPress={() => {
                props.reserved.includes(item) ? null : props.selectSeat(item);
              }}
            />
          )}
        />
      </View>
      <View style={styles.centerSide} />
      <View style={styles.rightSide}>
        <FlatList
          horizontal
          data={rightSideSeat}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.seat,
                props.reserved.includes(item)
                  ? styles.seatSold
                  : props.selected.includes(item)
                  ? styles.seatSelected
                  : styles.seatAvailable,
              ]}
              onPress={() => {
                props.reserved.includes(item) ? null : props.selectSeat(item);
              }}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 7,
    marginVertical: 3,
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSide: {
    flex: 6,
    flexDirection: 'row',
  },
  rightSide: {
    flex: 6,
    flexDirection: 'row',
  },
  centerSide: {
    flex: 1,
  },
  seat: {
    width: 16,
    height: 16,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  seatAvailable: {
    backgroundColor: '#d6d8e7',
  },
  seatSelected: {
    backgroundColor: '#5f2eea',
  },
  seatSold: {
    backgroundColor: '#6e7191',
  },
});

export default Seat;
