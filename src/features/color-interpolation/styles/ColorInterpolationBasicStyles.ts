import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {COLORS} from '../../../Colors';
import {PRIMARY_FONT} from '../../../Styles';

const {width} = Dimensions.get('window');

export const Themes = {
  dark: {
    backgroundColor: '#2c2a2a',
    primaryColor: '#4d4753',
    secondaryColor: '#caa1fa',
  },
  light: {
    backgroundColor: '#FFFFFF',
    primaryColor: '#c9c8cb',
    secondaryColor: '#2c2a2a',
  },
};

export const SWITCH_TRACK_COLOR = {
  true: Themes.light.primaryColor,
  false: Themes.dark.primaryColor,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  title: {
    fontFamily: PRIMARY_FONT,
    fontSize: 50,
    fontWeight: '900',
  },
  switcherContainer: {
    height: width * 0.7,
    width: width * 0.7,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 20},
    shadowRadius: 10,
    borderColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (width * 0.7) / 2,
    shadowOpacity: 0.6,
  },
  switcher: {
    transform: [{rotateZ: '270deg'}],
  },
});

export default styles;
