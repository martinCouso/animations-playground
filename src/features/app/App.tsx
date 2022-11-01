/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../home/home';
import PanGestureHandlerBasics from '../pan-gesture-handler-basics/PanGestureHandlerBasics';
import InterpolateScrollView from '../interpolate-scroll-view/InterpolateScrollView';
import ColorInterpolationBasic from '../color-interpolation/ColoInterpolation';
import SkiaHoloCards from '../skia-holo-cards/SkiaHoloCards';
import PanGestureSkiaBasics from '../PanGestureSkiaBasics/PanGestureSkiaBasics';
import GridSkia from '../grid-skia/GridSkia';
import AppleWatchGridSkia from '../apple-watch-grid-skia/AppleWatchGridSkia';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="PGHBasics" component={PanGestureHandlerBasics} />
          <Drawer.Screen
            name="ColorInterpolationBasic"
            component={ColorInterpolationBasic}
            options={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="GridSkia"
            component={GridSkia}
            options={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="AppleWatchGridSkia"
            component={AppleWatchGridSkia}
            options={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="PanGestureSkiaBasics"
            component={PanGestureSkiaBasics}
            options={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="InterpolateScrollView"
            component={InterpolateScrollView}
            options={{
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Drawer.Screen
            name="Holo Cards Skia"
            component={SkiaHoloCards}
            options={{
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
