import React, {useEffect} from 'react';
import {View} from 'react-native';
import {
  BlurMask,
  Canvas,
  RoundedRect,
  SweepGradient,
  useSharedValueEffect,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import {
  CANVAS_PADDING,
  GRADIENT_COLORS,
} from '../styles/BackgroundGradientStyles';
import {useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

interface Props {
  width: number;
  height: number;
}
const BackgroundGradient: React.FC<Props> = ({width, height}) => {
  const reanimatedValue = useSharedValue(0);
  const skiaValue = useValue(0);

  useEffect(() => {
    reanimatedValue.value = withRepeat(
      withTiming(15, {duration: 1300}),
      -1,
      true,
    );
  }, [reanimatedValue]);

  /*** Connecting the ReanimatedValue to the Skia Value through the
   *   useSharedValueEffect hook provided by Skia
   */

  useSharedValueEffect(() => {
    skiaValue.current = reanimatedValue.value;
  }, reanimatedValue);

  return (
    <Canvas
      style={{width: width + CANVAS_PADDING, height: height + CANVAS_PADDING}}>
      <RoundedRect
        x={CANVAS_PADDING / 2}
        y={CANVAS_PADDING / 2}
        width={width}
        height={height}
        color={'white'}
        r={20}>
        <SweepGradient
          c={vec((width + CANVAS_PADDING) / 2, (height + CANVAS_PADDING) / 2)}
          colors={GRADIENT_COLORS}
        />
      </RoundedRect>
      <BlurMask blur={skiaValue} style={'solid'} respectCTM={true} />
    </Canvas>
  );
};

export default BackgroundGradient;
