import React from 'react';
import {
  Extrapolate,
  Group,
  interpolate,
  RoundedRect,
  RoundedRectProps,
  SkiaMutableValue,
  useComputedValue,
  useValue,
  BlurMask,
} from '@shopify/react-native-skia';
import {SkiaProps} from '@shopify/react-native-skia/lib/typescript/src/renderer/processors';
import {RectCtor} from '@shopify/react-native-skia/src/dom/types/Common';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAX_DISTANCE_BETWEEN_ITEMS,
} from '../styles/GridSkiaStyles';

interface Props {
  rectProps: SkiaProps<RoundedRectProps> & RectCtor;
  point: SkiaMutableValue<{x: number; y: number}> | null;
  progress: SkiaMutableValue<number>;
}

const GridItem: React.FC<Props> = props => {
  // Props
  const {
    point,
    rectProps: {x, y, width, height},
    progress,
  } = props;

  // Calculated Values
  /**
   * previousDistance is an auxiliary value that we use to smooth the
   * scale animation when the touch event is ending.
   */
  const previousDistance = useValue(0);

  /***
   * To calculate the distance between the touch in the screen and this
   * particular Grid Item we use the application of the Pythagorean theorem as
   * distance=√[(x₂ - x₁)² + (y₂ - y₁)²]; Since we need to recalculate the
   * distance everytime that the value of the skia value `point` changes the
   * hook useComputedValue is necessary, and so is to specify the dependency
   * of this value.
   */
  const distanceFromTouch = useComputedValue(() => {
    if (point === null || point.current === null) {
      return previousDistance.current;
    }
    previousDistance.current = Math.sqrt(
      (point?.current.x - x) ** 2 + (point?.current.y - y) ** 2,
    );
    return previousDistance.current;
  }, [point, previousDistance]);

  const itemScale = useComputedValue(() => {
    return interpolate(
      distanceFromTouch.current * progress.current,
      [0, MAX_DISTANCE_BETWEEN_ITEMS],
      [1, 0],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );
  }, [distanceFromTouch, progress]);

  const itemBlur = useComputedValue(() => {
    return interpolate(
      distanceFromTouch.current * progress.current,
      [0, MAX_DISTANCE_BETWEEN_ITEMS],
      [0, 7],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );
  }, [distanceFromTouch, progress]);

  const scaleWidth = useComputedValue(() => {
    return itemScale.current * width;
  }, [itemScale]);
  const scaleHeight = useComputedValue(() => {
    return itemScale.current * height;
  }, [itemScale]);

  const transform = useComputedValue(() => {
    return [{scale: itemScale.current}];
  }, [itemScale]);

  const origin = useComputedValue(() => {
    if (point?.current === null) {
      return {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2};
    }
    return point?.current;
  }, [point]);
  return (
    <Group origin={origin} transform={transform}>
      <RoundedRect
        {...props.rectProps}
        height={scaleHeight}
        width={scaleWidth}
      />
      <BlurMask blur={itemBlur} style="normal" respectCTM={true} />
    </Group>
  );
};

export default GridItem;
