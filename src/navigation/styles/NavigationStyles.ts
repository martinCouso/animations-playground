import {DrawerNavigationOptions} from '@react-navigation/drawer';

export const NO_HEADER: Partial<DrawerNavigationOptions> = {
  headerShown: false,
};

export const DARK_HEADER: Partial<DrawerNavigationOptions> = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
