/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {DrawerNavigator} from '../../navigation/DrawerNavigator';
import {theme, darkTheme} from '../../Styles';

export interface ThemeContextInterface {
  darkMode: 0 | 1;
  setDarkMode: (toggle: 0 | 1) => void;
  theme: typeof darkTheme | typeof theme;
}
export const ThemeContext = React.createContext<ThemeContextInterface | null>(
  null,
);

const App = () => {
  const [darkMode, setDarkMode] = useState<0 | 1>(0);

  const themeContextValue: ThemeContextInterface = {
    theme: darkMode ? darkTheme : theme,
    darkMode,
    setDarkMode,
  };
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeContext.Provider>
  );
};

export default App;
