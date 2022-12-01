import {StyleSheet} from 'react-native';

const sharedStyles = {
  container: {
    height: 50,
    alignSelf: 'stretch',
  },
};

export const Primary = StyleSheet.create({
  container: {
    ...sharedStyles,
    alignSelf: 'stretch',
  },
});
export const Secondary = StyleSheet.create({
  primary: {
    flex: 1,
  },
});

export default Primary;
