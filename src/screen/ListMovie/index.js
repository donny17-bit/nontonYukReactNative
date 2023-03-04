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
  ActivityIndicator,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesHome from '../Home/style';
import styles from './style';
import axios from '../../utils/axios';

function Profile(props) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [sort, setSort] = useState('ASC');
  const [searchName, setSearchName] = useState('');
  const [data, setData] = useState([]);
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
  const sorting = ['A - Z', 'Z - A'];

  const getMovies = async (page, sort, searchName, currentMonth) => {
    try {
      setRefresh(false);
      setLoading(false);
      setLoadMore(false);
      console.log('page : ' + page);
      console.log('sort : ' + sort);
      console.log('name : ' + searchName);
      console.log('month : ' + currentMonth);
      console.log('totalPage : ' + totalPage);
      if (page <= totalPage) {
        console.log('get user pending');
        const result = await axios.get(
          `movie?page=${page}&sort=${sort}&searchName=${searchName}&limit=5&searchRelease=${currentMonth}`,
        );
        if (page === 1) {
          console.log('get user success page 1');
          setData(result.data.data);
        } else {
          console.log('get data success page 2 ');
          setData([...data, ...result.data.data]);
        }
        setTotalPage(result.data.pagination.totalPage);
      } else {
        setLast(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    console.log('REFRESH SCREEN');
    setPage(1);
    setLast(false);
    if (page !== 1) {
      setRefresh(true);
    } else {
      getMovies(1, sort, searchName, currentMonth);
    }
  };

  const handleLoadMore = () => {
    console.log('LOAD MORE DATA');
    if (!loadMore) {
      const newPage = page + 1;
      setLoadMore(true);
      if (newPage <= totalPage + 1) {
        setLoading(true);
        setPage(newPage);
        getMovies(newPage, sort, searchName, currentMonth);
      } else {
        setLoading(false);
        getMovies(newPage, sort, searchName, currentMonth);
      }
    }
  };

  const handleSort = index => {
    console.log(index);
    if (index == 0) {
      setSort('ASC');
      getMovies(page, 'ASC', searchName, currentMonth);
    } else {
      setSort('DESC');
      getMovies(page, 'DESC', searchName, currentMonth);
    }
  };

  const handleSearch = event => {
    const name = event.nativeEvent.text;
    setPage(1);
    console.log(name);
    setSearchName(name);
    getMovies(1, sort, name, currentMonth);
  };

  const handleMonth = bulan => {
    setPage(1);
    console.log(page);
    console.log(bulan);
    setCurrentMonth(bulan);
    getMovies(1, sort, searchName, bulan);
  };

  const handleDetail = id => {
    props.navigation.navigate('DetailMovie', {id: id});
  };

  useEffect(() => {
    getMovies(page, sort, searchName, currentMonth);
  }, []);

  // useEffect(() => {
  //   console.log('use effect 2 jalan ');
  //   setTimeout(() => {
  //     getMovies(page, sort, searchName, currentMonth);
  //   }, 2000);
  // }, [page]);

  return (
    <SafeAreaView>
      <FlatList
        refreshing
        data={['1']}
        renderItem={({item}) => (
          <View>
            <View style={{padding: 20}}>
              <View>
                <Text style={styles.title}>List Movie</Text>
              </View>
              <View style={styles.container}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    height: 40,
                  }}>
                  <SelectDropdown
                    defaultButtonText={'Sort'}
                    buttonStyle={styles.sort}
                    buttonTextStyle={{
                      color: '#4E4B66',
                      fontSize: 16,
                      textAlign: 'left',
                    }}
                    rowTextStyle={{color: '#4E4B66'}}
                    dropdownIconPosition={'right'}
                    renderDropdownIcon={isOpened => {
                      return (
                        <FontAwesome
                          name={isOpened ? 'chevron-up' : 'chevron-down'}
                          color={'#4E4B66'}
                          size={13}
                        />
                      );
                    }}
                    data={sorting}
                    onSelect={(selectedItem, index) => {
                      handleSort(index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      {
                        flex: 2,
                        paddingHorizontal: 15,
                        paddingBottom: 8,
                        marginLeft: 10,
                      },
                    ]}
                    placeholder={'Search movie name'}
                    placeholderTextColor={'#4E4B66'}
                    onSubmitEditing={event => handleSearch(event)}
                  />
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
                        style={[
                          stylesHome.detailBtn,
                          {backgroundColor: '#5F2EEA'},
                        ]}
                        onPress={e => handleMonth(`${item.id}`)}>
                        <Text
                          style={[
                            stylesHome.detailsPress,
                            {fontSize: 15, fontWeight: '500'},
                          ]}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                      {/* <Button
                        title={item.name}
                        color="#5F2EEA"
                        onPress={e => handleMonth(`${item.id}`)}
                      /> */}
                    </View>
                  )}
                />
              </View>
              <FlatList
                ListFooterComponent={() =>
                  last ? (
                    <View>
                      <Text style={{color: 'blue', alignSelf: 'center'}}>
                        --end of data--
                      </Text>
                      {/* <Footer /> */}
                    </View>
                  ) : loading ? (
                    <ActivityIndicator size="large" color="blue" />
                  ) : null
                }
                onRefresh={handleRefresh}
                refreshing={refresh}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                columnWrapperStyle={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                }}
                numColumns={6}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <View style={styles.imageCard}>
                    <Image
                      source={{
                        uri: `https://res.cloudinary.com/dusoicuhh/image/upload/v1652761552/${item.image}`,
                      }}
                      style={styles.image}
                    />
                    <Text style={styles.titleText}>{item.name}</Text>
                    <Text style={styles.genreText}>{item.category}</Text>
                    <View style={{paddingTop: 20}}>
                      <TouchableOpacity
                        onPress={e => handleDetail(item.id)}
                        style={styles.detailBtn}>
                        <Text style={stylesHome.details}>Details</Text>
                      </TouchableOpacity>
                      {/* <Button
                        title="Details"
                        style={{borderColor: '#5F2EEA'}}
                        onPress={e => handleDetail(item.id)}
                      /> */}
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default Profile;
