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
  ITEM_SIZE,
  MAX_DISTANCE_BETWEEN_ITEMS,
} from '../styles/GridSkiaStyles';

interface Props {
  rectProps: SkiaProps<RoundedRectProps> & RectCtor;
  point: SkiaMutableValue<{x: number; y: number}> | null;
  progress: SkiaMutableValue<number>;
}

const GridItem: React.FC<Props> = React.memo(props => {
  // Props
  const {
    point,
    rectProps: {x, y},
    progress,
  } = props;

  // Calculated Values
  /**
   * previousDistance is an auxiliary value that we use to smooth the
   * scale animation when the touch event is ending.
   */
  const previousDistance = useValue(
    Math.sqrt(
      Math.abs(CANVAS_WIDTH / 2 - x) ** 2 +
        Math.abs(CANVAS_HEIGHT / 2 - y) ** 2,
    ),
  );
  const previousX = useValue(x);
  const previousY = useValue(y);

  const currentY = useComputedValue(() => {
    if (point !== null && point?.current !== null) {
      console.log('point.current', point.current);
      return previousY.current;
    }
    return previousY.current;
  }, [y, point, previousY]);

  const currentX = useComputedValue(() => {
    if (point !== null && point.current !== null) {
      return previousX.current + point.current.x;
    }
    return previousX.current;
  }, [x, point, previousX]);

  /***
   * To calculate the distance between the touch in the screen and this
   * particular Grid Item we use the application of the Pythagorean theorem as
   * distance=√[(x₂ - x₁)² + (y₂ - y₁)²]; Since we need to recalculate the
   * distance everytime that the value of the skia value `point` changes the
   * hook useComputedValue is necessary, and so is to specify the dependency
   * of this value.
   */
  const distanceFromCenter = useComputedValue(() => {
    if (point === null || point.current === null) {
      return Math.sqrt(
        Math.abs(CANVAS_HEIGHT / 2 - ITEM_SIZE - previousY.current) ** 2,
      );
    }
    previousDistance.current = Math.sqrt(
      Math.abs(CANVAS_WIDTH / 2 - currentX.current - ITEM_SIZE / 2) ** 2 +
        Math.abs(CANVAS_HEIGHT / 2 - currentY.current - ITEM_SIZE / 2) ** 2,
    );
    return previousDistance.current;
  }, [point, previousDistance, currentY, currentX]);

  const itemScale = useComputedValue(() => {
    return interpolate(
      distanceFromCenter.current,
      [0, MAX_DISTANCE_BETWEEN_ITEMS],
      [1, 0.2],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );
  }, [distanceFromCenter, progress, point]);

  const transform = useComputedValue(() => {
    if (point && point.current) {
      let correctedXtranslation = point.current.x;
      let correctedYtranslation = point.current.y;
      return [
        {translateY: correctedYtranslation},
        {translateX: correctedXtranslation},
        {scale: itemScale.current},
      ];
    }
  }, [itemScale, point, currentX, currentY]);

  const origin = useComputedValue(() => {
    return {x: currentX.current, y: currentY.current};
  }, [point, currentY, currentX]);

  return (
    <Group transform={transform} origin={origin}>
      <RoundedRect {...props.rectProps} />
      {/*<BlurMask blur={itemBlur} style="normal" respectCTM={true} />*/}
    </Group>
  );
});

export default GridItem;
