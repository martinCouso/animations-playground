/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {scale: scale.value},
        {rotate: `${progress.value * 2 * Math.PI}rad`},
      ],
      borderRadius: (progress.value * 100) / 2,
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withTiming(0.5, {duration: 2000}), -1, true);
    scale.value = withRepeat(withSpring(1, {}), -1, true);
  }, [progress, scale]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: 'violet',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Animated.View
            style={[
              {height: 100, width: 100, backgroundColor: 'blue'},
              reanimatedStyle,
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
