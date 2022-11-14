import {StyleSheet, Dimensions} from 'react-native';
import {PRIMARY_FONT} from '../../../Styles';
const {width, height} = Dimensions.get('window');
export const CARD_WIDTH = width * 0.7;
export const CARD_HEIGHT = width * 0.4;
export const BOUND_X = width - CARD_WIDTH;
export const BOUND_Y = height - CARD_HEIGHT;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  card: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.7,
    shadowRadius: 25,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chip: {
    height: 20,
    width: 40,
    borderRadius: 6,
    resizeMode: 'cover',
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    borderWidth: 1,
  },
  cardText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: PRIMARY_FONT,
  },
  cardNameText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: PRIMARY_FONT,
  },
});

export default styles;
