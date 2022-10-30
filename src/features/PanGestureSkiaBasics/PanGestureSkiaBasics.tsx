import React from 'react';
import {View} from 'react-native';
import Styles, {
  BACKGROUND_HEIGHT,
  BACKGROUND_WIDTH,
  CARD_HEIGHT,
  CARD_WIDTH,
} from './styles/PanGestureSkiaBasicsStyles';
import Animated, {
  Extrapolation,
  interpolate,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import BackgroundGradient from './components/BanckgroundGradient';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

interface Props {}
const PanGestureSkiaBasics: React.FC<Props> = () => {
  // Shared Values
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  // Handlers
  const panHandler = Gesture.Pan()
    .onBegin(event => {
      rotateX.value = withTiming(
        interpolate(event.y, [0, CARD_HEIGHT], [10, -10], Extrapolation.CLAMP),
      );
      rotateY.value = withTiming(
        interpolate(event.x, [0, CARD_WIDTH], [-10, 10], Extrapolation.CLAMP),
      );
    })
    .onUpdate(event => {
      rotateX.value = interpolate(
        event.y,
        [0, CARD_HEIGHT],
        [10, -10],
        Extrapolation.CLAMP,
      );
      rotateY.value = interpolate(
        event.x,
        [0, CARD_WIDTH],
        [-10, 10],
        Extrapolation.CLAMP,
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0, {duration: 500});
      rotateY.value = withTiming(0, {duration: 500});
    });

  // Animated Styles
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {perspective: 300},
        {rotateX: `${rotateX.value}deg`},
        {rotateY: `${rotateY.value}deg`},
      ],
    };
  });

  return (
    <View style={Styles.container}>
      <BackgroundGradient width={BACKGROUND_WIDTH} height={BACKGROUND_HEIGHT} />
      <GestureDetector gesture={panHandler}>
        <Animated.Image
          style={[Styles.card, cardAnimatedStyle]}
          source={require('../../assets/images/card.png')}
        />
      </GestureDetector>
    </View>
  );
};

export default PanGestureSkiaBasics;
