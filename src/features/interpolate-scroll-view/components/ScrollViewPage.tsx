import React, {useEffect} from 'react';
import {Dimensions, ImageSourcePropType, Text, View} from 'react-native';
import ScrollViewPageStyles, {
  STELLAR_OBJECT_SIZE,
} from '../styles/ScrollViewPageStyles';
import {useHeaderHeight} from '@react-navigation/elements';
import {SharedValue} from 'react-native-reanimated/lib/types';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

interface Props {
  name: string;
  mass: string;
  img: ImageSourcePropType;
  index: number;
  translateX: SharedValue<number>;
  moons: number;
}

const ScrollViewPage: React.FC<Props> = ({
  name,
  mass,
  img,
  index,
  translateX,
  moons,
}) => {
  const headerHeight = useHeaderHeight();
  const pageHeight = height - headerHeight;
  const pageStyles = {
    height: pageHeight,
    width,
  };

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rotateYSun = useSharedValue(0);

  useEffect(() => {
    rotateYSun.value = withRepeat(
      withTiming(360, {duration: 20000}),
      -1,
      false,
    );
  }, [rotateYSun]);

  const imgAnimatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{scale: scale}, {rotateZ: `${rotateYSun.value}deg`}],
    };
  });

  const moonAnimatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 2, 0],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{scale: scale}],
    };
  });

  const nameAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [0, -STELLAR_OBJECT_SIZE / 2 - 42, 0],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{translateY: translateY}],
      zIndex: translateY,
      opacity: opacity,
    };
  });

  const massAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [0, STELLAR_OBJECT_SIZE / 2 + 42, 0],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{translateY: translateY}],
      zIndex: translateY,
      opacity: opacity,
    };
  });

  return (
    <View style={[ScrollViewPageStyles.pageContainer, pageStyles]}>
      <Animated.Image
        source={img}
        style={[ScrollViewPageStyles.stellarObjectImage, imgAnimatedStyles]}
      />
      <Animated.View style={[{position: 'absolute'}, nameAnimatedStyles]}>
        <Text style={[ScrollViewPageStyles.name]}>{name}</Text>
      </Animated.View>
      <Animated.View style={[{position: 'absolute'}, massAnimatedStyles]}>
        <Text style={[ScrollViewPageStyles.mass]}>mass: {mass}</Text>
      </Animated.View>
      {moons > 0 ? (
        <Animated.Image
          source={require('../../../assets/images/earth-moon.png')}
          style={[ScrollViewPageStyles.moon, moonAnimatedStyles]}
        />
      ) : null}
    </View>
  );
};

export default ScrollViewPage;
