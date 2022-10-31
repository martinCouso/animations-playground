import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export const ITEMS_HORIZONTAL = 8;
export const ITEM_CONTAINER_SIZE = width / ITEMS_HORIZONTAL;
export const ITEM_CONTAINER_PADDING = 20;
export const ITEM_SIZE = ITEM_CONTAINER_SIZE - ITEM_CONTAINER_PADDING;
export const ITEMS_VERTICAL = Math.floor(height / ITEM_CONTAINER_SIZE) - 3;
export const CANVAS_HEIGHT = ITEMS_VERTICAL * ITEM_CONTAINER_SIZE;
export const CANVAS_WIDTH = width;
export const MAX_DISTANCE_BETWEEN_ITEMS =
  Math.sqrt((CANVAS_WIDTH - 0) ** 2 + (CANVAS_HEIGHT - 0) ** 2) / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvasContainer: {
    height: CANVAS_HEIGHT,
    width: CANVAS_WIDTH,
  },
});

export default styles;
