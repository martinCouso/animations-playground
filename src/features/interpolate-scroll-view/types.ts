import {ImageSourcePropType} from 'react-native';

export type StellarObject = {
  id: number;
  name: string;
  mass: string;
  image: ImageSourcePropType;
  moons: number;
};
