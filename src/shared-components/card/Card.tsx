import React from 'react';
import {Text, View} from 'react-native';
import Styles, {CARD_COLORS, CARD_HEIGHT, CARD_WIDTH} from './CardStyles';
import {
  Canvas,
  LinearGradient,
  vec,
  RoundedRect,
  BlurMask,
  useImage,
  Image,
} from '@shopify/react-native-skia';
import {GRADIENT_COLORS} from '../../features/PanGestureSkiaBasics/styles/BackgroundGradientStyles';

interface Props {
  index?: number;
}
const Card: React.FC<Props> = ({index = 0}: Props) => {
  const image = useImage(require('../../assets/images/card-2-svg.png'));

  return (
    <Canvas style={[Styles.card]}>
      <RoundedRect x={0} width={CARD_WIDTH} y={0} height={CARD_HEIGHT} r={16}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(CARD_WIDTH, CARD_HEIGHT)}
          colors={CARD_COLORS[index]}
        />
      </RoundedRect>
      {image && (
        <Image
          image={image}
          fit="fill"
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
        />
      )}
    </Canvas>
  );
};

export default Card;
