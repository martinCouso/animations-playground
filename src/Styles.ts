import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
export const CANVAS_WIDTH = width;

export const PRIMARY_FONT = 'FutureSpace-Regular';
export const SECONDARY_FONT = 'Parisienne-Regular';

export const palette = {
  purple: 'magenta',
  green: '#0ECD9D',
  red: '#CD0E61',
  black: '#0B0B0B',
  white: '#F0F2F3',
  blue: '#4b1dc4',
};

export const shadeColor = (color: string, percent: number) => {
  let R: number = parseInt(color.substring(1, 3), 16);
  let G: number = parseInt(color.substring(3, 5), 16);
  let B: number = parseInt(color.substring(5, 7), 16);

  R = (R * (100 + percent)) / 100;
  G = (G * (100 + percent)) / 100;
  B = (B * (100 + percent)) / 100;

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR =
    R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16);
  const GG =
    G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16);
  const BB =
    B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16);

  return '#' + RR + GG + BB;
};

export const theme = {
  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.purple,
    success: palette.green,
    danger: palette.red,
    failure: palette.red,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  statusBar: {
    barStyle: 'dark-content',
    backgroundColor: '#FFFFFF',
    translucent: true,
  },
  textVariants: {
    header: {
      fontFamily: 'Raleway',
      fontSize: 36,
      fontWeight: 'bold',
    },
    body: {
      fontFamily: 'Merriweather',
      fontSize: 16,
    },
  },
  button: {
    container: {
      height: 50,
      alignSelf: 'stretch',
      backgroundColor: palette.white,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: palette.black,
      justifyContent: 'center',
      borderRadius: 25,
    },
    text: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '700',
      letterSpacing: 1,
    },
    rippleEffectColor: palette.black,
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.white,
    primary: palette.blue,
  },
  statusBar: {
    ...theme.statusBar,
    barStyle: 'light-content',
    backgroundColor: '#000000',
  },
  button: {
    container: {
      ...theme.button.container,
      backgroundColor: palette.blue,
      borderColor: palette.blue,
      shadowColor: palette.blue,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    text: {
      ...theme.button.text,
      color: palette.white,
    },
    rippleEffectColor: shadeColor(palette.blue, -2),
  },
};
