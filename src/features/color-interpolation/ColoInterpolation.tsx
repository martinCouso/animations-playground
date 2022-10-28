import React, {useState} from 'react';
import {Switch} from 'react-native';
import {Theme} from './types';
import Styles, {
  SWITCH_TRACK_COLOR,
  Themes,
} from './styles/ColorInterpolationBasicStyles';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const ColorInterpolationBasic: React.FC = () => {
  // Local State
  const [theme, setTheme] = useState<Theme>(Theme.light);

  // Shared Values
  const progress = useDerivedValue(() => {
    return theme === Theme.dark ? withTiming(1) : withTiming(0);
  }, [theme]);

  // Handlers
  const toggleSwitch = (value: boolean) => {
    setTheme(value ? Theme.dark : Theme.light);
  };

  // Animated Styles
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Themes.light.backgroundColor, Themes.dark.backgroundColor],
    );
    return {
      backgroundColor,
    };
  });

  const switcherContainerAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Themes.light.primaryColor, Themes.dark.primaryColor],
    );
    const perspective = interpolateColor(progress.value, [0, 1], [50, 150]);
    return {
      backgroundColor,
      transform: [{perspective: perspective}, {rotateX: '45deg'}],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Themes.dark.primaryColor, Themes.light.primaryColor],
    );
    return {
      color,
    };
  });

  return (
    <Animated.View style={[Styles.container, containerAnimatedStyle]}>
      <Animated.Text style={[Styles.title, textAnimatedStyle]}>
        INTERPOLATE
      </Animated.Text>
      <Animated.View
        style={[Styles.switcherContainer, switcherContainerAnimatedStyle]}>
        <Switch
          value={theme === Theme.dark}
          onValueChange={toggleSwitch}
          style={[Styles.switcher]}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={'black'}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default ColorInterpolationBasic;
