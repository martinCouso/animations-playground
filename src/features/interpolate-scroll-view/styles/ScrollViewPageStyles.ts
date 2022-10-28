import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');

export const STELLAR_OBJECT_SIZE = width * 0.7;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stellarObjectImage: {
    backgroundColor: 'transparent',
    width: STELLAR_OBJECT_SIZE,
    height: STELLAR_OBJECT_SIZE,
    resizeMode: 'contain',
  },
  moon: {
    backgroundColor: 'transparent',
    width: STELLAR_OBJECT_SIZE,
    height: STELLAR_OBJECT_SIZE,
    resizeMode: 'contain',
    bottom: 0,
    position: 'absolute',
    zIndex: 200,
  },
  name: {
    color: 'white',
    fontSize: 42,
    zIndex: 100,
    fontFamily: 'FutureSpace-Regular',
  },
  mass: {
    color: 'white',
    fontSize: 22,
    zIndex: 100,
    fontFamily: 'FutureSpace-Regular',
  },
});

export default styles;
