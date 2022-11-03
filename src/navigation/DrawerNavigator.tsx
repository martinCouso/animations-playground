import Home from '../features/home/home';
import PanGestureHandlerBasics from '../features/pan-gesture-handler-basics/PanGestureHandlerBasics';
import ColorInterpolationBasic from '../features/color-interpolation/ColoInterpolation';
import {SkiaClockMatrix} from '../features/skia-clock-matrix/SkiaClockMatrix';
import StartReactNativeLesson4 from '../features/StartReactNativeLesson4/StartReactNativeLesson4';
import GridSkia from '../features/grid-skia/GridSkia';
import AppleWatchGridSkia from '../features/apple-watch-grid-skia/AppleWatchGridSkia';
import PanGestureSkiaBasics from '../features/PanGestureSkiaBasics/PanGestureSkiaBasics';
import InterpolateScrollView from '../features/interpolate-scroll-view/InterpolateScrollView';
import SkiaHoloCards from '../features/skia-holo-cards/SkiaHoloCards';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DARK_HEADER, NO_HEADER} from './styles/NavigationStyles';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="PGHBasics" component={PanGestureHandlerBasics} />
    <Drawer.Screen
      name="ColorInterpolationBasic"
      component={ColorInterpolationBasic}
      options={NO_HEADER}
    />
    <Drawer.Screen
      name="Skia Clock Matrix"
      component={SkiaClockMatrix}
      options={NO_HEADER}
    />
    <Drawer.Screen
      name="StartReactNativeLesson4"
      component={StartReactNativeLesson4}
      options={NO_HEADER}
    />
    <Drawer.Screen name="GridSkia" component={GridSkia} options={NO_HEADER} />
    <Drawer.Screen
      name="AppleWatchGridSkia"
      component={AppleWatchGridSkia}
      options={NO_HEADER}
    />
    <Drawer.Screen
      name="PanGestureSkiaBasics"
      component={PanGestureSkiaBasics}
      options={NO_HEADER}
    />
    <Drawer.Screen
      name="InterpolateScrollView"
      component={InterpolateScrollView}
      options={DARK_HEADER}
    />
    <Drawer.Screen
      name="Holo Cards Skia"
      component={SkiaHoloCards}
      options={DARK_HEADER}
    />
  </Drawer.Navigator>
);
