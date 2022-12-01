import React, {useContext} from 'react';
import Styles, {CARD_COLORS, CARD_HEIGHT, CARD_WIDTH} from './CardStyles';
import {
  Canvas,
  LinearGradient,
  vec,
  RoundedRect,
  Shadow,
  useImage,
  Image,
} from '@shopify/react-native-skia';
import {ThemeContext, ThemeContextInterface} from '../../features/app/App';

interface Props {
  index?: number;
  showImage?: boolean;
}
const Card: React.FC<Props> = ({index = 0, showImage = false}: Props) => {
  const image = useImage(require('../../assets/images/card-2-svg.png'));
  const {darkMode} = useContext(ThemeContext) as ThemeContextInterface;
  return (
    <Canvas style={[Styles.card]}>
      <RoundedRect
        x={10}
        width={CARD_WIDTH - 15}
        y={10}
        height={CARD_HEIGHT - 15}
        r={16}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(CARD_WIDTH, CARD_HEIGHT)}
          colors={CARD_COLORS[index]}
        />
        {darkMode ? (
          <Shadow dx={0} dy={0} blur={3} color="rgba(245, 40, 145, 0.65)" />
        ) : null}
      </RoundedRect>
      {showImage && image ? (
        <Image
          image={image}
          fit="fill"
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
        />
      ) : null}
    </Canvas>
  );
};

export default Card;
