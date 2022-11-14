import {StyleSheet, Dimensions} from 'react-native';
import {SECONDARY_FONT} from '../../../Styles';
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
  guideText: {
    fontFamily: SECONDARY_FONT,
    position: 'absolute',
    top: 70,
    padding: 20,
    fontSize: 20,
  },
});

export default styles;
