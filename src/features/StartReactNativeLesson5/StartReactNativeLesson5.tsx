import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Styles from './styles/StartReactNativeLesson5Styles';
import {CARDS} from '../StartReactNativeLesson4/constants';
import TiltedCard from './components/TiltedCard';
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import ScreenLayout from '../../layouts/screen-layout/ScreenLayout';
import Button from '../../shared-components/button/Button';
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useSpring = (state: number | boolean) => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === 'number' ? state : state ? 1 : 0;
  }, [state, value]);
  return useDerivedValue(() => {
    return withSpring(value.value);
  });
};

const useTiming = (state: number | boolean, config: WithTimingConfig) => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === 'number' ? state : state ? 1 : 0;
  }, [state, value]);
  return useDerivedValue(() => {
    return withTiming(value.value, config);
  });
};

/**
 * Transitions
 *<ul>
 * <li>Spring  + React State = useSpring</li>
 *
 * <li>Spring + Animated Values = withSpring</li>
 *
 * <li>Timing + React State = useTiming</li>
 *
 * <li>Timing + Animated Value = withTiming</li>
 *</ul>
 * @constructor
 */
const StartReactNativeLesson5: React.FC<Props> = () => {
  // React State
  const [toggled, setToggle] = useState(false);

  //Shared Values
  const isToggled = useSharedValue(false);
  const transition = useTiming(toggled, {duration: 600});
  //Effects
  useEffect(() => {
    isToggled.value = toggled;
  }, [toggled, isToggled]);

  return (
    <ScreenLayout>
      <View style={Styles.container}>
        <View style={Styles.cardsContainer}>
          {CARDS.map((card, index) => {
            return (
              <TiltedCard index={index} transition={transition} key={index} />
            );
          })}
        </View>
        <View style={Styles.buttonContainer}>
          <Button onPress={() => setToggle(prev => !prev)} title={'Press Me'} />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default StartReactNativeLesson5;
