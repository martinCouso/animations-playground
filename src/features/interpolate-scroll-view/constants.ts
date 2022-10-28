import {StellarObject} from './types';

export const STELLAR_OBJECTS: Array<StellarObject> = [
  {
    id: 0,
    mass: '2 x 10³⁰ kg',
    image: require('../../assets/images/sun.png'),
    name: 'Sun',
    moons: 0,
  },
  {
    id: 1,
    mass: '3,285 × 10^23 kg',
    image: require('../../assets/images/mercury.png'),
    name: 'Mercury',
    moons: 0,
  },
  {
    id: 2,
    mass: '4,867 × 10^24 kg',
    image: require('../../assets/images/venus.png'),
    name: 'Venus',
    moons: 0,
  },
  {
    id: 3,
    name: 'Earth',
    image: require('../../assets/images/earth.png'),
    mass: '5,972 × 10^24 kg',
    moons: 1,
  },
];
