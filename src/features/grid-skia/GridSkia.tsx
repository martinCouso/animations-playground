import React from 'react';
import {View} from 'react-native';
import {
  Canvas,
  Group,
  RoundedRect,
  SweepGradient,
  useTouchHandler,
  vec,
  useValue,
  runTiming,
} from '@shopify/react-native-skia';
import Styles, {
  CANVAS_HEIGHT,
  ITEM_CONTAINER_PADDING,
  ITEM_CONTAINER_SIZE,
  ITEM_SIZE,
  ITEMS_HORIZONTAL,
  ITEMS_VERTICAL,
} from './styles/GridSkiaStyles';
import {CARD_WIDTH} from '../PanGestureSkiaBasics/styles/PanGestureSkiaBasicsStyles';
import GridItem from './components/GridItem';
interface Props {}
const GridSkia: React.FC<Props> = () => {
  // Animated Values
  const touchedPoint = useValue<{x: number; y: number} | null>(null);

  /**
   * we're going to use this value to smooth the scale animation by
   * increasing over time its value and then using it in the interpolation
   * function when calculating the scale of the grid items
   */
  const progress = useValue(0);

  // Handlers
  const onCanvasTouch = useTouchHandler({
    onStart: event => {
      runTiming(progress, 1, {duration: 300});
      touchedPoint.current = {x: event.x, y: event.y};
    },
    onActive: event => {
      touchedPoint.current = {x: event.x, y: event.y};
    },
    onEnd: event => {
      runTiming(progress, 0, {duration: 300});
      touchedPoint.current = null;
    },
  });

  return (
    <View style={Styles.container}>
      <Canvas style={Styles.canvasContainer} onTouch={onCanvasTouch}>
        <Group>
          {new Array(ITEMS_HORIZONTAL).fill(0).map((_, horizontalIndex) => {
            return new Array(ITEMS_VERTICAL).fill(0).map((_, verticalIndex) => {
              return (
                <GridItem
                  rectProps={{
                    x:
                      horizontalIndex * ITEM_CONTAINER_SIZE +
                      ITEM_CONTAINER_PADDING / 2,
                    y:
                      verticalIndex * ITEM_CONTAINER_SIZE +
                      ITEM_CONTAINER_PADDING / 2,
                    height: ITEM_SIZE,
                    width: ITEM_SIZE,
                    r: 4,
                  }}
                  key={`${horizontalIndex}-${verticalIndex}`}
                  point={touchedPoint}
                  progress={progress}
                />
              );
            });
          })}
          <SweepGradient
            c={vec(CARD_WIDTH / 2, CANVAS_HEIGHT / 2)}
            colors={['cyan', 'magenta', 'yellow', 'cyan']}
          />
        </Group>
      </Canvas>
    </View>
  );
};

export default GridSkia;
