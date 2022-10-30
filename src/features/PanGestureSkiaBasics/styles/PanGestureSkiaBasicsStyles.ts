import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
export const BACKGROUND_HEIGHT = 556;
export const BACKGROUND_WIDTH = width * 0.9;

export const CARD_HEIGHT = BACKGROUND_HEIGHT - 5;
export const CARD_WIDTH = BACKGROUND_WIDTH - 5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  card: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: 'black',
    position: 'absolute',
    borderRadius: 20,
    zIndex: 100,
  },
});

export default styles;
