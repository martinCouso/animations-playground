import React from 'react';
import {View, Text, Image} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import Styles, {BOUND_X, BOUND_Y} from './styles/StarReactNAtiveLesson4Styles';
import {clamp, withBouncing} from 'react-native-redash';
import {GestureContext} from './types';
interface Props {}

/**
 * This Screen renders a card that can be moved through gestures, the height and
 * width of the screen serve as limits, and the card will bounce if encounter
 * one of the for limits.
 * When connecting animations to gestures we need to follow 3 steps:
 * 1. create animated values
 *
 * 2. update said values through a handler that responds to one or several gestures
 *
 * 3. use the updated values to change styles properties of components
 *
 * @constructor
 */
const StartReactNativeLesson4: React.FC<Props> = () => {
  /**
   * Step 1. These values are called "Shared Values" because they are shared
   * between the UI Thread and the JS Thread
   */
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  /**
   * Step 2. The gesture handler expects an object where each key represents the
   * state of the gesture, for each state we get an event that carries the gesture
   * information and an option context, the context main purpose is to keep
   * values between the states of the gesture. e.g. remember which were the
   * coordinates when the gesture started.
   */
  const onGestureEventHandler = useAnimatedGestureHandler({
    onStart: (event, context: GestureContext) => {
      context.offsetX = translateX.value;
      context.offsetY = translateY.value;
    },
    onActive: (event, context: GestureContext) => {
      translateX.value = clamp(
        context.offsetX + event.translationX,
        0,
        BOUND_X,
      );
      translateY.value = clamp(
        context.offsetY + event.translationY,
        0,
        BOUND_Y,
      );
    },
    onEnd: event => {
      translateX.value = withBouncing(
        withDecay({
          velocity: event.velocityX,
        }),
        0,
        BOUND_X,
      );
      translateY.value = withBouncing(
        withDecay({
          velocity: event.velocityY,
        }),
        0,
        BOUND_Y,
      );
    },
  });

  /**
   * Step 3. Animated styles that can use the shared values to animate the
   * Animated.View
   */
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <View style={Styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEventHandler}>
        <Animated.View style={[Styles.card, animatedStyles]}>
          <Text style={Styles.cardText}>CARD BRAND</Text>
          <Image
            style={Styles.chip}
            source={require('../../assets/images/card-chip-bw.png')}
          />
          <Text style={Styles.cardText}>1234 5678 9123 4567</Text>
          <Text style={Styles.cardNameText}>MARTIN COUSO</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default StartReactNativeLesson4;
