import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  detailBtn: {
    borderWidth: 1,
    borderColor: '#5F2EEA',
    borderRadius: 4,
    padding: 10,
    width: 130,
  },
  sort: {
    backgroundColor: 'white',
    borderColor: '#DEDEDE',
    borderWidth: 1,
    borderRadius: 16,
    height: 37,
    flex: 1,
    paddingRight: 10,
  },
  container: {
    paddingBottom: 20,
  },
  title: {
    color: '#14142B',
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    width: 130,
    height: 180,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  imageCard: {
    padding: 10,
    marginEnd: 10,
    marginBottom: 15,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: 'white',
    width: 150,
  },
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
  genreText: {
    color: '#A0A3BD',
    fontSize: 11,
    fontWeight: '300',
    // width: 150,
    flex: 1,
    textAlign: 'center',
  },
  titleText: {
    paddingTop: 10,
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#DEDEDE',
    borderWidth: 1,
    borderRadius: 16,
    height: 37,
    fontSize: 16,
    color: '#4E4B66',
  },
});
