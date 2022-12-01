import React, {useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import Styles from './styles/StartReactNativeLesson5Styles';
interface Props {}

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
  const [toggled, setToggle] = useState(false);

  return (
    <View style={Styles.container}>
      <Text>StartReactNativeLesson5</Text>
      <Pressable onPress={() => setToggle(prev => !prev)}>
        <Text>{toggled ? 'RESET' : 'START'}</Text>
      </Pressable>
    </View>
  );
};

export default StartReactNativeLesson5;
