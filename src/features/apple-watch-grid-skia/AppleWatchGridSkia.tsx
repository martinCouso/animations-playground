import React from 'react';
import {View} from 'react-native';
import {
  Canvas,
  Group,
  RoundedRect,
  LinearGradient,
  useTouchHandler,
  vec,
  useValue,
  runTiming,
} from '@shopify/react-native-skia';
import Styles, {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  ITEM_CONTAINER_PADDING,
  ITEM_CONTAINER_SIZE,
  ITEM_SIZE,
  ITEMS_HORIZONTAL,
  ITEMS_VERTICAL,
} from './styles/GridSkiaStyles';
import {CARD_WIDTH} from '../PanGestureSkiaBasics/styles/PanGestureSkiaBasicsStyles';
import GridItem from './components/GridItem';
interface Props {}
const AppleWatchGridSkia: React.FC<Props> = () => {
  // Animated Values
  const touchedPoint = useValue<{x: number; y: number} | null>(null);
  const touchOrigin = useValue<{x: number; y: number} | null>(null);

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
      //touchedPoint.current = {x: event.x, y: event.y};
      touchOrigin.current = {x: event.x, y: event.y};
    },
    onActive: event => {
      if (touchOrigin !== null && touchOrigin.current !== null) {
        touchedPoint.current = {
          x: event.x - touchOrigin.current.x,
          y: event.y - touchOrigin.current.y,
        };
      }
    },
    onEnd: () => {
      touchOrigin.current = touchedPoint.current;
      //touchedPoint.current = null;
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
                    x: horizontalIndex * ITEM_CONTAINER_SIZE,
                    y: verticalIndex * ITEM_CONTAINER_SIZE,
                    height: ITEM_SIZE,
                    width: ITEM_SIZE,
                    r: ITEM_CONTAINER_SIZE / 2,
                  }}
                  key={`${horizontalIndex}-${verticalIndex}`}
                  point={touchedPoint}
                  progress={progress}
                />
              );
            });
          })}
          <LinearGradient
            start={vec(0, 0)}
            end={vec(CARD_WIDTH / 2, CANVAS_HEIGHT / 2)}
            colors={['cyan', 'magenta', 'cyan', 'magenta']}
          />
          <RoundedRect
            x={CANVAS_WIDTH / 2 - 8}
            y={CANVAS_HEIGHT / 2 - 8}
            width={16}
            height={16}
            r={25}
            color="red"
          />
        </Group>
      </Canvas>
    </View>
  );
};

export default AppleWatchGridSkia;
