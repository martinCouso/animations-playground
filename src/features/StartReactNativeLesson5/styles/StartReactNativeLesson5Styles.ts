import {StyleSheet} from 'react-native';
import {theme} from '../../../Styles';
import {CARD_HEIGHT} from '../../../shared-components/card/CardStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  cardsContainer: {
    position: 'relative',
    flex: 1,
    marginLeft: (CARD_HEIGHT / 2) * Math.sin((30 * Math.PI) / 180),
  },
  buttonContainer: {alignSelf: 'stretch', paddingHorizontal: theme.spacing.xl},
});

export default styles;
