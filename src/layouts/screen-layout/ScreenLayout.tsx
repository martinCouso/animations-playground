import React, {useContext} from 'react';
import {StatusBar, StatusBarStyle, Switch, View} from 'react-native';
import {ThemeContext, ThemeContextInterface} from '../../features/app/App';
import {darkTheme, palette, theme as defaultTheme} from '../../Styles';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface Props {
  children: JSX.Element;
}
const ScreenLayout: React.FC<Props> = props => {
  const {darkMode, theme, setDarkMode} = useContext(
    ThemeContext,
  ) as ThemeContextInterface;
  // Shared Values
  const progress = useDerivedValue(() => {
    return darkMode ? withTiming(1) : withTiming(0);
  }, [theme]);

  const insets = useSafeAreaInsets();
  // Handlers

  // Animated Styles
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [defaultTheme.colors.background, darkTheme.colors.background],
    );
    return {
      backgroundColor,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    };
  });

  return (
    <Animated.View style={[containerAnimatedStyle, {flex: 1}]}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={theme.statusBar.barStyle as StatusBarStyle}
      />
      <View
        style={{
          alignItems: 'flex-end',
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.m,
        }}>
        <Switch
          value={!!darkMode}
          onValueChange={() => setDarkMode(darkMode ? 0 : 1)}
          trackColor={{
            false: palette.black,
            true: palette.blue,
          }}
          ios_backgroundColor={palette.blue}
          thumbColor={theme.colors.background}
        />
      </View>

      {props.children}
    </Animated.View>
  );
};

export default ScreenLayout;
