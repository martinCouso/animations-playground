import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Styles from './styles/InterpolateScrollViewStyles';
import {STELLAR_OBJECTS} from './constants';
import ScrollViewPage from './components/ScrollViewPage';
import {StellarObject} from './types';
interface Props {
  navigation: any;
}

const InterpolateScrollView: React.FC<Props> = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      style={Styles.container}
      horizontal={true}
      scrollEventThrottle={16}
      pagingEnabled
      onScroll={scrollHandler}>
      {STELLAR_OBJECTS.map((stellarObject: StellarObject, index: number) => (
        <ScrollViewPage
          key={stellarObject.id.toString()}
          name={stellarObject.name}
          mass={stellarObject.mass}
          img={stellarObject.image}
          index={index}
          translateX={translateX}
          moons={stellarObject.moons}
        />
      ))}
    </Animated.ScrollView>
  );
};

export default InterpolateScrollView;
