import {StyleSheet, Dimensions} from 'react-native';
const imageWH = Dimensions.get('window').width / 3 - 4;
import {BaseColor} from '@config';
import {normalize} from 'react-native-elements';

export const styles = StyleSheet.create({
  photosWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
  },

  iconsWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-around',
  },
  iconWrapper: {
    width: imageWH / 2,
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
  },
  headerText: {
    color: BaseColor.primaryColor,
  },
  image: {width: imageWH, height: (3 * imageWH) / 4, margin: 2},
  flatListContainer: {
    paddingTop: normalize(20),
    flexGrow: 1,
  },
});
