import React, {Children, ReactElement} from 'react';
import {StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  measure,
} from 'react-native-reanimated';
import Styles from './RippleButtonStyles';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

interface Props {
  buttonStyles: ViewStyle;
  children: ReactElement<ViewProps>;
  onPress: () => void;
  rippleColor: string;
}
const RippleButton: React.FC<Props> = ({
  buttonStyles,
  children,
  onPress,
  rippleColor,
}) => {
  // Shared Values
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const calculatedWidth = useSharedValue(0);
  const calculatedHeight = useSharedValue(0);

  const animatedRef = useAnimatedRef<Animated.View>();

  //Gesture Handler
  const onGestureEventHandler =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: tapEvent => {
        const measures = measure(animatedRef);
        calculatedWidth.value = measures.width;
        calculatedHeight.value = measures.height;

        x.value = tapEvent.x;
        y.value = tapEvent.y;
        opacity.value = 1;
        scale.value = 0;
        scale.value = withTiming(1, {duration: 500});
      },
      onActive: () => {
        if (onPress) {
          runOnJS(onPress)();
        }
      },
      onEnd: () => {
        opacity.value = withTiming(0, {duration: 500});
      },
    });

  //Animated Styles
  const animatedStyles = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(
      calculatedWidth.value ** 2 + calculatedHeight.value ** 2,
    );
    return {
      position: 'absolute',
      backgroundColor: rippleColor,
      height: circleRadius * 2,
      width: circleRadius * 2,
      borderRadius: circleRadius,
      top: 0,
      left: 0,
      opacity: opacity.value,
      transform: [
        {translateX: x.value - circleRadius},
        {translateY: y.value - circleRadius},
        {scale: scale.value},
      ],
    };
  });

  const {borderRadius} = buttonStyles;

  return (
    <TapGestureHandler onGestureEvent={onGestureEventHandler}>
      <Animated.View style={[buttonStyles]} ref={animatedRef}>
        <View
          style={[
            StyleSheet.absoluteFill,
            Styles.circleContainer,
            {borderRadius},
          ]}>
          <Animated.View style={animatedStyles} />
        </View>
        {children}
      </Animated.View>
    </TapGestureHandler>
  );
};

export default RippleButton;
