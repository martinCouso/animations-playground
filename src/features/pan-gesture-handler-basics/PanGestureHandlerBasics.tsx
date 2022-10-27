import React from 'react';
import {Text, View} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Styles from './styles/PanGestureHanlderBasicsStyles';
import {CIRCLE_RADIUS, SIZE} from './constants';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {ContextInterface} from './types';

interface Props {
  navigation: any;
}

const PanGestureHandlerBasics: React.FC<Props> = props => {
  /***
   * This Shared Values can carry data, provide a way to react to changes,
   * and also drive animations.
   * In this case translateX and translateY, will contain the position of the
   * square represented by an Animated view
   */
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  /***
   * Each of the specified handlers will be triggered depending on the current
   * state of the attached Gesture Handle, in this case we want to handle 3 states:
   * 1) onStart, we want to store the coordinates where the square is when the
   * gesture begins.
   * 2) onActive, at this point we want to update the shared values with the
   * sum of the position reported by the event and the starting point stored in
   * the context.
   * 3) onEnd, once the gesture finished we check if the square is inside or
   * outside the circle, if it's inside a spring animation is trigger to position
   * the square at the center of the circle if it's not, then we let the square
   * to conserve its current position.
   */
  const panGestureEventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextInterface
  >({
    onStart: (event, context: ContextInterface) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context: ContextInterface) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  /***
   * useAnimatedStyle allow us to create styles that contain a relation between
   * Shared Values and View properties, in this case we're changing the position
   * of the square using the shared values translateX and translateY, that are
   * being updated with the help of the Gesture Handlers.
   */
  const calculatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <View style={Styles.container}>
      <View style={Styles.circleContainer}>
        <PanGestureHandler onGestureEvent={panGestureEventHandler}>
          <Animated.View style={[Styles.square, calculatedStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default PanGestureHandlerBasics;
