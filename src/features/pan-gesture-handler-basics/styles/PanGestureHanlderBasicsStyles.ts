import {StyleSheet} from 'react-native';
import {CIRCLE_RADIUS, SIZE} from '../constants';
import {COLORS} from '../../../Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: COLORS.primary,
    borderRadius: SIZE / 5,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: COLORS.secondary,
  },
});

export default styles;
