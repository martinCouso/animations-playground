import React from 'react';
import {View} from 'react-native';

interface Props {
  toggled: boolean;
  index: number;
}
const TiltedCard: React.FC<Props> = ({toggled, index}: Props) => {
  /**
   * PI is equal to 180 degrees and PI/6 is equal to 30 degrees,
   * i.e. for index = 0.
   * (0-1) * Math.PI / 6
   *  -1 * 40 = -40
   */
  const rotate = toggled ? ((index - 1) * Math.PI) / 6 : 0;

  return <View />;
};

export default TiltedCard;
