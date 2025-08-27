import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import {normalize} from 'react-native-elements';

export const styles = StyleSheet.create({
  subtitleStyle: {
    color: BaseColor.grayColor,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  flatListContainer: {
    borderTopLeftRadius: normalize(10),
    borderTopRightRadius: normalize(10),
    bottom: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    paddingTop: normalize(20),
    flexGrow: 1,
  },

  contentWrapper: {
    borderTopLeftRadius: normalize(10),

    marginTop: 80,
  },
});
