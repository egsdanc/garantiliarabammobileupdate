import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: BaseColor.whiteColor,
  },
  line: {
    width: 1,
    height: 14,
    backgroundColor: BaseColor.grayColor,
    marginLeft: 10,
  },
  contentFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
});
