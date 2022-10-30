/*
import React from 'react';
import {View} from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  useImage,
  Image,
} from '@shopify/react-native-skia';

interface Props {}
const SkiaHoloCards: React.FC<Props> = () => {
  const card = useImage(require('../../assets/images/card.png'));
  const size = 256;
  const r = size * 0.33;
  return (
    <Canvas style={{flex: 1}}>
      <Group blendMode="multiply">
        <Image
          image={card}
          fit="contain"
          x={0}
          y={0}
          width={256}
          height={256}
        />
      </Group>
    </Canvas>
  );
};

export default SkiaHoloCards;
*/

import React from 'react';
import {useWindowDimensions} from 'react-native';
import {
  useImage,
  Canvas,
  ImageShader,
  Skia,
  Shader,
  mix,
  useComputedValue,
  Fill,
  useLoop,
} from '@shopify/react-native-skia';

const source = Skia.RuntimeEffect.Make(`
uniform shader image;
uniform float r;

half4 main(float2 xy) {   
  xy.x += sin(xy.y / r) * 4;
  return image.eval(xy).rbga;
}`)!;

export const SkiaHoloCards = () => {
  const {width, height} = useWindowDimensions();
  const progress = useLoop({duration: 1500});

  const uniforms = useComputedValue(
    () => ({r: mix(progress.current, 1, 100)}),
    [progress],
  );

  const image = useImage(require('../../assets/images/card.png'));
  if (image === null) {
    return null;
  }
  return (
    <Canvas style={{width, height}}>
      <Fill>
        <Shader source={source} uniforms={uniforms}>
          <ImageShader
            image={image}
            fit="cover"
            x={0}
            y={0}
            width={width}
            height={height}
          />
        </Shader>
      </Fill>
    </Canvas>
  );
};

export default SkiaHoloCards;
