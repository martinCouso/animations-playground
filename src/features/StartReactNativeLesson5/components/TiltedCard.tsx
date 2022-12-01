import React from 'react';
import Card from '../../../shared-components/card/Card';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {CANVAS_HEIGHT} from '../../grid-skia/styles/GridSkiaStyles';
import {CARD_WIDTH} from '../../../shared-components/card/CardStyles';

interface Props {
  transition: any;
  index: number;
}

const origin = -CARD_WIDTH / 2;

const TiltedCard: React.FC<Props> = ({transition, index}: Props) => {
  /**
   * PI is equal to 180 degrees and PI/6 is equal to 30 degrees,
   * i.e. for index = 0.
   * (0-1) * Math.PI / 6
   *  -1 * 40 = -40
   */

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      transition.value,
      [0, 1],
      [0, ((index - 1) * Math.PI) / 6],
    );
    return {
      transform: [
        {translateX: origin},
        {rotate: `${rotate} rad`},
        {translateX: -origin},
      ],
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          top: CANVAS_HEIGHT / 2,
        },
      ]}>
      <Card index={index} />
    </Animated.View>
  );
};

export default TiltedCard;
