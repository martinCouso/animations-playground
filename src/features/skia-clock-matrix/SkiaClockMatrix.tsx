import {
  BlurMask,
  Canvas,
  Fill,
  Group,
  useClockValue,
  useFont,
} from '@shopify/react-native-skia';
import React from 'react';
import {useWindowDimensions} from 'react-native';

import {Symbol} from './components/Symbols';
import {COLS, ROWS} from './constants';

const cols = new Array(COLS).fill(0).map((_, i) => i);
// [0,1,2,3,4]
const rows = new Array(ROWS).fill(0).map((_, i) => i);
// [0,1,2,3,4,5,6,7,8,9]

const randomArray = (from: number, to: number, blank?: boolean) => {
  const size = Math.round(from + Math.random() * (to - from));
  console.log('size', size);
  const a = new Array(size).fill(0).map((_, i) => (blank ? 0 : i / size));
  console.log('a.reverse()', a.reverse());
  return a.reverse();
};

const streams = cols.map(() =>
  new Array(3)
    .fill(0)
    .map(() => [
      ...randomArray(1, 4, true),
      ...randomArray(4, 16),
      ...randomArray(2, 8, true),
    ])
    .flat(),
);

export const SkiaClockMatrix = () => {
  const clock = useClockValue();
  const {width, height} = useWindowDimensions();
  const symbol = {width: width / COLS, height: height / ROWS};
  const font = useFont(
    require('../../assets/fonts/matrix-code-nfi.otf'),
    symbol.height,
  );

  if (font === null) {
    return null;
  }

  const symbols = font.getGlyphIDs('abcdefghijklmnopqrstuvwxyz');
  return (
    <Canvas style={{flex: 1}}>
      <Fill color="orange" />
      <Group>
        <BlurMask blur={8} style="solid" respectCTM={true} />
        {cols.map((_i, i) =>
          rows.map((_j, j) => (
            <Symbol
              symbols={symbols}
              font={font}
              timestamp={clock}
              key={`${i}-${j}`}
              i={i}
              j={j}
              stream={streams[i]}
              symbol={symbol}
            />
          )),
        )}
      </Group>
    </Canvas>
  );
};
