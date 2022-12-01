import React, {useContext} from 'react';
import {Text, TextStyle, ViewStyle} from 'react-native';
import RippleButton from '../RippleButton/RippleButton';
import {ThemeContext, ThemeContextInterface} from '../../features/app/App';

interface Props {
  onPress: () => void;
  title: string;
}
const Button: React.FC<Props> = ({onPress, title}) => {
  const {theme} = useContext(ThemeContext) as ThemeContextInterface;
  return (
    <RippleButton
      onPress={onPress}
      buttonStyles={theme.button.container as ViewStyle}
      rippleColor={theme.button.rippleEffectColor}>
      <Text style={theme.button.text as TextStyle}>{title}</Text>
    </RippleButton>
  );
};

export default Button;
