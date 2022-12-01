import React from 'react';
import {Text, View} from 'react-native';
import RippleButton from './RippleButton/RippleButton';

interface Props {
  variant: any;
  onPress: () => void;
  title: string;
}
const Button: React.FC<Props> = ({onPress, title}) => {
  return (
    <RippleButton onPress={onPress} buttonStyles={{}} rippleColor={}>
      <Text>{title}</Text>
    </RippleButton>
  );
};

export default Button;
